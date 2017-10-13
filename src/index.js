import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import reducer from './reducers'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux';

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const rootReducer = combineReducers({
  reducer,
  form: formReducer
})

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
)

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
