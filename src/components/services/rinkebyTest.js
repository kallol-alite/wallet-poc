import {Contract} from '@ethersproject/contracts';
import ABI from '../../abi/abi.json';
import { utils } from 'ethers';

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS_ETH;
const abiInterface = new utils.Interface(ABI);
export const RinkebyContract = new Contract(contractAddress, abiInterface);

export const getBalanceCall = {
    abi: abiInterface,
    address: contractAddress,
    method: 'getBalance'
}

export const balanceReceivedCall = (account) => ({
    abi: abiInterface,
    address: contractAddress,
    method: 'balanceReceived',
    args: [account]
})

export const sendMoneyFunction = 'sendMoney';
export const withdrawMoneyFunction = 'withdrawMoney';
export const withdrawAllMoneyFunction = 'withdrawAllMoney';