import React from 'react'
import PropTypes from 'prop-types'
import { default as ReactModal } from 'react-modal'
import {
  newHaikuTop,
  pointer,
  newHaikuInputContainer,
  newHaikuInput,
  submitHaikuBtn,
  darkBtn
} from './styles.css'
import { formatHaiku } from 'helpers/utils'

const modalStyles = {
  content: {
    width: 350,
    margin: '100px auto',
    height: 220,
    borderRadius: 5,
    background: '#EBEBEB',
    padding: 0
  }
}

const Modal = ({ isOpen, haikuText, openModal, closeModal, isSubmitDisabled, user, updateHaikuText, haikuFanout }) => {

  function submitHaiku () {
    haikuFanout(formatHaiku(haikuText, user))
    updateHaikuText('')
  }

  return (
    <div>
      <span className={darkBtn} onClick={openModal}>New Haiku</span>
        <ReactModal
          style={modalStyles}
          isOpen={isOpen}
          onRequestClose={closeModal}>
          <div className={newHaikuTop}>
            <span>Compose new Haiku</span>
            <span onClick={closeModal} className={pointer}>close</span>
          </div>
          <div className={newHaikuInputContainer}>
            <textarea
              onChange={e => {
                updateHaikuText(e.target.value)
              }}
              value={haikuText}
              maxLength={140}
              type='text'
              className={newHaikuInput}
              placeholder='Whats up?' />
          </div>
          <button
            className={submitHaikuBtn}
            disabled={isSubmitDisabled}
            onClick={submitHaiku}>
              Haiku
          </button>
        </ReactModal>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  haikuText: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
  isSubmitDisabled: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  updateHaikuText: PropTypes.func.isRequired,
  haikuFanout: PropTypes.func.isRequired
}

export default Modal
