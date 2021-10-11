import { BscConnector } from "@binance-chain/bsc-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { PortisConnector } from "@web3-react/portis-connector";
import { TorusConnector } from "@web3-react/torus-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { Web3Provider } from '@ethersproject/providers';
import { ChainId } from "../utils/chainId";
import { FortmaticConnector } from "@web3-react/fortmatic-connector";

const RPC = {
  [ChainId.MAINNET]: 'https://eth-mainnet.alchemyapi.io/v2/q1gSNoSMEzJms47Qn93f9-9Xg5clkmEC',
  [ChainId.RINKEBY]: 'https://eth-rinkeby.alchemyapi.io/v2/XVLwDlhGP6ApBXFz_lfv0aZ6VmurWhYD',
  [ChainId.MATIC]: 'https://rpc-mainnet.maticvigil.com',
  [ChainId.MATIC_TESTNET]: 'https://rpc-mumbai.matic.today/',
  [ChainId.BSC]: 'https://bsc-dataseed1.ninicoin.io',
  [ChainId.BSC_TESTNET]: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
}

const supportedChainIds = [
  1, // mainnet
  4, // rinkeby
  137, // matic
  80001, // matic testnet
  56, // binance smart chain
  97, // binance smart chain testnet
]

export const injected = new InjectedConnector({
  supportedChainIds,
});

export const walletconnect = new WalletConnectConnector({
  rpc: RPC,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  supportedChainIds,
})

export const fortmatic = new FortmaticConnector({
  apiKey: 'pk_test_29CBE660406CF19A',
  chainId: 4,
})

export const portis = new PortisConnector({
  dAppId: '4b9ee1cc-3e75-4a29-8593-4b7e36659bf3',
  networks: [4],
})

export const walletlink = new WalletLinkConnector({
  url: RPC[ChainId.MAINNET],
  appName: 'Test-wallet',
  appLogoUrl: 'https://raw.githubusercontent.com/sushiswap/art/master/sushi/logo-256x256.png',
})

export const torus = new TorusConnector({
  chainId: 4,
})

// binance only
export const binance = new BscConnector({ supportedChainIds: [97] })