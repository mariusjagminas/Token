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
});
