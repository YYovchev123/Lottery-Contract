// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Lottery.sol";

contract LotteryCreator {
    
    mapping(uint256 => Lottery) lotteries;
    uint256 private id;

    function createLottaryContract(uint256 minimunEntrence, uint256 endingDate) public {
        id++;
        Lottery lottery = new Lottery(id, minimunEntrence, endingDate);
        lotteries[id] = lottery;
    }
}