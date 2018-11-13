import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter as Router } from 'react-router-dom';
import store from './store/UserStore';
import 'bootstrap/dist/css/bootstrap.min.css';

var rootDir = process.env.REACT_APP_COMFORTSCORE_ROOT_DIRECTORY,
    widgetId = process.env.REACT_APP_COMFORTSCORE_WIDGET_ID;

ReactDOM.render((
  <Router hashType="noslash">
    <App store={store} />
  </Router>
), document.getElementById(widgetId));
registerServiceWorker();
