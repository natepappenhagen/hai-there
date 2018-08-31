import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SignIn } from 'components'
import * as userActionCreators from 'redux/modules/users'


class AuthenticateContainer extends Component {

  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    fetchAndHandleAuthedUser: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  handleAuth = e => {
    e.preventDefault()
    this.props.fetchAndHandleAuthedUser()
      .then(() => this.context.router.history.replace('feed'))
  }

  render() {
    const { isFetching, error } = this.props
    return (
      <div style={{paddingTop: '100px'}}>
        <SignIn onAuth={this.handleAuth} error={error}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isFetching: state.users.isFetching,
  error: state.users.error
})

const mapDispatchToProps = dispatch => (
  bindActionCreators(userActionCreators, dispatch)
)


export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer)
