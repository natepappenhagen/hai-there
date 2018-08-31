/****************************************
          Constants
*****************************************/
const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'
const UPDATE_HAIKU_TEXT = 'UPDATE_HAIKU_TEXT'

/****************************************
          Action Creators
*****************************************/
export const openModal = () => ({
  type: OPEN_MODAL
})

export const closeModal = () => ({
  type: CLOSE_MODAL
})


export const updateHaikuText = (newHaikuText) => ({
  type: UPDATE_HAIKU_TEXT,
  newHaikuText
})

/****************************************
          Reducer
*****************************************/
// Initial State
const initialState = {
  haikuText: '',
  isOpen: false,
};

// Modal Reducer
export default function modal(state = initialState, action) {
  switch(action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true
      }
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false
      }
    case UPDATE_HAIKU_TEXT:
      return {
        ...state,
        haikuText: action.newHaikuText
      }
    default:
      return state;
  }
}
