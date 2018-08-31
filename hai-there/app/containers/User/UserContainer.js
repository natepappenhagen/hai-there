import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { User } from 'components'
import { bindActionCreators } from 'redux'
import * as usersActionCreators from 'redux/modules/users'
import * as usersHaikusActionCreators from 'redux/modules/usersHaikus'
import { staleUser, staleHaikus } from 'helpers/utils'

class UserContainer extends Component {

  componentDidMount () {
    const uid = this.props.match.params.uid
    if(this.props.noUser ===  true || staleUser(this.props.lastUpdatedUser)) {
      this.props.fetchAndHandleUser(uid)
    }

    if(this.props.noUser === true || staleHaikus(this.props.lastUpdatedHaikus)) {
      this.props.fetchAndHandleUsersHaikus(uid)
    }
  }

  static propTypes = {
    noUser: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    fetchAndHandleUsersHaikus: PropTypes.func.isRequired,
    fetchAndHandleUser: PropTypes.func.isRequired,
    haikuIds: PropTypes.array.isRequired,
    lastUpdatedUser: PropTypes.number.isRequired,
    lastUpdatedHaikus: PropTypes.number.isRequired
  }

  render () {
    const { noUser, name, isFetching, error, haikuIds } = this.props

    return (
      <div>
        <User
          noUser={noUser}
          name={name}
          isFetching={isFetching}
          error={error}
          haikuIds={haikuIds}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ users, usersHaikus }, props) => {
  let urlId = props.match.params.uid
  let thisUsersHaikus = usersHaikus[props.match.params.uid]
  const user = users[props.match.params.uid]
  const noUser = typeof user === 'undefined'
  return {
    noUser,
    name: noUser ? '' : user.info.name,
    isFetching: users.isFetching || usersHaikus.isFetching,
    error: users.error || usersHaikus.error,
    lastUpdatedUser: user ? user.lastUpdated : 0,
    lastUpdatedHaikus: thisUsersHaikus ? thisUsersHaikus.lastUpdated : 0,
    haikuIds: thisUsersHaikus ? thisUsersHaikus.haikuIds : []
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({...usersActionCreators, ...usersHaikusActionCreators}, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)
