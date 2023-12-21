// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {Ownable2Step, Ownable} from "@openzeppelin/contracts/access/Ownable2Step.sol";

import {IERC20Demo} from "./IERC20Demo.sol";

contract ERC20Demo is ERC20, ERC20Burnable, Ownable2Step, IERC20Demo {
    uint256 public constant MAX_TOTAL_SUPPLY = 1_000_000 * (10 ** 18);

    constructor(
        address initialOwner
    ) ERC20("DemoToken", "DMT") Ownable(initialOwner) {}

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
