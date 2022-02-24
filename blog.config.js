require('dotenv').config()

module.exports = {
  Blog: {
    Name: process.env.BLOG_NAME || "NFB",
    Description: process.env.BLOG_DESCRIPTION || "Non Fungible Blog example"
  },

  Blockchain: {
    RpcUrl: process.env.VITE_CHAIN_RPC_URL || "https://api.avax-test.network/ext/bc/C/rpc",
    ChainId: parseInt(process.env.CHAIN_ID) || 43113,
    Gas: process.env.CHAIN_GAS || "auto",
    GasPrice: parseInt(process.env.CHAIN_GAS_PRICE) || 225000000000,
    GasMultiplier: parseInt(process.env.CHAIN_GAS_MULTIPLIER) || 1,
    Timeout: parseInt(process.env.CHAIN_TIMEOUT) || 1,
    AccountPrivateKey: process.env.CHAIN_ACCOUNT_PRIVATE_KEY
  },

  ContractAddr: {
    Blog: process.env.VITE_CONTRACT_BLOG_ADDR,
    Article: process.env.VITE_CONTRACT_ARTICLE_ADDR
  }
}
