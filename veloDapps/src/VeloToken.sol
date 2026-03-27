// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "openzeppelin-contracts/contracts/access/Ownable.sol";
import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract VeloToken is ERC20, Ownable {

   mapping(address => uint256) public lastRequestTime;

   uint256 public constant MAX_SUPPLY = 10_000_000 * 10**18; 

   uint256 public constant USER_REQ_MAX_SUPPLY = 100_000 * 10**18; 

   uint256 public constant TIMELOCK_DURATION = 24 hours;

   event tokenTransfer(address indexed from, address indexed to, uint256 value);
   
   constructor(address owner) ERC20("VeloToken", "VELO") Ownable(owner) {
      _mint(owner, 5000000 * 10 ** decimals());
   }

   function mint(address to, uint256 amount) public onlyOwner {

      require(to != address(0), "address zero detected");

      require(totalSupply() + amount <= MAX_SUPPLY, "Total supply exceeded");

      _mint(to, amount);

   }

   function requestToken(address to, uint256 amount) external {

      require(block.timestamp >= lastRequestTime[to] + TIMELOCK_DURATION, "Timelock duration not met");

      require(to != address(0), "address zero detected");

      require(amount <= USER_REQ_MAX_SUPPLY, "User request exceeds max supply");

      require(balanceOf(address(this)) >= amount, "Faucet empty - Admin must refill");

      require(totalSupply() + amount <= MAX_SUPPLY, "Total supply exceeded");

      lastRequestTime[to] = block.timestamp;

      _transfer(address(this), to, amount);

      emit tokenTransfer(address(this), to, amount);

   }
    
}
