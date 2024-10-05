import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from '../../config/config';
export const FETCH_BILLS_REQUEST = 'FETCH_BILLS_REQUEST';
export const FETCH_BILLS_SUCCESS = 'FETCH_BILLS_SUCCESS';
export const FETCH_BILLS_ERROR = 'FETCH_BILLS_ERROR';
export const ADD_BILL_REQUEST = 'ADD_BILL_REQUEST';
export const ADD_BILL_SUCCESS = 'ADD_BILL_SUCCESS';
export const ADD_BILL_ERROR = 'ADD_BILL_ERROR';
export const EDIT_BILL_REQUEST = 'EDIT_BILL_REQUEST';
export const EDIT_BILL_SUCCESS = 'EDIT_BILL_SUCCESS';
export const EDIT_BILL_ERROR = 'EDIT_BILL_ERROR';
export const UPDATE_BILL_STATUS_REQUEST = 'UPDATE_BILL_STATUS_REQUEST';
export const UPDATE_BILL_STATUS_SUCCESS = 'UPDATE_BILL_STATUS_SUCCESS';
export const UPDATE_BILL_STATUS_ERROR = 'UPDATE_BILL_STATUS_ERROR';
export const UPDATE_MASSBILLS_STATUS_REQUEST = 'UPDATE_MASSBILLS_STATUS_REQUEST';
export const UPDATE_MASSBILLS_STATUS_SUCCESS = 'UPDATE_MASSBILLS_STATUS_SUCCESS';
export const UPDATE_MASSBILLS_STATUS_ERROR = 'UPDATE_MASSBILLS_STATUS_ERROR';
export const UPDATE_MASSBILLS_ROLLBACK_REQUEST = 'UPDATE_MASSBILLS_ROLLBACK_REQUEST';
export const UPDATE_MASSBILLS_ROLLBACK_SUCCESS = 'UPDATE_MASSBILLS_ROLLBACK_SUCCESS';
export const UPDATE_MASSBILLS_ROLLBACK_ERROR = 'UPDATE_MASSBILLS_ROLLBACK_ERROR';
export const DELETE_BILL_REQUEST = 'DELETE_BILL_REQUEST';
export const DELETE_BILL_SUCCESS = 'DELETE_BILL_SUCCESS';
export const DELETE_BILL_ERROR = 'DELETE_BILL_ERROR';
export const UPDATE_BILL_FLAG_REQUEST = 'UPDATE_BILL_FLAG_REQUEST';
export const UPDATE_BILL_FLAG_SUCCESS = 'UPDATE_BILL_FLAG_SUCCESS';
export const UPDATE_BILL_FLAG_ERROR = 'UPDATE_BILL_FLAG_ERROR';
const getToken = () => {
  const resdata = JSON.parse(localStorage.getItem('resdata'));
  return resdata ? resdata.token : null;
};
export const fetchBillsRequest = () => ({
  type: FETCH_BILLS_REQUEST
});
export const fetchBillsSuccess = (bills) => ({
  type: FETCH_BILLS_SUCCESS,
  payload: bills
});
export const fetchBillsFailure = (error) => ({
  type: FETCH_BILLS_ERROR,
  payload: error.message
});
export const fetchBills = () => {
  return async (dispatch) => {
    dispatch(fetchBillsRequest());
    try {
      const response = await axios.get(`${baseUrl}/getBills`);
      dispatch(fetchBillsSuccess(response.data));
    } catch (error) {
      dispatch(fetchBillsFailure(error.message));
    }
  };
};
export const addBillRequest = () => ({
  type: ADD_BILL_REQUEST,
})
export const addBillSuccess = (bill) => ({
  type: ADD_BILL_SUCCESS,
  payload: bill
})
export const addBillFailure = (error) => ({
  type: ADD_BILL_ERROR,
  payload: error.message
})
export const editBillRequest = () => ({
  type: EDIT_BILL_REQUEST,
});
export const editBillSuccess = (bill) => ({
  type: EDIT_BILL_SUCCESS,
  payload: bill,
});
export const editBillFailure = (error) => ({
  type: EDIT_BILL_ERROR,
  payload: error.message,
});
export const editBill = (billId, billData) => {
  return async (dispatch) => {
    dispatch(editBillRequest());
    try {
      const token = getToken();
      const response = await axios.put(`${baseUrl}/editBill/${billId}`, billData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(editBillSuccess(response.data.bill));
      toast.success("Bill Updated Successfully", { position: "top-center" });
    } catch (error) {
      dispatch(editBillFailure(error.response?.data?.message || "Error updating bill"));
      toast.error(error.response?.data?.message || "Error updating bill", { position: "top-center" });
    }
  };
};
export const updateBillFlagRequest = () => ({
  type: UPDATE_BILL_FLAG_REQUEST,
})
export const updateBillFlagSuccess = (bill) => ({
  type: UPDATE_BILL_FLAG_SUCCESS,
  payload: bill
})
export const updateBillFlagFailure = (error) => ({
  type: UPDATE_BILL_FLAG_ERROR,
  payload: error.message
})
export const addBill = (billData) => {
  return async (dispatch) => {
    dispatch(addBillRequest());
    try {
      const token = getToken();
      const response = await axios.post(`${baseUrl}/addBill`, billData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );
      dispatch(addBillSuccess(response.data.bill))
      toast.success("Bill Added Successfully", { position: "top-center" });
    } catch (error) {
      dispatch(addBillFailure(error));
      toast.error(error.response?.data?.message || "Error adding lightbill", { position: "top-center" });
    }
  }
}
export const updateBillStatusAction = (id, approvedStatus, paymentStatus, yesno) => async (dispatch) => {
  try {
    const token = getToken();
    const response = await axios.put(`${baseUrl}/updateBillStatus`, {
      id, approvedStatus, paymentStatus, yesno
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch({
      type: 'UPDATE_BILL_STATUS_SUCCESS',
      payload: { id, approvedStatus, paymentStatus, yesno },
    });
    dispatch(fetchBills());
  } catch (error) {
    dispatch({
      type: 'UPDATE_BILL_STATUS_FAIL',
      payload: error.message,
    });
  }
};
export const massBillApprovalsAction = (bills) => async (dispatch) => {
  dispatch({ type: UPDATE_MASSBILLS_STATUS_REQUEST });

  try {
    const token = getToken();
    const response = await axios.put(`${baseUrl}/massUpdateBillStatus`, { bills }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      dispatch({
        type: UPDATE_MASSBILLS_STATUS_SUCCESS
      });
      toast.success("Mass bill approvals updated successfully", { position: "top-center" });
      dispatch(fetchBills());
    } else {
      throw new Error('Failed to update mass bill approvals');
    }

  } catch (error) {
    dispatch({
      type: UPDATE_MASSBILLS_STATUS_ERROR,
      payload: error.message,
    });
    toast.error(error.message, { position: "top-center" });
  }
};
export const massBillRollbackApprovalsAction = (bills) => async (dispatch) => {
  dispatch({ type: UPDATE_MASSBILLS_ROLLBACK_REQUEST });
  try {
    const token = getToken();
    const response = await axios.put(`${baseUrl}/reverseMassBillStatus`, { bills }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 200) {
      dispatch({
        type: UPDATE_MASSBILLS_ROLLBACK_SUCCESS
      });
      toast.success("Mass bills Rollback updated successfully", { position: "top-center" });
      dispatch(fetchBills());
    } else {
      throw new Error('Failed to update mass bill approvals');
    }
  } catch (error) {
    dispatch({
      type: UPDATE_MASSBILLS_ROLLBACK_ERROR,
      payload: error.message,
    });
    toast.error(error.message, { position: "top-center" });
  }
};

export const updateFlagStatus = (billId, flagStatus) => async (dispatch) => {
  dispatch(updateBillFlagRequest());
  try {
    const token = getToken();
    const response = await axios.put(`${baseUrl}/updateFlagStatus`, {
      billId,
      flagStatus
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch(updateBillFlagSuccess({ billId, flagStatus }));
    toast.success("Bill flag status updated successfully", { position: "top-center" });
  } catch (error) {
    dispatch(updateBillFlagFailure(error.message));
    toast.error(error.response?.data?.message || "Error updating bill flag status", { position: "top-center" });
  }
};
export const deleteBillRequest = () => ({
  type: DELETE_BILL_REQUEST,
});
export const deleteBillSuccess = (bill_id) => ({
  type: DELETE_BILL_SUCCESS,
  payload: bill_id,
});
export const deleteBillFailure = (error) => ({
  type: DELETE_BILL_ERROR,
  payload: error.message,
});
export const deleteBill = (bill_id) => {
  return async (dispatch) => {
    dispatch(deleteBillRequest());
    try {
      const token = getToken();
      const response = await axios.delete(`${baseUrl}/bill/${bill_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      dispatch(deleteBillSuccess(bill_id));
      toast.success("Bill deleted successfully", { position: "top-center" });
    } catch (error) {
      dispatch(deleteBillFailure(error.message));
    }
  };
};