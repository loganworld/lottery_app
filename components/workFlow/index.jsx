import React, {useState, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import Image from 'next/image'
import workFlowImage from "../../public/image/5.png"

const WorkFlowCard =()=>{
    return (
      <div className="workflow-card">
        <div className="title">How it works</div>
        <div style={{
          position: "relative",
          height:"400px",
        }}>
          <Image  src={"/image/5.png"} id="" alt="" fill="" layout="fill" quality={100}/>
        </div>
        
      </div>
    )
}

export {WorkFlowCard};