import { fetchLikeCount } from 'helpers/api'

/****************************************
      Constants
*****************************************/
import { ADD_LIKE, REMOVE_LIKE } from './usersLikes'
const FETCHING_COUNT = 'FETCHING_COUNT'
const FETCHING_COUNT_ERROR = 'FETCHING_COUNT_ERROR'
const FETCHING_COUNT_SUCCESS = 'FETCHING_COUNT_SUCCESS'

/****************************************
      Action Creators
*****************************************/
const fetchingCount = () => ({
  type: FETCHING_COUNT
})

const fetchingCountError = error => ({
  type: FETCHING_COUNT_ERROR,
  error: 'Error Fethicng haiku\'s like count'
})

const fetchingCountSuccess = (haikuId, count) => ({
  type: FETCHING_COUNT_SUCCESS,
  haikuId,
  count
})

/****************************************
      Thunks
*****************************************/
// initiates total like fetch on each haiku Page
export function initLikeFetch (haikuId) {
  return function (dispatch) {
    dispatch(fetchingCount())

    fetchLikeCount(haikuId)
      .then(count => dispatch(fetchingCountSuccess(haikuId, count)))
      .catch(err => dispatch(fetchingCountError(err)))
  }
}

/****************************************
      Reducer
*****************************************/
// Single Count
function count(state = 0, action) {
  switch(action.type) {
    case ADD_LIKE:
      return state + 1;
    case REMOVE_LIKE:
      return state - 1;
    default:
      return state;
  }
}

// Initial State
const initialState = {
  isFetching: false,
  error: ''
};

// Main Reducer
export default function likeCount(state = initialState, action) {
  switch(action.type) {
    case FETCHING_COUNT:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_COUNT_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case FETCHING_COUNT_SUCCESS:
      return {
        ...state,
        ...initialState,
        [action.haikuId]: action.count
      }
    case ADD_LIKE:
    case REMOVE_LIKE:
      return typeof state[action.haikuId] === 'undefined'
      ? state
      : {
        ...state,
        [action.haikuId]: count(state[action.haikuId], action)
      }
    default:
      return state;
  }
}
