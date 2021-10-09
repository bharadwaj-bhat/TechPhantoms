import React from 'react'
import { Switch, Route } from 'react-router'
import Home from '../Component/Landing_Page/Home'
import Login from '../Component/Login_Signup/Login'
import Logout from '../Component/Login_Signup/Logout'
import Navbar from '../Component/NavBar/Navbar'
import {Profile} from '../Component/Dashbord/Profile'

export const Routes = () => {
    return (
        <>
        <Navbar/>
          <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route exact path="/login">
        <Login/>
      </Route>
      <Route exact path="/profile">
        <Profile/>
      </Route>
      <Route exact path="/logout">
        <Logout/>
      </Route>
    </Switch>  
        </>
    )
}
