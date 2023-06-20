const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("LotteryCreator", function () {
  async function deployOneYearLockFixture() {
    const minimunEntrence = 10;
    const endingDate = 1749631492;

    const [owner, otherAccount] = await ethers.getSigners();

    const LotteryCreator = await ethers.getContractFactory("LotteryCreator");
    const lotteryCreator = await LotteryCreator.deploy();

    return { lotteryCreator, minimunEntrence, endingDate, owner, otherAccount };
  }

  describe("Create Lottary Contract", function () {
    it("Should revert if minimun entrence is 0", async function () {
      const { lotteryCreator, endingDate } = await loadFixture(
        deployOneYearLockFixture
      );

      await expect(
        lotteryCreator.createLottaryContract(0, endingDate)
      ).to.be.revertedWith("Increase minimun entrence");
    });

    it("Should revert if eding date is 0", async function () {
      const { lotteryCreator, minimunEntrence } = await loadFixture(
        deployOneYearLockFixture
      );

      await expect(
        lotteryCreator.createLottaryContract(minimunEntrence, 0)
      ).to.be.revertedWith("Increase ending date");
    });
  });
});
