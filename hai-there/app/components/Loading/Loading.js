import React from 'react'
import PropTypes from 'prop-types'
import { design, loadingContainer, para } from './styles.css'

// Component
const Loading = ({ text }) => (
  <div className={loadingContainer}>
    <div className={design}></div>
    <p className={para}>{text}</p>
  </div>
)

// Prop Types
Loading.propTypes = {
  text: PropTypes.string
}

// Default Props
Loading.defaultProps = {
  text: 'Loading'
}

export default Loading
