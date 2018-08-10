import React, {
  Component
} from 'react'
import {
  Switch,
  Route,
  HashRouter
} from 'react-router-dom'

import Overview from './views/Overview.js'
import Improvements from './views/Improvements.js'
import Result from './views/Result.js'
import AddressInput from './views/AddressInput.js'

class App extends Component {
  render() {
    return(
      <Switch>
        <Route exact path='/' component={AddressInput}/>
        <Route exact path='/Overview' component={Overview}/>
        <Route exact path='/Improvements' component={Improvements}/>
        <Route exact path='/Result' component={Result}/>
      </Switch>
    );
  }
}

export default App;
