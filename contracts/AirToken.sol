// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract AirToken is ERC20, Ownable {
    mapping(address => bool) private isCandidate;

    address[] private candidates;

    constructor() ERC20('AirDropper', 'ADP') {
        _mint(msg.sender, 500 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function addWallet(address userAddress) public {
        require(
            !isCandidate[userAddress],
            'You are already a candidate for the airdrop'
        );

        isCandidate[userAddress] = true;
    }

    function airdrop(
        address[] calldata recipients,
        uint256 amount
    ) public onlyOwner {
        for (uint256 i = 0; i < recipients.length; i++) {
            if (isCandidate[recipients[i]]) {
                _transfer(msg.sender, recipients[i], amount);
            }
        }
    }

    function checkCandidate(address userWallet) public view returns (bool) {
        return isCandidate[userWallet];
    }

    function getAllCandidates() public view returns (address[] memory) {
        return candidates;
    }
}
