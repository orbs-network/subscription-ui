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
import { fullOrbsFromWeiOrbs } from "../cryptoUtils/unitConverter";
import {
  IMonthlySubscriptionPlanService,
  IOrbsTokenService,
  ISubscriptionsService,
  TVirtualChainSubscriptionExtensionPayload,
  TVirtualChainSubscriptionPayload,
} from "@orbs-network/contracts-js";
import {
  TReadVcDataResponse,
  TVcCreatedEvent,
} from "@orbs-network/contracts-js/src/ethereumContractsServices/subscriptionService/ISubscriptionsService";

type TMSPContractParameters = {
  tierName: string;
  monthlyRateInFullOrbs: number;
};

export class OrbsAccountStore {
  @observable public contractParametersDoneLoading = false;
  @observable public contractParametersErrorLoading = false;
  @observable public doneLoading = false;
  @observable public errorLoading = false;
  @observable public txPending = false;
  @observable public txHadError = false;
  @observable public txCanceled = false;
  @observable public isGuardian = false;
  @observable public mspContractParameters: TMSPContractParameters = {
    monthlyRateInFullOrbs: 0,
    tierName: "",
  };

  @observable public vcCreationEvents: TVcCreatedEvent[] = [];
  @observable public vcIdToData: Map<
    String,
    TReadVcDataResponse
  > = observable.map();

  // TODO : O.L : Move all MSP related data to its own store when starting to work with more than 1.
  @observable public allowanceToMSPContract = 0;

  private addressChangeReaction: IReactionDisposer;

