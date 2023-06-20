const hre = require("hardhat");

async function main() {
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
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
