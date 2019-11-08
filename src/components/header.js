import React, {Component} from 'react'
import '../assets/css/style.min.css';
import '../assets/css/selectric.css';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
const mapStateToProps = state => ({ 
    ...state.auth,
});
const mapDispatchToProps = (dispatch) => ({

});
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {  
        };
    }
    render () {
      return (
        <div>
           <header className="header">
                <div className="header__burger-btn">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <a href="/" className="header__logo-mob">
                    <img src={require("../assets/images/appmakerz.svg")} alt="logo"/>
                </a>
                <div className="header__user">
                    <img src={require("../assets/images/avatar.jpg")} alt="User avatar" className="header__user-img"/>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{color:"#000000"}}>
                            Johan Boerema
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </header>
        </div>
      )
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Header);
