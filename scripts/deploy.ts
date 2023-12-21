import { ethers } from "hardhat";

async function main() {
  // get deployer information
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log(
    "Account balance:",
    (await deployer.provider.getBalance(deployer.address)).toString()
  );

  // deploy token contract
  const Token = await ethers.getContractFactory("ERC20Demo");
  const token = await Token.deploy(deployer.address);
  await token.waitForDeployment();
  console.log("Token deployed at:", token.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
