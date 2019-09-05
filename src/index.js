import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter as Router } from 'react-router-dom';
import store from './store/UserStore';

ReactDOM.render((
  <Router hashType="noslash">
    <App store={store} />
  </Router>
), document.getElementById('root'));
registerServiceWorker();
