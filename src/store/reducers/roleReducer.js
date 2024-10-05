import { FETCH_ROLES_REQUEST,
    FETCH_ROLES_SUCCESS,
    FETCH_ROLES_ERROR,
    ADD_ROLE_REQUEST,
    ADD_ROLE_SUCCESS,
    ADD_ROLE_ERROR,
    EDIT_ROLE_REQUEST,
  EDIT_ROLE_SUCCESS,
  EDIT_ROLE_ERROR,
    DELETE_ROLE_REQUEST,
    DELETE_ROLE_SUCCESS,
    DELETE_ROLE_ERROR
 } from "../actions/roleActions";
const initialState={
    roles:[],
    loading:false,
    error:null
}
const roleReducer=(state=initialState,action)=>{
switch(action.type){
    case FETCH_ROLES_REQUEST:
    case ADD_ROLE_REQUEST:
        case EDIT_ROLE_REQUEST:
    case DELETE_ROLE_REQUEST:
    return {
        ...state,
        loading:true,
        error:null
    }

    case FETCH_ROLES_SUCCESS:
        return {
            ...state,
            loading:false,
            roles:action.payload
        }
        case ADD_ROLE_SUCCESS:
            return {
                ...state,
                loading: false,
                roles: [...state.roles, action.payload],
            };

            case EDIT_ROLE_SUCCESS:
                return {
                    
                  ...state,
                  loading: false,
                  roles: state.roles.map(role =>
                    role._id === action.payload._id ? action.payload : role
                  ),
                };
            case DELETE_ROLE_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    roles: state.roles.filter(role => role._id !== action.payload),
                };
        case FETCH_ROLES_ERROR:
        case ADD_ROLE_ERROR:
        case EDIT_ROLE_ERROR:
        case DELETE_ROLE_ERROR:
            return{
                ...state,
                loading:false,
                error:action.payload
            };
            default:
                return state;
}
}

export default roleReducer;