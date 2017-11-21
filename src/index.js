import React from 'react';
import ReactDOM from 'react-dom';
import Component from './Component';
import 'bootstrap/dist/css/bootstrap.min.css';

window.onload = () => {
  ReactDOM.render(
    <Component />,
    document.querySelector('#container')
  );
};
