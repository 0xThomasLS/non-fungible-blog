# Non Fungible Blog (NFB)

Implementation of a basic blog system on Web 3.0 based architecture. We build this project around Solidity smart-contract to be deploy on EVM chain.


## Installation
If you want to deploy and run your own **Non Fungible Blog**, start by installing all dependencies
```bash
npm install
```

To be continued...


## Tests
You will be able to run tests before deploy all smart-contract to check validity of each one.
```bash
npm run test:sc
```

## Deploy
NFB are based on hardhat library so you can easily use all hardhat command as you could seen into test part. We assume that you want to perform a deployment based on your custom ``.env`` file. So once this file has been created (take example of ``.env.example``) you can run deploy command :
To deploy all smart-contract you can use deployment script in ``scripts/deploy.js``
```bash
npm run deploy:sc
```


## To go further...
Actualy project are based on Hardhat and IPFS, we can nly encourage you to look at their documentations
 - [Hardhat](https://hardhat.org/getting-started/)
 - [IPFS](https://docs.ipfs.io/)

To get more information about hardhat command
```shell
npx hardhat help
```
