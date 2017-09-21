import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import AdminEditParrentModal from './AdminEditParrentModal.jsx';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
moment.locale('ru');

class AdminParrents extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      parrents: [{
        address:'',
        email:'',
        phone:'',
        user_id:{
          birthday:'',
          lastname:'',
          name:'',
          passport_id:'',
          status:'',
          username:'',
          _id:''
        },
        _id:'',
        childs:[]
      }],
      parrent:{},
      isOpen:false,
      status: '',
      checkFilter: false,
      allparents: []
    };
    this.changeFilter = this.changeFilter.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

  }
  componentDidMount() {
    axios.get('/parent/getparents',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          parrents: res.data.parrents,
          allparents: res.data.parrents
        });
      });
  }

  changeFilter(event){
    if(event.target.id == 'list'){
      this.setState({
        checkFilter: true
      })
    } else {
      this.setState({
        checkFilter: false
      })
    }
  }

  getStatus(){
    if(Auth.isUserAuthenticated()){
      var token = Auth.getToken();
      var decoded = jwtDecode(token);
      this.setState({
        status: decoded.userstatus
      });
    }
  }


  toggleModal(parrent) {
      this.setState({
        isOpen: !this.state.isOpen,
        parrent:parrent
      });
  }

  toggleModalClose() {
      this.setState({
        isOpen: !this.state.isOpen
      });
  }
  handleSearch(event){
    var searchQuery = event.target.value.toLowerCase();
    if(searchQuery){
    var parents = this.state.allparents.filter(function(el){
      var searchValue = el.user_id.name.toLowerCase()+ ' ' + el.user_id.lastname.toLowerCase();
      return searchValue.indexOf(searchQuery)!== -1;
    });
    this.setState({
      parrents: parents
    });
  }else {
    this.setState({
      parrents: this.state.allparents
    });
  }
  }
  render() {
    return (
      <div className="container clearfix">
      <div className="bg-title" style={{display: 'flex'}}>
            <h4 style={{width: '70%'}}>Все родители</h4>
            <div style={{width: '30%', display: 'flex'}}><h4>Поиск</h4><input onChange={this.handleSearch} className="adminsearch" type="search" placeholder=""/></div>
      </div>
      <div className="my-content">
        <div className="table-responsive hidden-mobile visible-ipad visible-max visible-middle">
            <table id="myTable" className="table table-striped functional-table">
                <thead>
                    <tr>
                        <th className="table-head-text">№</th>
                        <th className="table-head-text table-b-left">ФИО</th>
                        <th className="table-head-text table-b-left">Студент(ы)</th>
                        <th className="table-head-text table-b-left">Телефон</th>
                        <th className="table-head-text table-b-left">E-mail</th>
                        <th className="table-head-text table-b-left">Адрес</th>
                          <th className="table-head-text table-b-left"><center>Опиции</center></th>
                    </tr>
                </thead>
                <tbody>
                {
                  this.state.parrents.length>0 ? (
                    this.state.parrents.map((parrent, t) =>{
                      return(
                      <tr key={t}>
                          <td>{t+1}</td>
                          <td className="table-b-left">{parrent.user_id.name} {parrent.user_id.lastname}</td>
                          <td className="table-b-left">{parrent.childs.map((student, s)=>
                            <p key={s}>{student.user_id.name} {student.user_id.lastname}<br/></p>
                          )}</td>
                          <td className="table-b-left">{parrent.phone}</td>
                          <td className="table-b-left">{parrent.email}</td>
                          <td className="table-b-left">{parrent.address}</td>
                            <td className="text-center table-b-left">
                              <button onClick={this.toggleModal.bind(this, parrent)} className="btn btn-default btn-circle edit-btn-moreinfo" style={{background: 'none'}} >
                                <i className="fa fa-pencil" style={{color: '#717171'}}></i>
                              </button>
                            </td>
                      </tr>
                      )
                  })
                    ):(
                        <tr>
                          <td>---</td>
                          <td>---</td>
                          <td>---</td>
                          <td>---</td>
                          <td>---</td>
                          <td>---</td>
                          <td className="text-center">---</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
          </div>
          <div className="table-responsive visible-mobile hidden-ipad hidden-max-media hidden-middle">
              <table id="myTable" className="table table-striped">
                  <tbody>
                  {
                    this.state.parrents.length>0 ? (
                      this.state.parrents.map((parrent, t) =>{
                        return(
                          <div key={t}>
                        <tr >
                          <td className="mobile-table"></td>
                          <td>{t+1}</td>
                        </tr>
                        <tr >
                          <td className="mobile-table">ФИО</td>
                          <td>{parrent.user_id.name} {parrent.user_id.lastname}</td>
                        </tr>
                        <tr >
                          <td className="mobile-table">Студент</td>
                            <td>{parrent.childs.map((student, s)=>
                              <p key={s}>{student.user_id.name} {student.user_id.lastname}<br/></p>
                            )}</td>
                        </tr>
                        <tr >
                          <td className="mobile-table">Телефон</td>
                          <td>{parrent.phone}</td>
                        </tr>
                        <tr >
                          <td className="mobile-table">E-mail</td>
                          <td>{parrent.email}</td>
                        </tr>
                        <tr >
                          <td className="mobile-table">Адресс</td>
                          <td>{parrent.address}</td>
                        </tr>
                        <tr >
                          <td className="mobile-table">Опции</td>
                              <td className="text-center ">
                                <button onClick={this.toggleModal.bind(this, parrent)} className="btn btn-default btn-circle edit-btn-moreinfo" style={{background: 'none'}} >
                                  <i className="fa fa-pencil" style={{color: '#717171'}}></i>
                                </button>
                              </td>
                        </tr>
                        <br/>
                        </div>
                        )
                    })
                      ):(
                          <tr>
                            <td>---</td>
                            <td>---</td>
                            <td>---</td>
                            <td>---</td>
                            <td>---</td>
                            <td>---</td>
                            <td className="text-center">---</td>
                          </tr>
                      )
                  }
                  </tbody>
              </table>
            </div>
        </div>
          <AdminEditParrentModal
            show={this.state.isOpen}
            onClose={this.toggleModalClose}
            parrent={this.state.parrent}
          />
      </div>);
  }
}

export default AdminParrents;
