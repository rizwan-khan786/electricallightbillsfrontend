import { baseUrl } from "../../config/config";
import { Route, Routes, Navigate } from 'react-router-dom';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LOGIN_SUCCESS,LOGIN_FAILURE,LOGOUT} from "./actionTypes";
import axios from 'axios';
// const navigate=useNavigate();
 export const login=(credentials,navigate)=> async(dispatch)=>{
  
  try{
   
    const response=await axios.post(`${baseUrl}/login`,credentials);
    toast.success("Login successful", { position: "top-center" });
    
    localStorage.setItem("resdata", JSON.stringify(response.data));
    dispatch({
        type:LOGIN_SUCCESS,
        payload:response.data,
    });
    navigate('/'); // Navigate to the home page on successful login
  }catch (error) {
    let errorMessage = 'An error occurred. Please try again later.';
    
    if (error.response) {
      errorMessage = error.response.data.message || 'An error occurred. Please try again later.';
    } else if (error.request) {
      errorMessage = 'Network error. Please check your internet connection and try again.';
    } else {
      errorMessage = error.message;
    }
    toast.error(errorMessage, { position: "top-center" });
    dispatch({
      type: LOGIN_FAILURE,
      payload: errorMessage,
    });
  }
 }

 export const logout = () => (dispatch) => {
  localStorage.removeItem("resdata");
  dispatch({ type: LOGOUT });
  toast.success("Logout successful", { position: "top-center" });
};