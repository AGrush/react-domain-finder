import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import App from './components/App';
import './index.css'
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={createStore(rootReducer, applyMiddleware(thunk))}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();