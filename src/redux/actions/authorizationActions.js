
const SET_USER = "SET_USER";
const SET_IS_AUTHENTICATED = "SET_IS_AUTHENTICATED";
const SET_IS_LOADING = "SET_IS_LOADING";

const setUser = (username) => ({
  type: SET_USER,
  payload: username
});

const setIsLoading = () => ({
  type: SET_IS_LOADING,
});

const setIsAuthenticated = (value) => ({
  type: SET_IS_AUTHENTICATED,
  payload: value
});

// fetch username
const setUserAction = username => {
  return dispatch => {
    dispatch(setUser(username));
  };
};

const setIsAuthenticatedAction = value => {
  return dispatch => {
    dispatch(setIsAuthenticated(value));
  };
};

const setIsLoadingAction = () => {
  return dispatch => {
    dispatch(setIsLoading());
  };
};

export default { 
  SET_USER,
  SET_IS_AUTHENTICATED, 
  setUserAction, 
  setIsAuthenticatedAction,
  setIsLoadingAction
};