import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Replies } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as repliesActionCreators from 'redux/modules/replies'

class ReplyContainer extends Component {

  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string,
    lastUpdated: PropTypes.number.isRequired,
    replies: PropTypes.object.isRequired,
    haikuId: PropTypes.string.isRequired,
    fetchAndHandleReplies: PropTypes.func.isRequired
  }

  static defaultProps = {
    lastUpdated: 0,
    replies: {}
  }

  componentDidMount () {
    this.props.fetchAndHandleReplies(this.props.haikuId)
  }

  render () {
    const { isFetching, error, lastUpdated, replies } = this.props
    return (
      <div>
        <Replies
          isFetching={isFetching}
          error={error}
          lastUpdated={lastUpdated}
          replies={replies}/>
      </div>
    )
  }
}


const mapStateToProps = (state, props) => {
  const haikuRepliesInfo = state.replies[props.haikuId] || {}
  const { lastUpdated, replies } = haikuRepliesInfo

  return {
    isFetching: state.replies.isFetching,
    error: state.replies.error,
    lastUpdated,
    replies
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(repliesActionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ReplyContainer)
