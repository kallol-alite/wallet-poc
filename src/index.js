import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {DAppProvider} from '@usedapp/core';

function getLibrary(provider, connector) {
  return new Web3Provider(provider) // this will vary according to whether you use e.g. ethers or web3.js
}

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer />
    {/* <Web3ReactProvider getLibrary={getLibrary}> */}
    <DAppProvider>
      <App  />
    </DAppProvider>
    {/* </Web3ReactProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);


