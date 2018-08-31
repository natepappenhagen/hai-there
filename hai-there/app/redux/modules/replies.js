import { postReply, fetchReplies } from 'helpers/api'


/****************************************
      Constants
*****************************************/
const FETCHING_REPLIES = 'FETCHING_REPLIES'
const FETCHING_REPLIES_ERROR = 'FETCHING_REPLIES_ERROR'
const FETCHING_REPLIES_SUCCESS = 'FETCHING_REPLIES_SUCCESS'
const ADD_REPLY = 'ADD_REPLY'
const ADD_REPLY_ERROR = 'ADD_REPLY_ERROR'
const REMOVE_REPLY = 'REMOVE_REPLY'

/****************************************
      Action Creators
*****************************************/
const fetchingReplies = () => ({
  type: FETCHING_REPLIES,
  isFetching: true
})

const fetchingRepliesSuccess = (replies, haikuId) => ({
  type: FETCHING_REPLIES_SUCCESS,
  isFetching: false,
  replies,
  haikuId,
  lastUpdated: Date.now()
})

const fetchingRepliesError = (error) => ({
  type: FETCHING_REPLIES_ERROR,
  isFetching: false,
  error
})

const addReply = (haikuId, reply) => ({
  type: ADD_REPLY,
  haikuId,
  reply
})

const addReplyError = (error) => ({
  type: ADD_REPLY_ERROR,
  error: 'Error adding reply'
})

const removeReply = (haikuId, replyId) => ({
  type: REMOVE_REPLY,
  replyId,
  haikuId
})

/****************************************
      Thunks
*****************************************/
export function addAndHandleReply (haikuId, reply) {
  return function (dispatch) {
    const { replyWithId, replyPromise } = postReply(haikuId, reply)

    dispatch(addReply(haikuId, replyWithId))
    replyPromise.catch(err => {
      dispatch(removeReply(haikuId, replyWithId.replyId))
      dispatch(addReplyError(err))
    })
  }
}

export function fetchAndHandleReplies (haikuId) {
  return function (dispatch) {
    dispatch(fetchingReplies())
    fetchReplies(haikuId)
      .then(replies => dispatch(fetchingRepliesSuccess(replies, haikuId)))
      .catch(error => dispatch(fetchingRepliesError(error)))
  }
}

/****************************************
      Reducer
*****************************************/
const initialReplyState = {
  name: '',
  reply: '',
  uid: '',
  timeStamp: 0,
  avatar: '',
  replyId: '',
}

function haikuReplies(state = initialReplyState, action) {
  switch(action.type) {
    case ADD_REPLY:
      return {
        ...state,
        [action.reply.replyId]: action.reply
      }
    case REMOVE_REPLY:
      return {
        ...state,
        [action.reply.replyId]: undefined
      }
    default:
      return state;
  }
}

const initialHaikuState = {
  lastUpdated: Date.now(),
  replies: {}
}

function repliesAndLastUpdate(state = initialHaikuState, action) {
  switch(action.type) {
    case FETCHING_REPLIES_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        replies: action.replies
      }
    case ADD_REPLY:
    case REMOVE_REPLY:
      return {
        ...state,
        replies: haikuReplies(state.replies, action)
      }
    default:
      return state;
  }
}

const initialState = {
  isFetching: true,
  error: ''
}

export default function replies(state = initialState, action) {
  switch(action.type) {
    case FETCHING_REPLIES:
      return {
        ...state,
        error: action.error
      }
    case ADD_REPLY_ERROR:
    case FETCHING_REPLIES_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case ADD_REPLY:
    case FETCHING_REPLIES_SUCCESS:
    case REMOVE_REPLY:
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.haikuId]: repliesAndLastUpdate(state[action.haikuId], action)
      }
    default:
      return state
  }
}
