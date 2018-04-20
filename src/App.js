import React, {
  Component
} from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'

import Overview from './views/Overview.js'
import Improvements from './views/Improvements.js'

class App extends Component {
  render() {
    return(
      <Switch>
        <Route exact path='/' component={Overview}/>
        <Route path='/improvements' component={Improvements}/>
      </Switch>
    );
  }
}

export default App;