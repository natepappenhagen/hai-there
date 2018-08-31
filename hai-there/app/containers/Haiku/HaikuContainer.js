import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Haiku } from 'components'
import * as usersLikesActions from 'redux/modules/usersLikes'

class HaikuContainer extends Component {

  static propTypes = {
    haiku: PropTypes.object.isRequired,
    numberOfLikes: PropTypes.number,
    isLiked: PropTypes.bool.isRequired,
    hideLikeCount: PropTypes.bool.isRequired,
    hideReplyBtn: PropTypes.bool.isRequired,
    handleDeleteLike: PropTypes.func.isRequired,
    addAndHandleLike: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }


  static defaultProps = {
    hideReplyBtn: false,
    hideLikeCount: true
  }

  goToProfile = e => {
    e.preventDefault()
    e.stopPropagation()
    this.context.router.history.push(`/user/${this.props.haiku.get('uid')}`)
  }

  handleClick = e => {
    e.preventDefault()
    e.stopPropagation()
    this.context.router.history.push(`/haiku/${this.props.haiku.get('haikuId')}`)
  }

  render () {
    return (
      <Haiku
        goToProfile={this.goToProfile}
        onClick={this.props.hideReplyBtn ? null : this.handleClick}
        {...this.props} />
    )
  }
}

const mapStateToProps = ({ haikus, likeCount, usersLikes }, props) => ({
  haiku: haikus.get(props.haikuId),
  hideLikeCount: props.hideLikeCount,
  hideReplyBtn: props.hideReplyBtn,
  isLiked: usersLikes[props.haikuId] === true,
  numberOfLikes: likeCount[props.haikuId]
})

const mapDispatchToProps = dispatch => bindActionCreators(usersLikesActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HaikuContainer)
