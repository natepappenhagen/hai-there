/****************************************
              Constants
*****************************************/
const ADD_LISTENER = 'ADD_LISTENER'

/****************************************
            Action Creators
*****************************************/
export const addListener = listenerId => ({
  type: ADD_LISTENER,
  listenerId
})

/****************************************
              Reducer
*****************************************/
export default function listener(state = {}, action) {
  switch (action.type) {
    case ADD_LISTENER:
      return {
        ...state,
        [action.listenerId]: true
      }
    default:
      return state;
  }
}
