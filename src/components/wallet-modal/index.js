import React, { useEffect, useState } from 'react';
import { SUPPORTED_WALLETS } from '../config';
// import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import {useEthers} from '@usedapp/core';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'scroll',
    maxHeight: 500
};

export default function WalletModal(props) {

    const { activate, account, activateBrowserWallet } = useEthers();

    //function to handle connection to wallet using the wallet connectors
    //if wallet connection to metamask pass the connector directly to activate
    const connectWallet = async (connector, name) => {
        if(name === 'MetaMask') {
            activateBrowserWallet()
        } else{
            let connect = await connector();
                activate(connect, undefined, true).catch((err) => {
                    toast(err);
            });
        }
    }

    return(
        <>
            <Modal 
            open={props.open} 
            onClose={props.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}>
                <Fade in={props.open}>
                    <Box sx={style}>
                        <Typography component="div" variant="h5">
                            Select a Wallet
                        </Typography>
                        {Object.keys(SUPPORTED_WALLETS).map((key) => {
                            return(
                                <>
                                    <Card sx={{ display: 'flex', marginY: 2, cursor: 'pointer' }} onClick={() => connectWallet(SUPPORTED_WALLETS[key].connector, SUPPORTED_WALLETS[key].name)}>
                                        <CardContent sx={{ flex: '1 0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {SUPPORTED_WALLETS[key].name}
                                        </CardContent>
                                        <CardMedia 
                                            component="img"
                                            sx={{ width: 50, padding: 2 }}
                                            image={SUPPORTED_WALLETS[key].iconName}
                                        />
                                    </Card>
                                </>
                            )
                        })}
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}