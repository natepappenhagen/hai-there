import React from 'react';
import PropTypes from 'prop-types'
import { userContainer, header } from './styles.css'
import { Loading } from 'components'
import { HaikuContainer } from 'containers'

const User = ({ noUser, isFetching, name, haikuIds, error }) => (
  noUser
    ? <p className={header}>This user does not exist</p>
    : <div>
      {isFetching
        ? <Loading text='Getting User'/>
        : <div>
          <div className={userContainer}>
            <div>{name}</div>
          </div>
          {haikuIds.map(id => <HaikuContainer haikuId={id} key={id} />)}
          {haikuIds.length === 0
            ? <p className={header}>{`It looks like ${name.split(' ')[0]} hasnt made any haikus yet.`}</p>
            : null}
          </div>}
        {error ? <p className={errorMsg}>{error}</p> : null}
    </div>
)

// Prop Types
User.propTypes = {
  noUser: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  haikuIds: PropTypes.array.isRequired
}

export default User
