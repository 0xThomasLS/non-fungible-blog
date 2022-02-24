import { defineStore } from 'pinia'
import { ethers } from 'ethers'
import Blog from '../../artifacts/contracts/Blog.sol/Blog.json'

const provider = new ethers.providers.JsonRpcProvider(import.meta.env.VITE_CHAIN_RPC_URL)
const blogContract = new ethers.Contract(import.meta.env.VITE_CONTRACT_BLOG_ADDR, Blog.abi, provider)
const userProvider = new ethers.providers.Web3Provider(window.ethereum)
const signer = userProvider.getSigner()
const blogConnected = blogContract.connect(signer)

export const useBlogStore = defineStore({
  id: 'blog',
  state: () => ({
    name: undefined,
    description: undefined,
    socialNetworks: []
  }),
  actions: {
    async load() {
      this.name = await blogContract.name()
      this.description = await blogContract.description()
      this.socialNetworks = await blogContract.socialNetworks()
    },

    async setName(name) {
      const transaction = await blogConnected.setName(name)
      console.log('Transaction:', transaction)
      const tx = await transaction.wait()
      console.log('TX:', tx)
      
      this.name = await blogContract.name()
    },

    async setDescription(description) {
      const transaction = await blogConnected.setDescription(description)
      console.log('Transaction:', transaction)
      const tx = await transaction.wait()
      console.log('TX:', tx)
      
      this.description = await blogContract.description()
    },

    async addSocialNetwork(link) {
      const transaction = await blogConnected.addSocialNetwork(link)
      console.log('Transaction:', transaction)
      const tx = await transaction.wait()
      console.log('TX:', tx)
      
      this.socialNetworks = await blogContract.socialNetworks()
    },

    async removeSocialNetworkById(id) {
      const transaction = await blogConnected.removeSocialNetworkById(id)
      console.log('Transaction:', transaction)
      const tx = await transaction.wait()
      console.log('TX:', tx)
      
      this.socialNetworks = await blogContract.socialNetworks()
    }
  }
})
