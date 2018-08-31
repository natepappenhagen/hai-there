import React from 'react';
import PropTypes from 'prop-types'
import { button, fbContainer, fbLogo } from './styles.css'
import FacebookIcon from 'react-icons/lib/fa/facebook'

const GitHubAuthButton = ({  onAuth }) => (
  <div className={fbContainer} onClick={onAuth}>
    <div className={fbLogo}><FacebookIcon /></div>
    <button className={button}>
      Sign in with GitHub
    </button>
  </div>
)

GitHubAuthButton.propTypes = {
  onAuth: PropTypes.func.isRequired
}

export default GitHubAuthButton
