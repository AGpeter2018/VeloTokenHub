// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {VeloToken} from "../src/VeloToken.sol";

contract CounterScript is Script {
    VeloToken public veloToken;

    function setUp() public {}

    function run() public {

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

       veloToken = new VeloToken(vm.addr(deployerPrivateKey));

        vm.stopBroadcast();
    }
}
