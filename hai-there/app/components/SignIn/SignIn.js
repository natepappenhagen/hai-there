import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Button from 'material-ui/Button';
import { container, loginHeader, lead, follow, errorBox, loginButton, formControl } from './styles.css'
import * as userActionCreators from 'redux/modules/users'
import { FacebookAuthButton } from 'components'

/****************************************
      Sign in form component
*****************************************/
const InputForm = ({ handleSubmit, handlePassword, handleEmail, email, password, }) => (
  <form onSubmit={handleSubmit} className={formControl}>
    <input
      type='email'
      onChange={handleEmail}
      placeholder='Email Address'
      value={email} />
    <input
      type='password'
      onChange={handlePassword}
      placeholder='Password'
      value={password} />
    <button
      disabled={!email || !password}
      className={loginButton}
      type='submit'>
      Sign In
    </button>
  </form>
)

// Sign in form Prop Types
InputForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  handleEmail: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}


/****************************************
      Main Component
*****************************************/
class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }

  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    loginError: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.fetchAndHandlePasswordLogin(this.state.email, this.state.password)
    this.setState({email: '', password: ''})
  }

  handleEmail = e => {
    this.setState({email: e.target.value})
  }

  handlePassword = e => {
    this.setState({password: e.target.value})
  }

  render () {
    const { password, email } = this.state
    const { loginError, error } = this.props
    return (
      <Paper className={container} elevation={3}>
        <div className={loginHeader}>
          <h2>Login</h2>
          <p>Demo email address: <span>demo@demodemo.com</span><br />Demo password: <span>demodemo</span></p>
        </div>
        {loginError ? <div className={errorBox}>{loginError}</div> : null}
        <InputForm
          handleSubmit={this.handleSubmit}
          handleEmail={this.handleEmail}
          handlePassword={this.handlePassword}
          email={email}
          password={password} />
          {error ? <div className={errorBox}>{error}</div> : null}
        <FacebookAuthButton error={this.props.error} onAuth={this.props.onAuth}/>
        <Button> github here? </Button>
      </Paper>
    )
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.users.isFetching,
  loginError: state.users.loginError,
  error: state.users.error
})

const mapDispatchToProps = dispatch => (
  bindActionCreators(userActionCreators, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)