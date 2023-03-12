require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()

const { CELOSCAN_URL, CELOSCAN_API_KEY, ALFAJORES_URL, PRIVATE_KEY } =
  process.env

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.8.18',
      },
      {
        version: '0.8.17',
      },
      {
        version: '0.8.7',
      },
      {
        version: '0.8.9',
      },
    ],
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      url: 'http://127.0.0.1:8545',
      chainId: 31337,
    },
    alfajores: {
      url: ALFAJORES_URL,
      accounts: [PRIVATE_KEY],
      chainId: 44787,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  paths: {
    artifacts: './frontend/backend',
  },
  etherscan: {
    apiKey: {
      alfajores: CELOSCAN_API_KEY,
    },
    customChains: [
      {
        network: 'alfajores',
        chainId: 44787,
        urls: {
          apiURL: CELOSCAN_URL,
          browserURL: CELOSCAN_URL,
        },
      },
    ],
  },
}