  constructor(
    private cryptoWalletIntegrationStore: CryptoWalletConnectionStore,
    private orbsTokenService: IOrbsTokenService,
    private monthlySubscriptionPlanService: IMonthlySubscriptionPlanService,
    private subscriptionsService: ISubscriptionsService
  ) {
    this.readContractParameters().then(() =>
      console.log("MSP contract parameters read success")
    );
    this.addressChangeReaction = reaction(
      () => this.cryptoWalletIntegrationStore.mainAddress,
      async (address) => {
        this.setDoneLoading(false);
        await this.reactToConnectedAddressChanged(address);

        this.monthlySubscriptionPlanService
          .readMonthlyRateInFullOrbs()
          .then((monthlyRate) => console.log({ monthlyRate }));

        this.monthlySubscriptionPlanService
          .readTier()
          .then((tier) => console.log({ tier }));
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
  ): Promise<TransactionReceipt | undefined> {
    this.resetTxIndicators();

    // Indicate tx is pending
    this.setTxPending(true);
    console.log(`Waiting for promievent of ${name}`);

    try {
      const res = await promievent;
      console.log(`Got Results for promievent of ${name}`);
      return res;
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

  public async setAllowanceForStakingContract(
    allowanceForStakingContractInWeiOrbs: bigint
  ): Promise<void> {
    const mspContractAddress = this.monthlySubscriptionPlanService
      .contractAddress;
    const promivent = this.orbsTokenService.approve(
      mspContractAddress,
      allowanceForStakingContractInWeiOrbs
    );

    this.handlePromievent(
      // @ts-ignore
      promivent,
      "setAllowanceForStakingContract"
    ).then(() =>
      this.readAndSetMSPContractAllowance(
        this.cryptoWalletIntegrationStore.mainAddress
      )
    );
  }

  // TODO : O.L : Move to proper store
  public async createNewVc(
    virtualChainSubscriptionPayload: TVirtualChainSubscriptionPayload
  ): Promise<string> {
    const mspContractAddress = this.monthlySubscriptionPlanService
      .contractAddress;
    const promivent = this.monthlySubscriptionPlanService.createANewVC(
      virtualChainSubscriptionPayload
    );

    // @ts-ignore
    const recipt = await this.handlePromievent(promivent, "createNewVc").then(
      (val) => {
        console.log("Add handling of created vc");
        console.log({ val });
        return val;
      }
    );

    const { vcId } = await this.subscriptionsService.readVcIdFromHistory(
      recipt!.blockNumber,
      this.cryptoWalletIntegrationStore.mainAddress
    );

    // DEV_NOTE : O.L : Re-Reading all relevant data, no need to wait
    this.manuallyReadAccountData();

    return vcId;
  }

  public async extendExistingVcSubscription(
    virtualChainSubscriptionExtensionPayload: TVirtualChainSubscriptionExtensionPayload
  ): Promise<void> {
    const mspContractAddress = this.monthlySubscriptionPlanService
      .contractAddress;
    const promivent = this.monthlySubscriptionPlanService.extendSubscription(
      virtualChainSubscriptionExtensionPayload
    );

    const recipt = await this.handlePromievent(
      // @ts-ignore
      promivent,
      "extendExistingVcSubscription"
    ).then((val) => {
      console.log({ val });
      return val;
    });

    // DEV_NOTE : O.L : Re-Reading all relevant data, no need to wait
    this.manuallyReadAccountData();
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

  private setDefaultAccountAddress(accountAddress: string) {
    this.monthlySubscriptionPlanService.setFromAccount(accountAddress);
    this.subscriptionsService.setFromAccount(accountAddress);
    this.orbsTokenService.setFromAccount(accountAddress);
  }

  // **** Data reading and setting ****

  private async readContractParameters() {
    try {
      const tierName = await this.monthlySubscriptionPlanService.readTier();
      const monthlyRateInFullOrbs = await this.monthlySubscriptionPlanService.readMonthlyRateInFullOrbs();

      this.setMspContractParameters({ tierName, monthlyRateInFullOrbs });
    } catch (e) {
      this.setContractParametersErrorLoading(true);
      console.error("Error loading msp contract parameters");
      console.error(e);
    }
  }

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
    this.setMSPContractAllowance(
      fullOrbsFromWeiOrbs(balanceInWeiOrbs.toString())
    );
  }

  private async readDataForAllCreatedVcs() {
    for (let vcCreatedEvent of this.vcCreationEvents) {
      try {
        const vcData = await this.subscriptionsService.readVcData(
          vcCreatedEvent.vcId
        );

        console.log(`Setting for ${vcCreatedEvent.vcId}`);
        this.setVcDataInMap(vcCreatedEvent.vcId, vcData);
      } catch (e) {
        console.error(
          `Error trying reading vc data for ${vcCreatedEvent.vcId} : ${e}`
        );
      }
    }
  }

  // ****  Subscriptions ****

  private async refreshAccountListeners(accountAddress: string) {
    this.cancelAllCurrentSubscriptions();
  }

  private cancelAllCurrentSubscriptions() {}

  // ****  Complex setters ****
  public setVcCreationEventsAndUpdateVcsData(
    vcCreationsEvents: TVcCreatedEvent[]
  ) {
    this.setVcCreationEvents(vcCreationsEvents);

    this.readDataForAllCreatedVcs();
  }

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
  @action("setContractParametersDoneLoading")
  private setContractParametersDoneLoading(
    contractParametersDoneLoading: boolean
  ) {
    this.contractParametersDoneLoading = contractParametersDoneLoading;
  }

  @action("setContractParametersErrorLoading")
  private setContractParametersErrorLoading(
    contractParametersErrorLoading: boolean
  ) {
    this.contractParametersErrorLoading = contractParametersErrorLoading;
  }

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

  @action("setMspContractParameters")
  private setMspContractParameters(
    mspContractParameters: TMSPContractParameters
  ) {
    this.mspContractParameters = mspContractParameters;
  }

  @action("setVcCreationEvents")
  private setVcCreationEvents(vcCreationsEvents: TVcCreatedEvent[]) {
    this.vcCreationEvents = vcCreationsEvents;
  }

  @action("setVcDataInMap")
  private setVcDataInMap(
    vcId: string,
    readVcDataResponse: TReadVcDataResponse
  ) {
    this.vcIdToData.set(vcId, readVcDataResponse);
  }
}
