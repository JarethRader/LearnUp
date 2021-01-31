import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './style.css';

ReactDOM.render(
  <Router>
    <Route path='/:filter?' component={App} />
  </Router>,
  document.getElementById('root')
);
