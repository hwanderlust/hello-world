import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

import { ActionCableProvider } from 'react-actioncable-provider';
import { API_WS_ROOT } from './constants';

import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ActionCableProvider url={API_WS_ROOT}>
        <App />
      </ActionCableProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
