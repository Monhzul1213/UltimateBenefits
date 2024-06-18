import React from 'react';
import { createRoot } from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import './index.css';
import { App  } from './App';
import { store, persistor } from './helpers/store';

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
     </PersistGate>
  </Provider>
);