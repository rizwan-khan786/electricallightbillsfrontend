import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from '../../config/config';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';

export const ADD_USER_REQUEST='ADD_USER_REQUEST';
export const ADD_USER_SUCCESS='ADD_USER_SUCCESS';
export const ADD_USER_ERROR='ADD_USER_ERROR';

export const EDIT_USER_REQUEST='EDIT_USER_REQUEST';
export const EDIT_USER_SUCCESS='EDIT_USER_SUCCESS';
export const EDIT_USER_ERROR='EDIT_USER_ERROR';

export const DELETE_USER_REQUEST='DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS='DELETE_USER_SUCCESS';
export const DELETE_USER_ERROR='DELETE_USER_ERROR';

const getToken = () => {
  const resdata = JSON.parse(localStorage.getItem('resdata'));
  return resdata ? resdata.token : null;
};
export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_ERROR,
  payload: error.message
});




export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(fetchUsersRequest());
    try {
      const response = await axios.get(`${baseUrl}/getUsers`);
      dispatch(fetchUsersSuccess(response.data));
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
      toast.error('Failed to fetch users');
    }
  };
};

export const addUserRequest=()=>({
  type:ADD_USER_REQUEST,
})

export const addUserSuccess=(user)=>({
  type:ADD_USER_SUCCESS,
  payload:user
})

export const addUserFailure=(error)=>({
  type:ADD_USER_ERROR,
  payload:error.message
})

export const addUser=(userData)=>{
 

  return async (dispatch)=>{

dispatch(addUserRequest());
try{
  const token = getToken();
  const response = await axios.post(`${baseUrl}/addUser`, userData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  dispatch(addUserSuccess(response.data.user))
  toast.success("User Added Successfully", { position: "top-center" });

}catch(error){
  dispatch(addUserFailure(error));
  toast.error(error.response?.data?.message || "Error adding user", { position: "top-center" });
}
  }
}

export const editUserRequest = () => ({
  type: EDIT_USER_REQUEST,
});

export const editUserSuccess = (user) => ({
  type: EDIT_USER_SUCCESS,
  payload: user,
});

export const editUserFailure = (error) => ({
  type: EDIT_USER_ERROR,
  payload: error.message,
});

export const editUser = (userId, userData) => {
  return async (dispatch) => {
    dispatch(editUserRequest());
    try {

      const token = getToken();
      const response = await axios.put(`${baseUrl}/user/${userId}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(editUserSuccess(response.data.user));
      toast.success("User Updated Successfully", { position: "top-center" });
    } catch (error) {
      // dispatch(editUserFailure(error.message));

      dispatch(editUserFailure(error.response?.data?.message || "Error updating user"));
      toast.error(error.response?.data?.message || "Error updating user", { position: "top-center" });
    }
  };
};

export const deleteUserRequest = () => ({
  type: DELETE_USER_REQUEST,
});

export const deleteUserSuccess = (user_id) => ({
  type: DELETE_USER_SUCCESS,
  payload: user_id,
});

export const deleteUserFailure = (error) => ({
  type: DELETE_USER_ERROR,
  payload: error.message,
});

export const deleteUser = (user_id) => {
  return async (dispatch) => {
      dispatch(deleteUserRequest());
      try {
          await axios.delete(`${baseUrl}/user/${user_id}`);
          dispatch(deleteUserSuccess(user_id));
          toast.success("User deleted successfully", { position: "top-center" });
      } catch (error) {
          dispatch(deleteUserFailure(error.message));
      }
  };
};