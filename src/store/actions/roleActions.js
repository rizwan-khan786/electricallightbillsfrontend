import axios from 'axios';
import {baseUrl} from '../../config/config';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const FETCH_ROLES_REQUEST='FETCH_ROLES_REQUEST';
export const FETCH_ROLES_SUCCESS='FETCH_ROLES_SUCCESS';
export const FETCH_ROLES_ERROR='FETCH_ROLES_ERROR';

export const ADD_ROLE_REQUEST='ADD_ROLE_REQUEST';
export const ADD_ROLE_SUCCESS='ADD_ROLE_SUCCESS';
export const ADD_ROLE_ERROR='ADD_ROLE_ERROR';

export const EDIT_ROLE_REQUEST='EDIT_ROLE_REQUEST';
export const EDIT_ROLE_SUCCESS='EDIT_ROLE_SUCCESS';
export const EDIT_ROLE_ERROR='EDIT_ROLE_ERROR';

export const DELETE_ROLE_REQUEST='DELETE_ROLE_REQUEST';
export const DELETE_ROLE_SUCCESS='DELETE_ROLE_SUCCESS';
export const DELETE_ROLE_ERROR='DELETE_ROLE_ERROR';

  const getToken = () => {
    const resdata = JSON.parse(localStorage.getItem('resdata'));
    return resdata ? resdata.token : null;
  };

export const fetchRolesRequest=()=>({
    type:FETCH_ROLES_REQUEST,
})

export const fetchRolesSuccess=(roles)=>({
    type:FETCH_ROLES_SUCCESS,
    payload:roles
})

export const fetchRolesFailure=(error)=>({
    type:FETCH_ROLES_ERROR,
    payload:error.message
})

export const fetchRoles=()=>{
    return async (dispatch)=>{
    dispatch(fetchRolesRequest());
    try{
        const response=await axios.get(`${baseUrl}/getRoles`);
        dispatch(fetchRolesSuccess(response.data));
    }catch(error){
        dispatch(fetchRolesFailure(error.message));
    }
    }
}

export const addRoleRequest=()=>({
    type:ADD_ROLE_REQUEST,
})

export const addRoleSuccess=(role)=>({
    type:ADD_ROLE_SUCCESS,
    payload:role
})
export const addRoleFailure=(error)=>({
type:ADD_ROLE_ERROR,
payload:error.message
})

export const addRole = (roleData) => {
    return async (dispatch) => {
        dispatch(addRoleRequest());
        try {

            const token = getToken();
            const response = await axios.post(`${baseUrl}/addRole`, roleData, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
    
            dispatch(addRoleSuccess(response.data.Role));
            toast.dismiss(); 
            toast.success("Role added successfully", { position: "top-center" });
        } catch (error) {
            dispatch(addRoleFailure(error.message));
            toast.dismiss(); 
            if (error.response?.status === 400 && error.response?.data?.message === 'Role already exists') {
                toast.error("Role already exists. Please choose a different name.", { position: "top-center" });
            } else {
                toast.error(error.response?.data?.message || "Error adding role", { position: "top-center" });
            }
        }
    };
};

export const editRoleRequest = () => ({
    type: EDIT_ROLE_REQUEST,
  });
  
  export const editRoleSuccess = (role) => ({
    type: EDIT_ROLE_SUCCESS,
    payload: role,
  });
  
  export const editRoleFailure = (error) => ({
    type: EDIT_ROLE_ERROR,
    payload: error.message,
  });
  

export const editRole = (roleId, roleData) => {
  
    return async (dispatch) => {
      dispatch(editRoleRequest());
      try {
        const token = getToken();
            const response = await axios.post(`${baseUrl}/editRole/${roleId}`,roleData,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // const response = await axios.post(`${baseUrl}/editRole/${roleId}`, roleData);
        const updatedRole = response.data.role;
        dispatch(editRoleSuccess(updatedRole));
        toast.success("Role Updated Successfully", { position: "top-center" });
      } catch (error) {
        dispatch(editRoleFailure(error.message));
      }
    };
  };

export const deleteRoleRequest = () => ({
    
    type: DELETE_ROLE_REQUEST,
});

export const deleteRoleSuccess = (role_id) => ({
    type: DELETE_ROLE_SUCCESS,
    payload: role_id,
});

export const deleteRoleFailure = (error) => ({
    type: DELETE_ROLE_ERROR,
    payload: error.message,
});

export const deleteRole = (role_id) => {
    return async (dispatch) => {
        dispatch(deleteRoleRequest());
        try {
            await axios.delete(`${baseUrl}/deleteRole/${role_id}`);
            dispatch(deleteRoleSuccess(role_id));
            toast.success("Role deleted successfully", { position: "top-center" });
        } catch (error) {
            dispatch(deleteRoleFailure(error.message));
        }
    };
};