import React from 'react'
import PropTypes from 'prop-types'
import Reply from 'react-icons/lib/fa/mail-reply'
import Star from 'react-icons/lib/fa/star'
import { formatTimestamp } from 'helpers/utils'
import {
  haikuContainer, contentContainer,
  avatar, actionContainer,
  header, text,
  likeReplyContainer, icon,
  likedIcon, author
} from './styles.css'
import { Map } from 'immutable'

const Haiku = props => {
  const starIcon = props.isLiked ? likedIcon : icon
  const starFn = props.isLiked ? props.handleDeleteLike : props.addAndHandleLike
  return (
    <div
      className={haikuContainer}
      stlye={{cursor: props.hideReplyBtn ? 'default' : 'pointer'}}
      onClick={props.onClick}>
      <img src={props.haiku.get('avatar')} className={avatar} />
      <div className={contentContainer}>
        <div className={header}>
          <div onClick={props.goToProfile} className={author}>{props.haiku.get('name')}</div>
          <div>{formatTimestamp(props.haiku.get('timestamp'))}</div>
        </div>
        <div className={text}>{props.haiku.get('haikuText')}</div>
        <div className={likeReplyContainer}>
          {props.hideReplyBtn
            ? null
            : <Reply className={icon} />}
          <div className={actionContainer}>
            <Star className={starIcon} onClick={e => starFn(props.haiku.get('haikuId'), e)} />
          </div>
        </div>
      </div>
    </div>
  )
}

Haiku.propTypes = {
  haiku: PropTypes.instanceOf(Map).isRequired,
  onClick: PropTypes.func,
  isLiked: PropTypes.bool.isRequired,
  addAndHandleLike: PropTypes.func.isRequired,
  handleDeleteLike: PropTypes.func.isRequired,
  numberOfLikes: PropTypes.number,
  hideReplyBtn: PropTypes.bool.isRequired,
  hideLikeCount: PropTypes.bool.isRequired,
  goToProfile: PropTypes.func.isRequired
}

export default Haiku
