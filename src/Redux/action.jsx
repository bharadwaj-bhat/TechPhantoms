import axios from "axios";
import { GET_ALL_USER, GET_LOGGED_DATA, GET_LOGGED_FAILURE, GET_LOGGED_REQUEST } from "./actionType";

const getLoggedDataRequest = () => {
    return {
      type: GET_LOGGED_REQUEST,
    };
  };
  const getLoggedDataSuccess = (payload) => {
    return {
      type: GET_LOGGED_DATA,
      payload: payload,
    };
  };
  const getLoggedDatailure = (err) => {
    return {
      type: GET_LOGGED_FAILURE,
      payload: err,
    };
  };
  const getAllUserSucess = (payload) =>{
    return{
      type:GET_ALL_USER,
      payload:payload
    }
  }

  
  export const GetLoggedData = (id)=>dispatch=> {
      const requestAction = getLoggedDataRequest();
      dispatch(requestAction);
      axios
        .get(`http://localhost:4500/users/${id}`)
        .then((res) => {
        //   console.log(res,'ser');
          const successAction = getLoggedDataSuccess(res.data.user);
          dispatch(successAction);
        })
        .catch((err) => {
          const failureAction = getLoggedDatailure(err);
          dispatch(failureAction);
        });
    }
    export const getallUser = (dispatch) => {
      const requestAction = getLoggedDataRequest();
      dispatch(requestAction);
      axios
        .get(`http://localhost:8000/users`)
        .then((res) => {
          const successAction = getAllUserSucess(res.data);
          dispatch(successAction);
        })
    }
  