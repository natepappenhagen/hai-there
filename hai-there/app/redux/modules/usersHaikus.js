import { fetchUsersHaikus } from 'helpers/api'
import { addMultipleHaikus } from 'redux/modules/haikus'
import { listenToUsersFeed } from 'helpers/api'

/****************************************
            Constants
*****************************************/
const FETCHING_USERS_HAIKUS = 'FETCHING_USERS_HAIKUS'
const FETCHING_USERS_HAIKUS_ERROR = 'FETCHING_USERS_HAIKUS_ERROR'
const FETCHING_USERS_HAIKUS_SUCCESS = 'FETCHING_USERS_HAIKUS_SUCCESS'
const ADD_SINGLE_USERS_HAIKU = 'ADD_SINGLE_USERS_HAIKU'
const ADD_ALL_USERS_HAIKUS = 'ADD_ALL_USERS_HAIKUS'

/****************************************
          Action Creators
*****************************************/
const fetchingUsersHaikus = () => ({
  type: FETCHING_USERS_HAIKUS,
  isFetching: true
})

const fetchingUsersHaikusError = error => ({
  type: FETCHING_USERS_HAIKUS_ERROR,
  isFetching: false,
  error: 'Error fetching users haiku ids' + error
})

const fetchingUsersHaikusSuccess = (uid, haikuIds, lastUpdated) => ({
  type: FETCHING_USERS_HAIKUS_SUCCESS,
  isFetching: false,
  uid,
  haikuIds,
  lastUpdated
})

export const addSingleUsersHaiku = (uid, haikuId) => ({
  type: ADD_SINGLE_USERS_HAIKU,
  uid,
  haikuId
})


/****************************************
      Thunks
*****************************************/
export function fetchAndHandleUsersHaikus (uid) {
  return function (dispatch) {


    dispatch(fetchingUsersHaikus())

     fetchUsersHaikus(uid)
      .then(haikus => dispatch(addMultipleHaikus(haikus)))
      .then(({ haikus }) => dispatch(
        fetchingUsersHaikusSuccess(
          uid,
          Object.keys(haikus).sort((a,b) => haikus[b].timestamp - haikus[a].timestamp),
          Date.now()
        )
      ))
      .catch(err => dispatch(fetchingUsersHaikusError(err)))
  }

}

/****************************************
        Reducers
*****************************************/

const initialUsersHaikuState = {
  lastUpdated: 0,
  haikuIds: []
}

// Single User Haiku reducer
function usersHaiku(state = initialUsersHaikuState, action) {
  switch(action.type) {
    case ADD_SINGLE_USERS_HAIKU:
      return {
        ...state,
        haikuIds: state.haikuIds.concat([action.haikuId])
      }
  }
}

// Initial State
const initialState = {
  error: '',
  isFetching: false
}

// Main Reucer
export default function usersHaikus(state = initialState, action) {
  switch(action.type) {
    case FETCHING_USERS_HAIKUS:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_USERS_HAIKUS_ERROR:
      return {
        ...state,
        error: action.error
      }
    case FETCHING_USERS_HAIKUS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        [action.uid]: {
          lastUpdated: action.lastUpdated,
          haikuIds: action.haikuIds
        }
      }
    case ADD_SINGLE_USERS_HAIKU:
      return typeof state[action.uid] !== 'undefined'
      ? state
      :
      {
        ...state,
        isFetching: false,
        [action.uid]: usersHaiku(state[action.uid], action)
      }
    default:
      return state;
  }
}
