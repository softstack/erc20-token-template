# ERC20 Token Template

ERC-20 tokens are a type of cryptocurrency token standard on the Ethereum blockchain. "ERC" stands for Ethereum Request for Comments, and "20" is the proposal identifier. The standard outlines the rules and functions that an Ethereum token contract must implement to be considered ERC-20 compliant and is [here](https://eips.ethereum.org/EIPS/eip-20) defined in detail. ERC-20 tokens have become the predominant standard for creating and managing tokens on the Ethereum blockchain, providing a common set of rules that allow different tokens to be easily interchanged and integrated with various platforms, wallets, and decentralized applications (DApps).

This template allows the creation of such an ERC20 token contract with a fixed set of functions and customizable parameters. It provides scripts to test the functionality and deploy a ERC20 token contract to Mumbai (Polygon Testnet).

## Features

The following fuctionalities are implemented in the token contract:

- Decimals: 18 - Defines the smallest unit of the token, allowing for micro-transactions.
- Balance Tracking: Maintain a ledger mapping addresses to their respective token balances.
- Transfer Function: Enable DMT holders to send tokens to any Ethereum address.
- Approval Mechanism: Allow token holders to authorize others to transfer a specific amount of DMT on their behalf.
- Mint Function: Controlled by the owner (address) to create new tokens up to the total supply limit.
- Burn Function: Allow token holders or the contract to "destroy" a certain amount of tokens, reducing the total supply.
- Ownership: Assigned to the deployer's address, with the ability to transfer ownership to a new address if necessary. The transfer is implemented with a two step mechanism to prevent loosing access accidentally.
- Events: Emit standard ERC20 events for transfers, approvals, minting, and burning to ensure transparency and compatibility with wallets and exchanges.
- No ETH locking: Contract doesn’t accept ETH Token, so they doesn’t stuck on the contract by accidentally sending them to the contract.

## Customizable parameters

To create your own custom token contract, you should change the following parameters to enable the functionality and appearance that you want:

- Token Name: The full name representation of the token. (default: DemoToken)
- Token Symbol: A 3-5 character abbreviation that ideally represent the token name somehow (default: DMT)
- Maximum Total Supply: The maximum number of tokens that can be created. (default: 1 mio)

## Benefits

The ERC20 standard implementation is modular and can not used standalone. With this template anyone is able to create, customize and deploy its own basic ERC20 token with a maximum supply cap, restricted minting function and burning functions for the token holders. These are the most common functions required for many use cases.

## Use cases

ERC20 token can be used in many different ways. Some possible use cases for this implementation are:

- Tokenized real world assets
- Reward/Loyalty programs
- Utility token
- Stablecoin
- Governance token

## Deployment

To deploy your own instance of the token contract complete the following three steps:

1. Enter your custom deployment parameters in the [deploymentArgs file](./scripts/deploymentArgs.ts).
   Enter the token name, token symbol, max total supply and contract owner address in the exact same order.
2. Set up a .env file at the root of the directory with the parameters defined in [.env.example](.env.example):
   ```
    INFURA_KEY=<YOUR_INFURA_KEY>
    PRIVATE_KEY=<YOUR_FUNDED_PRIVATE_KEY>
   ```
3. Deploy the contract to Mumbai by running:
   ```shell
   npm run deploy mumbai
   ```
