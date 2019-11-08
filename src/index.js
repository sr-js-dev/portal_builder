import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore'
import { Route, Switch, Router } from 'react-router-dom';
import App from './layouts/app';
import history from './history';
const store = configureStore()
window.React = React

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
      </Router>
    </Provider>,
  document.getElementById('app')
)
