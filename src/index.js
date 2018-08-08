import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {
  BrowserRouter as Router
} from 'react-router-dom'

var rootDir = process.env.REACT_APP_COMFORTSCORE_ROOT_DIRECTORY,
    widgetId = process.env.REACT_APP_COMFORTSCORE_WIDGET_ID;

ReactDOM.render((
  <Router basename={rootDir} path="/">
    <App />
  </Router>
), document.getElementById(widgetId));
registerServiceWorker();
