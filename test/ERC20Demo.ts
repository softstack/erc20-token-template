import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ERC20Demo", function () {
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, firstAccount, secondAccount] = await ethers.getSigners();

    const ERC20Demo = await ethers.getContractFactory("ERC20Demo");
    const erc20 = await ERC20Demo.deploy();

    return { erc20, owner, firstAccount, secondAccount };
  }

  describe("Deployment", function () {
    it("Should ...", async function () {
      const { erc20 } = await loadFixture(deployFixture);
    });
  });
});
