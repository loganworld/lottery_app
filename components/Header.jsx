import React, {useState, useEffect} from 'react';
import Head from 'next/head'
import styled from 'styled-components'
import {Navbar, Nav} from 'react-bootstrap';
import Image from 'next/image'
import logo from '../public/image/logo.png'
import { Button  } from 'react-bootstrap';
import { useWallet, UseWalletProvider } from 'use-wallet'
import {Grid} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';

import {useRouter} from 'next/router';
import {ethers} from 'ethers';

const Lockbutton = styled(Button)`
    background-color: transparent;
    border:2px solid rgb(253,153,45);
    color:rgb(253,153,45);
    font-size: 14px;
    border-radius: 20px;
    padding:10px;
    margin:5px;
    width:150px;
    float: right;
    transition: 0.5s;
    :hover {
        cursor: pointer;
        background-color:rgb(253,153,45) ;
        color:white;
      }
`

const LogoImage = styled(Image)`
    float: left;
    width:50px!important;  
    height:50px!important;
    min-width:20%!important;
    min-height:20%!important;
    margin-left:30px;    
`
const NabBar = styled.div`
    margin-top:10px;    
    margin-left: 8%;
    margin-right:8%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Header = (props) => {
    
    const router = useRouter();
    const wallet = useWallet();
    var styledAddress =wallet.account? wallet.account.slice(0,4)+".."+wallet.account.slice(-4):"";

    const handleConnect = ()=>{
        console.log(wallet.status)
        wallet.connect();
        localStorage.setItem('connect', wallet.status);
    }
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    function handleChanged(accounts) {
        if (accounts.length === 0) {
          // MetaMask is locked or the user has not connected any accounts
          console.log('Please connect to MetaMask.');
        } 
        window.location.reload();
      }

    useEffect(()=>{
        async function check(){
            
           const provider = new ethers.providers.Web3Provider(window.ethereum);
           const accounts = await provider.listAccounts();
           const chainId = await window.ethereum.request({ method: 'eth_chainId' });
           if(accounts.length!=0){
                wallet.connect();
           }

        }
        check();
    },[])

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <NabBar >
        <Grid container className = "Navbar">
            <Grid item xs = {6} sm = {6} md={3}>
                <span className = "logo" >
                    <LogoImage src={logo} id="logo_image" alt = "logo"  onClick={(e)=>{router.push("/")}}></LogoImage>
                    <span className = "logoname"  onClick={(e)=>{router.push("/")}}>Glotto </span>
                    
                    <Button 
                        aria-controls="simple-menu" 
                        aria-haspopup="true" 
                        className = "menu-button" 
                        onClick={handleClick}>
                        <MenuIcon />
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem 
                        onClick= {(e)=>{
                        router.push("/jackpot");
                        }}>
                        My tickets
                      </MenuItem>
                      
                      <MenuItem 
                        onClick= {(e)=>{
                        router.push("/buyticket");
                        }}>
                        History
                      </MenuItem>
                    </Menu>
                </span>
            </Grid>
            
            <Grid item xs = {6} sm = {6} md={6} className = "navitems">
                <Lockbutton 
                    onClick= {(e)=>{
                    router.push("/buyticket");
                    }}
                >
                    History
                </Lockbutton>
                <Lockbutton 
                    onClick= {(e)=>{
                    router.push("/jackpot");
                    }}
                >
                    My tickets
                </Lockbutton>
            </Grid>
            
            <Grid item xs = {6} sm = {6} md={3}>
            <Lockbutton onClick= {handleConnect}>{wallet.status === 'connected' ?(<span>{styledAddress}</span>):"CONNECT"}</Lockbutton>
            </Grid>
        </Grid>
        </NabBar>
    )
}

export default Header;