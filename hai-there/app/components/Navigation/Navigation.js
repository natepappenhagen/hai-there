import React from 'react';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { container, navContainer, link, linkLogin, logo } from './styles.css'
import { ModalContainer } from 'containers'
import Logo from 'media/bonsai.png'

/****************************************
      Navigation Links
*****************************************/
const NavLinks = ({ isAuthed }) => (
  isAuthed === true
    ? <ul>
        <li><NavLink exact activeStyle={activeStyle} className={link} to={isAuthed ? '/feed' : '/'}>Home</NavLink></li>
        <li><NavLink exact activeStyle={activeStyle} className={link} to='/about'>About</NavLink></li>
      </ul>
    : null
)
// Prop Types
NavLinks.propTypes = {
  isAuthed: PropTypes.bool.isRequired
}

///////////// Active styles for nav Link
const activeStyle = {
  backgroundColor: '#1877e6'
}

/****************************************
    Action Links for When authenticated
*****************************************/
const ActionLinks = ({ isAuthed }) => (
  isAuthed === true
  ? <ul>
      <li><ModalContainer /></li>
      <li><NavLink activeStyle={activeStyle} className={link} to='/logout'>Logout</NavLink></li>
    </ul>
  : <ul>
      <li><NavLink exact activeStyle={activeStyle} className={link} to='/'>Home</NavLink></li>
      <li><NavLink exact activeStyle={activeStyle} className={link} to='/about'>About</NavLink></li>
      <li><NavLink exact activeStyle={activeStyle} className={linkLogin} to='/auth'>Login</NavLink></li>
    </ul>
)

// Prop Types
ActionLinks.propTypes = {
  isAuthed: PropTypes.bool.isRequired
}

/****************************************
      Main Navigation Component
*****************************************/
const Navigation = ({ isAuthed }) => {
  return (
    <div className={container}>
      <img id={logo} src={Logo} alt='Logo' />
      <nav className={navContainer}>
        <NavLinks isAuthed={isAuthed} />
        <ActionLinks isAuthed={isAuthed} />
      </nav>
    </div>
  )
}

Navigation.propTypes = {
  isAuthed: PropTypes.bool.isRequired
}


export default Navigation
