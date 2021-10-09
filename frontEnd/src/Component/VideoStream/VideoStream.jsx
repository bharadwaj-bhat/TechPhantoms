import firebase from "firebase/app";
import "firebase/firestore";
import { useEffect, useState, useRef } from "react";

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

export function VideoStream({ link }) {
  const [currentPage, setCurrentPage] = useState("home");
  const [joinCode, setJoinCode] = useState("");

  useEffect(() => {
    return () => {
      firestore.collection("isActive").doc("isActive123").update({
        active: false,
        link: "",
      });
    };
  });

  return (
    <div className="app">
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
        />
      )}
    </div>
  );
}

function Menu({ joinCode, setJoinCode, setPage }) {
  return (
    <div>
      <div>
        <button
          onClick={() => {
            setPage("create");
            //  setupSources();
          }}
        >
          Create Call
        </button>
      </div>

      <div>
        <input
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
          placeholder="Join with code"
        />
        <button onClick={() => setPage("join")}>Answer</button>
      </div>
    </div>
  );
}

function Videos({ mode, callId, setPage, link }) {
  const [webcamActive, setWebcamActive] = useState(false);
  const [roomId, setRoomId] = useState(callId);

  const localRef = useRef();
  const remoteRef = useRef();

  var setupSources = async () => {
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
    } else if (mode === "join") {
      const callDoc = firestore.collection("calls").doc(link);
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
        hangUp();
      }
    };
  };

  const hangUp = async () => {
    pc.close();

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
    <div style={{ maxWidth: "80vw", margin: "auto" }}>
      <div
        style={{
          position: "absolute",
          top: "80px",
          left: "130px",
          zIndex: 5,
        }}
      >
        <video width="320" ref={localRef} autoPlay playsInline muted />
      </div>
      <div style={{ width: "100%", margin: "auto" }}></div>
      <video width="900" ref={remoteRef} autoPlay playsInline />

      <div>
        <button onClick={hangUp} disabled={!webcamActive}></button>
        <div>
          <div>
            <input type="text" value={roomId} />
          </div>
        </div>
      </div>

      {!webcamActive && (
        <div>
          <div>
            <h3>allow camera and click start</h3>
            <div>
              <button onClick={() => setPage("home")}>Cancel</button>
              <button onClick={setupSources}>Start</button>
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
