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
      checkFilter: false,
      allteachers: []
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
    this.openTeacherProfile = this.openTeacherProfile.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  openTeacherProfile(event){
    this.context.router.history.push('/teacherprofile', {teacherId: event.target.id})
  }
  componentDidMount() {
    axios.get('/teacher/getteachers',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          teachers: res.data.teachers,
          allteachers: res.data.teachers
        });
      });
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
  handleSearch(event){
    var searchQuery = event.target.value.toLowerCase();
    if(searchQuery){
    var teachers = this.state.allteachers.filter(function(el){
      var searchValue = el.name.toLowerCase() + ' ' + el.lastname.toLowerCase();
      return searchValue.indexOf(searchQuery)!== -1;
    });
    this.setState({
      teachers: teachers
    });
  }else {
    this.setState({
      teachers: this.state.allteachers
    });
  }
  }
  render() {
    return (
      <div className="container clearfix">
        <div className="bg-title"  style={{display: 'flex'}}>
          <h4 style={{width: '70%'}}>Все преподаватели</h4>
          <div style={{width: '30%', display: 'flex'}}><h4>Поиск</h4><input onChange={this.handleSearch} className="adminsearch" type="search" placeholder=""/></div>
        </div>
        <div className="my-content" hidden={this.state.checkFilter}>
        <div className="row hidden-max-media visible-middle visible-ipad visible-mobile" style={{marginRight: '-7.5px', marginLeft: '-7.5px'}}>
          {this.state.teachers ? (
            this.state.teachers.map((teacher, index) =>{
              return (
                <div key={index} className="col-md-4 col-sm-6 " style={{padding: '0px 7.5px'}}>
                  <div className="white-box teacherInfo">
                    <div className="row">
                      {teacher.img!='default.jpg' ? (
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
                          <h3 className="box-title m-b-0">{teacher.user_id.name} {teacher.user_id.lastname}</h3>
                          <small>{teacher.degree}</small>
                          <address style={{wordBreak: 'break-word'}}>
                            Факультет: {teacher.faculty_id ? teacher.faculty_id.faculty_name : 'Нет факультета!'}<br/>
                            Пользователь: {teacher.user_id.username}
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
      <div className="row visible-max hidden-middle hidden-ipad hidden-mobile" style={{marginRight: '-7.5px', marginLeft: '-7.5px'}}>
        {this.state.teachers ? (
            this.state.teachers.map((teacher, index) =>{
              return (
                <div key={index} className="col-md-4 col-sm-6 col-lg-3" style={{padding: '0px 7.5px'}}>
                  <div className="white-box teacherInfo">
                    <div className="row">
                      {teacher.img!='default.jpg' ? (
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
                            <h3 className="box-title m-b-0">{teacher.user_id.name} {teacher.user_id.lastname}</h3>
                          <small>{teacher.degree}</small>
                          <address>
                            Факультет: {teacher.faculty_id ? teacher.faculty_id.faculty_name : 'Нет факультета!'}<br/>
                            Пользователь: {teacher.user_id.username}
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
