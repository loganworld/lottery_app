import React, {useState, useEffect} from 'react';
import Head from 'next/head'
import styled from 'styled-components'
import {Navbar, Nav} from 'react-bootstrap';
import Image from 'next/image'
import { Button  } from 'react-bootstrap';
import { useWallet, UseWalletProvider } from 'use-wallet'
import {Grid} from '@material-ui/core';
import {LotteryContract,TicketContract,CoinContract,CoinDecimals} from "../../contract"
import {ethers} from "ethers";

const RoundPotCard =()=>{
  const wallet = useWallet();
  const [totalpot,setTotalPot] = useState(1040);
  useEffect(()=>{
    async function getAmount(){
      var _amount=await LotteryContract.totalAmount();
      setTotalPot(ethers.utils.formatUnits(_amount,CoinDecimals));
  }
  getAmount();
  },[])
    return (
      <div className="RoundPotCard">
        <div className = "title">
          <Grid container 
          alignItems="center"
          justify="center">
            <Grid item xs = {4} sm = {4} md = {4} >
            <div  style={{
              position:"relative",
              height: "60px"}}>
              <Image src="/image/logo.png" id="" alt="" fill="" width="80px" height="80px" layout="fixed"/>
            </div>
            </Grid>
            <Grid item xs = {8} sm = {8} md = {8} className = "texts">
              <div className = "x-font3-white">Total Pot:</div>
              <div className = "x-font2-yellow">{Number(totalpot).toFixed(2)} ATRI</div>
            </Grid>
          </Grid>
        </div>

        <div className = "body">
          <Grid container 
          alignItems="center"
          justify="center">
          <Grid item xs = {4} sm = {4} md = {4} >
            <div className = "x-font4-bold-yellow item">NO OF MATCHED</div>
            <div className = "x-font4-bold-white item">04</div>
            <div className = "x-font4-bold-white item">03</div>
            <div className = "x-font4-bold-white item">02</div>
            <div className = "x-font4-bold-white item">To burn</div>
          </Grid>
          <Grid item xs = {4} sm = {4} md = {4} >
          <div  style={{
            position:"relative"}}>
            <Image src="/image/images.png" id="" alt="" fill="" width="80px" height="80px" layout="responsive"/>
          </div>
          </Grid>
          <Grid item xs = {4} sm = {4} md = {4} className = "text-left">
            <div className = "x-font4-bold-yellow item">PRIZE</div>
            <div className = "x-font4-bold-white item">{(totalpot*0.6).toFixed(2)}</div>
            <div className = "x-font4-bold-white item">{(totalpot*0.2).toFixed(2)}</div>
            <div className = "x-font4-bold-white item">{(totalpot*0.1).toFixed(2)}</div>
            <div className = "x-font4-bold-white item">{(totalpot*0.1).toFixed(2)}</div>
          </Grid>
          </Grid>
        </div>
      </div>
    )
}

export {RoundPotCard};