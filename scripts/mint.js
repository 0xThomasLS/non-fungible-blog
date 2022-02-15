(async () => {
  try {
      console.log('Running minting script...')

      const contractName = 'MyArticle'
      const artifactsPath = `browser/contracts/artifacts/${contractName}.json`
      const contractAddress = "0xA3568B7C9D149872ea949965419D125765950597"

      const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
      const accounts = await web3.eth.getAccounts()
      const nftContract = new web3.eth.Contract(metadata.abi)

      async function mintNFT(account, ipfsDirectoryCID) {
        const nonce = await web3.eth.getTransactionCount(account, "latest")
        const tx = {
          from: account,
          to: contractAddress,
          nonce: nonce,
          data: nftContract.methods.mintToken(account, ipfsDirectoryCID + '/metadata.json').encodeABI(),
        }

        return await web3.eth.sendTransaction(tx)
      }

      const transaction = await mintNFT(
        accounts[0],
        'QmZ6FEqaULTckASYLBq7RStyzQiQHpZjVvoWPJzJemJpy3'
      )
      console.log('Transaction hash: ', transaction.transactionHash)

  } catch (e) {
      console.log(e.message)
  }
})()