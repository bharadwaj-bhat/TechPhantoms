import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { Frame, Scroll, useAnimation } from "framer";
import { Button } from "@material-ui/core";
import styles from "./Card.module.css";

const Card = ({
  yPos,
  fullname,
  username,
  email,
  number,
  description,
  goals,
  attended,
}) => {
  const [state, setState] = useState(false);
  const handleTap = () => {
    state ? controls.start({ y: 0 }) : setState(!state);
  };

  const controls = useAnimation();
  const variants = {
    active: {
      width: 320,
      height: 800,
      borderRadius: 0,
      overflow: "visible",
      left: 28,
      right: 10,
      y: 0,
      transition: { duration: 0.125, type: "spring", damping: 10, mass: 0.6 },
    },
    inactive: {
      width: 280,
      height: 280,
      borderRadius: 24,
      overflow: "hidden",
      left: 45,
      y: yPos,
      transition: { duration: 0.125, type: "spring", damping: 10, mass: 0.6 },
    },
  };

  return (
	<Frame
	y={yPos}
	variants={variants}
	animate={state ? "active" : "inactive"}
	width={300}
	height={300}
	borderRadius={24}
	style={state ? { zIndex: 10 } : { zIndex: 1 }}
	left={37.5}
	onTap={handleTap}
	shadow={
		state
		? "0 0 0 0 rgba(0, 0, 0, 0)"
		: "0px 0px 20px 0px rgba(0, 0, 0, .25)"
	}
	>
	<Scroll
		width="100%"
		color={"#464343"}
		height="100%"
		backgroundColor={"#d1d0d697"}
		scrollAnimate={controls}
	>
        <h2 className={styles.fullnameData}>{fullname}</h2>
		<Frame
		position="relative"
		background="linear-gradient(90deg, #ffc75f5c 50%, #ee82ee42 50%"
		// background: linear-gradient(orange, violet);
		width="100%"
		height={200}
        color={"#464343"}
		>
            <div className={styles.infoData}>
              <p className={styles.usernameData}>{`Username:${username}`}</p>
              <p className={styles.emailData}>{`Contact:${number}`}</p>
              <hr />
              <p>Description</p>
              <p>{description}</p>
            </div>
            <hr />
          </Frame>
          <img
            className={styles.infoImg}
            src="https://thumbs.dreamstime.com/b/online-education-homepage-e-learning-technology-concept-85876793.jpg"
            alt=""
          />
          <Frame
            position="relative"
            height={170}
            background="linear-gradient(90deg, #ffc75f5c 50%, #ee82ee42 50%"
            color={"#464343"}
          >
            <div className={styles.infoData}>
              <p>Achievements</p>
              <p>{`Goals: ${goals}`}</p>
              <p>{`Attended Meet: ${attended}`}</p>
            </div>
            <hr />
            <Button
              color="primary"
              variant="contained"
              className={styles.setGoals}
            >
              Click here to set Goals
            </Button>
          </Frame>

		<Frame
		top={20}
		left={20}
		height={80}
		width={""}
		background={null}
		style={{
			color: "black",
			fontFamily: "sans-serif"
		}}
		>
		<Button className={styles.joinNowBtn} color="primary" variant="contained">Join Now</Button>
		</Frame>
	</Scroll>
	{state && (
		<Frame
		borderRadius={20}
		size={15}
		top={15}
		right={20}
		backgroundColor={"#d1d0d697"}
		onTap={() => {
			setState(false);
		}}
		>
		<ImCross style={{marginTop:"1px"}} color="#464343" />
		</Frame>
	)}
	</Frame>
);
};

export default Card;
