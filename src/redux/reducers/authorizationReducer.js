import actionType from "../actions/authorizationActions";

const initState = {
  username: "",
  isAuthenticated: false,
  isLoading: false,
};

const authorizationReducer = (state = initState, action) => {
  if (action.type === actionType.SET_USER) {
    return {
      ...state,
      username: action.payload,
      isLoading: false
    };
  }
  if (action.type === actionType.SET_IS_AUTHENTICATED) {
    return {
      ...state,
      isAuthenticated: action.payload,
      isLoading: false
    };
  }
  if (action.type === actionType.SET_IS_LOADING) {
    return {
      ...state,
      isLoading: true
    };
  }
  return state;
};

export default authorizationReducer;
