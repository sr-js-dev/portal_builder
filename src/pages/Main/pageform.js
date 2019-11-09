import React, {Component} from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
// import Select from 'react-select';
import { connect } from 'react-redux';
// import DatePicker from "react-datepicker";
import Select from 'react-select';
import SessionManager from '../../components/session_manage';
import API from '../../components/api'
import Axios from 'axios';
// import history from '../history';
const mapStateToProps = state => ({ 
    ...state.auth,

});

const mapDispatchToProps = (dispatch) => ({
});
class Pageform extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {  
            formId:props.formId,
            data:[]
        };
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    componentDidMount() {
        this._isMounted = true;
        this.getFormInfor()
        this.getFormFieldInfor()
    }
    getFormInfor = () => {
        let params = {
            'formid':this.state.formId
          }
          var headers = SessionManager.shared().getAuthorizationHeader();
          Axios.post(API.GetFormInfo, params, headers)
          .then(result => {
              this.setState({formInfo:result.data.Items[0]})
          });
    }
    getFormFieldInfor = () => {
        let params = {
            'formid':this.state.formId
          }
          var headers = SessionManager.shared().getAuthorizationHeader();
          Axios.post(API.GetFormFileds, params, headers)
          .then(result => {
              this.setState({formFieldInfo:result.data.Items})
              this.dropDownDataCount();
              this.getFormFieldData();
          });
    }
    dropDownDataCount = () =>{
        let formFieldInfo=this.state.formFieldInfo;
        let k=0
        formFieldInfo.map((data, index) => {
            if(data.fieldtype==="Dropdown"){
                k++;
            }
          return formFieldInfo;
        })
        this.setState({k_flag:k})
    }
    getFormFieldData = () =>{
        let formFieldInfo=this.state.formFieldInfo;
        let headers = SessionManager.shared().getAuthorizationHeader();
        let params = [];
        let dropdownUrl = '';
        formFieldInfo.map((data, index) => {
            params = {
                "formfieldid":1
            }
            if(data.fieldtype==="Dropdown"){
                Axios.post(API.GetFormDropdownInfo, params, headers)
                .then(result => {
                    dropdownUrl = result.data.Items[0].DropdownFunction;
                    data.url=dropdownUrl;
                    this.dropDownData(data)
                })
            }
          return formFieldInfo;
        })
        
    }
    dropDownData = (value) => {
        let arrayData = [];
        var array=this.state.data;
        let headers = SessionManager.shared().getAuthorizationHeader();
        Axios.get(value.url, headers)
        .then(result => {
            arrayData = result.data.Items.map( s => ({value:s.key,label:s.value}));
            value.arrayData=arrayData;
            array.push(value);
            if(this._isMounted){
                this.setState({data:array});
            }
        });
    }

    optionData = (val) => {
        let formFieldInfo=this.state.data;
        let optionarray = [];
        if(formFieldInfo){
            formFieldInfo.map((data, index) => {
                if(data.parameter===val){
                    optionarray=data.arrayData;
                }
              return formFieldInfo;
            })
        }
        return optionarray

    }
    handleSubmit = (event) => {
        // event.preventDefault();
        // const clientFormData = new FormData(event.target);
        // const data = {};
        // for (let key of clientFormData.keys()) {
        //     data[key] = clientFormData.get(key);
        // }
        // var headers = SessionManager.shared().getAuthorizationHeader();
        // Axios.post(API.PostSalesOrder, data, headers)
        // .then(result => {
        //     this.props.onHide();
        //     history.push('/sales-order-detail',{ newId: result.data.NewId, customercode:this.state.val1.value});
        // });
    }
    render(){
        var dropDownData=[]
        if(this.state.data){
            if(this.state.data.length===this.state.k_flag){
                dropDownData = this.state.data;
            }
        }
        let formInfo = [];
        if(this.state.formInfo){
            formInfo = this.state.formInfo;
        }
        let formFieldInfo = [];
        if(this.state.formInfo){
            formFieldInfo = this.state.formFieldInfo;
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
                <Modal.Title id="contained-modal-title-vcenter">
                    {formInfo.Name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {formFieldInfo &&(<Form className="container product-form" onSubmit = { this.handleSubmit }>
                        {
                            formFieldInfo.map((data,i) =>(
                                <Form.Group id={i} key={i} as={Row} controlId="formPlaintextSupplier">
                                    <Form.Label column sm="3">
                                        {data.label}
                                    </Form.Label>
                                    <Col sm="9" className="product-text">
                                        {data.fieldtype==="Dropdown"&& dropDownData && (
                                            <Select
                                                name={data.parameter}
                                                options={this.optionData(data.parameter)}
                                                onChange={val => this.setState({val1:val})}
                                            />
                                        )}
                                        {data.fieldtype==="Text" && (
                                            <Form.Control type="text" name={data.parameter} required placeholder={data.label} />
                                        )}
                                        {!this.props.disabled && (
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
                        ))
                        }
                </Form>)}
                <Form.Group style={{textAlign:"center"}}>
                    <Button type="submit">{formInfo.SubmitLabel}</Button>
                </Form.Group>
            </Modal.Body>
            </Modal>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Pageform);