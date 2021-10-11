import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import {useWeb3React} from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import WalletModal from '../wallet-modal';


const Header = (props) => {
    
    const {deactivate, account} = useWeb3React();
    // const {activate} = useWeb3React();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <>
            <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    DApp
                </Typography>
                {account && <div style={{border: '1px solid white', borderRadius: 10, padding: 5}}>
                  Address: {account}
                </div>}
                {account ? <Button color="inherit" onClick={deactivate}>Disconnect Wallet</Button> :<Button color="inherit" onClick={handleOpen}>Connect Wallet</Button>}
                </Toolbar>
            </AppBar>
            </Box>

            <WalletModal open={open} handleClose={handleClose} handleOpen={handleOpen} />
        </>
    )
}

export default Header;