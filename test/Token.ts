import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Token tests", () => {
  async function tokenFixture() {
    const [owner, account1] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy("MM", "MM");

    return { token, owner, account1 };
  }

  it("mint tokens tests", async () => {
    const { token, owner, account1 } = await loadFixture(tokenFixture);

    const tokens = "10000";
    await token.mint(owner.address, tokens);
    await token.mint(account1.address, tokens);

    const totalSupply = await token.totalSupply();
    expect(totalSupply).to.equal(Number(tokens) * 2);

    const ownerBalance = await token.balanceOf(owner.address);
    expect(ownerBalance).to.equal(tokens);
  });

  it("the token can receive ETH", async () => {
    const { token, account1 } = await loadFixture(tokenFixture);

    expect(await token.receivedETH()).to.equal(0);

    const amount = 100000;

    await expect(
      await account1.sendTransaction({
        to: token.address,
        value: amount,
      })
    ).to.changeEtherBalances([account1, token], [-amount, amount]);

    expect(await token.receivedETH()).to.equal(amount);
  });

  it("should be able to transfer the ETH to the specific address", async () => {
    const { token, owner, account1 } = await loadFixture(tokenFixture);
    const oneETH = ethers.utils.parseEther("1.0");

    await account1.sendTransaction({
      to: token.address,
      value: oneETH,
    });

    await expect(
      token.transferETHtoAddress(owner.address, 100)
    ).to.changeEtherBalances([token, owner], [-100, 100]);
  });

  it("should revert if amount is higher than available ETH", async () => {
    const { token, owner, account1 } = await loadFixture(tokenFixture);

    await account1.sendTransaction({
      to: token.address,
      value: 100,
    });

    await expect(
      token.transferETHtoAddress(owner.address, 101)
    ).to.revertedWith("The amount available is higher than ETH");
  });

  it("only the owner can transfer tokens", async () => {
    const { token, owner, account1 } = await loadFixture(tokenFixture);

    await account1.sendTransaction({
      to: token.address,
      value: 100,
    });

    await expect(
      token.connect(account1).transferETHtoAddress(owner.address, 10)
    ).to.revertedWith("Ownable: caller is not the owner");
  });
});
