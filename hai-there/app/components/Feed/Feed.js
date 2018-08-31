import React from 'react';
import propTypes from 'prop-types'
import { newHaikuContainer, header, haikuFeedContainer } from './styles.css'
import { errorMsg } from 'sharedStyles/styles.css'
import { HaikuContainer } from 'containers'
import { Loading } from 'components'
import { List } from 'immutable'

/****************************************
      New Haikus Button
*****************************************/
const NewHaikusAvailable = ({ handleClick }) => (
  <div className={newHaikuContainer} onClick={handleClick}>
    New Haikus Available
  </div>
)

// New Haikus Button Proptypes
NewHaikusAvailable.propTypes = {
  handleClick: propTypes.func.isRequired
}

/****************************************
              Feed
*****************************************/
const Feed = ({ haikuIds, error, isFetching, newHaikusAvailable, resetButton }) => {
  return isFetching
    ? <Loading text={'Getting Feed'}/>
    : <div className={haikuFeedContainer}>
      {newHaikusAvailable ? <NewHaikusAvailable handleClick={resetButton} /> : null}
      {haikuIds.size === 0
        ? <p className={header}> There are no haikus yet!</p>
        : null}
        <h1 className={header}>Feed</h1>
      {haikuIds.map(id => (
        <HaikuContainer haikuId={id} key={id} />
      ))}
      {error ? <p className={errorMsg}>{error}</p> : null}
    </div>
}

// Feed propTypes
Feed.propTypes = {
  haikuIds: propTypes.instanceOf(List).isRequired,
  error: propTypes.string.isRequired,
  isFetching: propTypes.bool.isRequired,
  newHaikusAvailable: propTypes.bool.isRequired,
  resetButton: propTypes.func.isRequired
}

export default Feed
