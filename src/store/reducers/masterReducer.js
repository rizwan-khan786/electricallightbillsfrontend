import {GET_MASTERS_REQUEST,GET_MASTERS_SUCCESS,GET_MASTERS_ERROR} from '../actions/masterActions';

const initialState = {
    masters: [],
    loading: false,
    error: null
  }
  const masterReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_MASTERS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        }
      case GET_MASTERS_SUCCESS:
        return {
          ...state,
          loading: false,
          masters: action.payload
        }
      case GET_MASTERS_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload
        }
      default:
        return state; // return the initial state for unknown actions
    }
  }

export default masterReducer; 