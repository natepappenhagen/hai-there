import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Feed } from 'components'
import * as feedActionCreators from 'redux/modules/feed'
import { List } from 'immutable'

class FeedContainer extends Component {

  static propTypes = {
    haikuIds: PropTypes.instanceOf(List).isRequired,
    newHaikusAvailable: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    setAndHandleFeedListener: PropTypes.func.isRequired,
    resetNewHaikuAvailable: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.setAndHandleFeedListener()
  }

  resetButton = () => {
    this.props.resetNewHaikuAvailable()
    window.scrollTo(0,0)
  }

  render () {
    const { haikuIds, newHaikusAvailable, error, isFetching, resetNewHaikuAvailable } = this.props

    return (
      <div>
        <Feed
          haikuIds={haikuIds}
          newHaikusAvailable={newHaikusAvailable}
          error={error}
          isFetching={isFetching}
          resetButton={this.resetButton} />
      </div>
    )
  }
}

const mapStateToProps = ({ feed }) => ({
  haikuIds: feed.get('haikuIds'),
  newHaikusAvailable: feed.get('newHaikusAvailable'),
  error: feed.get('error'),
  isFetching: feed.get('isFetching')
})

const mapDispatchToProps = dispatch => (
  bindActionCreators(feedActionCreators, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer)
