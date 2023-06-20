const { task } = require("hardhat/config");

task("deployl", "deploy instance of lottery").setAction(
  async (taskArgs, hre) => {
    const id = 1;
    const minimunEntrence = 1;
    const endingDate = 1749631492;

    const account = (await hre.ethers.getSigners())[0];
    const Lottery = await hre.ethers.getContractFactory("Lottery", account);
    const lottery = await Lottery.deploy(id, minimunEntrence, endingDate);
    await lottery.deployed();
    console.log(`Lottery deployed to ${lottery.address}`);
  }
);

task(
  "deploylct",
  "deploy instance of lottery creator and create a lottery"
).setAction(async (taskArgs, hre) => {
  const minimunEntrence = 10;
  const endingDate = 1749631492;

  const LotteryCreator = await hre.ethers.getContractFactory("LotteryCreator");
  const lotteryCreator = await LotteryCreator.deploy();

  await lotteryCreator.deployed();

  console.log(`LotteryCreator deployed to ${lotteryCreator.address}`);

  const tx = await lotteryCreator.createLottaryContract(
    minimunEntrence,
    endingDate
  );

  console.log("You successfuly created lottary contract");
});

task("deploylc", "deploy instance of lottery creator").setAction(
  async (taskArgs, hre) => {
    const LotteryCreator = await hre.ethers.getContractFactory(
      "LotteryCreator"
    );
    const lotteryCreator = await LotteryCreator.deploy();

    await lotteryCreator.deployed();

    console.log(`LotteryCreator deployed to ${lotteryCreator.address}`);
  }
);
