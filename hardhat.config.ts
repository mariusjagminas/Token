import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { readFileSync } from "fs";

const secrets = JSON.parse(readFileSync("secrets.json").toString());

const API_KEY = secrets["infura_api_key"];
const PRIVATE_KEY = secrets["accounts"]["goerli_network"];

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    goerli: {
      url: `https://goerli.infura.io/v3/${API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
  },
};

export default config;
