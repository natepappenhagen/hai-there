import React from 'react'
import ReactDOM from 'react-dom'
import Routes from 'config/Routes'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import * as reducers from 'redux/modules'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const store = createStore(combineReducers(reducers), compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
))


ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
)
