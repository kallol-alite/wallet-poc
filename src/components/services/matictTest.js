import {Contract} from '@ethersproject/contracts';
import ABI from '../../abi/abi.json';
import { utils } from 'ethers';

const contract = process.env.REACT_APP_CONTRACT_ADDRESS_MATIC;

const abiInterface = new utils.Interface(ABI);
export const MaticContract = new Contract(contract, abiInterface);