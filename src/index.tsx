/**
 * Movies App
 * Higher Order Component
 * Configures the Redux Store and Redux Persist
 */

import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './redux';
import App from './pages';

// Create redux store
const initialState = {};
const { store, persistor } = configureStore(initialState);

const HOC = (): React.ReactNode => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

export default HOC;
