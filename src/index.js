import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

import { ActionCableProvider } from 'react-actioncable-provider';
import { API_WS_ROOT } from './constants';

ReactDOM.render(
    <BrowserRouter>
      <ActionCableProvider url={API_WS_ROOT}>
        <App />
      </ActionCableProvider>
    </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
