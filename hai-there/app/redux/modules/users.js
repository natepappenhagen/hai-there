import auth, { logout, saveUser, emailAuth } from 'helpers/auth'
import { formatUserInfo } from 'helpers/utils'
import { fetchUser } from 'helpers/api'

/****************************************
        Constants
*****************************************/
const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
const FETCHING_USER_LOGIN_FAILURE = 'FETCHING_USER_LOGIN_FAILURE'
const REMOVE_FETCHING_USER = 'REMOVE_FETCHING_USER'

/****************************************
      Action Creators
*****************************************/
export const authUser = uid => ({
  type: AUTH_USER,
  uid
})

const unauthUser = () => ({
  type: UNAUTH_USER
})


const fetchingUser = () => ({
  type: FETCHING_USER
})

const fetchingUserFailure = error => ({
  type: FETCHING_USER_FAILURE,
  error: 'Error fetching user'
})

const fetchingUserLoginFailure = error => ({
  type: FETCHING_USER_LOGIN_FAILURE,
  error: error.message
})

export const removeFetchingUser = () => ({
  type: REMOVE_FETCHING_USER
})

export const fetchingUserSuccess = (uid, user, timestamp) => ({
  type: FETCHING_USER_SUCCESS,
  uid,
  user,
  timestamp
})

/****************************************
            Thunks
*****************************************/
export function fetchAndHandleUser (uid) {
  return function (dispatch) {
    dispatch(fetchingUser())
    return fetchUser(uid)
      .then(user => dispatch(fetchingUserSuccess(uid, user, Date.now())))
      .catch(error => dispatch(fetchingUserFailure(error)))
  }
}


// Main Function for use in Authenticate Container with Facebook
export function fetchAndHandleAuthedUser() {

  return function (dispatch) {

    dispatch(fetchingUser())

    return auth().then(({user, credential}) => {
      const userData = user.providerData[0]
      const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
      return dispatch(fetchingUserSuccess(user.uid, userInfo, Date.now()))
    })
      .then(({user}) => saveUser(user))
      .then(user => dispatch(authUser(user.uid)))
      .catch(error => dispatch(fetchingUserFailure(error)))
  }

}

// Login Handler for email/password
export function fetchAndHandlePasswordLogin(email, password) {

  return function (dispatch) {

    dispatch(fetchingUser())

    return emailAuth(email, password).then(user => {
      user.updateProfile({
        displayName: 'Demo Account',
        photoURL: 'https://goo.gl/Lou3hQ'
      })
      const userInfo = formatUserInfo(user.displayName, user.PhotoURL, user.uid)
      return dispatch(fetchingUserSuccess(user.uid, userInfo, Date.now()))
    })
      .then(({user}) => saveUser(user))
      .then(user => dispatch(authUser(user.uid)))
      .catch(error => dispatch(fetchingUserLoginFailure(error)))
  }

}

// logout handler
export function logoutAndUnauth () {
  return function (dispatch) {
    logout()
    dispatch(unauthUser())
  }
}

/****************************************
            Reducers
*****************************************/
// Initial state for single user reducer
const initialUserState = {
  info: {
    name: '',
    uid: '',
    avatar: ''
  },
  lastUpdated: 0
}

// Single user reducer
function user(state = initialUserState, action) {
  switch(action.type) {
    case FETCHING_USER_SUCCESS:
      return {
        ...state,
        info: action.user,
        lastUpdated: action.timestamp
      }
    default:
      return state;
  }
}

// Initial state for users reducer
const initialState = {
  isAuthed: false,
  authedId: '',
  isFetching: true,
  error: '',
  loginError: ''
};

// Users Reducer
export default function users(state = initialState, action) {
  switch(action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuthed: true,
        authedId: action.uid
      }
    case UNAUTH_USER:
      return {
        ...state,
        isAuthed: false,
        authedId: ''
      }
    case FETCHING_USER:
      return {
        ...state,
        isFetching: true
      }
    case REMOVE_FETCHING_USER:
      return {
        ...state,
        isFetching: false
      }
    case FETCHING_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case FETCHING_USER_LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: '',
        loginError: action.error
      }
    case FETCHING_USER_SUCCESS:
      return action.user === null
      ? {
        ...state,
        error: '',
        isFetching: false
      } : {
        ...state,
        isFetching: false,
        error: '',
        [action.uid]: user(state[action.uid], action)
      }
    default:
      return state;
  }
}
