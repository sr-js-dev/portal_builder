import React, {Component} from 'react'
import '../assets/css/style.min.css';
import '../assets/css/selectric.css';
import  { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authAction  from '../actions/authAction';
import SessionManager from '../components/session_manage';
import API from '../components/api'
import Axios from 'axios';
const mapStateToProps = state => ({ 
    ...state.auth,
});
const mapDispatchToProps = (dispatch) => ({
    getToken: () =>
        dispatch(authAction.fetchGetToken()),
});
class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuItemList:[],
        }
    }
    componentDidMount () {
        this._isMounted = true;
        this.props.getToken();
        this.getMenuItems();
    }
    getMenuItems = () =>{
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.get(API.GetMenuItems, headers)
        .then(result => {
            if(this._isMounted){
                this.setState({menuItemList: result.data.Items})
            }
        });
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render () {
        let menuItemList =  this.state.menuItemList;
        return (
            <div>
                <aside className="sidebar">
                    <a href="/" className="sidebar__logo"><img src={require('../assets/images/appmakerz.svg')} alt="appzmakerz"></img></a>
                    <nav className="menu">
                        {menuItemList &&(<ul className="menu__list">
                            {
                                menuItemList.map((data,i) =>(
                                    <li  key={i} id="0" className="menu__item" onClick={this.props.onHide}>
                                        <Link to={{pathname:"./"+data.URL, state: { pageProperty: data }}} className={window.location.pathname === "/dashboard" ? 'menu__link menu__link--active' : 'menu__link menu__link'}>
                                            <span className="menu__link-img-wrap">
                                                <img src={require("../assets/images/icon-dashboard.svg")} alt="Dashboard"/>
                                            </span>
                                            <span>{data.Name}</span>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>)}
                    </nav>
                </aside>
            </div>
        )
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
