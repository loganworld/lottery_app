import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {Radio, Grid, Slider} from '@material-ui/core';
import {TicketButton} from '../components/buttons'
import {useState} from "react"
import {Card} from "../components/card"
import {RoundPotCard} from "../components/roundPotCard"
import {WorkFlowCard} from "../components/workFlow"
import {UnLockWalletCard} from "../components/unlockWallet"
import {LatestWinNumbercard} from "../components/latestWinNumber"
import {useRouter} from 'next/router';
import {LotteryContract,TicketContract,CoinContract,CoinDecimals} from "../contract"
import {useEffect } from "react"

import {ethers} from "ethers";

export default function Home() {
  const router = useRouter();

 function toHHMMSS(sec) {
    let sec_num = parseInt(sec, 10); // don't forget the second parm
    let hours  = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    let Ohours = hours + '';
    let Ominutes = minutes + '';
    let Oseconds = seconds + '';
    if (hours < 10) {
        Ohours = "0" + hours;
    }
    if (minutes < 10) {
        Ominutes = "0" + minutes;
    }
    if (seconds < 10) {
        Oseconds = "0" + seconds;
    }
    var time = Ohours + 'hr ' + Ominutes + 'min';
    return time;
}

  const duration = 302400;
  const [parseTime,setParseTime] = useState("1000000");
  const [roundTime,setRoundTime] = useState(60);
  const [ticketTime,setTicketTime] = useState(10000);
  const [drawTime,setDrawTime] = useState(100000);
  const [timeValue ,setTimeValue] = useState();
  const [issueId, setIssueId] = useState("0");
  const [sliderValue, setSliderValue] = useState(60);
  
  const [winNumbers,setWinNumbers] = useState([12,1,3,2])

  var styledTicketTime = toHHMMSS(ticketTime)
  var styledDrawTime = toHHMMSS(drawTime);
 
  //date update
  useEffect(()=>{
    async function getDates(){
      
      console.log("parseTime",parseTime);
      var _parseTime = await LotteryContract.nextPharse();
      var _roundTime = await LotteryContract.nextDraw();
      setParseTime(ethers.utils.formatUnits(_parseTime,0));
      setRoundTime(ethers.utils.formatUnits(_roundTime,0));
      console.log("parseTime1",ethers.utils.formatUnits(_parseTime,0));
    }
    getDates();
  },[])

  useEffect(()=>{
    if(timeValue!=null){
      clearInterval(timeValue)
    }
    var _timeValue =setInterval(dateUpdate, 3000);
    setTimeValue(_timeValue);
  },[parseTime,roundTime])

  const dateUpdate = ()=> {
    let now = Date.now()/1000;
    console.log(parseTime-now)
    if(parseTime<now){
      setTicketTime(0);
      setDrawTime(0);
      setSliderValue(100);
    }
    else {
      setTicketTime(parseTime-now);
      setDrawTime(roundTime-now);
      setSliderValue((duration -(roundTime-now))*100/duration);
    }

  }

  //winnumbers 
  useEffect(()=>{
    
    async function getData(){
      var _issueId = await LotteryContract.issueIndex();
      setIssueId(_issueId);
      console.log(_issueId);
      if(_issueId=="0"){
        setWinNumbers ( [0,0,0,0] );
      }
      else {
        //get winNumbers
        var _winnumbers = await LotteryContract.getHistoryNumbers((_issueId-1).toString());
          
        setWinNumbers(_winnumbers);
      }
    }
    getData();
  },[])


  return (
    <div>
      <Header />
      <Card>
          {/* section1 */}
          <Grid container spacing = {1}>
            <Grid item xs = {12} sm = {12} md = {6} className = "section1">
              <div className="small_head">New Crypto Game</div>
              <div className = "lottery_Name1">Glotto</div>
              <div className = "lottery_Name2">LOTTERY</div>
              <TicketButton>BUY TICKET</TicketButton>
            </Grid>
            <Grid item xs = {12} sm = {12} md = {6}
            style={{
              position: "relative",
              height:"400px",
            }}>
              <Image className="view_img" src={"/image/gaming.png"} id="" alt="" fill=""  layout="fill" />
            </Grid>
          </Grid>
      </Card>
          {/* section2 */}
      <Card>
          <Grid container  className = "section2" alignItems="center" justify="center">
            <Grid item xs = {12} sm = {12} md = {6} className="first">
              <Grid container 
                alignItems="center"
                justify="center">
                  <Grid item xs = {12} sm = {12} md = {3} 
                  style={{
                    position: "relative"
                  }} >
                    <Image className="view-1img" src={"/image/1.png"}  id="" alt="" fill="" layout="fill"/>
                  </Grid>
                  <Grid item xs = {12} sm = {12} md = {9} className = "texts">
                    <div style={{color:"rgb(206,13,84)", }}>Buy tickets with Glotto</div>
                    <div style={{color:"white", fontsynthesis: "15px"}}>Win if 2, 3, or 4 of your ticket numbers match!</div>
                  </Grid>
              </Grid>
            </Grid>
            <Grid item xs = {12} sm = {12} md = {1}>
            </Grid>
            <Grid item xs = {12} sm = {12} md = {5}>
              <div>
                <span className = "ticketTime">{styledTicketTime} </span>
                <span className = "x-font3-white"> Until ticket sale </span>
                </div>
              <Slider
                defaultValue={100}
                value = {sliderValue}
                valueLabelDisplay="off"
                disabled={true}
              />
              <div>
                <span className = "x-font3-white">
                  {styledDrawTime} Until Lottery draw
                </span>
              </div>
            </Grid>
          </Grid>
      </Card>
      {/*section3 */}
      <Card>
        <RoundPotCard />
      </Card>
      {/* section4 */}
      <Card>
        <WorkFlowCard />
      </Card>
      {/* section5 */}
      <Card>
        <UnLockWalletCard />
      </Card>
      
      {/* section6 */}
      <Card>
        <div className = "x-font2-red title" >Latest Winning Numbers</div>
        <LatestWinNumbercard numbers = {winNumbers}/>
      </Card>
      <div className = "space">
      </div>
      <Footer />
    </div>
  )
}
