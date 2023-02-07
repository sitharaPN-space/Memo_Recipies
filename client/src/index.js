import  ReactDOM  from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import App from './App';
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)))
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    // <React.StrictMode>
    <Provider store={store}>    
      <App />
      </Provider>
    // </React.StrictMode>
  );

// ReactDOM.render(
// <Provider store={store}>
//     <App />
// </Provider>, 
//document.getElementById('root'));