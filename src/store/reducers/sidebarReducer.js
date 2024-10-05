import { TOGGLE_SIDEBAR } from "../actions/toggleSidebar";
import { LOGOUT } from "../actions/actionTypes"; 

const initialState = {
  isOpen: JSON.parse(localStorage.getItem('sidebarIsOpen')) ?? true,
};

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      const newIsOpen = !state.isOpen;
      localStorage.setItem('sidebarIsOpen', JSON.stringify(newIsOpen));
      return {
        ...state,
        isOpen: newIsOpen,
      };
    case LOGOUT:
      localStorage.setItem('sidebarIsOpen', JSON.stringify(false));
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};

export default sidebarReducer;
