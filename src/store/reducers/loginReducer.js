import { LOGIN_SUCCESS,LOGIN_FAILURE,LOGOUT } from "../actions/actionTypes";

const initialState={
    isAuthenticated: false,
    user:null,
    token:null,
    error:null
}

const loginReducer=(state=initialState,action)=>{
switch(action.type){
    case LOGIN_SUCCESS:
        return{
            ...state,
            isAuthenticated: true,
            user:action.payload.user,
            token:action.payload.token,
            error:null 
        }
        case LOGIN_FAILURE:
            return{
                ...state,
                isAuthenticated: false,
                user:null,
                token:null,
                error:action.payload
            };
            case LOGOUT:
                return {
                  ...state,
                  isAuthenticated: false,
                  user: null,
                  token: null,
                  error: null,
                };
            default:
            return state;
}
};

export default loginReducer;