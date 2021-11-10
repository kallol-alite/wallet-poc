import { useEtherBalance, useEthers, useContractCall, useContractCalls, useContractFunction } from '@usedapp/core';
import { ethers, utils } from "ethers";
import { useState, useEffect } from 'react';
import abi from './contract/abi.json';
import abi1 from './contract/abi1.json';

export default function Investment() {

    const [fields, setFields] = useState({ address: "", token: "", time1: 10, time2: 10 })
    const [bal, setBal] = useState([])

    const { chainId, activateBrowserWallet, account } = useEthers()
    const etherBalance = useEtherBalance(account)

    const contractAbi = new utils.Interface(abi)
    const contractAddress = "0x5902854AA1d2BC50bbe8f0A1b263375f32E407Df"

    const contract = new ethers.Contract(contractAddress, contractAbi)

    const contractAbi1 = new utils.Interface(abi1)
    const contractAddress1 = "0x78dFcd51Ae6Cb496a7eE547236567802E7B808FE"

    const contract1 = new ethers.Contract(contractAddress1, contractAbi1)


    const { state: depositX, send: depositY } = useContractFunction(contract, "deposit")
    const { state: withdrawX, send: withdrawY } = useContractFunction(contract, "withdraw")

    const { state: approveX, send: approveY } = useContractFunction(contract1, "approve")

    const handleChange = e => {
        setFields({ ...fields, [e.target.name]: e.target.value })
    }

    const submit = async (e) => {
        e.preventDefault();
        await depositY(fields.address, fields.token, fields.time1, fields.time2);
        setFields({ address: "", amount: "", time1: 10, time2: 10 });
    }

    const submit1 = async (e) => {
        e.preventDefault();
        await withdrawY(fields.address);
        setFields({ address: "", amount: "", time1: 10, time2: 10 });
    }

    const submit2 = async (e) => {
        e.preventDefault();
        await approveY(fields.address, fields.token);
        setFields({ address: "", amount: "", time1: 10, time2: 10 });
    }

    const balance = useContractCall({
        abi: contractAbi,
        address: contractAddress,
        method: "balance",
        args: [account]
    })

    useEffect(() => {
        if (balance) {
            setBal(balance)
        }
    }, [balance, bal]);


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ border: '1px solid black', width: "auto", minHeight: 50, padding: 5, margin: 25, }}>
                    <h3>Account: {account ? account : ''}</h3>
                </div>
                <div style={{ border: '1px solid black', width: "auto", minHeight: 50, padding: 5, margin: 25, }}>
                    <h3>Balance: {etherBalance ? utils.formatEther(etherBalance) : 0} Eth</h3>
                </div>
                <div style={{ border: '1px solid black', width: "auto", minHeight: 50, padding: 5, margin: 25, }}>
                    <h3>Chain Id: {chainId ? chainId : ''}</h3>
                </div>
                <div style={{ border: '1px solid black', width: "auto", minHeight: 50, padding: 5, margin: 25, }}>
                    <h3>Token Balance: {bal ? bal.toString(16) : ''}</h3>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{minWidth: 'auto', minHeight: 150, border: '1px solid black', borderRadius: 5, margin: 25, padding: 5 }}>
                    <h3 style={{ textAlign: 'center' }}>Deposit</h3>
                    <form onSubmit={(e) => submit(e)}>
                        <div style={{ "marginBottom": "10px" }}>
                            <label style={{"marginRight": "10px", float: 'left' }} htmlFor="address">Address:</label>
                            <input  name="address" id="address" type="text" onChange={(e) => handleChange(e)} />
                        </div>
                        <div style={{ "marginTop": "10px" }}>
                            <label style={{"marginRight": "10px", float: 'left' }} htmlFor="token">Token:</label>
                            <input style={{ float: 'right' }} name="token" id="token" type="text" onChange={(e) => handleChange(e)} />
                        </div>
                        <div style={{textAlign: 'center', "marginTop": "40px"}}>
                            <button type="submit">Deposit</button>
                        </div>
                    </form>
                </div>
                <div style={{ minWidth: 150, minHeight: 150, border: '1px solid black', borderRadius: 5, margin: 25, padding: 5 }}>
                    <h3 style={{ textAlign: 'center' }}>Withdraw</h3>
                    <form onSubmit={(e) => submit1(e)}>
                        <div style={{ marginBottom: 10 }}>
                            <label style={{ "marginRight": "10px" }} htmlFor="address">Address:</label>
                            <input name="address" id="address" type="text" onChange={(e) => handleChange(e)} />
                        </div>
                        <div style={{ textAlign: 'center', marginTop: 5 }}>
                            <button type="submit">Withdraw</button>
                        </div>
                    </form>

                </div>
                <div style={{ minWidth: 150, minHeight: 150, border: '1px solid black', borderRadius: 5, margin: 25, padding: 5 }}>
                    <h3 style={{ textAlign: 'center' }}>Approve</h3>
                    <form onSubmit={(e) => submit2(e)}>
                    <div style={{ "marginBottom": "10px" }}>
                            <label style={{"marginRight": "10px", float: 'left' }} htmlFor="address">Address:</label>
                            <input  name="address" id="address" type="text" onChange={(e) => handleChange(e)} />
                        </div>
                        <div style={{ "marginTop": "10px" }}>
                            <label style={{"marginRight": "10px", float: 'left' }} htmlFor="token">Token:</label>
                            <input style={{ float: 'right' }} name="token" id="token" type="text" onChange={(e) => handleChange(e)} />
                        </div>
                        <div style={{textAlign: 'center', "marginTop": "40px"}}>
                            <button type="submit">Approve</button>
                        </div>
                    </form>

                </div>
            </div>
            {/* <div>
                <h2>Deposit</h2>
                <form onSubmit={(e) => submit(e)}>
                    <label htmlFor="address">Address:</label>
                    <input name="address" id="address" type="text" onChange={(e) => handleChange(e)} />
                    <label htmlFor="token">Token:</label>
                    <input name="token" id="token" type="text" onChange={(e) => handleChange(e)} />
                    <button type="submit">Add</button>
                </form>
            </div> */}
            {/* <div>
                <h2>Withdraw</h2>
                <form onSubmit={(e) => submit1(e)}>
                    <label htmlFor="address">Address:</label>
                    <input name="address" id="address" type="text" onChange={(e) => handleChange(e)} />
                    <button type="submit">Add</button>
                </form>
            </div> */}
        </div>
    )
}