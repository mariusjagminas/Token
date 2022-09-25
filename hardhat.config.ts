import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY =
  process.env.PRIVATE_KEY ||
  "1111111111111111111111111111111111111111111111111111111111111111";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
  },
};

export default config;
