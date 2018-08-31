import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutAndUnauth } from 'redux/modules/users'
import { Logout, Loading } from 'components'

class LogoutContainer extends Component {

  state = {
    loggingOut: true
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.dispatch(logoutAndUnauth())
    setTimeout(() => {
      this.setState({loggingOut: false})
    }, 2000)
  }

  render () {
    return this.state.loggingOut
    ? <Loading text='Logging Out'/>
    : <Logout />
  }
}

export default connect()(LogoutContainer)
