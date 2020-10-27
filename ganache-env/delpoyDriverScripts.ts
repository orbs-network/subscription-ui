// import { log, TestkitDriver } from 'rewards-v2/dist/e2e/driver';

// import { log, TestkitDriver } from "rewards-v2/dist/e2e/driver";

import { toWei } from "web3-utils";
import { Driver as OrbsV2Driver } from "@orbs-network/orbs-ethereum-contracts-v2";
// import { Driver as OrbsV2Driver } from "@orbs-network/orbs-ethereum-contracts-v2/build/contracts/Rewards.json";
import fs from "fs";
import { weiOrbsFromFullOrbs } from "../src/cryptoUtils/unitConverter";
import { TransactionConfig } from "web3-core";

const co = require("@orbs-network/orbs-ethereum-contracts-v2");
const BN = require("bn.js");

const deployDriverScripts = async () => {
  try {
    console.log("deploying Orbs PoS V2 contracts");
    const driver = await OrbsV2Driver.new();
    console.log("After deploying Orbs PoS V2 contracts");

    const orbsV2Account = driver.accounts[0];
    console.log(`Assigning ORBS to ${orbsV2Account}`);
    driver.erc20.assign(orbsV2Account, new BN("1000000000000000000000000000"));

    const CANARY_SUBSET = "canary";

    await driver.protocol.createDeploymentSubset(CANARY_SUBSET, 1, {
      from: driver.functionalManager.address,
    });

    const priceOfOneMonthInOrbs = 4000;
    // const priceOfOneMonthInWeiBn = BN(weiOrbsFromFullOrbs(4000));

    const monthlySubscriptionPlanDeployedInstance = await driver.newSubscriber(
      "my_tier",
      new BN(weiOrbsFromFullOrbs(priceOfOneMonthInOrbs))
    );

    const monthsForVc1 = 3;
    const monthsForVc2 = 1;
    const monthsForVc3 = 6;
    const monthsForVc4 = 3;
    const monthsForVc5 = 1;

    const totalMonths =
      monthsForVc1 + monthsForVc2 + monthsForVc3 + monthsForVc4 + monthsForVc5;
    const totalAllowanceInOrbs = totalMonths * priceOfOneMonthInOrbs;
    const totalAllowanceInWeiOrbs = toWei(new BN(totalAllowanceInOrbs));

    console.log(`Approving usage of ${totalAllowanceInOrbs} for VC creation`);
    await driver.erc20.approve(
      monthlySubscriptionPlanDeployedInstance.address,
      totalAllowanceInWeiOrbs,
      {
        from: orbsV2Account,
      }
    );

    const weiAmount = weiOrbsFromFullOrbs(2000);
    console.log({ weiAmount });
    const bnAmount = new BN(weiAmount);
    console.log({ bnAmount });
    console.log(`Creating VC 1`);
    console.log(weiOrbsFromFullOrbs(priceOfOneMonthInOrbs * monthsForVc1));
    await monthlySubscriptionPlanDeployedInstance.createVC(
      "Vc1",
      new BN(weiOrbsFromFullOrbs(priceOfOneMonthInOrbs * monthsForVc1)),
      true,
      CANARY_SUBSET,
      {
        from: orbsV2Account,
      }
    );
    console.log(`Creating VC 2`);
    await monthlySubscriptionPlanDeployedInstance.createVC(
      "Vc2",
      new BN(weiOrbsFromFullOrbs(priceOfOneMonthInOrbs * monthsForVc2)),
      true,
      CANARY_SUBSET,
      {
        from: orbsV2Account,
      }
    );
    console.log(`Creating VC 3`);
    await monthlySubscriptionPlanDeployedInstance.createVC(
      "Vc3",
      new BN(weiOrbsFromFullOrbs(priceOfOneMonthInOrbs * monthsForVc3)),
      true,
      CANARY_SUBSET,
      {
        from: orbsV2Account,
      }
    );
    console.log(`Creating VC 4`);
    await monthlySubscriptionPlanDeployedInstance.createVC(
      "Vc4",
      new BN(weiOrbsFromFullOrbs(priceOfOneMonthInOrbs * monthsForVc4)),
      true,
      CANARY_SUBSET,
      {
        from: orbsV2Account,
      }
    );
    console.log(`Creating VC 5`);
    await monthlySubscriptionPlanDeployedInstance.createVC(
      "Vc5",
      new BN(weiOrbsFromFullOrbs(priceOfOneMonthInOrbs * monthsForVc5)),
      true,
      CANARY_SUBSET,
      {
        from: orbsV2Account,
      }
    );

    const addresses = {
      subscriptions: driver.subscriptions.address,
      erc20: driver.erc20.address,
      monthlySubscriptionPlanDeployedInstance:
        monthlySubscriptionPlanDeployedInstance.address,
    };

    console.log("Saving addresses to file");
    fs.writeFileSync(
      "./_out/addresses.json",
      JSON.stringify(addresses, null, 2)
    );
    fs.writeFileSync(
      "../src/local/addresses.json",
      JSON.stringify(addresses, null, 2)
    );

    // const driver = new TestkitDriver();

    // console.log("deploying Orbs PoS V2 contracts");
    // const addresses = await driver.new();
    //
    // console.log("preparing the scenario");
    // await driver.prepareScenario();
    //
    // fs.writeFileSync(
    //   "./_out/addresses.json",
    //   JSON.stringify(addresses, null, 2)
    // );
    // fs.writeFileSync(
    //   "../src/local/addresses.json",
    //   JSON.stringify(addresses, null, 2)
    // );
    // console.log({ addresses });
  } catch (e) {
    console.log("error");
    console.error(e);
  }
};

deployDriverScripts()
  .then(() => {
    console.log("script done");
  })
  .catch((e) => console.log("Script error"))
  .finally(() => {
    console.log("Finally");
    process.exit();
  });

export {};
