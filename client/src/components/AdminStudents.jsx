import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import AdminEditStudentModal from './AdminEditStudentModal.jsx'
import Proptypes from 'prop-types';
moment.locale('ru');

class AdminStudents extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      students: [],
      isOpen:false,
      student:{},
      checkFilter: false,
      allstudents: []
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    axios.get('/api/getstudents',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          students: res.data.students,
          allstudents: res.data.students
        });
      });
  }
  toggleModal(student){
      this.setState({
        isOpen: !this.state.isOpen,
        student: student
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
    var students = this.state.allstudents.filter(function(el){
      var searchValue = el.user_id.name.toLowerCase() + ' '+ el.user_id.lastname.toLowerCase();
      return searchValue.indexOf(searchQuery)!== -1;
    });
    this.setState({
      students: students
    });
  } else {
    this.setState({
      students: this.state.allstudents
    });
  }
  }
  render() {
    return (
      <div className="container clearfix">
      <div className="bg-title"  style={{display: 'flex'}} >
            <h4 style={{width: '70%'}}>Все студенты</h4>
            <div style={{width: '30%', display: 'flex'}}><h4>Поиск</h4><input onChange={this.handleSearch} className="adminsearch" type="search" placeholder=""/></div>
      </div>
      <div className="my-content">
      <div className="row hidden-max-media visible-middle visible-ipad hidden-mobile" style={{marginRight: '-7.5px', marginLeft: '-7.5px'}}>
        {this.state.students.length>0 ? (
            this.state.students.map((student, s) =>{
              return (
                <div key={s} className="col-md-4 col-sm-6 " style={{padding: '0px 7.5px'}}>
                  <div className="white-box teacherInfo">
                      <div className="row">
                      {
                        student.img!='default.jpg' ? (
                          <div className="col-md-4 col-sm-4 text-center">
                              <Link to="/teacherprofile"  ><img src={require("../../../public/student-img/"+student.img)} alt="user" className="img-circle img-responsive teacher-img"/></Link>
                          </div>
                          ):(
                          <div className="col-md-4 col-sm-4 text-center">
                              <Link to="/teacherprofile"  ><img src={require("../../../public/teacher-img/default.jpg")} alt="user" className="img-circle img-responsive teacher-img"/></Link>
                          </div>
                        )
                      }
                        <div className="col-md-8 col-sm-8">
                          <h3 className="box-title m-b-0">{student.user_id.name} {student.user_id.lastname}</h3>
                          <address>
                            Факультет: {student.faculty_id.faculty_name}<br/>
                            Пользователь: {student.user_id.username}
                            <br/>
                            Группа: {student.group_id.group_name}
                            <br/>
                          </address>
                          <button onClick={this.toggleModal.bind(this, student)} className="btn btn-default btn-circle m-t-10 pull-right edit-btn-moreinfo" style={{background: 'none'}}>
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
              Нет студентов. Добавьте студентов.
            </div>
          )
        }
        </div>
        <div className="row visible-max hidden-middle hidden-ipad hidden-mobile" style={{marginRight: '-7.5px', marginLeft: '-7.5px'}}>
          {this.state.students.length>0 ? (
              this.state.students.map((student, s) =>{
                return (
                  <div key={s} className="col-md-4 col-sm-6 col-lg-3" style={{padding: '0px 7.5px'}}>
                    <div className="white-box teacherInfo">
                        <div className="row">
                        {
                          student.img!='default.jpg' ? (
                            <div className="col-md-4 col-sm-4 text-center">
                                <Link to="/teacherprofile"  ><img src={require("../../../public/student-img/"+student.img)} alt="user" className="img-circle img-responsive teacher-img"/></Link>
                            </div>
                            ):(
                            <div className="col-md-4 col-sm-4 text-center">
                                <Link to="/teacherprofile"  ><img src={require("../../../public/teacher-img/default.jpg")} alt="user" className="img-circle img-responsive teacher-img"/></Link>
                            </div>
                          )
                        }
                          <div className="col-md-8 col-sm-8">
                            <h3 className="box-title m-b-0">{student.user_id.name} {student.user_id.lastname}</h3>
                            <address>
                              Факультет: {student.faculty_id.faculty_name}<br/>
                              Пользователь: {student.user_id.username}
                              <br/>
                              Группа: {student.group_id.group_name}
                              <br/>
                            </address>
                            <button onClick={this.toggleModal.bind(this, student)} className="btn btn-default btn-circle m-t-10 pull-right edit-btn-moreinfo" style={{background: 'none'}}>
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
                Нет студентов. Добавьте студентов.
              </div>
            )
          }
          </div>
          <div className="row hidden-max-media hidden-middle hidden-ipad visible-mobile" style={{marginRight: '-7.5px', marginLeft: '-7.5px'}}>
            {this.state.students.length>0 ? (
                this.state.students.map((student, s) =>{
                  return (
                    <div key={s} className="col-md-4 col-sm-6 col-lg-3" style={{padding: '0px 7.5px'}}>
                      <div className="white-box teacherInfo" style={{height: '200px'}}>
                          <div className="row">
                          {
                            student.img!='default.jpg' ? (
                              <div className="col-md-4 col-sm-4 text-center">
                                  <Link to="/teacherprofile"  ><img src={require("../../../public/student-img/"+student.img)} alt="user" className="img-circle img-responsive teacher-img"/></Link>
                              </div>
                              ):(
                              <div className="col-md-4 col-sm-4 text-center">
                                  <Link to="/teacherprofile"  ><img src={require("../../../public/teacher-img/default.jpg")} alt="user" className="img-circle img-responsive teacher-img"/></Link>
                              </div>
                            )
                          }
                            <div className="col-md-8 col-sm-8">
                              <h3 className="box-title m-b-0">{student.user_id.name} {student.user_id.lastname}</h3>
                              <address>
                                Факультет: {student.faculty_id.faculty_name}<br/>
                                Пользователь: {student.user_id.username}
                                <br/>
                                Группа: {student.group_id.group_name}
                                <br/>
                              </address>
                              <button onClick={this.toggleModal.bind(this, student)} className="btn btn-default btn-circle m-t-10 pull-right edit-btn-moreinfo" style={{background: 'none'}}>
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
                  Нет студентов. Добавьте студентов.
                </div>
              )
            }
            </div>
      </div>
        <AdminEditStudentModal
          show={this.state.isOpen}
          onClose={this.toggleModalClose}
          student={this.state.student}
        />
      </div>);
  }
}

export default AdminStudents;
