import React from 'react';
import PropTypes from 'prop-types'
import { button, fbContainer, fbLogo } from './styles.css'
import FacebookIcon from 'react-icons/lib/fa/facebook'

const FacebookAuthButton = ({  onAuth }) => (
  <div className={fbContainer} onClick={onAuth}>
    <div className={fbLogo}><FacebookIcon /></div>
    <button className={button}>
      Sign in with Facebook
    </button>
  </div>
)

FacebookAuthButton.propTypes = {
  onAuth: PropTypes.func.isRequired
}

export default FacebookAuthButton
