import React, {useState, useEffect, useContext} from 'react';
import { RinkebyContract, getBalanceCall, balanceReceivedCall, sendMoneyFunction, withdrawMoneyFunction, withdrawAllMoneyFunction } from '../services/rinkebyTest';
// import { useWeb3React, getWeb3ReactContext  } from '@web3-react/core';
import { useContractCall, useContractFunction, useEthers } from '@usedapp/core';
import { utils } from 'ethers';

const Rinkeby = (props) => {
    const {account} = useEthers();
    const [accountBalance, setAccountBalance] = useState('');
    const [depositAmount, setDepositAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    
    const getBalanceValue = useContractCall(balanceReceivedCall(account ? account : ''));
    
    useEffect(() => {
        if(getBalanceValue){
            setAccountBalance(utils.formatEther(getBalanceValue[0]));
        }
    }, [getBalanceValue])

    return(
        <>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{border: '1px solid black', minWidth: 150, minHeight: 50, padding: 5, margin: 25,}}>
                    <h3>Account Balance: {accountBalance ? accountBalance : ''} Eth</h3>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap:'wrap'}}>
                <div style={{minWidth: 150, minHeight: 150, border: '1px solid black', borderRadius: 5, margin: 25, padding: 5}}>
                    <h3 style={{textAlign:'center'}}>Deposit</h3>
                    <input value={depositAmount} placeholder='Enter Amount in Eth'></input>
                    <div style={{textAlign:'center', marginTop: 5}}>
                        <button>Deposit</button>
                    </div>
                </div>
                <div style={{minWidth: 150, minHeight: 150, border: '1px solid black', borderRadius: 5, margin: 25, padding: 5}}>
                    <h3 style={{textAlign:'center'}}>Withdraw</h3>
                    <input value={withdrawAmount} placeholder='Enter Amount in Eth'></input>
                    <div style={{textAlign:'center', marginTop: 5}}>
                        <button>Withdraw</button>
                    </div>
                    <div style={{textAlign:'center', marginTop: 5}}>
                        <button>Withdraw All</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Rinkeby;