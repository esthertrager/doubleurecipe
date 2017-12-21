import React from 'react';
import ReactDOM from 'react-dom';
import LayoutContainer from './LayoutContainer';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

window.onload = () => {
  ReactDOM.render(
    <LayoutContainer />,
    document.querySelector('#container')
  );
};
