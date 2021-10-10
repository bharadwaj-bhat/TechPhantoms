import { Avatar } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import ReactCardFlip from "react-card-flip";
import { Scroll } from "framer";
import Card from "./Card";

export const DetailSection = ({ loggedData }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);
  return (
    <DetailCont>
      {/*  */}

      <ReactCardFlip isFlipped={isFlipped} flipDirection="verticle">
        <div
          className="avt-logo"
          onMouseEnter={() => setIsFlipped((prev) => !prev)}
        >
          <Avatar
            src={loggedData && loggedData.profilePic}
            className="logo_img"
          />
        </div>

        <div
          onMouseLeave={() => setIsFlipped((prev) => !prev)}
          className="avt-logo"
        >
          <Avatar
            src={loggedData && loggedData.profilePic}
            className="logo_img"
          />
        </div>
      </ReactCardFlip>

      {/*  */}
      {/* <div className="avt-logo">
            <Avatar src={loggedData && loggedData.profilePic} className="logo_img" />
            </div> */}
        <div>
            
        <Scroll width={375} height={"100%"}>
          {/* Card component with props yPos,title,subtitle */}
          <Card
            yPos={10}
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
  );
};

const DetailCont = styled.div`
  width: 90%;
  margin: 2% 5%;
  display: flex;

  & .avt-logo {
    border-radius: 50%;
    text-align: center;
    border: 2px solid transparent;
    background: linear-gradient(orange, violet);
    background-clip: padding-box;
    padding: 4px;
    height: 40vh;
    width: 90%;
    margin-top: 4%;
    margin-left: 10%;
    margin-right: 20%;
  }
  & .logo_img {
    width: 90%;
    height: 90%;
    margin: 5%;
    :hover {
      cursor: pointer;
    }
  }
`;
