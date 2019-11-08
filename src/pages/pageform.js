import React, {Component} from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
// import Select from 'react-select';
import { connect } from 'react-redux';
// import DatePicker from "react-datepicker";
import Select from 'react-select';
import SessionManager from '../components/session_manage';
import API from '../components/api'
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
              this.getFormFieldData();
          });
    }
    getFormFieldData = () =>{
        // let formFieldInfo=this.state.formFieldInfo;
        // let headers = SessionManager.shared().getAuthorizationHeader();
        // let params = [];
        // let dropdownUrl = '';
        // let dropDownData= [];
        // let columndata = [];
        // formFieldInfo.map((data, index) => {
        //     params = {
        //         "formfieldid":index
        //     }
        //     Axios.post(API.GetFormDropdownInfo, params, headers)
        //     .then(result => {
        //         dropdownUrl = result.data.Items[0].DropdownFunction;
        //         data.url=dropdownUrl;
        //         columndata.push(JSON.parse(JSON.stringify(data)))
        //     })
        //     .catch(err => {
        //         columndata.push(JSON.parse(JSON.stringify(data)))
        //     });
        //     console.log(formFieldInfo.length)
            
        //     this.setState({data:columndata});
        //     if(formFieldInfo.length===)
        //   return formFieldInfo;
        // })
    }
    dropDownData = (url) => {
        // console.log('222111223', this.state.data);
        // let arrayData = [];
        // var array=[];
        // let dropDownData = [];
        // let headers = SessionManager.shared().getAuthorizationHeader();
        // Axios.get(url, headers)
        // .then(result => {
        //     arrayData = result.data.Items.map( s => ({value:s.key,label:s.value}));
        //     // return arrayData;
        //     // dropDownData.push(JSON.parse(JSON.stringify(arrayData)))
        //     console.log('111111111111111', arrayData)
        //     array.push(arrayData)
        //     console.log('2222222', array)
        // });
        // // console.log('111111111111111', dropDownData)
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
                                        {data.fieldtype==="Dropdown" && (
                                            <Select
                                                name={data.parameter}
                                                // options={customer}
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