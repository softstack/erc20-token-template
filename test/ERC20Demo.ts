import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ERC20Demo", function () {
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, firstAccount, secondAccount] = await ethers.getSigners();

    const ERC20Demo = await ethers.getContractFactory("ERC20Demo");
    const erc20 = await ERC20Demo.deploy(owner.address);

    return { erc20, owner, firstAccount, secondAccount };
  }

  describe("Deployment", function () {
    it("Should set maximum supply", async function () {
      const { erc20 } = await loadFixture(deployFixture);
      expect(await erc20.MAX_TOTAL_SUPPLY()).to.equal(1_000_000n * 10n ** 18n);
    });

    it("Should set token name", async function () {
      const { erc20 } = await loadFixture(deployFixture);
      expect(await erc20.name()).to.equal("DemoToken");
    });

    it("Should set token symbol", async function () {
      const { erc20 } = await loadFixture(deployFixture);
      expect(await erc20.symbol()).to.equal("DMT");
    });

    it("Should set contract owner", async function () {
      const { erc20, owner } = await loadFixture(deployFixture);
      expect(await erc20.owner()).to.equal(owner.address);
    });
  });

  describe("Mint", function () {
    it("Should mint tokens", async function () {
      const { erc20, owner } = await loadFixture(deployFixture);
      const amount = 100n * 10n ** 18n;
      await erc20.connect(owner).mint(owner.address, amount);
      expect(await erc20.balanceOf(owner.address)).to.equal(amount);
      expect(await erc20.totalSupply()).to.equal(amount);
    });

    it("Should emit mint event", async function () {
      const { erc20, owner } = await loadFixture(deployFixture);
      const amount = 100n * 10n ** 18n;
      await expect(erc20.connect(owner).mint(owner.address, amount))
        .to.emit(erc20, "Transfer")
        .withArgs(ethers.ZeroAddress, owner.address, amount);
    });

    it("Should revert minting too many tokens", async function () {
      const { erc20, owner } = await loadFixture(deployFixture);
      await expect(
        erc20.connect(owner).mint(owner.address, 10_000_000n * 10n ** 18n)
      ).to.be.revertedWithCustomError(erc20, "MaxTotalSupplyExceeded");
    });

    it("Should revert minting tokens without permission", async function () {
      const { erc20, firstAccount } = await loadFixture(deployFixture);
      await expect(
        erc20.connect(firstAccount).mint(firstAccount.address, 100n)
      ).to.be.revertedWithCustomError(erc20, "OwnableUnauthorizedAccount");
    });
  });
});
