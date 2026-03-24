// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {VeloToken} from "../src/VeloToken.sol";

contract CounterTest is Test {
    VeloToken public veloToken;
    
    address public to = address(0x123);
    uint256 public amount = 1000 * 10 ** 18;

    function setUp() public {
        veloToken = new VeloToken(address(this));
    }

    function test_mint() public {
        veloToken.mint(to, amount);
        assertEq(veloToken.balanceOf(to), amount);
    }

    function test_RequestToken() public {
          // 1. Warp time to 1 day in the future so block.timestamp > 24 hours
        vm.warp(1 days + 1 seconds);

        veloToken.requestToken(to, amount);

      // Check if the balance of the recipient is updated
        assertEq(veloToken.balances(to), amount);
  
      // Check if the last request time is updated
        assertGt(veloToken.lastRequestTime(to), 0);
    }  
}
