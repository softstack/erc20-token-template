// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {Ownable2Step, Ownable} from "@openzeppelin/contracts/access/Ownable2Step.sol";

import {IERC20Demo} from "./IERC20Demo.sol";

/**
 * @dev Implementation of the {IERC20Demo} interface.
 *
 * This implementation is inheritted from the {ERC20} implementation with the addition of a `mint` function that
 * increases the `totalSupply` of the token and the {ERC20Burnable} extension that allows token holders to destroy
 * their tokens. The {ERC20} implementation includes all function defined in EIP20. 
 
 * The maximum total supply that can ever exist is restricted by `MAX_TOTAL_SUPPLY` and minting is restricted to
 * the `owner` managed by OpenZeppelins {Ownable2Step}.
 */
contract ERC20Demo is ERC20, ERC20Burnable, Ownable2Step, IERC20Demo {
    uint256 public constant MAX_TOTAL_SUPPLY = 1_000_000 * (10 ** 18);

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection
     * and setting the `initialOwner` as the `owner` address that is allowed to mint tokens.
     * @param initialOwner The address of the initial `owner` of the token contract.
     */
    constructor(
        address initialOwner
    ) ERC20("DemoToken", "DMT") Ownable(initialOwner) {}

    /**
     * @dev See {IERC20Demo-mint}.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - the caller must be the `owner`.
     * - the `totalSupply` plus `amount` must not be greater than the `MAX_TOTAL_SUPPLY`.
     */
    function mint(address to, uint256 amount) external onlyOwner {
        // Check if total supply will exceed the maximum total supply
        if (totalSupply() + amount > MAX_TOTAL_SUPPLY) {
            revert MaxTotalSupplyExceeded(
                totalSupply() + amount,
                MAX_TOTAL_SUPPLY
            );
        }
        _mint(to, amount);
    }
}
