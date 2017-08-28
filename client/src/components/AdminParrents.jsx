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
      checkFilter: false
    };
    this.changeFilter = this.changeFilter.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);

  }
  componentDidMount() {
    axios.get('/api/getparents',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          parrents: res.data.parrents
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

  render() {
    return (
      <div className="container clearfix">
      <div className="bg-title" >
        <div className="row">
          <div className="col-md-9">
            <h4>Все родители</h4>
          </div>
        </div>
      </div>
      <div className="my-content">
        <div className="table-responsive">
            <table id="myTable" className="table table-striped">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>ФИО</th>
                        <th>Студент(ы)</th>
                        <th>Телефон</th>
                        <th>E-mail</th>
                        <th>Адресс</th>
                          <th><center>Опиции</center></th>
                    </tr>
                </thead>
                <tbody>
                {
                  this.state.parrents.length>0 ? (
                    this.state.parrents.map((parrent, t) =>{
                      return(
                      <tr key={t}>
                          <td>{t+1}</td>
                          <td>{parrent.user_id.name} {parrent.user_id.lastname}</td>
                          <td>{parrent.childs.map((student, s)=>
                            <p key={s}>{student.user_id.name} {student.user_id.lastname}<br/></p>
                          )}</td>
                          <td>{parrent.phone}</td>
                          <td>{parrent.email}</td>
                          <td>{parrent.address}</td>
                            <td className="text-center ">
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
