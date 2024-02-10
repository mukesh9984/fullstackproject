// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; // Change this import to point to your custom App component
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

