import React from 'react'
import PropTypes from 'prop-types'
import {
  avatar, replyContainer,
  cushion, header,
  author, heading
} from './styles.css'
import { formatTimestamp } from 'helpers/utils'
import { errorMsg, center } from 'sharedStyles/styles.css'
import { Loading } from 'components'

/****************************************
      Single reply component
*****************************************/
const Reply = ({ comment }) => (
  <div className={replyContainer}>
    <img src={comment.avatar} alt={comment.name} className={avatar}/>
    <div>
      <div className={author}>{comment.name}</div>
      <div className={cushion} style={{fontSize: '12px'}}>{formatTimestamp(comment.timestamp)}</div>
      <div className={cushion} style={{fontStyle: 'oblique'}}>{comment.replyText}</div>
    </div>
  </div>
)

// Prop Types
Reply.propTypes = {
  comment: PropTypes.object.isRequired
}


/****************************************
      Replies Component
*****************************************/
const Replies = ({ error, isFetching, replies, lastUpdated }) => {
  const replyIds = Object.keys(replies).sort((a,b) => b.timestamp - a.timestamp)
  return (
    <div>
      {error ? <p className={errorMsg}>{error}</p> : null}
      {isFetching ? <Loading text='Getting Replies' /> :
      <div>
        <h1 className={heading}>Replies <sup>{replyIds.length} total</sup></h1>
        <hr style={{border: '1px solid #eee'}}/>
        {replyIds.map(replyId => <Reply key={replyId} comment={replies[replyId]}/>)}
      </div>}
      {replyIds.length === 0 ? <h3 className={center}>No One has commented yet!</h3> : null}
    </div>
  )
}

// Replies Prop Types
Replies.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string,
  replies: PropTypes.object.isRequired,
}

export default Replies
