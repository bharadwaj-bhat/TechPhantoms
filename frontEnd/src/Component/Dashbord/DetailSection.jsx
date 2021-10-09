import { Avatar, Grid } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import { Frame, Scroll } from "framer";
import Card from "./Card";

export const DetailSection = ({loggedData}) => {
    return (
        <DetailCont>
            <div className="avt-logo">
            <Avatar src={loggedData && loggedData.profilePic} className="logo_img" />
            </div>
        <div>
            
        <Scroll width={375} height={"100%"}>
          {/* Card component with props yPos,title,subtitle */}
          <Card
            yPos={20}
            fullname={loggedData.fullname}
            email={loggedData.email}
            number={loggedData.number}
            username={loggedData.username}
            goals={loggedData.goals}
            attended={loggedData.attended_lec}
            description="One of the many great parts of React is how it makes you think about apps as you build them."
          />
        </Scroll>
        </div>
        </DetailCont>
    )
}

const DetailCont = styled.div`
width:90%;
margin:2% 5%;
display:flex;

& .avt-logo{
    border-radius: 50%;
    text-align: center;
    border: 2px solid transparent;
    background: linear-gradient(orange, violet);
    background-clip: padding-box;
    padding: 3px;
    height:25vh;
    width:25%;
    margin-top:10%;
    margin-left:10%;
}
    & .logo_img{
        width:90%;
        height: 90%;
        margin:5%;
        :hover{
            cursor: pointer;
        }
    }
`