import { saveHaiku, fetchHaiku } from 'helpers/api'
import { Map } from 'immutable'
import { closeModal } from './modal'
import { addSingleUsersHaiku } from './usersHaikus'
import { addNewHaikuIdToFeed } from './feed'

/****************************************
            Constants
*****************************************/
const FETCHING_HAIKU = 'FETCHING_HAIKU'
const FETCHING_HAIKU_ERROR = 'FETCHING_HAIKU_ERROR'
const FETCHING_HAIKU_SUCCESS = 'FETCHING_HAIKU_SUCCESS'
const REMOVE_FETCHING = 'REMOVE_FETCHING'
const ADD_HAIKU = 'ADD_HAIKU'
const ADD_MULTIPLE_HAIKUS = 'ADD_MULTIPLE_HAIKUS'

/****************************************
          Action Creators
*****************************************/
const fetchingHaiku = () => ({
  type: FETCHING_HAIKU
})

const fetchingHaikuError = error => ({
  type: FETCHING_HAIKU_ERROR,
  error: 'Error fetching haiku'
})

const fetchingHaikuSuccess = haiku => ({
  type: FETCHING_HAIKU_SUCCESS,
  haiku
})

export const removeFetching = () => ({
  type: REMOVE_FETCHING
})

const addHaiku = haiku => ({
  type: ADD_HAIKU,
  haiku
})

export const addMultipleHaikus = haikus => ({
  type: ADD_MULTIPLE_HAIKUS,
  haikus
})

// Control adding a new haiku
export function haikuFanout (haiku) {
  return function (dispatch, getState) {
    dispatch(closeModal())
    saveHaiku(haiku)
      .then(haikuWithId => {
        dispatch(addHaiku(haikuWithId))
        dispatch(addSingleUsersHaiku(haiku.uid, haikuWithId.haikuId))
      })
      .catch(error => {
        console.warn('Error in haikuFanout', error)
      })
  }
}

/// THunk
export function fetchAndHandleHaiku (haikuId) {
  return function (dispatch) {
    dispatch(fetchingHaiku())
    fetchHaiku(haikuId)
      .then(haiku => dispatch(fetchingHaikuSuccess(haiku)))
      .catch(err => dispatch(fetchingHaikuError(err)))
  }
}

/****************************************
        Reducer
*****************************************/
// Initial State
const initialState = Map({
  isFetching: true,
  error: ''
})

// Reducer
export default function haikus(state = initialState, action) {
  switch(action.type) {
    case FETCHING_HAIKU:
      return state.merge({
        isFetching: true
      })
    case FETCHING_HAIKU_ERROR:
      return state.merge({
        isFetching: false,
        error: action.error
      })
    case ADD_HAIKU:
    case FETCHING_HAIKU_SUCCESS:
      return state.merge({
        isFetching: false,
        error: '',
        [action.haiku.haikuId]: action.haiku
      })
    case REMOVE_FETCHING:
      return state.merge({
        error: '',
        isFetching: false
      })
    case ADD_MULTIPLE_HAIKUS:
      return state.merge(action.haikus)
    default:
      return state;
  }
}
