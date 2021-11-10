import { useEtherBalance, useEthers, useContractCall, useContractCalls, useContractFunction } from '@usedapp/core';
import { ethers, utils } from "ethers";
import { useState, useEffect } from 'react';
import abi from './contract/abi.json';

export default function Investment() {

    const [fields, setFields] = useState({ address: "", token: "", time1: 10, time2: 10 })
    const [bal, setBal] = useState([])

    const { chainId, activateBrowserWallet, account } = useEthers()
    const etherBalance = useEtherBalance(account)

    const contractAbi = new utils.Interface(abi)
    const contractAddress = "0x5902854AA1d2BC50bbe8f0A1b263375f32E407Df"

    const contract = new ethers.Contract(contractAddress, contractAbi)

    const { state: depositX, send: depositY } = useContractFunction(contract, "deposit")
    const { state: withdrawX, send: withdrawY } = useContractFunction(contract, "withdraw")
    const { state: interestX, send: interestY } = useContractFunction(contract, "withdrawInterest")

    const handleChange = e => {
        setFields({ ...fields, [e.target.name]: e.target.value })
    }

    const submit = async (e) => {
        e.preventDefault();
        await depositY(fields.address, fields.token, fields.time1, fields.time2);
        console.log('fields: ', fields);
        setFields({ address: "", amount: "", time1: 10, time2: 10 });
    }

    const submit1 = async (e) => {
        e.preventDefault();
        await withdrawY(fields.address);
        setFields({ address: "", amount: "", time1: 10, time2: 10 });
    }

    const balance = useContractCall({
        abi: contractAbi,
        address: contractAddress,
        method: "balance",
        args: ['0xd7CEA5aF4315764695951D5E5270F650EF333F7D']
    })

    useEffect(() => {
        if(balance){
          setBal(balance)
        }
      }, [balance, bal]);
    

    return (
        <div>
            <div>
                <button onClick={() => activateBrowserWallet()}>Connect</button>
            </div>
            {account && <p>Account: {account}</p>}
            {etherBalance && <p>Balance: {utils.formatEther(etherBalance)}</p>}
            {chainId && <p>ChainId: {chainId}</p>}
            <div>
                <h2>Deposit</h2>
                <form onSubmit={(e) => submit(e)}>
                    <label htmlFor="address">Address:</label>
                    <input name="address" id="address" type="text" onChange={(e) => handleChange(e)} />
                    <label htmlFor="token">Token:</label>
                    <input name="token" id="token" type="text" onChange={(e) => handleChange(e)} />
                    <button type="submit">Add</button>
                </form>
            </div>
            <div>
                <h2>Withdraw</h2>
                <form onSubmit={(e) => submit1(e)}>
                    <label htmlFor="address">Address:</label>
                    <input name="address" id="address" type="text" onChange={(e) => handleChange(e)} />
                    <button type="submit">Add</button>
                </form>
            </div>
            <div>
                <h2>Balance: {bal.toString(16)}</h2>
            </div>
        </div>
    )
}