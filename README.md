Simple Wallet Poc to connect user to various wallets
To run project:
1. npm i
2. npm start

Required Packages:
"@ethersproject/providers": "^5.4.5",
"@web3-react/core": "^6.1.9",
"@web3-react/fortmatic-connector": "^6.1.6",
"@web3-react/injected-connector": "^6.0.7",
"@web3-react/portis-connector": "^6.1.9",
"@web3-react/torus-connector": "^6.1.9",
"@web3-react/walletconnect-connector": "^6.2.4",
"@web3-react/walletlink-connector": "^6.2.5",

Also create account on Fortmatic and Portis to generate Api_key and Dapp_id respectively
Check config in components/config/index.js

Additionally check chanId.js and rpc.js for chainId and rpc urls

Web3-react documentation: https://github.com/NoahZinsmeister/web3-react
