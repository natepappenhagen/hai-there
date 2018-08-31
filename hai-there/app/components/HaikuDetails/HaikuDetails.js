import React from 'react'
import PropTypes from 'prop-types'
import {
  mainContainer, container,
  content, repliesContainer,
  replyTextAreaContainer, replyTextArea
} from './styles.css'
import { subHeader, darkBtn, errorMsg } from 'sharedStyles/styles.css'
import { Loading } from 'components'
import { HaikuContainer, ReplyContainer } from 'containers'
import { formatReply } from 'helpers/utils'

/****************************************
      Single Reply Component
*****************************************/
const Reply = ({ submit }) => {

  function handleSubmit (e) {
    if(Reply.textarea.value.length === 0) return

    submit(Reply.textarea.value, e)
    Reply.textarea.value = ''
  }

  return (
    <div className={replyTextAreaContainer}>
      <textarea
        ref={node => Reply.textarea = node}
        className={replyTextArea}
        maxLength={200}
        placeholder='Your reply'
        type='text' />
      <button className={darkBtn} onClick={handleSubmit}>
        Add Reply
      </button>
    </div>
  )
}

// Reply PropTypes
Reply.propTypes = {
  submit: PropTypes.func.isRequired
}


/****************************************
      Haiku details component
*****************************************/
const HaikuDetails = ({ haikuId, authedUser, isFetching, error, addAndHandleReply }) => (
  <div className={mainContainer}>
    {isFetching ? <Loading /> :
      <div className={container}>
        <div className={content}>
          <HaikuContainer haikuId={haikuId} hideLikeCount={false} hideReplyBtn={true} />
          <Reply submit={reply => addAndHandleReply(haikuId, formatReply(authedUser, reply))}/>
        </div>
        <div className={repliesContainer}>
          <ReplyContainer haikuId={haikuId}/>
        </div>
      </div>}
      {error ? <p className={errorMsg}>There has been an error</p> : null}
  </div>
)

// Haiku Detail PropTYpes
HaikuDetails.propTypes = {
  authedUser: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  haikuId: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  addAndHandleReply: PropTypes.func.isRequired,
}

export default HaikuDetails
