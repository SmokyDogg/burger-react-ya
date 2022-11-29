import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/index.js';
import { BrowserRouter as Router} from 'react-router-dom';
import { compose, applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));     
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const store = createStore(rootReducer, enhancer); 
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);