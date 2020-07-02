import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import './normalize.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import store from './state/store'

ReactDOM.render(
  <Provider store={store().store}>
    <PersistGate loading={null} persistor={store().persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
