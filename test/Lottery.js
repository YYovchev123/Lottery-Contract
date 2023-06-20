const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Lottery", function () {
  async function deployOneYearLockFixture() {
    const id = 1;
    const minimunEntrence = 10;
    const endingDate = 1749631492;

    const [owner, otherAccount] = await ethers.getSigners();

    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy(id, minimunEntrence, endingDate);

    return { lottery, minimunEntrence, endingDate, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right minimum entrence", async function () {
      const { lottery, minimunEntrence } = await loadFixture(
        deployOneYearLockFixture
      );

      expect(await lottery.minimunEntrence()).to.equal(minimunEntrence);
    });

    it("Should set the right endingDate", async function () {
      const { lottery, endingDate } = await loadFixture(
        deployOneYearLockFixture
      );

      expect(await lottery.endingDate()).to.equal(endingDate);
    });
  });

  describe("Enter", function () {
    it("Should revert if not enough ether is sent", async function () {
      const { lottery } = await loadFixture(deployOneYearLockFixture);

      await expect(lottery.enter({ value: 0 })).to.be.revertedWith(
        "Not enough to enter"
      );
    });
  });

  describe("PickWinner", function () {
    it("Should transfer the funds to the winner", async function () {
      const { lottery, otherAccount } = await loadFixture(
        deployOneYearLockFixture
      );
      await lottery.connect(otherAccount).enter({ value: 100 });

      await expect(lottery.pickWinner()).to.changeEtherBalances(
        [lottery, otherAccount],
        [-100, 100]
      );
    });
  });
});
