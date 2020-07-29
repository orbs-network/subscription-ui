import {
  action,
  computed,
  IReactionDisposer,
  observable,
  reaction,
} from "mobx";
import { CryptoWalletConnectionStore } from "./CryptoWalletConnectionStore";
import { PromiEvent, TransactionReceipt } from "web3-core";
import { JSON_RPC_ERROR_CODES } from "../constants/ethereumErrorCodes";
import { IOrbsTokenService, OrbsTokenService } from "orbs-pos-data";
import { fullOrbsFromWeiOrbs } from "../cryptoUtils/unitConverter";
import { IMonthlySubscriptionPlanService } from "../services/monthlySubscriptionPlanService/IMonthlySubscriptionPlanService";

export class OrbsAccountStore {
  @observable public doneLoading = false;
  @observable public errorLoading = false;
  @observable public txPending = false;
  @observable public txHadError = false;
  @observable public txCanceled = false;
  @observable public isGuardian = false;

  // TODO : O.L : Move all MSP related data to its own store when starting to work with more than 1.
  @observable public allowanceToMSPContract = 0;

  private addressChangeReaction: IReactionDisposer;

  constructor(
    private cryptoWalletIntegrationStore: CryptoWalletConnectionStore,
    private orbsTokenService: IOrbsTokenService,
    private monthlySubscriptionPlanService: IMonthlySubscriptionPlanService
  ) {
    this.addressChangeReaction = reaction(
      () => this.cryptoWalletIntegrationStore.mainAddress,
      async (address) => {
        this.setDoneLoading(false);
        await this.reactToConnectedAddressChanged(address);
        this.setDoneLoading(true);
      },
      {
        fireImmediately: true,
      }
    );
  }

  // **** Computed values ****

  // **** Contract interactions ****
  private async handlePromievent(
    promievent: PromiEvent<TransactionReceipt>,
    name = "A promivent"
  ): Promise<void> {
    this.resetTxIndicators();

    // Indicate tx is pending
    this.setTxPending(true);
    console.log(`Waiting for promievent of ${name}`);

    try {
      const res = await promievent;
      console.log(`Got Results for promievent of ${name}`);
      return;
    } catch (e) {
      if (
        (e as any).code === JSON_RPC_ERROR_CODES.provider.userRejectedRequest
      ) {
        this.setTxCanceled(true);
      } else {
        throw e;
      }
    } finally {
      this.setTxPending(false);
    }
  }

  // **** Current address changed ****

  private async reactToConnectedAddressChanged(currentAddress: string) {
    if (currentAddress) {
      this.setDefaultAccountAddress(currentAddress);

      if (this.cryptoWalletIntegrationStore.hasEventsSupport) {
        this.refreshAccountListeners(currentAddress);
      }

      try {
        await this.readDataForAccount(currentAddress);
      } catch (e) {
        this.failLoadingProcess(e);
        console.error(
          "Error in reacting to address change in Orbs Account Store",
          e
        );
      }
    }
  }

  private setDefaultAccountAddress(accountAddress: string) {}

  // **** Data reading and setting ****

  public async manuallyReadAccountData() {
    try {
      await this.readDataForAccount(
        this.cryptoWalletIntegrationStore.mainAddress
      );
    } catch (e) {
      this.failLoadingProcess(e);
      console.error(
        "Error in manually reading address data in Orbs Account Store",
        e
      );
    }
  }

  private async readDataForAccount(accountAddress: string) {
    // try {
    //   await this.readAndSetIsGuardian(accountAddress);
    // } catch (e) {
    //   console.error(`Error read-n-set isGuardian ${e}`);
    // }
    await this.readAndSetMSPContractAllowance(accountAddress).catch((e) => {
      console.error(`Error read-n-set MSP contract allowance: ${e}`);
    });
  }

  // **** Read and Set ****
  private async readAndSetMSPContractAllowance(accountAddress: string) {
    const balanceInWeiOrbs = await this.orbsTokenService.readAllowance(
      accountAddress,
      this.monthlySubscriptionPlanService.contractAddress
    );
    this.setMSPContractAllowance(fullOrbsFromWeiOrbs(balanceInWeiOrbs));
  }

  // ****  Subscriptions ****

  private async refreshAccountListeners(accountAddress: string) {
    this.cancelAllCurrentSubscriptions();
  }

  private cancelAllCurrentSubscriptions() {}

  // ****  Complex setters ****
  private failLoadingProcess(error: Error) {
    this.setErrorLoading(true);
    this.setDoneLoading(true);
  }

  private resetTxIndicators() {
    this.setTxPending(false);
    this.setTxHadError(false);
    this.setTxCanceled(false);
  }

  // ****  Observables setter actions ****
  @action("setDoneLoading")
  private setDoneLoading(doneLoading: boolean) {
    this.doneLoading = doneLoading;
  }

  @action("setErrorLoading")
  private setErrorLoading(errorLoading: boolean) {
    this.errorLoading = errorLoading;
  }

  @action("setTxPending")
  private setTxPending(txPending: boolean) {
    this.txPending = txPending;
  }

  @action("setTxCanceled")
  private setTxCanceled(txCanceled: boolean) {
    this.txCanceled = txCanceled;
  }

  @action("setTxHadError")
  private setTxHadError(txHadError: boolean) {
    this.txHadError = txHadError;
  }

  @action("setMSPContractAllowance")
  private setMSPContractAllowance(contractAllowance: number) {
    this.allowanceToMSPContract = contractAllowance;
  }
}
