import { addListener } from 'redux/modules/listeners'
import { listenToFeed, listenToUsersFeed } from 'helpers/api'
import { addMultipleHaikus } from 'redux/modules/haikus'
import { fromJS } from 'immutable'

/****************************************
      Constants
*****************************************/
const SETTING_FEED_LISTENER = 'SETTING_FEED_LISTENER'
const SETTING_FEED_LISTENER_ERROR = 'SETTING_FEED_LISTENER_ERROR'
const SETTING_FEED_LISTENER_SUCCESS = 'SETTING_FEED_LISTENER_SUCCESS'
const ADD_NEW_HAIKU_ID_TO_FEED = 'ADD_NEW_HAIKU_ID_TO_FEED'
const RESET_NEW_HAIKU_AVAILABLE = 'RESET_NEW_HAIKU_AVAILABLE'

/****************************************
      Action Creators
*****************************************/
const settingFeedListener = () => ({
  type: SETTING_FEED_LISTENER
})

const settingFeedListenerError = error => ({
  type: SETTING_FEED_LISTENER_ERROR,
  error: 'Error fetching feeds.'
})

const settingFeedListenerSuccess = haikuIds => ({
  type: SETTING_FEED_LISTENER_SUCCESS,
  haikuIds
})

export const addNewHaikuIdToFeed = haikuId => ({
  type: ADD_NEW_HAIKU_ID_TO_FEED,
  haikuId
})

export const resetNewHaikuAvailable = () => ({
  type: RESET_NEW_HAIKU_AVAILABLE
})

// Thunk function
export function setAndHandleFeedListener () {
  let initialFetch = true
  return function (dispatch, getState) {
    if (getState().listeners.feed) {return}

    dispatch(addListener('feed'))
    dispatch(settingFeedListener())


    listenToFeed(({ feed, sortedIds }) => {
      dispatch(addMultipleHaikus(feed))
      initialFetch ? dispatch(settingFeedListenerSuccess(sortedIds)) : dispatch(addNewHaikuIdToFeed(sortedIds[0]))
      initialFetch = false
    }, (error) => dispatch(settingFeedListenerError(error)))
  }
}

/****************************************
          Reducer
*****************************************/
// Initial State
const initialState = fromJS({
  isFetching: false,
  error: '',
  newHaikusToAdd: [],
  haikuIds: [],
  newHaikusAvailable: false
})

// Reducer
export default function feed(state = initialState, action) {
  switch (action.type) {
    case SETTING_FEED_LISTENER:
      return state.merge({
        isFetching: true
      })
    case SETTING_FEED_LISTENER_ERROR:
      return state.merge({
        isFetching: false,
        error: action.error
      })
    case SETTING_FEED_LISTENER_SUCCESS:
      return state.merge({
        isFetching: false,
        error: '',
        haikuIds: action.haikuIds,
        newHaikusAvailable: false
      })
    case ADD_NEW_HAIKU_ID_TO_FEED:
      return state.merge({
        newHaikusAvailable: true,
        newHaikusToAdd: state.get('newHaikusToAdd').unshift(action.haikuId),
      })
    case RESET_NEW_HAIKU_AVAILABLE:
      return state.merge({
        haikuIds: state.get('newHaikusToAdd').concat(state.get('haikuIds')),
        newHaikusToAdd: [],
        newHaikusAvailable: false
      })
    default:
      return state;
  }
}
