import React, {Component} from 'react'
import { Button, Form } from 'react-bootstrap';
import SessionManager from '../components/session_manage';
import Pageform from './pageform';
import API from '../components/api'
import $ from 'jquery';
import 'datatables.net';
import Axios from 'axios';
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
  componentDidUpdate () {
    this.getMenuItems();
  }
  getPageId = (value) =>{
    var path = value.split("/")[1];
    let tempe = this.state.menuItemList;
    tempe.map((data, index) => {
      if(data.URL.toLocaleLowerCase()===path.toLocaleLowerCase()){
        this.setState({pageData:data})
      }
      return data;
    })
    this.getButtonInfo()
  }

  getButtonInfo = () => {
    if(this.state.pageData){
      let params = {
        'pageid':this.state.pageData.PageId
      }
      var headers = SessionManager.shared().getAuthorizationHeader();
      Axios.post(API.GetButtonInfo, params, headers)
      .then(result => {
        this.setState({buttonInfo: result.data.Items[0]})
      });
    }
    
  }

  getMenuItems = () =>{
    var headers = SessionManager.shared().getAuthorizationHeader();
    Axios.get(API.GetMenuItems, headers)
    .then(result => {
        if(this._isMounted){
            this.setState({menuItemList: result.data.Items})
            this.getPageId(this.props.location.pathname);
            this.getGridFunction();
        }
    });
  }
  
  getGridFunction = () =>{
    if(this.state.pageData){
      let params = {
        'pageid':this.state.pageData.PageId
      }
      var headers = SessionManager.shared().getAuthorizationHeader();
      Axios.post(API.GetGridFunction, params, headers)
      .then(result => {
        this.setState({gridInfo: result.data.Items[0]})
        this.getGridColumns();
      });
    }
    
  }
  getGridColumns = () =>{
    let params = {
      'gridid':this.state.gridInfo.PageId
    }
    var headers = SessionManager.shared().getAuthorizationHeader();
    Axios.post(API.GetGridColumn, params, headers)
    .then(result => {
      this.setState({gridColumnData: result.data.Items})
      this.getGridData()
    });
  }
  getGridData = () => {
    var headers = SessionManager.shared().getAuthorizationHeader();
    Axios.get(this.state.gridInfo.GridFunction, headers)
    .then(result => {
      this.setState({tableData:result.data.Items})
      $('#example').DataTable();
    });
  }
  render () {
    if(this.state.pageData && this.state.buttonInfo){
      let tableData=[];
      if(this.state.tableData){
        tableData=this.state.tableData;
      }
      let columndata=[];
      let columnTemp=[];
      if(this.state.gridColumnData){
        columnTemp=this.state.gridColumnData;
        columnTemp.map((data, index) => {
          if(data.ColumnNameGrid){
            columndata.push(data);
          }
          return columnTemp;
        })
      }
      let buttonLabel = '';
      if(this.state.buttonInfo){
        buttonLabel=this.state.buttonInfo.Label
        
      }
      return (
        <div className="order_div">
            <div className="content__header content__header--with-line">
                <h2 className="title">{this.state.pageData.Name}</h2>
            </div>
            <div className="orders">
                <div className="orders__filters justify-content-between">
                    <Form inline style={{width:"100%"}}>
                        <Button variant="primary" onClick={()=>this.setState({modalShow:true})}>{buttonLabel}</Button>   
                        <Pageform
                            show={this.state.modalShow}
                            onHide={() => this.setState({modalShow: false})}
                            formId={this.state.buttonInfo.FormId}
                        />
                    </Form>
                </div>
                <div className="table-responsive">
                      <table id="example" className="place-and-orders__table table table--striped prurprice-dataTable" width="100%">
                          <thead>
                              {columndata &&(<tr>
                                  {
                                    columndata.map((data,i) =>(
                                      <th key={i} id={i}>{data.ColumnNameGrid}</th>
                                  ))
                                  }
                              </tr>)}
                          </thead>
                          <tfoot>
                            {columndata &&(<tr>
                                {
                                  columndata.map((data,i) =>(
                                    <th key={i} id={i}>{data.ColumnNameGrid}</th>
                                ))
                                }
                            </tr>)}
                          </tfoot>
                          {tableData &&(<tbody>
                                {
                                    tableData.map((data,i) =>(
                                      <tr id={i} key={i}>
                                      <td>{data.Supplier}</td>
                                      <td>{data.Customer}</td>
                                      <td>{data.Productgroup}</td>
                                      <td>{data.SalesUnit}</td>
                                      <td>{data.Kilogram}</td>
                                      <td>{data.Product}</td>
                                      <td>{data.Productcode}</td>
                                  </tr>
                                ))
                                }
                            </tbody>)}
                      </table>
                  </div>
            </div>
        </div>
      )
    }else{
      return(
        <div>
          </div>
      )
    }
  };
  }
export default Layout;
