// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {VeloToken} from "../src/VeloToken.sol";

contract CounterScript is Script {
    VeloToken public veloToken;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

    //    uint256 initialSupply = 1000000 * 10 ** 18;

        veloToken = new VeloToken(address(msg.sender));

        vm.stopBroadcast();
    }
}
