import "./Signup.css";


import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router";
import * as Components from "./LoginComponents";
import {TextField} from '@material-ui/core';
import { GetData, SetData } from "../../Utils/LocalStorageData";
import {useSelector, shallowEqual, useDispatch} from 'react-redux'
import { GetLoggedData } from "../../Redux/action";

const Login = () => {
  const [signIn, toggle] = React.useState(true);
  const history = useHistory()
  const dispatch = useDispatch()
  // signUp

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    fullname: "",
    number:""
  });

  const { username, email, password, fullname, number } = user;

  const handle = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    const { username, email, password, fullname, number  } = user;

    const payload = {
      username,
      email,
      password,
      fullname,
      number
    };
    console.log(payload)

     axios.post("http://localhost:4500/users", payload)
    .then((res)=>{
      console.log(res.data , "res")
      alert("User Added Sucessfully");
      toggle(true)
    })
    .catch((err)=>{
      alert("Invalid Data");
      toggle(false)
    })
  };


  // login

  const [userLogin, setUserLogin] = useState({
    usernameLogin: "",
    passwordLogin: ""
  });

  const { usernameLogin, passwordLogin} = userLogin;

  const handleLogin = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const submitLogin = async (e) => {
    e.preventDefault()
    const { usernameLogin,passwordLogin} = userLogin;

    const payload = {
      username:usernameLogin,
      password:passwordLogin
    };
    console.log(payload)

     axios.post("http://localhost:4500/login", payload)
    .then((res)=>{
      // console.log(res.data , "res")
      alert("User Added Sucessfully");
      res = res.data.data
      dispatch(GetLoggedData(res._id))
      SetData("loginData",res)
      history.push("/profile")
    })
    .catch((err)=>{
      alert("Invalid Data");
    })
  };

  return (
    <Components.Container>
      <Components.SignUpContainer signingIn={signIn}>
        <Components.Form>
          <Components.Title>Create Account</Components.Title>
          <TextField
          className="input" 
          required
          id="outlined-required"
           type="text" 
            name="fullname"
            label="Enter your name"
            value={fullname}
            onChange={handle} />
          <TextField
          className="input" 
          required
          id="outlined-required"
           type="email" name="email"
            label="Enter your Email"
            value={email}
            onChange={handle} />
            <TextField
            className="input" 
            required
          id="outlined-required"
           type="text" name="username"
            label="Enter your username"
            value={username}
            onChange={handle} />
            <TextField
            className="input" 
            required
          id="outlined-required"
           type="password" name="password"
            label="Enter your password"
            value={password}
            onChange={handle} />
            <TextField
            className="input" 
            required
          id="outlined-required"
           type="number" name="number"
            label="Enter your contact number"
            value={number}
            onChange={handle} />
          <Components.Button onClick={submit}>Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>
      <Components.SignInContainer signingIn={signIn}>
        <Components.Form>
          <Components.Title>Sign in</Components.Title>
          <TextField
          className="input" 
          required
          id="outlined-required"
          onChange={handleLogin}
          value={usernameLogin}
           type="email" label="Username"
           name="usernameLogin" />
           
          <TextField
          className="input" 
          required
          onChange={handleLogin}
          id="outlined-required"
          name="passwordLogin"
           type="password" label="Password"
           value={passwordLogin} />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button onClick={(e)=>{submitLogin(e)}}>Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>
      <Components.OverlayContainer signingIn={signIn}>
        <Components.Overlay signingIn={signIn}>
          <Components.LeftOverlayPanel signingIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>
          <Components.RightOverlayPanel signingIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}

export default Login;