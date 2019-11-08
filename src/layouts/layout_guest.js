import React, {Component} from 'react'
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import page from '../pages/page'
import { Switch, Router, Route } from 'react-router-dom';
import history from '../history';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/datatable.css';
class Layout extends Component {
  
    render () {
      let path = history.location.pathname;
      return (
          <Row>
            <Col sm={2}><Sidebar/></Col>
            <Col sm={10}>
            <Header/>
                <Router history={history}>
                  <Switch>
                    <Route path={path} component={page}/>
                  </Switch>
                </Router>
            </Col>
          </Row>
      )
    };
  }
  export default Layout;
