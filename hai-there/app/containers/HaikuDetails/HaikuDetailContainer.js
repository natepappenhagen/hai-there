import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { HaikuDetails } from 'components'
import * as haikuActionCreators from 'redux/modules/haikus'
import * as likeCountActionCreators from 'redux/modules/likeCount'
import * as repliesActionCreators from 'redux/modules/replies'

class HaikuDetailContainer extends Component {


  static propTypes = {
    authedUser: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    haikuId: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    haikuAlreadyFetched: PropTypes.bool.isRequired,
    removeFetching: PropTypes.func.isRequired,
    fetchAndHandleHaiku: PropTypes.func.isRequired,
    initLikeFetch: PropTypes.func.isRequired,
    addAndHandleReply: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.initLikeFetch(this.props.haikuId)
    if(!this.props.haikuAlreadyFetched) {
      this.props.fetchAndHandleHaiku(this.props.haikuId)
    } else {
      this.props.removeFetching()
    }
  }

  render () {
    const { addAndHandleReply, authedUser, haikuId, isFetching, error } = this.props

    return (
      <HaikuDetails
        addAndHandleReply={addAndHandleReply}
        authedUser={authedUser}
        haikuId={haikuId}
        isFetching={isFetching}
        error={error} />
    )
  }
}


const mapStateToProps = ({ haikus, likeCount, users }, props) => ({
  isFetching: haikus.get('isFetching'),
  error: haikus.get('error'),
  haikuId: props.match.params.haikuId,
  authedUser: users[users.authedId].info,
  haikuAlreadyFetched: !!haikus.get(props.match.params.haikuId)
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    ...haikuActionCreators,
    ...likeCountActionCreators,
    ...repliesActionCreators
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(HaikuDetailContainer)
