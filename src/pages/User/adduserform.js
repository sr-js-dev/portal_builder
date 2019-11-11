import React, {Component} from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import * as authAction  from '../../actions/authAction';
import SessionManager from '../../components/session_manage';
import API from '../../components/api'
import Axios from 'axios';
import ListErrors from '../../components/listerrors';
import { trls } from '../../components/translate';
const mapStateToProps = state => ({ 
    ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({
    postUserError: (params) =>
        dispatch(authAction.dataServerFail(params)),
    removeState: () =>
        dispatch(authAction.blankdispatch()),
});
class Purchaseform extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {  
            roles:[{"value":"Administrator","label":"Administrator"},{"value":"Customer","label":"Customer"}],
            selectrolvalue:"Select...",
            selectrollabel:"Select...",
            val1:'',
            selectflag:true
        };
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    componentDidMount() {
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const clientFormData = new FormData(event.target);
        const data = {};
        for (let key of clientFormData.keys()) {
            data[key] = clientFormData.get(key);
        }
        if(this.props.mode==="add"){
            var params = {
                "firstName": data.firstname,
                "lastName": data.lastname,
                "email": data.email1,
                "password": data.password1,
                "confirmPassword": data.confirmpassword1,
                "roles": [
                    data.roles
                ]
            }
            var headers = SessionManager.shared().getAuthorizationHeader();
            Axios.post(API.PostUserData, params, headers)
            .then(result => {
                this.props.onGetUser()
                this.props.onHide();
                this.setState({selectflag:true})
                this.props.removeState();
            })
            .catch(err => {
                this.props.postUserError(err.response.data.Password)
            });
        }else{
            params = {
                "firstName": data.firstname,
                "lastName": data.lastname,
                "password": data.password1,
                "confirmPassword": data.confirmpassword1,
                "roles": [
                    data.roles
                ]
            }
            headers = SessionManager.shared().getAuthorizationHeader();
            Axios.put(API.PostUserUpdate+this.props.userID, params, headers)
            .then(result => {
                this.props.onGetUser()
                this.props.onHide();
                this.setState({selectflag:true})
                this.props.removeState();
            })
            .catch(err => {
                this.props.postUserError(err.response.data.PasswordTooShort)
                

            });
        }
    }
    getRoles (value) {
        this.setState({selectrollabel:value.label, selectrolvalue:value.value})
        this.setState({val1:value.value})
        this.setState({selectflag:false})
    }
    render(){   
        let updateData = [];
        let roles = [];
        let roledata=''
        if(this.props.userUpdateData){
            updateData=this.props.userUpdateData;
            roles = updateData.roles;
            if(roles){
                roledata=roles[0].name;
            }
        }
      
        return (
            <Modal
            show={this.props.show}
            onHide={this.props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                {this.props.mode==="add" ? (
                    <Modal.Title id="contained-modal-title-vcenter">
                        {trls('Add_User')}
                    </Modal.Title>
                ) : <div/>
                }
                {this.props.mode==="view" ? (
                    <Modal.Title id="contained-modal-title-vcenter">
                        {trls('View_User')}
                    </Modal.Title>
                ) : <div/>
                }
                {this.props.mode==="update" ? (
                    <Modal.Title id="contained-modal-title-vcenter">
                        {trls('Edit_User')}
                    </Modal.Title>
                ) : <div/>
                }
            </Modal.Header>
            <Modal.Body>
                { this.props.mode==="view" ? (
                    <Form className="container product-form" onSubmit = { this.handleSubmit }>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            {trls('FirstName')}     
                        </Form.Label>
                        <Col sm="9" className="product-text">
                            { updateData&&this.props.mode==="view" ? (
                                <Form.Control type="text" name="firstname" readOnly defaultValue={updateData.firstName} required placeholder={trls('FirstName')} />
                            ) : <div/>
                            }
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            {trls('LastName')}      
                        </Form.Label>
                        <Col sm="9" className="product-text">
                            { updateData&&this.props.mode==="view" ? (
                                <Form.Control type="text" name="lastname" readOnly defaultValue={updateData.lastName} required placeholder={trls('LastName')} />
                            ) : <Form.Control type="text" name="lastname" required placeholder="LastName" />
                            }
                            
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            {trls('UserName')}     
                        </Form.Label>
                        <Col sm="9" className="product-text">
                            { updateData&&this.props.mode==="view" ? (
                                <Form.Control type="text" name="email1" readOnly defaultValue={updateData.userName} required placeholder={trls('UserName')}/>
                            ) : <Form.Control type="text" name="email1" required placeholder={trls('Email')}/>
                            }
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            {trls('Email')}     
                        </Form.Label>
                        <Col sm="9" className="product-text">
                            { updateData&&this.props.mode==="view" ? (
                                <Form.Control type="text" name="email1" readOnly defaultValue={updateData.email} required placeholder={trls('Email')}/>
                            ) : <Form.Control type="text" name="email1" required placeholder={trls('Email')} />
                            }
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextSupplier">
                        <Form.Label column sm="3">
                            {trls('Roles')} 
                        </Form.Label>
                        <Col sm="9" className="product-text">
                            { updateData&&this.props.mode==="view" ? (
                                <Form.Control type="text" name="email1" readOnly defaultValue={roledata} required placeholder="Email" />
                            ) : <div/>
                            }
                            
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            {trls('Active')}     
                        </Form.Label>
                        <Col sm="9" className="product-text">
                            { updateData&&this.props.mode==="view" ? (
                                <Form.Check inline name="Intrastat" type="checkbox" disabled defaultChecked={updateData.isActive} id="Intrastat" />
                            ) : <div/>
                            }
                            
                        </Col>
                    </Form.Group>
                </Form>
                ) : 
                <Form className="container product-form" onSubmit = { this.handleSubmit }>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            {trls('FirstName')}     
                        </Form.Label>
                        <Col sm="9" className="product-text">
                            { updateData&&this.props.mode==="update" ? (
                                <Form.Control type="text" name="firstname" defaultValue={updateData.firstName} required placeholder={trls('FirstName')} />
                            ) : <Form.Control type="text" name="firstname" required placeholder={trls('FirstName')} />
                            }
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            {trls('LastName')}     
                        </Form.Label>
                        <Col sm="9" className="product-text">
                            { updateData&&this.props.mode==="update" ? (
                                <Form.Control type="text" name="lastname" defaultValue={updateData.lastName} required placeholder={trls('LastName')} />
                            ) : <Form.Control type="text" name="lastname" required placeholder={trls('LastName')} />
                            }
                            
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            {trls('Email')}     
                        </Form.Label>
                        <Col sm="9" className="product-text">
                            { updateData&&this.props.mode==="update" ? (
                                <Form.Control type="text" name="email1" defaultValue={updateData.email} required placeholder={trls('Email')}/>
                            ) : <Form.Control type="text" name="email1" required placeholder={trls('Email')}/>
                            }
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            {trls('Password')}     
                        </Form.Label>
                        <Col sm="9" className="product-text">
                            <ListErrors errors={this.props.error} />
                            <Form.Control type="password" name="password1" required placeholder={trls('Password')} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            {trls('ConfirmPassword')}     
                        </Form.Label>
                        <Col sm="9" className="product-text">
                            <Form.Control type="password" name="confirmpassword1" required placeholder={trls('ConfirmPassword')}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextSupplier">
                        <Form.Label column sm="3">
                            {trls('Roles')} 
                        </Form.Label>
                        <Col sm="9" className="product-text">
                            { roledata&&this.state.selectflag&&this.props.mode==="update" ? (
                                <Select
                                    name="roles"
                                    options={this.state.roles}
                                    value={{"value":roledata,"label":roledata}}
                                    onChange={val => this.getRoles(val)}
                                />
                            ) : <Select
                                    name="roles"
                                    options={this.state.roles}
                                    onChange={val => this.getRoles(val)}
                                />
                            }
                            
                            {!this.props.disabled&&this.props.mode==="add" && (
                                <input
                                    onChange={val=>console.log()}
                                    tabIndex={-1}
                                    autoComplete="off"
                                    style={{ opacity: 0, height: 0 }}
                                    value={this.state.val1}
                                    required
                                    />
                                )}
                        </Col>
                    </Form.Group>
                   
                    <Form.Group style={{textAlign:"center"}}>
                        <Button type="submit" style={{width:"100px"}}>{trls('Save')}</Button>
                    </Form.Group>
                </Form>
                }
                
            </Modal.Body>
            </Modal>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Purchaseform);