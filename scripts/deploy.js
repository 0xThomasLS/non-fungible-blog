(async () => {
  try {
      console.log('Running deployment script...')
      
      const contractName = 'MyArticle'
      const constructorArgs = []

      const artifactsPath = `browser/contracts/artifacts/${contractName}.json`

      const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
      const accounts = await web3.eth.getAccounts()
  
      let contract = new web3.eth.Contract(metadata.abi)
  
      contract = contract.deploy({
          data: metadata.data.bytecode.object,
          arguments: constructorArgs
      })
  
      const newContractInstance = await contract.send({
          from: accounts[0]
      })
      console.log('Contract deployed at address: ', newContractInstance.options.address)
  } catch (e) {
      console.log(e.message)
  }
})()