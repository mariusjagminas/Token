import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("NftToken tests", () => {
  async function tokenFixture() {
    const [owner, account1] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("NftToken");
    const token = await Token.deploy("NftToken", "Nft");

    return { token, owner, account1 };
  }

  it("should deploy contract with the correct name and symbol", async () => {
    const { token } = await loadFixture(tokenFixture);

    expect(await token.name()).to.equal("NftToken");
    expect(await token.symbol()).to.equal("Nft");
  });

  it("should add new token to the correct address", async () => {
    const { token, account1, owner } = await loadFixture(tokenFixture);

    await token.addItem(account1.address, "https://test.json");

    expect(await token.ownerOf(0)).to.equal(account1.address);
    expect(await token.tokenURI(0)).to.equal("https://test.json");
  });

  it.only("only the owner can add nft", async () => {
    const { token, account1 } = await loadFixture(tokenFixture);

    await expect(
      token.connect(account1).addItem(account1.address, "https://test.json")
    ).to.revertedWith("Ownable: caller is not the owner");
  });
});
