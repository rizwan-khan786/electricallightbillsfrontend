import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from '../../config/config';

export const GET_MASTERS_REQUEST = 'GET_MASTERS_REQUEST';
export const GET_MASTERS_SUCCESS = 'GET_MASTERS_SUCCESS';
export const GET_MASTERS_ERROR = 'GET_MASTERS_ERROR';

export const getMastersRequest = () => ({
    type: GET_MASTERS_REQUEST
  });
  
  export const getMastersSuccess = (masters) => ({
    type: GET_MASTERS_SUCCESS,
    payload: masters
  });
  
  
  export const getMastersFailure = (error) => ({
    type: GET_MASTERS_ERROR,
    payload: error.message
  });

  export const getMasters = () => {
    return async (dispatch) => {
      dispatch(getMastersRequest());
      try {
        const response = await axios.get(`${baseUrl}/getMasters`);
        dispatch(getMastersSuccess(response.data));
      } catch (error) {
        dispatch(getMastersFailure(error.message));
      } finally {
        // Optional: add any cleanup or logging code here
        console.log('API call completed');
      }
    };
  };