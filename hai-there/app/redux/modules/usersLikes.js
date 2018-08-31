import {
  fetchUsersLikes,
  saveToUsersLikes,
  deletFromUsersLikes,
  incrementNumberOfLikes,
  decrementNumberOfLikes
} from 'helpers/api'

/****************************************
      Constants
*****************************************/
const FETCHING_LIKES = 'FETCHING_LIKES'
const FETCHING_LIKES_ERROR = 'FETCHING_LIKES_ERROR'
const FETCHING_LIKES_SUCCESS = 'FETCHING_LIKES_SUCCESS'
export const ADD_LIKE = 'ADD_LIKE'
export const REMOVE_LIKE = 'REMOVE_LIKE'

/****************************************
      Action Creators
*****************************************/
const fetchingLikes = () => ({
  type: FETCHING_LIKES
})

const fetchingLikesError = error => ({
  type: FETCHING_LIKES_ERROR,
  error: 'Error fetching likes'
})

const fetchingLikesSuccess = likes => ({
  type: FETCHING_LIKES_SUCCESS,
  likes
})

const addLike = haikuId => ({
  type: ADD_LIKE,
  haikuId
})

const removeLike = haikuId => ({
  type: REMOVE_LIKE,
  haikuId
})

// Thunk
export function addAndHandleLike (haikuId, e) {
  e.stopPropagation()
  return function (dispatch, getState) {
    dispatch(addLike(haikuId))

    const uid = getState().users.authedId
    Promise.all([
      saveToUsersLikes(uid, haikuId),
      incrementNumberOfLikes(haikuId)
    ]).catch(error => {
      console.warn(error)
      dispatch(removeLike(haikuId))
    })
  }
}

export function handleDeleteLike (haikuId, e) {
  e.stopPropagation()
  return function (dispatch, getState) {
    dispatch(removeLike(haikuId))

    const uid = getState().users.authedId
    Promise.all([
      deletFromUsersLikes(uid, haikuId),
      decrementNumberOfLikes(haikuId)
    ]).catch(error => {
      console.warn(error)
      dispatch(addLike(haikuId))
    })
  }
}

// Set users likes

export function setUsersLikes () {
  return function (dispatch, getState) {
    const uid = getState().users.authedId
    dispatch(fetchingLikes())
    fetchUsersLikes(uid)
      .then(likes => dispatch(fetchingLikesSuccess(likes)))
      .catch(error => dispatch(fetchingLikesError(error)))
  }
}

/****************************************
      Users Likes Reducers
*****************************************/
// Initial State
const initialState = {
  isFetching: false,
  error: ''
}

// Main reducer
export default function usersLikes(state = initialState, action) {
  switch(action.type) {
    case FETCHING_LIKES:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_LIKES_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case FETCHING_LIKES_SUCCESS:
      return {
        ...state,
        ...action.likes,
        isFetching: false,
        error: ''
      }
    case ADD_LIKE:
      return {
        ...state,
        [action.haikuId]: true
      }
    case REMOVE_LIKE:
      return Object.keys(state)
        .filter((haikuId) => action.haikuId !== haikuId)
        .reduce((prev, curr) => {
          prev[curr] = state[curr];
          return prev;
        }, {})
    default:
      return state;
  }
}
