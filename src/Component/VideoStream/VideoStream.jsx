import firebase from "firebase/app";
import "firebase/firestore";
import { useState, useRef, useEffect } from "react";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import Draggable from "react-draggable";
import { Box, Button, Modal } from "@material-ui/core";
import styled from "styled-components";
import { Chat } from "../Chat/Chat";

const firebaseConfig = {
  apiKey: "AIzaSyAot6COr6pX-qPc3vg4Wq_xGe2nq6IQurQ",
  authDomain: "techphantoms-5bb34.firebaseapp.com",
  projectId: "techphantoms-5bb34",
  storageBucket: "techphantoms-5bb34.appspot.com",
  messagingSenderId: "212247597383",
  appId: "1:212247597383:web:d4ce849cbb903440203c62",
  measurementId: "G-9FTDZG6SDK",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

const servers = {
  iceServers: [
    // {
    //   urls: "stun:stun.stunptotocol.org",
    // },
    {
      urls: "turn:numb.viagenie.ca",
      credential: "muazkh",
      username: "webrtc@live.com",
    },
  ],
  // iceCandidatePoolSize: 10,
};
const pc = new RTCPeerConnection(servers);

export function VideoStream({ link, page = "create", setChatIsOpen }) {
  const [currentPage, setCurrentPage] = useState("home");
  const [joinCode, setJoinCode] = useState(link);
  // setJoinCode(link);

  console.log(page);

  useEffect(() => {
    firestore
      .collection("isActive")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach(async (doc) => {
          let val = await doc.data();
          console.log("firestore val", val);
          setJoinCode(val.link);

          console.log("fr ue", val.link);
        });
      });
    // return () => {
    //   firestore.collection("isActive").doc("isActive123").update({
    //     active: false,
    //     link: "",
    //   });
    // };
  }, []);

  return (
    <div className="app">
      {/* <h1>ksjdfhkjhsdf</h1>
      <h1>ksjdfhkjhsdf</h1>
      <h1>ksjdfhkjhsdf</h1>
      <h1>ksjdfhkjhsdf</h1>
      <h1>ksjdfhkjhsdf</h1>
      <h1>ksjdfhkjhsdf</h1> */}

      {currentPage === "home" ? (
        <Menu
          joinCode={joinCode}
          setJoinCode={setJoinCode}
          setPage={setCurrentPage}
        />
      ) : (
        <Videos
          link={link}
          mode={currentPage}
          callId={joinCode}
          setPage={setCurrentPage}
          page={page}
          setChatIsOpen={setChatIsOpen}
        />
      )}
    </div>
  );
}

