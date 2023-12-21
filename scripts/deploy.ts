import { ethers } from "hardhat";
import deploymentArgs from "./deploymentArgs";

// set up readline interface for user input
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// deploy token contract
const deployToken = async () => {
  const token = await ethers.deployContract("ERC20Demo", deploymentArgs);
  await token.waitForDeployment();
  console.log(
    `Token ${deploymentArgs[0]}(${deploymentArgs[1]}) deployed at: ${token.target}`
  );
};

async function main() {
  // get deployer information
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log(
    "Account balance:",
    (await deployer.provider.getBalance(deployer.address)).toString()
  );

  // display loaded deployment arguments
  console.log("-------------------------------------");
  console.log(
    "The Token Contract will be deployed with the following arguments:"
  );
  console.log(`Token Name: ${deploymentArgs[0]}`);
  console.log(`Token Symbol: ${deploymentArgs[1]}`);
  console.log(`Contract owner address: ${deploymentArgs[3]}`);
  console.log(`Max token supply without decimals: ${deploymentArgs[2]}`);
  console.log(
    `Max token supply with 18 decimals: ${
      BigInt(deploymentArgs[2]) * 10n ** 18n
    }`
  );
  console.log("-------------------------------------");

  // ask for confirmation
  readline.question(
    "Do you want to proceed? (y/n)",
    async (proceed: string) => {
      if (proceed.toLowerCase() !== "y") {
        console.log("Aborting deployment...");
        readline.close();
        process.exit(0);
      } else {
        console.log("Deploying token. Please wait...");
        await deployToken();
        readline.close();
      }
    }
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
