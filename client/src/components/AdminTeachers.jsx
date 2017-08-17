import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import AdminEditTeacherModal from './AdminEditTeacherModal.jsx';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import PropTypes from 'prop-types';
moment.locale('ru');

class AdminTeachers extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      teachers: [],
      teacher:{},
      isOpen:false,
      status: '',
      teacherId: '',
      checkFilter: false
    };
    this.changeFilter = this.changeFilter.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
    this.openTeacherProfile = this.openTeacherProfile.bind(this);

  }
  openTeacherProfile(event){
    this.context.router.history.push('/teacherprofile', {teacherId: event.target.id})
  }
  componentDidMount() {
    axios.get('/api/getteachers',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          teachers: res.data.allTchrs
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


  toggleModal(teacher) {
      this.setState({
        isOpen: !this.state.isOpen,
        teacher:teacher
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
            <h4>Все преподаватели</h4>
          </div>
          <div className="col-md-3 text-right" style={{marginTop: '1%'}}>
            <i className="fa fa-list-ul fa-lg" aria-hidden="true" id="list" onClick={this.changeFilter} style={{marginRight: '15%'}}></i>
            <i className="fa fa-th-large fa-lg" aria-hidden="true" id="block" onClick={this.changeFilter} style={{marginRight: '15%'}}></i>
            <i className="fa fa-filter fa-lg" aria-hidden="true" style={{color: '#00c292'}}></i>
          </div>
        </div>
      </div>
      <div className="my-content" hidden={this.state.checkFilter}>
      <div className="row" style={{marginRight: '-7.5px', marginLeft: '-7.5px'}}>
        {this.state.teachers ? (
            this.state.teachers.map((teacher, index) =>{
              return (
                <div key={index} className="col-md-4 col-sm-4 " style={{padding: '0px 7.5px'}}>
                  <div className="white-box teacherInfo">
                      <div className="row">
                      {
                        teacher.img!='default.jpg' ? (
                          <div className="col-md-4 col-sm-4 text-center">
                              <img src={require("../../../public/teacher-img/"+teacher.img)} alt="user" className="img-circle img-responsive teacher-img"/>
                              <button id={teacher.teacher_id} onClick={this.openTeacherProfile} style={{background: 'white', border: 'none'}} >Подробнее</button>
                          </div>
                          ):(
                          <div className="col-md-4 col-sm-4 text-center">
                              <img src={require("../../../public/teacher-img/default.jpg")} alt="user" className="img-circle img-responsive teacher-img"/>
                              <button id={teacher.teacher_id} onClick={this.openTeacherProfile} style={{background: 'white', border: 'none'}} >Подробнее</button>
                          </div>
                          )
                      }
                          <div className="col-md-8 col-sm-8">
                                <h3 className="box-title m-b-0">{teacher.name} {teacher.lastname}</h3>
                              <small>{teacher.degree}</small>
                              <address>
                                Факультет: {teacher.faculty_name}<br/>
                                Пользователь: {teacher.username}
                                <br/>
                                <abbr title="Email">E:</abbr> {teacher.email}
                                <br/>
                                <abbr title="Phone">P:</abbr> {teacher.phone}
                              </address>
                              <button onClick={this.toggleModal.bind(this, teacher)} className="btn btn-default btn-circle m-t-10 pull-right edit-btn-moreinfo" style={{background: 'none'}}>
                                  <i style={{color: '#8c8c8c'}} className="fa fa-pencil" ></i>
                              </button>
                          </div>
                      </div>
                  </div>
                </div>
              )
            })
          ):(
              <div>
                Нет преподавателей. Добавьте преподавателей.
              </div>
          )
        }
      </div>
      </div>
      <div className="my-content"  hidden={!this.state.checkFilter}>
      <div className="table-responsive">

          <table id="myTable" className="table table-striped">
              <thead>
                  <tr>
                      <th>№</th>
                      <th>Имя</th>
                      <th>Степень</th>
                      <th>Факультет</th>
                      <th>Телефон</th>
                      <th>E-mail</th>
                      {(this.state.status == "admin") ?(
                        <th><center>Опиции</center></th>
                      ):(
                        <th></th>
                      )}
                  </tr>
              </thead>
              <tbody>
              {
                this.state.teachers ? (
                  this.state.teachers.map((teacher, t) =>{
                    return(
                    <tr key={t}>
                        <td>{t+1}</td>
                        <td>{teacher.name} {teacher.lastname}</td>
                        <td>{teacher.degree}</td>
                        <td>{teacher.faculty_name}</td>
                        <td>{teacher.phone}</td>
                        <td>{teacher.email}</td>
                        {(this.state.status == "admin") ?(
                          <td className="text-center ">
                            <button onClick={this.toggleModal.bind(this, teacher)} className="btn btn-default btn-circle edit-btn-moreinfo" style={{background: 'none'}} >
                              <i className="fa fa-pencil" style={{color: '#717171'}}></i>
                            </button>
                          </td>
                        ):(
                          <td></td>
                        )}
                    </tr>
                    )
                })
                  ):(
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                  )
              }
              </tbody>

          </table>
        </div>
        </div>
          <AdminEditTeacherModal
            show={this.state.isOpen}
            onClose={this.toggleModalClose}
            teacher={this.state.teacher}
          />
      </div>);
  }
}
AdminTeachers.contextTypes = {
  router: PropTypes.object.isRequired
};

export default AdminTeachers;
