// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IERC20Demo is IERC20 {
    error MaxTotalSupplyExceeded(
        uint256 exceededTotalSupply,
        uint256 maxTotalSupply
    );

    function mint(address to, uint256 amount) external;
}
