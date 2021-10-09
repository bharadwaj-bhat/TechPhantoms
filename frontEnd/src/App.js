import React, { createContext, useEffect, useReducer, useState } from "react";
import Signup from "./Component/Login_Signup/Signup";
import Login from "./Component/Login_Signup/Login";
import { Route, Switch } from "react-router-dom";
import Home from "./Component/Landing_Page/Home";
import Navbar from "./Component/NavBar/Navbar";
import { Profile } from "./Component/Dashbord/Profile";
import Logout from "./Component/Login_Signup/Logout";
import { initialState, reducer } from "./Reducer/reducer";
import { Footer } from "./Component/Footer/Footer";
import { VideoStream } from "./Component/VideoStream/VideoStream";
import "./App.css";
import { DataForm } from "./Component/SelectField/DataForm";

import firebase from "firebase/app";
import "firebase/firestore";

export const userContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [page, setPage] = useState("create");
  const [temp, setTemp] = useState(true);
  const [link, setLink] = useState("");

  useEffect(() => {
    const db = firebase.firestore();

    db.collection("isActive")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach(async (doc) => {
          let val = await doc.data();
          console.log("firestore val", val);
          if (val.active === false) {
            setPage("create");
          } else {
            setPage("join");
            setLink(val.link);
          }
        });
      });
    return () => {
      db.collection("isActive").doc("isActive123").update({
        active: false,
        link: "",
      });
    };
  }, []);

  if (temp) {
    return (
      <VideoStream
        link={link}
        setLink={setLink}
        page={page}
        setPage={setPage}
      />
    );
  }

  console.log("state:", state);

  return (
    <>
      <userContext.Provider value={{ state, dispatch }}>
        <Navbar />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signup" component={Signup} />
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/selectField">
            <DataForm />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/temp" component={VideoStream} />
        </Switch>

        <Footer />
      </userContext.Provider>
    </>
  );
}

export default App;
