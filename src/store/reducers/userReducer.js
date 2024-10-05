// import {
//   FETCH_USERS_REQUEST,
//   FETCH_USERS_SUCCESS,
//   FETCH_USERS_ERROR,
//   ADD_USER_REQUEST,
//   ADD_USER_SUCCESS,
//   ADD_USER_ERROR,
//   EDIT_USER_REQUEST,
//   EDIT_USER_SUCCESS,
//   EDIT_USER_ERROR,
//   DELETE_USER_REQUEST,
//   DELETE_USER_SUCCESS,
//   DELETE_USER_ERROR

// } from '../actions/userActions';

// const initialState = {
//   users: [],
//   loading: false,
//   error: null
// };

// const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case FETCH_USERS_REQUEST:
//     case ADD_USER_REQUEST:
//     case EDIT_USER_REQUEST:
//       case DELETE_USER_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null
//       };

//     case FETCH_USERS_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         users: action.payload,
//       };

//     case ADD_USER_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         users: [...state.users, action.payload],
//       };

//     case EDIT_USER_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         users: state.users.map(user =>
//           user.id === action.payload.id ? action.payload : user
//         ),
//       };
//       case DELETE_USER_SUCCESS:
//         return {
//             ...state,
//             loading: false,
//             users: state.users.filter(user => user._id !== action.payload),
//         };
//     case FETCH_USERS_ERROR:
//     case ADD_USER_ERROR:
//     case EDIT_USER_ERROR:
//       case DELETE_USER_ERROR:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload
//       };

//     default:
//       return state;
//   }
// };

// export default userReducer;

// ===========================================

import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR
} from '../actions/userActions';

const initialState = {
  users: [],
  loading: false,
  error: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
    case ADD_USER_REQUEST:
    case EDIT_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload],
      };
     
    case EDIT_USER_SUCCESS:
      console.log("Editing user:", action.payload);

      return {
        ...state,
        loading: false,
        users: state.users.map(user =>
          user._id === action.payload._id ? action.payload : user
        ),
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter(user => user._id !== action.payload),
      };

    case FETCH_USERS_ERROR:
    case ADD_USER_ERROR:
    case EDIT_USER_ERROR:
    case DELETE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default userReducer;
