import React from 'react'
import {
  HashRouter,
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import { connect } from 'react-redux'
import { MainContainer, HomeContainer, AuthenticateContainer, FeedContainer, LogoutContainer, UserContainer, HaikuDetailContainer } from 'containers'
import { Loading, About } from 'components'

const PrivateRoute = ({ component: Component, isAuthed, isFetching, ...rest }) => (
  <Route {...rest} render={props => {
    if(isFetching) return <Loading />
    return isAuthed ? (
      <Component {...props} />
    ) : (
      <Redirect to={
        isAuthed && !isFetching ? 'pathname: props.location.pathname' : '/auth'
      }/>
    )
  }}/>
)


/****************************************
      I had to use react routers
      built in redirect component
      to redirect a user if they were
      unauthed, this was to create private
      routes
*****************************************/


const Routes = ({ isAuthed, isFetching }, props) => (
  <Router>
    <div>
      <Route path='/' component={MainContainer} />
      <Route exact path='/' component={isAuthed ? FeedContainer : HomeContainer} />
      <Route path='/auth' render={() => {
        if(isFetching) return <Loading text='Authenticating'/>
        return isAuthed ? <Redirect to='/feed' /> : <AuthenticateContainer />
      }} />
      <PrivateRoute isFetching={isFetching} isAuthed={isAuthed} exact path='/user/:uid' component={UserContainer} />
      <PrivateRoute isFetching={isFetching} isAuthed={isAuthed} exact path='/haiku/:haikuId' component={HaikuDetailContainer} />
      <Route path='/logout' component={LogoutContainer} />
      <Route exact path='/About' component={About} />
      <PrivateRoute isFetching={isFetching} isAuthed={isAuthed} path='/feed' component={FeedContainer} />
    </div>
  </Router>
)

const mapStateToProps = state => ({isAuthed: state.users.isAuthed, isFetching: state.users.isFetching})

export default connect(mapStateToProps)(Routes)
