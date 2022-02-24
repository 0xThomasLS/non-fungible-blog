require("@nomiclabs/hardhat-waffle")
require('dotenv').config()

const Config = require('./blog.config.js')

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  console.log(hre.config)

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    custom: {
      url: Config.Blockchain.RpcUrl,
      gasPrice: Config.Blockchain.GasPrice,
      chainId: Config.Blockchain.ChainId,
      accounts: [
        process.env.CHAIN_ACCOUNT_PRIVATE_KEY
      ]
    }
  }
}
