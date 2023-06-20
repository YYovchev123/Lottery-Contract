const hre = require("hardhat");

async function main() {
  const id = 1;
  const minimunEntrence = 10;
  const endingDate = 1749631492;

  const Lottery = await hre.ethers.getContractFactory("Lottery");
  const lottery = await Lottery.deploy(id, minimunEntrence, endingDate);

  await lottery.deployed();

  console.log(`Lottery deployed to ${lottery.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
