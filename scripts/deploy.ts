import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const ContractFactory = await ethers.getContractFactory("Token");
  const contract = await ContractFactory.deploy("MM", "MM");

  await contract.deployed();

  console.log(`Deployed address: ${contract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
