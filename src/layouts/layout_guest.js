import React, {Component} from 'react'
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import page from '../pages/Main/page'
import { Switch, Router, Route } from 'react-router-dom';
import history from '../history';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/datatable.css';
import SessionManager from '../components/session_manage';
import API from '../components/api'
import Axios from 'axios';
import User from '../pages/User/user_register'
class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItemList:[],
    }
  }
  componentDidMount () {
    this._isMounted = true;
    this.getMenuItems();
  }
  getMenuItems = () =>{
    var headers = SessionManager.shared().getAuthorizationHeader();
    Axios.get(API.GetMenuItems, headers)
    .then(result => {
        if(this._isMounted){
          this.setState({menuItemList:result.data.Items})
        }
    });
  }
  render () {
    let menuItemList =  this.state.menuItemList;
    return (
        <Row>
          <Col sm={2} style={{paddingLeft:"0px"}}><Sidebar/></Col>
          <Col sm={10}>
          <Header/>
            <Router history={history}>
              <Route path={"/user"} component={User}/>
              {menuItemList &&(<Switch>
                { 
                    menuItemList.map((data,i) =>(
                      <Route key={i} path={"/"+data.URL} component={page}/>
                    ))
                }
            </Switch>)}
            </Router>
          </Col>
        </Row>
    )
  };
  }
  export default Layout;
