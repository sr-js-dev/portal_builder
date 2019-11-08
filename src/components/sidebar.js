import React, {Component} from 'react'
import '../assets/css/style.min.css';
import '../assets/css/selectric.css';
import  { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import SessionManager from '../components/session_manage';
// import API from '../components/api'
// import Axios from 'axios';
const mapStateToProps = state => ({ 
    ...state.auth,
});
const mapDispatchToProps = (dispatch) => ({

});
class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    componentDidMount () {
        this._isMounted = false;
        this.getMenuItems();
    }
    getMenuItems = () =>{
        // Axios.get(API.GetSupplierList, headers)
        // .then(result => {s
        //   if(this._isMounted){
        //     this.setState({Supplier: result.data.Items})
        //   }
        // });
      }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render () {
      return (
        <div>
            <aside className="sidebar">
                <a href="/" className="sidebar__logo"><img src={require('../assets/images/appmakerz.svg')} alt="appzmakerz"></img></a>
                <nav className="menu">
                    <ul className="menu__list">
                        <li id="0" className="menu__item">
                            <Link to="./dashboard" className={window.location.pathname === "/dashboard" ? 'menu__link menu__link--active' : 'menu__link menu__link'}>
                                <span className="menu__link-img-wrap">
                                    <img src={require("../assets/images/icon-dashboard.svg")} alt="Dashboard"/>
                                </span>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li className="menu__separator"></li>
                        <li id="1" className="menu__item">
                            <Link to={'/product'} className={window.location.pathname === "/product" || window.location.pathname === "/product-detail" ? 'menu__link menu__link--active' : 'menu__link menu__link'}>
                                <span className="menu__link-img-wrap">
                                    <img src={require("../assets/images/icon-orders.svg")} alt="Orders"/>
                                </span>
                                <span>Products</span>
                            </Link>
                        </li>
                        <li id="2" className="menu__item">
                            <Link to={'/sales-order'} className={window.location.pathname === "/sales-order" || window.location.pathname === "/sales-order-detail" ? 'menu__link menu__link--active' : 'menu__link menu__link'} >
                                <span className="menu__link-img-wrap">
                                    <img src={require("../assets/images/icon-orders.svg")} alt="Orders"/>
                                </span>
                                <span>Sales_Order</span>
                            </Link>
                        </li>
                        <li id="3" className="menu__item">
                            <Link to={'/purchase-order'} className={window.location.pathname === "/purchase-order" || window.location.pathname === "/purchase-order-detail" ? 'menu__link menu__link--active' : 'menu__link menu__link'} >
                                <span className="menu__link-img-wrap">
                                    <img src={require("../assets/images/icon-orders.svg")} alt="Orders"/>
                                </span>
                                <span>Purchase_Order</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
      )
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
