import React, {Component} from 'react'
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import { Switch,Router } from 'react-router-dom';
import history from '../history';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/datatable.css';
window.localStorage.setItem('AWT', true);
class Layout extends Component {
  
    render () {
      return (
          <Row>
            <Col sm={2}><Sidebar/></Col>
            <Col sm={10}>
            <Header/>
                <Router history={history}>
                  <Switch>
                  </Switch>
                </Router>
            </Col>
          </Row>
      )
    };
  }
  export default Layout;
