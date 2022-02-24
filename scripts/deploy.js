const hre = require('hardhat')
const Config = require('../blog.config.js')

async function deployContract (contractName, ...contractParams) {
    const Contract = await hre.ethers.getContractFactory(contractName)
    const contract = contractParams ? await Contract.deploy(...contractParams) : await Contract.deploy()

    await contract.deployed()

    return contract
}

async function main() {
    console.log('Running deployment script...')

    if (!Config.ContractAddr.Blog) {
        const blogContract = await deployContract('Blog', Config.Blog.Name, Config.Blog.Description)
    
        if (blogContract) {
            console.log('Blog deployed to:', blogContract.address)
        }
    } else {
        console.log('Blog contract already deployed at:', Config.ContractAddr.Blog)
    }

    if (!Config.ContractAddr.Article) {
        const articleContract = await deployContract('MyArticle')

        if (articleContract) {
            console.log('Article deployed to:', articleContract.address)
        }
    } else {
        console.log('Article contract already deployed at:', Config.ContractAddr.Article)
    }

    console.log('Deployment script finished!')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })