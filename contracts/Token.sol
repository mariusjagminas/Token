// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable {
    constructor(string memory tokenName, string memory tokenSymbol)
        ERC20(tokenName, tokenSymbol)
    {}

    function decimals() public view virtual override returns (uint8) {
        return 2;
    }

    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) public onlyOwner {
        _burn(account, amount);
    }

    receive() external payable {}

    function receivedETH() public view returns (uint256) {
        return address(this).balance;
    }

    function transferETHtoAddress(address payable receiver, uint256 amount)
        public
        onlyOwner
    {
        require(
            receivedETH() >= amount,
            "The amount available is higher than ETH"
        );

        receiver.transfer(amount);
    }
}
