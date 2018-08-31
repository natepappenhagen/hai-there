import React from 'react'
import { text } from './styles.css'
import { centeredContainer } from 'sharedStyles/styles.css'
import { Link } from 'react-router-dom'

const linkStyle = {
  textDecoration: 'none',
  color: '#fff',
  fontWeight: '400',
  background: '#4a90e2',
  padding: '5px 20px',
  borderRadius: '2px',
  fontSize: '25px',
}

const Logout = () => (
  <div className={centeredContainer}>
    <h2 className={text}>Thank you for using Hai-there. <br />You are now logged out!</h2>
    <Link style={linkStyle} to='/'>Return Home</Link>
  </div>
)


export default Logout
