import React, {
  Component
} from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'

import Overview from './views/Overview.js'
import Improvements from './views/Improvements.js'
import Result from './views/Result.js'

class App extends Component {
  render() {
    return(
      <Switch>
        <Route exact path='/' component={Overview}/>
        <Route path='/improvements' component={Improvements}/>
        <Route path='/result' component={Result}/>
      </Switch>
    );
  }
}

export default App;
