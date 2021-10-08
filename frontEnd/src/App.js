import React, { createContext, useReducer } from "react";
import Signup from "./Component/Login_Signup/Signup";
import Login from "./Component/Login_Signup/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Component/Landing_Page/Home";
import Navbar from "./Component/NavBar/Navbar";
import { Profile } from "./Component/Dashbord/Profile";
import Logout from "./Component/Login_Signup/Logout";
import { initialState, reducer } from "./Reducer/reducer";

export const userContext = createContext();
const Routing = () => {
  return (
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
      <Route path="/logout">
        <Logout />
      </Route>
    </Switch>
  );
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BrowserRouter>
      <>
        <userContext.Provider value={{ state, dispatch }}>
          <Navbar />
          <Routing />
        </userContext.Provider>
      </>
    </BrowserRouter>
  );
}

export default App;
