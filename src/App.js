import React, { Component } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { withRouter } from 'react-router';
import { observer } from 'mobx-react';

import Overview from './views/Overview.js'
import Improvements from './views/Improvements.js'
import Result from './views/Result.js'
import AddressInput from './views/AddressInput.js'


/*
* INPORTANT!
* Make sure that props AND store is delivered to components through
* render property for them to be accessible.
*/
class App extends Component {
  render() {
    return(
      <Switch>
        <Route exact path='/' render={(props) => <AddressInput {...props} store={this.props.store} />} />
        <Route exact path='/Overview' render={(props) => <Overview {...props} store={this.props.store} />} />
        <Route exact path='/Improvements' render={(props) => <Improvements {...props} store={this.props.store} />} />
        <Route exact path='/Result' render={(props) => <Result {...props} store={this.props.store} />} />
      </Switch>
    );
  }
}

// Use withRouter to ensure that rendering is not blocked by mobx
const AppWithRouter = withRouter(observer(App));

export default AppWithRouter;
