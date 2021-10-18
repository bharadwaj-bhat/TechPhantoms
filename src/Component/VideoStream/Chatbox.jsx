import React from "react";
import { Box, Modal } from "@material-ui/core";
import styled from "styled-components";
import { Chat } from "../Chat/Chat";
const style = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  height: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export const ChatBox = () => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TopBar>
          <div class="cross">
            <button onClick={handleClose} class="btn-cross" type="button">
              <div class="QBdPU ">
                <svg
                  aria-label="Close"
                  class="_8-yf5 "
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 48 48"
                  width="24"
                >
                  <path
                    clip-rule="evenodd"
                    d="M41.1 9.1l-15 15L41 39c.6.6.6 1.5 0 2.1s-1.5.6-2.1 0L24 26.1l-14.9 15c-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1l14.9-15-15-15c-.6-.6-.6-1.5 0-2.1s1.5-.6 2.1 0l15 15 15-15c.6-.6 1.5-.6 2.1 0 .6.6.6 1.6 0 2.2z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        </TopBar>
        <hr />
        <CronoBox>
          <Chat />
        </CronoBox>
        <hr />
      </Box>
    </Modal>
  );
};

const TopBar = styled.div`
  width: 100%;
  display: flex;
  margin: 0%;
  /* border: 1px solid black; */
  & .back_arrow {
    width: 1%;
  }
  & .text {
    width: 95%;
    margin-bottom: -1%;
    text-align: center;
  }
  & .cross {
    width: 5%;

    & .btn-cross {
      background-color: white;
      border: 0;
    }
  }
`;

const CronoBox = styled.div`
  width: 94%;
  margin: 2% auto;
  text-align: center;
  align-items: center;
`;

// const JoinBtn = styled.div`
//   & .proceed-btn {
//     align-items: center;
//     width: 90%;
//     margin: 2% 5%;
//   }
// `;
