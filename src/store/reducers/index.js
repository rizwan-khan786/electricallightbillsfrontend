import { combineReducers } from "redux";
import postReducer from "./postReducer";
import userReducer from "./userReducer";
import sidebarReducer from "./sidebarReducer";
import roleReducer from "./roleReducer";
import loginReducer from "./loginReducer";
import billReducer from "./billReducer";
import masterReducer from "./masterReducer";

const rootReducer=combineReducers({
    posts:postReducer,
    users:userReducer,
    sidebar:sidebarReducer,
    roles:roleReducer,
    auth:loginReducer,
    bills:billReducer,
    masters:masterReducer
});

export default rootReducer;
