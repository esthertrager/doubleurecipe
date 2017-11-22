import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

window.onload = () => {
  ReactDOM.render(
    <App />,
    document.querySelector('#container')
  );
};
