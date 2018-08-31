import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import { formatUserInfo } from 'helpers/utils'
import { firebaseAuth } from 'config/constants'
import { Navigation } from 'components'
import { connect } from 'react-redux'
import { Home } from 'components'
import * as usersLikesActionCreators from 'redux/modules/usersLikes'

class MainContainer extends Component {

  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    authUser: PropTypes.func.isRequired,
    fetchingUserSuccess: PropTypes.func.isRequired,
    removeFetchingUser: PropTypes.func.isRequired,
    setUsersLikes: PropTypes.func.isRequired
  }

  componentDidMount () {
    firebaseAuth().onAuthStateChanged(user => {
      if(user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
        this.props.authUser(user.uid)
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now())
        this.props.setUsersLikes()
      } else {
        // Set finish fetching user to false to prevent default isFetching state of true and render a constant loading component
        this.props.removeFetchingUser()
      }
    })
  }

  render () {
    const { isFetching, isAuthed } = this.props
    return (
      <div>
        {isFetching ? null : <Navigation isAuthed={isAuthed} />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthed: state.users.isAuthed,
  isFetching: state.users.isFetching
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    ...userActionCreators,
    ...usersLikesActionCreators
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
