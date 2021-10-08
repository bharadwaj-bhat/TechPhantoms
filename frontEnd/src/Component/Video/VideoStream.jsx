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
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.come:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

export const VideoStream = () => {
  // const [connection, setConnection] = useState("");

  const [callInp, setCallInp] = useState("");
  const connection = useRef();
  const myVideo = useRef();
  const peerVideo = useRef();
  const localStream = useRef();
  const remoteStream = useRef();

  useEffect(() => {
    connection.current = new RTCPeerConnection(servers);
    console.log("connection.current", connection.current);
  }, []);

  const handleCam = async () => {
    localStream.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    remoteStream.current = new MediaStream();

    console.log("lcoal", localStream);

    console.log(connection.current);

    localStream.current.getTracks().forEach((track) => {
      connection.current.addTrack(track, localStream.current);
    });

    connection.current.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.current.addTrack(track);
      });
    };

    myVideo.current.srcObject = localStream.current;
    peerVideo.current.srcObject = remoteStream.current;
  };

  // create call
  const handleCall = async () => {
    const callDoc = firestore.collection("calls").doc();
    console.log(callDoc);
    const offerCandidates = callDoc.collection("offercandidates");
    const answerCandidates = callDoc.collection("answerCandidates");
    setCallInp(callDoc.id);
    console.log(console.log(callDoc.id));

    connection.current.onicecandidate = (e) => {
      e.candidate && offerCandidates.add(e.candidate.toJSON());
    };

    const offerDescription = await connection.current.createOffer();
    await connection.current.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await callDoc.set({ offer });

    callDoc.onSnapshot(async (snapshot) => {
      const data = snapshot.data();
      if (!connection.current.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        await connection.current.setRemoteDescription(answerDescription);
      }
    });

    answerCandidates.onSnapshot((snapshot) => {
      console.log("inside crt snap");
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          connection.current.addIceCandidate(candidate);
        }
      });
    });
  };
  //---------------------------------------------------------------------------------------------------------

  const handleAnswerCall = async () => {
    console.log("1");
    const callId = callInp;
    const callDoc = firestore.collection("calls").doc(callId);
    const answerCandidates = callDoc.collection("answerCandidates");
    const offerCandidates = callDoc.collection("offerCandidates");
    console.log("2");
    connection.current.onicecandidate = (event) => {
      event.candidate && answerCandidates.add(event.candidate.toJSON());
    };

    const callData = (await callDoc.get()).data();
    console.log("3", callData);
    const offerDescription = callData.offer;

    await connection.current.setRemoteDescription(offerDescription);

    const answerDescription = await connection.current.createAnswer();
    await connection.current.setLocalDescription(answerDescription);
    console.log("4", answerDescription);
    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await callDoc.update({ answer });

    // connection.current.addEventListener('icecandidate', event => {
    //   if (event.candidate) {
    //     const json = event.condidate.toJSON();
    //     candidatesCollection.add(json)
    //   }
    // })

    offerCandidates.onSnapshot((snapshot) => {
      console.log("in snap");
      snapshot.docChanges().forEach((change) => {
        console.log("change", change);
        if (change.type === "added") {
          let data = change.doc.data();
          console.log(data);
          connection.current.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });

    console.log("exiting");
  };

  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <button onClick={handleCam}> Open web Cam </button>

      <div>
        <h2> Your Own web Cam </h2>
        <video ref={myVideo} autoPlay playsInline></video>
      </div>

      <div>
        <h2> YOur Peer's web Cam</h2>
        <video ref={peerVideo} autoPlay playsInline></video>
      </div>
      <div>
        <button onClick={handleCall}> Create a new call </button>
        <br />
      </div>
      <div>
        <input
          type="text"
          name=""
          id=""
          placeholder="Join A Call"
          onChange={(e) => setCallInp(e.target.value)}
          value={callInp}
        />
        <button onClick={handleAnswerCall}>Answer call </button>
      </div>
    </div>
  );
};
