import React, {Component} from 'react'
import { Route, Switch,Router } from 'react-router-dom';
import GuestLayout from './layout_guest'
import history from '../history';
import './app.css'

class App extends Component {
  render () {
    return (
      <Router history={history}>
         <Switch >
          <Route path="/" component={GuestLayout} />
        </Switch>
      </Router>
     
    )
  };
}

export default App