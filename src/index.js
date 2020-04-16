import React from 'src/node_modules/react';
import ReactDOM from 'src/node_modules/react-dom';
import { createStore, applyMiddleware } from 'src/node_modules/redux';
import thunk from 'src/node_modules/redux-thunk'
import rootReducer from './reducers';
import { Provider } from 'src/node_modules/react-redux';
import App from './components/App';
import 'src/index.css'
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