function Menu({ joinCode, setJoinCode, setPage, page }) {
  return (
    <div>
      <div
        style={{
          position: "relative",
          top: "10px",
          left: "630px",
          color: "white",
          fontSize: "1.1rem",
        }}
      >
        {joinCode !== "" ? (
          <Button
            style={{
              border: "none",
              padding: "15px 25px",
              margin: "35vh auto",
              background: "#26168bc1",
              color: "white",
            }}
            onClick={() => setPage("join")}
          >
            Get Started
          </Button>
        ) : (
          <button
            style={{
              border: "none",
              padding: "15px 25px",
              backgroundColor: "black",
              color: "white",
            }}
            onClick={() => {
              setPage("create");
              //  setupSources();
            }}
          >
            Get Started
          </button>
        )}
      </div>

      {/* <div>
        <input
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
          placeholder="Join with code"
        />
      </div> */}
    </div>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  // height: "60%",
  bgcolor: "background.none",
  boxShadow: "none",
  p: 0,
  borderRadius: "10px",
};

function Videos({ mode, callId, setPage, link }) {
  const [webcamActive, setWebcamActive] = useState(false);
  const [roomId, setRoomId] = useState(callId);

  const [chatIsOpen] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    console.log("pallav");
    setOpen(false);
  };

  const handleOpen = () => {
    console.log("open");
    setOpen(true);
  };

  const localRef = useRef();
  const remoteRef = useRef();

  var setupSources = async ({ setChatIsOpen }) => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const remoteStream = new MediaStream();

    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    console.log("ls", localStream);
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    localRef.current.srcObject = localStream;
    remoteRef.current.srcObject = remoteStream;

    setWebcamActive(true);

    if (mode === "create") {
      const callDoc = firestore.collection("calls").doc();
      const offerCandidates = callDoc.collection("offerCandidates");
      const answerCandidates = callDoc.collection("answerCandidates");

      setRoomId(callDoc.id);

      firestore.collection("isActive").doc("isActive123").update({
        active: true,
        link: callDoc.id,
      });

      pc.onicecandidate = (event) => {
        event.candidate && offerCandidates.add(event.candidate.toJSON());
      };

      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      await callDoc.set({ offer });

      callDoc.onSnapshot((snapshot) => {
        const data = snapshot.data();
        if (!pc.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription);
        }
      });

      answerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate);
          }
        });
      });
    } else {
      console.log("injoind");
      const callDoc = firestore.collection("calls").doc(callId);
      const answerCandidates = callDoc.collection("answerCandidates");
      const offerCandidates = callDoc.collection("offerCandidates");

      pc.onicecandidate = (event) => {
        event.candidate && answerCandidates.add(event.candidate.toJSON());
      };

      const callData = (await callDoc.get()).data();

      const offerDescription = callData.offer;
      await pc.setRemoteDescription(
        new RTCSessionDescription(offerDescription)
      );

      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      await callDoc.update({ answer });

      offerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            let data = change.doc.data();
            pc.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
    }

    pc.onconnectionstatechange = (event) => {
      if (pc.connectionState === "disconnected") {
        handleHandUp();
      }
    };
  };

  const handleHandUp = async () => {
    pc.close();

    firestore.collection("isActive").doc("isActive123").update({
      active: false,
      link: "",
    });

    if (roomId) {
      let roomRef = firestore.collection("calls").doc(roomId);
      await roomRef
        .collection("answerCandidates")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          });
        });
      await roomRef
        .collection("offerCandidates")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          });
        });

      await roomRef.delete();
    }

    window.location.reload();
  };

  return (
    <div
      style={{
        maxWidth: "100vw",
        background: "linear-gradient(90deg, #e6be7676 50%, #db6bdb61 50%",
      }}
    >
      {/* <button onClick={() => setChatIsOpen(true)}> TEMPPP </button> */}

      <Draggable>
        <div
          style={{
            position: "absolute",
            top: "80px",
            left: "130px",
            width: "250px",
            borderRadius: "20px",
            overflow: "hidden",
            zIndex: 5,
          }}
        >
          <video width="100%" ref={localRef} autoPlay playsInline muted />
        </div>
      </Draggable>
      <div
        style={{
          width: "80%",
          margin: "auto",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          height: "50px",
        }}
      ></div>
      <video height="auto" width="100%" ref={remoteRef} autoPlay playsInline />
      {chatIsOpen && <div>chat div</div>}
      <div>
        <div>
          <div>
            {/* <input
              onChange={(e) => setRoomId(e.target.value)}
              type="text"
              value={roomId}
            /> */}
          </div>
          <div>
            {webcamActive && (
              <div>
                <div
                  style={{
                    fontSize: "2rem",
                    position: "fixed",
                    left: "600px",
                    color: "white",
                    top: "500px",
                    padding: "20px 20px",
                    borderRadius: "50%",
                    background: "red",
                    display: "flex",

                    justifyContent: "center",
                  }}
                  onClick={handleHandUp}
                >
                  <AddIcCallIcon fontSize="inherit" color="inherit" />
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    position: "fixed",
                    left: "700px",
                    color: "white",
                    top: "500px",
                    padding: "20px 20px",
                    borderRadius: "50%",
                    background: "red",
                    display: "flex",
                    justifyContent: "center",
                    height: "70px",
                    textAlign: "center",
                  }}
                  onClick={handleOpen}
                >
                  Chat
                  {/* model */}
                </div>
                <Draggable>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <CronoBox>
                        <Chat />
                      </CronoBox>
                      <hr />
                    </Box>
                  </Modal>
                </Draggable>
                {/* model */}
              </div>
            )}
          </div>
          {/* <button onClick={handleHandUp}>Hang Up</button> */}
        </div>
      </div>

      {!webcamActive && (
        <div
          style={{
            position: "absolute",
            top: "120px",
            left: "480px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              boder: "1px solid red",
            }}
          >
            <h2>Allow camera access and click start</h2>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                color="secondary"
                style={{
                  border: "none",
                  padding: "15px 25px",
                  marginRight: "1%",
                  marginLeft: "20%",
                }}
                onClick={() => setPage("home")}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                color="primary"
                style={{
                  border: "none",
                  padding: "15px 25px",
                  marginLeft: "1%",
                }}
                onClick={setupSources}
              >
                Start
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 
<div style={{ maxWidth: "80vw", margin: "auto" }}>
      <div
        style={{
          position: "absolute",
          top: "80px",
          left: "130px",
          width: "250px",
          zIndex: 5,
          borderRadius: "25px",
          overflow: "hidden",
        }}
      >
        <video width="100%" ref={localRef} autoPlay playsInline muted />
      </div>
      <div
        style={{
          maxWidth: "70%",
          margin: "auto",
          borderRadius: "25px",
          overflow: "hidden",
        }}
      ></div>
      <video height="600" width="100%" ref={remoteRef} autoPlay playsInline />

      <div>
        <button onClick={hangUp} disabled={!webcamActive}></button>
        <div>
          <div>
            <input
              type="text"
              onChange={(e) => setRoomId(e.target.value)}
              value={roomId}
            />
          </div>
        </div>
      </div>

  
 */

// const TopBar = styled.div`
//   width: 100%;
//   display: flex;
//   margin: 0%;
//   /* border: 1px solid black; */
//   & .back_arrow {
//     width: 1%;
//   }
//   & .text {
//     width: 95%;
//     margin-bottom: -1%;
//     text-align: center;
//   }
//   & .cross {
//     width: 5%;

//     & .btn-cross {
//       background-color: white;
//       border: 0;
//     }
//   }
// `;

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
