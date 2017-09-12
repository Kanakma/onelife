import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import jwtDecode from 'jwt-decode';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkFaculty: false,
      checkMajor: false,
      checkSubject: false,
      checkTeacher: false,
      checkStudent: false,
      checkDepartment: false,
      checkParrent:false,
      checkAttendance:false,
      checkMark:false,
      checkTest:false,
      checkHomework: false,
      checkSchedule:false,
      checkGroup: false,
      checkAuditory:false,
      status: '',
      checkEmployee:false,
      checkCandidate:false,
      checkOther:false,
      notifications:[]
    };
    this.changeHide = this.changeHide.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.getNotification = this.getNotification.bind(this);
    this.createNotification=this.createNotification.bind(this);
  }

  getStatus(){
    if(Auth.isUserAuthenticated()){
      var token = Auth.getToken();
      var decoded = jwtDecode(token);
      this.setState({
        status: decoded.userstatus
      })
    }
  }

  createNotification(type){
    return function () {
      switch (type) {
        case 'info':
          NotificationManager.info('Info message');
          break;
        case 'success':
          NotificationManager.success('Success message', 'Title here');
          break;
        case 'warning':
          NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
          break;
        case 'error':
          NotificationManager.error('Error message', 'Click me!', 5000, function () {
            alert('callback');
          });
          break;
      }
    }
  }
  
  componentWillMount(){
    this.getStatus()
    this.getNotification()
  }
  componentWillReceiveProps(){
    this.getStatus()
    this.getNotification()
  }
  changeHide(event){
    var nameDropdown = event.target.name;
    var idDropdown = event.target.id;
    if((nameDropdown == "faculty") || (idDropdown == "faculty")){
      this.setState({
        checkFaculty: !this.state.checkFaculty
      })
      if(this.state.checkFaculty==false){
        this.setState({
          checkMajor: false,
          checkSubject: false,
          checkTeacher: false,
          checkStudent: false,
          checkDepartment: false,
          checkParrent:false,
          checkAttendance:false,
          checkMark:false,
          checkTest:false,
          checkHomework: false,
          checkSchedule:false,
          checkGroup: false,
          checkAuditory:false,
          checkEmployee:false,
          checkCandidate:false,
          checkOther:false
        })
      }
    } else if((nameDropdown == "major") || (idDropdown == "major")){
      this.setState({
        checkMajor: !this.state.checkMajor
      })
      if(this.state.checkMajor==false){
        this.setState({
          checkFaculty: false,
          checkSubject: false,
          checkTeacher: false,
          checkStudent: false,
          checkDepartment: false,
          checkParrent:false,
          checkAttendance:false,
          checkMark:false,
          checkTest:false,
          checkHomework: false,
          checkSchedule:false,
          checkGroup: false,
          checkAuditory:false,
          checkEmployee:false,
          checkCandidate:false,
          checkOther:false
        })
      }
    } else if((nameDropdown == "subject") || (idDropdown == "subject")){
      this.setState({
        checkSubject: !this.state.checkSubject
      })
      if(this.state.checkSubject==false){
        this.setState({
          checkMajor: false,
          checkFaculty: false,
          checkTeacher: false,
          checkStudent: false,
          checkDepartment: false,
          checkParrent:false,
          checkAttendance:false,
          checkMark:false,
          checkTest:false,
          checkHomework: false,
          checkSchedule:false,
          checkGroup: false,
          checkAuditory:false,
          checkEmployee:false,
          checkCandidate:false,
          checkOther:false
        })
      }
    } else if((nameDropdown == "teacher") || (idDropdown == "teacher")){
      this.setState({
        checkTeacher: !this.state.checkTeacher
      })
      if(this.state.checkTeacher==false){
        this.setState({
          checkMajor: false,
          checkSubject: false,
          checkFaculty: false,
          checkStudent: false,
          checkDepartment: false,
          checkParrent:false,
          checkAttendance:false,
          checkMark:false,
          checkTest:false,
          checkHomework: false,
          checkSchedule:false,
          checkGroup: false,
          checkAuditory:false,
          checkEmployee:false,
          checkCandidate:false,
          checkOther:false
        })
      }
    } else if((nameDropdown == "student") || (idDropdown == "student")){
      this.setState({
        checkStudent: !this.state.checkStudent
      })
      if(this.state.checkStudent==false){
        this.setState({
          checkMajor: false,
          checkSubject: false,
          checkTeacher: false,
          checkFaculty: false,
          checkDepartment: false,
          checkParrent:false,
          checkAttendance:false,
          checkMark:false,
          checkTest:false,
          checkHomework: false,
          checkSchedule:false,
          checkGroup: false,
          checkAuditory:false,
          checkEmployee:false,
          checkCandidate:false,
          checkOther:false
        })
      }
    } else if((nameDropdown == "department") || (idDropdown == "department")){
      this.setState({
        checkDepartment: !this.state.checkDepartment
      })
      if(this.state.checkDepartment==false){
        this.setState({
          checkMajor: false,
          checkSubject: false,
          checkTeacher: false,
          checkFaculty: false,
          checkStudent: false,
          checkParrent:false,
          checkAttendance:false,
          checkMark:false,
          checkTest:false,
          checkHomework: false,
          checkSchedule:false,
          checkGroup: false,
          checkAuditory:false,
          checkEmployee:false,
          checkCandidate:false,
          checkOther:false
        })
      }
    } else if((nameDropdown == "parrent") || (idDropdown == "parrent")){
        this.setState({
          checkParrent: !this.state.checkParrent
        })
        if(this.state.checkParrent==false){
          this.setState({
            checkMajor: false,
            checkSubject: false,
            checkTeacher: false,
            checkFaculty: false,
            checkStudent: false,
            checkDepartment:false,
            checkAttendance:false,
            checkMark:false,
            checkTest:false,
            checkHomework: false,
            checkSchedule:false,
            checkGroup: false,
            checkAuditory:false,
            checkEmployee:false,
            checkCandidate:false,
            checkOther:false
          })
        }
    } else if((nameDropdown == "attendance") || (idDropdown == "attendance")){
      this.setState({
        checkAttendance: !this.state.checkAttendance
      })
      if(this.state.checkAttendance==false){
        this.setState({
          checkMajor: false,
          checkSubject: false,
          checkTeacher: false,
          checkFaculty: false,
          checkStudent: false,
          checkDepartment:false,
          checkParrent:false,
          checkMark:false,
          checkTest:false,
          checkHomework: false,
          checkSchedule:false,
          checkGroup: false,
          checkAuditory:false,
          checkEmployee:false,
          checkCandidate:false,
          checkOther:false
        })
      }
    } else if((nameDropdown == "mark") || (idDropdown == "mark")){
      this.setState({
        checkMark: !this.state.checkMark
      })
      if(this.state.checkMark==false){
        this.setState({
          checkMajor: false,
          checkSubject: false,
          checkTeacher: false,
          checkFaculty: false,
          checkStudent: false,
          checkDepartment:false,
          checkParrent:false,
          checkAttendance:false,
          checkTest:false,
          checkHomework: false,
          checkSchedule:false,
          checkGroup: false,
          checkAuditory:false,
          checkEmployee:false,
          checkCandidate:false,
          checkOther:false
        })
      }
    } else if((nameDropdown == "test") || (idDropdown == "test")){
      this.setState({
        checkTest: !this.state.checkTest
      })
      if(this.state.checkTest==false){
        this.setState({
          checkMajor: false,
          checkSubject: false,
          checkTeacher: false,
          checkFaculty: false,
          checkStudent: false,
          checkDepartment:false,
          checkParrent:false,
          checkAttendance:false,
          checkMark:false,
          checkHomework: false,
          checkSchedule:false,
          checkGroup: false,
          checkAuditory:false,
          checkEmployee:false,
          checkCandidate:false,
          checkOther:false
        })
      }
    } else if((nameDropdown == "homework") || (idDropdown == "homework")){
      this.setState({
        checkHomework: !this.state.checkHomework
      })
      if(this.state.checkHomework==false){
        this.setState({
          checkMajor: false,
          checkSubject: false,
          checkTeacher: false,
          checkFaculty: false,
          checkStudent: false,
          checkDepartment:false,
          checkParrent:false,
          checkAttendance:false,
          checkMark:false,
          checkTest: false,
          checkSchedule:false,
          checkGroup: false,
          checkAuditory:false,
          checkEmployee:false,
          checkCandidate:false,
          checkOther:false
        })
      }
    } else if((nameDropdown == "schedule") || (idDropdown == "schedule")){
      this.setState({
        checkSchedule: !this.state.checkSchedule
      })
      if(this.state.checkSchedule==false){
        this.setState({
          checkMajor: false,
          checkSubject: false,
          checkTeacher: false,
          checkFaculty: false,
          checkStudent: false,
          checkDepartment:false,
          checkParrent:false,
          checkAttendance:false,
          checkMark:false,
          checkTest: false,
          checkHomework:false,
          checkGroup: false,
          checkAuditory:false,
          checkEmployee:false,
          checkCandidate:false,
          checkOther:false
        })
      }
    }else if((nameDropdown == "group") || (idDropdown == "group")){
      this.setState({
        checkGroup: !this.state.checkGroup
      })
      if(this.state.checkGroup==false){
        this.setState({
          checkMajor: false,
          checkSubject: false,
          checkTeacher: false,
          checkFaculty: false,
          checkStudent: false,
          checkDepartment:false,
          checkParrent:false,
          checkAttendance:false,
          checkMark:false,
          checkTest: false,
          checkSchedule:false,
          checkHomework: false,
          checkAuditory:false,
          checkEmployee:false,
          checkCandidate:false,
          checkOther:false
        })
      }
    }else if((nameDropdown == "auditory") || (idDropdown == "auditory")){
      this.setState({
        checkAuditory: !this.state.checkAuditory
      })
      if(this.state.checkAuditory==false){
        this.setState({
          checkMajor: false,
          checkSubject: false,
          checkTeacher: false,
          checkFaculty: false,
          checkStudent: false,
          checkDepartment:false,
          checkParrent:false,
          checkAttendance:false,
          checkMark:false,
          checkTest: false,
          checkSchedule:false,
          checkHomework: false,
          checkEmployee:false,
          checkCandidate:false,
          checkOther:false
        })
      }
    }else if((nameDropdown == "employee") || (idDropdown == "employee")){
      this.setState({
        checkEmployee: !this.state.checkEmployee
      })
      if(this.state.checkEmployee==false){
        this.setState({
          checkMajor: false,
          checkSubject: false,
          checkTeacher: false,
          checkFaculty: false,
          checkStudent: false,
          checkDepartment:false,
          checkParrent:false,
          checkAttendance:false,
          checkMark:false,
          checkTest: false,
          checkSchedule:false,
          checkHomework: false,
          checkAuditory:false,
          checkCandidate:false,
          checkOther:false
        })
      }
    }else if((nameDropdown == "candidate") || (idDropdown == "candidate")){
      this.setState({
        checkCandidate: !this.state.checkCandidate
      })
      if(this.state.checkCandidate==false){
        this.setState({
          checkMajor: false,
          checkSubject: false,
          checkTeacher: false,
          checkFaculty: false,
          checkStudent: false,
          checkDepartment:false,
          checkParrent:false,
          checkAttendance:false,
          checkMark:false,
          checkTest: false,
          checkSchedule:false,
          checkHomework: false,
          checkAuditory:false,
          checkOther:false
        })
      }
    }else if((nameDropdown == "other") || (idDropdown == "other")){
      this.setState({
        checkOther: !this.state.checkOther
      })
      if(this.state.checkOther==false){
        this.setState({
          checkMajor: false,
          checkSubject: false,
          checkTeacher: false,
          checkFaculty: false,
          checkStudent: false,
          checkDepartment:false,
          checkParrent:false,
          checkAttendance:false,
          checkMark:false,
          checkTest: false,
          checkSchedule:false,
          checkHomework: false,
          checkAuditory:false
        })
      }
    }
  }
  getNotification(){
    var decoded = jwtDecode(Auth.getToken())
    var formData=`user=${decoded.sub}`
    axios.post('/api/getnotifications', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          notifications: res.data.notifications
        });
      });
  }

  render() {
    console.log(this.state.notifications)
    return (
      <div>
      {(Auth.isUserAuthenticated() && (this.state.status == "admin")) ?(
        <div>
          <nav className="navbar navbar-default m-b-0">
            <div className="navbar-header myheader">

                <div className="top-left-part"><Link to="/" className="logo">
                <b><img src={require("../../../public/static/img/ol_logo.svg")} height="50" style={{marginLeft: '20px'}} alt="home"/></b>
                    <span className="hidden-xs">
                        <strong></strong>
                    </span></Link>
                </div>
            </div>
          </nav>
          <div className="row">
          <div className=" well-white">
          <div className="navbar side-navbar">
            <div className="navbar-header">
              <ul className="nav nav-stacked">
                  <li><Link to="/" className="waves-effect"><i className="fa fa-home fa-lg icons" aria-hidden="true"></i><span className="hidden-menu-style hide-menu ">Главная</span></Link></li>
                  <li><Link to="#" className="waves-effect" name="faculty" onClick={this.changeHide}>
                      <i className="fa fa-university fa-lg icons" id="faculty" onClick={this.changeHide} aria-hidden="true"></i><span id="faculty" onClick={this.changeHide}  className="hidden-menu-style hide-menu ">Факультеты</span>
                      <span hidden={this.state.checkFaculty} id="faculty" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu" aria-hidden="true" style={{marginLeft: '40px'}} ></i></span>
                      <span hidden={!this.state.checkFaculty} id="faculty" onClick={this.changeHide}><i className="fa fa-angle-down fa-lg pointer hide-menu" aria-hidden="true" style={{marginLeft: '40px'}} ></i></span>
                      </Link>
                      <ul className="nav" hidden={!this.state.checkFaculty}>
                        <li><Link to="/faculties" className="waves-effect" style={{paddingLeft: '45px'}}>Все факультеты</Link></li>
                        <li><Link to="/addfaculties" className="waves-effect" style={{paddingLeft: '45px'}}>Добавить факультет</Link></li>
                      </ul>
                  </li>
                  <li><Link to="#" className="waves-effect" name="department" onClick={this.changeHide}>
                      <i className="fa fa-building fa-lg icons" id="department" aria-hidden="true"></i><Link to="#" className="hidden-menu-style hide-menu " name="department" onClick={this.changeHide}>Кафедры</Link>
                      <span hidden={this.state.checkDepartment} id="department" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true" style={{marginLeft: '40px'}} ></i></span>
                      <span hidden={!this.state.checkDepartment} id="department" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true" style={{marginLeft: '40px'}} ></i></span>
                      </Link>
                      <ul className="nav" hidden={!this.state.checkDepartment}>
                        <li><Link to="/departments" className="waves-effect" style={{paddingLeft: '45px'}}>Все кафедры</Link></li>
                        <li><Link to="/adddepartments" className="waves-effect" style={{paddingLeft: '45px'}}>Добавить кафедру</Link></li>
                      </ul>
                  </li>
                  <li><Link to="#" className="waves-effect" name="major" onClick={this.changeHide}>
                      <i className="fa fa-mortar-board fa-lg icons"  id="major" aria-hidden="true" ></i><Link to="#"  name="major" onClick={this.changeHide} className="hidden-menu-style hide-menu ">Специальности</Link>
                      <span hidden={this.state.checkMajor} id="major" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true" style={{marginLeft: '40ox'}} ></i></span>
                      <span hidden={!this.state.checkMajor} id="major" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true" style={{marginLeft: '40px'}} ></i></span>
                      </Link>
                      <ul className="nav" hidden={!this.state.checkMajor}>
                        <li><Link to="/majors" className="waves-effect" style={{paddingLeft: '45px'}}>Все специальности</Link></li>
                        <li><Link to="/addmajors" className="waves-effect" style={{paddingLeft: '45px'}}>Добавить специальность</Link></li>
                      </ul>
                  </li>
                  <li><Link to="#" className="waves-effect" name="group" onClick={this.changeHide}>
                      <i className="fa fa-users fa-lg icons" id="group" aria-hidden="true" ></i><Link to="#" className="hidden-menu-style hide-menu " name="group" onClick={this.changeHide}>Группы</Link>
                      <span hidden={this.state.checkGroup} id="group" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true" style={{marginLeft: '40px'}} ></i></span>
                      <span hidden={!this.state.checkGroup} id="group" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true" style={{marginLeft: '40px'}} ></i></span>
                      </Link>
                      <ul className="nav" hidden={!this.state.checkGroup}>
                        <li><Link to="/groups" className="waves-effect" style={{paddingLeft: '45px'}}>Все группы</Link></li>
                        <li><Link to="/addgroups" className="waves-effect" style={{paddingLeft: '45px'}}>Добавить группу</Link></li>
                      </ul>
                  </li>
                  <li><Link to="#" className="waves-effect" name="subject" onClick={this.changeHide}>
                      <i className="fa fa-book fa-lg icons" id="subject" aria-hidden="true" ></i><Link to="#" name="subject" onClick={this.changeHide} className="hidden-menu-style hide-menu ">Предметы</Link>
                      <span hidden={this.state.checkSubject} id="subject" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true" style={{marginLeft: '40px'}} ></i></span>
                      <span hidden={!this.state.checkSubject} id="subject" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true" style={{marginLeft: '40px'}} ></i></span>
                      </Link>
                      <ul className="nav" hidden={!this.state.checkSubject}>
                        <li><Link to="/subjects" className="waves-effect" style={{paddingLeft: '45px'}}>Все предметы</Link></li>
                        <li><Link to="/addsubjects" className="waves-effect" style={{paddingLeft: '45px'}}>Добавить предмет</Link></li>
                      </ul>
                  </li>
                  <li><Link to="#" className="waves-effect" name="auditory" onClick={this.changeHide}>
                      <i className="fa fa-bandcamp fa-lg icons" id="auditory" aria-hidden="true" ></i><Link to="#" name="auditory" onClick={this.changeHide} className="hidden-menu-style hide-menu ">Аудитории</Link>
                      <span hidden={this.state.checkAuditory} id="auditory" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true" style={{marginLeft: '40px'}} ></i></span>
                      <span hidden={!this.state.checkAuditory} id="auditory" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true" style={{marginLeft: '40px'}} ></i></span>
                      </Link>
                      <ul className="nav" hidden={!this.state.checkAuditory}>
                        <li><Link to="/auditories" className="waves-effect" style={{paddingLeft: '45px'}}>Все аудитории</Link></li>
                        <li><Link to="/addauditories" className="waves-effect" style={{paddingLeft: '45px'}}>Добавить аудиторию</Link></li>
                      </ul>
                  </li>
                  <li><Link to="#" className="waves-effect" name="schedule" onClick={this.changeHide}>
                      <i className="fa fa-calendar fa-lg icons" id="schedule" aria-hidden="true" ></i><Link to="#" name="schedule" onClick={this.changeHide} className="hidden-menu-style hide-menu ">Расписание</Link>
                      <span hidden={this.state.checkSchedule} id="schedule" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true" style={{marginLeft: '40px'}} ></i></span>
                      <span hidden={!this.state.checkSchedule} id="schedule" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true" style={{marginLeft: '40px'}} ></i></span>
                      </Link>
                      <ul className="nav" hidden={!this.state.checkSchedule}>
                        <li><Link to="/schedules" className="waves-effect" style={{paddingLeft: '45px'}}>Расписания</Link></li>
                        <li><Link to="/addschedule" className="waves-effect" style={{paddingLeft: '45px'}}>Добавить расписание</Link></li>
                      </ul>
                  </li>
                  <li><Link to="#" className="waves-effect" name="teacher" onClick={this.changeHide}>
                      <i className="fa fa-user-o fa-lg icons" id="teacher" aria-hidden="true" ></i><Link to="#" name="teacher" onClick={this.changeHide} className="hidden-menu-style hide-menu ">Преподаватели</Link>
                      <span hidden={this.state.checkTeacher} id="teacher" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true" style={{marginLeft: '40px'}} ></i></span>
                      <span hidden={!this.state.checkTeacher} id="teacher" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true" style={{marginLeft: '40px'}} ></i></span>
                      </Link>
                      <ul className="nav" hidden={!this.state.checkTeacher}>
                        <li><Link to="/teachers" className="waves-effect" style={{paddingLeft: '45px'}}>Все преподаватели</Link></li>
                        <li><Link to="/addteachers" className="waves-effect" style={{paddingLeft: '45px'}}>Добавить преподавателя</Link></li>
                      </ul>
                  </li>
                  <li><Link to="#" className="waves-effect" name="student" onClick={this.changeHide}>
                      <i className="fa fa-user fa-lg icons" id="student" aria-hidden="true" ></i><Link to="#" name="student" onClick={this.changeHide} className="hidden-menu-style hide-menu ">Студенты</Link>
                      <span hidden={this.state.checkStudent} id="student" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true" style={{marginLeft: '40px'}} ></i></span>
                      <span hidden={!this.state.checkStudent} id="student" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true" style={{marginLeft: '40px'}} ></i></span>
                      </Link>
                      <ul className="nav" hidden={!this.state.checkStudent}>
                        <li><Link to="/students" className="waves-effect" style={{paddingLeft: '45px'}}>Все студенты</Link></li>
                        <li><Link to="/addstudents" className="waves-effect" style={{paddingLeft: '45px'}}>Добавить студента</Link></li>
                      </ul>
                  </li>
                    <li><Link to="#" className="waves-effect" name="parrent" onClick={this.changeHide}>
                      <i className="fa fa-user-circle-o fa-lg icons" id="parrent" aria-hidden="true" ></i><Link to="#" name="parrent" onClick={this.changeHide} className="hidden-menu-style hide-menu ">Родители</Link>
                      <span hidden={this.state.checkParrent} id="parrent" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true" style={{marginLeft: '40px'}} ></i></span>
                      <span hidden={!this.state.checkParrent} id="parrent" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true" style={{marginLeft: '40px'}} ></i></span>
                      </Link>
                      <ul className="nav" hidden={!this.state.checkParrent}>
                        <li><Link to="/parrents" className="waves-effect" style={{paddingLeft: '45px'}}>Все родители</Link></li>
                        <li><Link to="/addparrent" className="waves-effect" style={{paddingLeft: '45px'}}>Добавить родителя</Link></li>
                      </ul>
                  </li>

                  <li><Link to="#" className="waves-effect" name="employee" onClick={this.changeHide}>
                      <i className="fa fa-ravelry fa-lg icons" aria-hidden="true" ></i>Сотрудники
                      <span hidden={this.state.checkEmployee} id="employee" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer" aria-hidden="true" style={{marginLeft: '40px'}} ></i></span>
                      <span hidden={!this.state.checkEmployee} id="employee" onClick={this.changeHide}><i className="fa fa-angle-down fa-lg pointer" aria-hidden="true" style={{marginLeft: '40px'}} ></i></span>
                      </Link>
                      <ul className="nav" hidden={!this.state.checkEmployee}>
                        <li><Link to="/employees" className="waves-effect" style={{paddingLeft: '45px'}}>Все сотрудники</Link></li>
                        <li><Link to="/addemployee" className="waves-effect" style={{paddingLeft: '45px'}}>Добавить сотрудника</Link></li>
                      </ul>
                  </li>
                  <li><Link to="#" className="waves-effect" name="candidate" onClick={this.changeHide}>
                      <i className="fa fa-free-code-camp fa-lg icons" aria-hidden="true" ></i>Абитуриенты
                      <span hidden={this.state.checkCandidate} id="candidate" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer" aria-hidden="true" style={{marginLeft: '40px'}} ></i></span>
                      <span hidden={!this.state.checkCandidate} id="candidate" onClick={this.changeHide}><i className="fa fa-angle-down fa-lg pointer" aria-hidden="true" style={{marginLeft: '40px'}} ></i></span>
                      </Link>
                      <ul className="nav" hidden={!this.state.checkCandidate}>
                        <li><Link to="/candidates" className="waves-effect" style={{paddingLeft: '45px'}}>Все абитуриенты</Link></li>
                        <li><Link to="/addcandidate" className="waves-effect" style={{paddingLeft: '45px'}}>Добавить абитуриента</Link></li>
                      </ul>
                  </li>
                  <li><Link to="#" className="waves-effect" name="other" onClick={this.changeHide}>
                      <i className="fa fa-paper-plane-o fa-lg icons" aria-hidden="true" ></i>Другое
                      <span hidden={this.state.checkOther} id="other" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer" aria-hidden="true" style={{marginLeft: '40px'}} ></i></span>
                      <span hidden={!this.state.checkOther} id="other" onClick={this.changeHide}><i className="fa fa-angle-down fa-lg pointer" aria-hidden="true" style={{marginLeft: '40px'}} ></i></span>
                      </Link>
                      <ul className="nav" hidden={!this.state.checkOther}>
                        <li><Link to="/notifications" className="waves-effect" style={{paddingLeft: '45px'}}>Уведомления</Link></li>
                        <li><Link to="/reports" className="waves-effect" style={{paddingLeft: '45px'}}>Отчеты</Link></li>
                      </ul>
                  </li>
                  <li><Link to="/logout" className="waves-effect"><i className="fa fa-sign-out fa-lg" aria-hidden="true" style={{marginRight: '10px'}}></i>Выход</Link></li>
              </ul>
            </div>
          </div>
          </div>
          </div>
        </div>
        ) : (Auth.isUserAuthenticated() && (this.state.status == "teacher")) ?(
          <div>
            <nav className="navbar navbar-default m-b-0">
              <div className="navbar-header myheader">
                  <div className="top-left-part"><Link to="/" className="logo">
                  <b><img src={require("../../../public/static/img/ol_logo.svg")} height="50" style={{marginLeft: '20px'}} alt="home"/></b>
                      <span className="hidden-xs">
                          <strong></strong>
                      </span></Link>
                  </div>
              </div>
            </nav>
              <div className="row">
              <div className="well-white">
              <nav className="navbar side-navbar">
                <div className="navbar-header">
                  <ul className="nav nav-stacked">
                      <li>

                      <Link to="/" className="waves-effect"><i className="fa fa-home fa-lg icons" aria-hidden="true" ></i><Link to="/" className="hidden-menu-style hide-menu "> Главная</Link></Link></li>

                         <li><Link to="#" className="waves-effect" name="attendance" onClick={this.changeHide}>
                          <i className="fa fa-file-text-o fa-lg icons" id="attendance" aria-hidden="true" ></i><Link to="#" name="attendance" className="hidden-menu-style hide-menu " onClick={this.changeHide}>Посещаемость</Link>
                          <span hidden={this.state.checkAttendance} id="attendance" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true"  ></i></span>
                          <span hidden={!this.state.checkAttendance} id="attendance" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true"  ></i></span>
                          </Link>
                          <ul className="nav" hidden={!this.state.checkAttendance}>
                            <li><Link to="/teacher_attendances" className="waves-effect" style={{paddingLeft: "45px"}} >Вся посещаемость</Link></li>
                            <li><Link to="/addattendance" className="waves-effect" style={{paddingLeft: "45px"}} >Выставить посещаемость</Link></li>
                          </ul>
                      </li>

                      <li><Link to="#" className="waves-effect" name="mark" onClick={this.changeHide}>
                          <i className="fa fa-line-chart fa-lg icons" id="mark" aria-hidden="true" ></i><Link to="#" name="mark" className="hidden-menu-style hide-menu " onClick={this.changeHide}>Оценки</Link>
                          <span hidden={this.state.checkMark} id="mark" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true"  ></i></span>
                          <span hidden={!this.state.checkMark} id="mark" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true"  ></i></span>
                          </Link>
                          <ul className="nav" hidden={!this.state.checkMark}>
                            <li><Link to="/addmark" className="waves-effect" style={{paddingLeft: "45px"}} >Выставить Оценки</Link></li>
                            <li><Link to="/marks" className="waves-effect" style={{paddingLeft: "45px"}} >Просмотр Оценок</Link></li>
                            <li><Link to="/teacher_final_mark" className="waves-effect" style={{paddingLeft: "45px"}} >Итоговая Ведомость</Link></li>
                            <li><Link to="/teacher_set_final_mark" className="waves-effect" style={{paddingLeft: "45px"}} >Выставить Итоговую Ведомость</Link></li>
                            <li><Link to="/teacher_get_final_mark" className="waves-effect" style={{paddingLeft: "45px"}} >Просмотреть Итоговую Ведомость</Link></li>
                          </ul>
                      </li>

                      <li><Link to="/teachersubjects" className="waves-effect"><i className="fa fa-book fa-lg icons" aria-hidden="true" ></i><Link to="/teachersubjects" className="hidden-menu-style hide-menu ">Все предметы</Link></Link></li>
                      <li><Link to="#" className="waves-effect" name="test" onClick={this.changeHide}>
                          <i className="fa fa-file-text-o fa-lg icons" id="test" aria-hidden="true" ></i><Link to="#" name="test" className="hidden-menu-style hide-menu " onClick={this.changeHide}>Тест</Link>
                          <span hidden={this.state.checkTest} id="test" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true"  ></i></span>
                          <span hidden={!this.state.checkTest} id="test" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true"  ></i></span>
                          </Link>
                          <ul className="nav" hidden={!this.state.checkTest}>
                            <li><Link to="/tests" className="waves-effect" style={{paddingLeft: "45px"}} >Все тесты</Link></li>
                            <li><Link to="/addtest" className="waves-effect" style={{paddingLeft: "45px"}} >Добавить тест</Link></li>
                          </ul>
                      </li>
                      <li><Link to="#" className="waves-effect" name="homework" onClick={this.changeHide}><i className="fa fa-pencil-square-o fa-lg icons" id="homework" aria-hidden="true" ></i>
                            <Link to="#" name="homework" className="hidden-menu-style hide-menu " onClick={this.changeHide}>Домашнее задание</Link>
                        <span hidden={this.state.checkHomework} id="homework" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true"  ></i></span>
                        <span hidden={!this.state.checkHomework} id="homework" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true"  ></i></span>
                        </Link>
                        <ul className="nav" hidden={!this.state.checkHomework}>
                          <li><Link to="/teacherhomeworks" className="waves-effect" style={{paddingLeft: "45px"}} >Все задания</Link></li>
                          <li><Link to="/teacheraddhomework" className="waves-effect" style={{paddingLeft: "45px"}} >Добавить задание</Link></li>
                        </ul>
                      </li>
                      <li><Link to="/logout" className="waves-effect"><i className="fa fa-sign-out fa-lg icons" aria-hidden="true" ></i><Link className="hidden-menu-style hide-menu " to="/logout">Выход</Link></Link></li>
                  </ul>
                </div>
              </nav>
              </div>
              </div>
            </div>
          ) : (Auth.isUserAuthenticated() && (this.state.status == "student")) ?(
            <div>

            <nav className="navbar navbar-default m-b-0">
              <div className="navbar-header myheader">
                  <div className="top-left-part"><Link to="/" className="logo">
                  <b><img src={require("../../../public/static/img/ol_logo.svg")} height="50" style={{marginLeft: '20px'}} alt="home"/></b>
                      <span className="hidden-xs">
                          <strong></strong>
                      </span></Link>
                  </div>
              </div>
            </nav>
            <div className="row">
            <div className="col-md-2 well-white">
            <nav className="navbar side-navbar">
              <div className="navbar-header">
                <ul className="nav nav-stacked">
                    <li><Link to="/studentprofile" className="waves-effect"><i className="fa fa-home fa-lg icons" aria-hidden="true"></i><Link to="/studentprofile" className="hidden-menu-style hide-menu ">Главная</Link></Link></li>
                    <li><Link to="/studentsubjects" className="waves-effect" name="subject">
                        <i className="fa fa-book fa-lg icons" id="subject" aria-hidden="true" ></i>
                        <Link to="/studentsubjects" name="subject" className="hidden-menu-style hide-menu " >Предметы</Link>
                        </Link>
                    </li>
                    <li><Link to="/tests" className="waves-effect">
                        <i className="fa fa-book fa-lg icons" aria-hidden="true" ></i>
                        <Link to="/tests" name="attendance" className="hidden-menu-style hide-menu " >Тесты</Link>
                        </Link>
                    </li>
                    <li><Link to="#" className="waves-effect" name="homework" onClick={this.changeHide}><i className="fa fa-pencil-square-o fa-lg icons" id="homework" aria-hidden="true" ></i>
                          <Link to="#" name="homework" className="hidden-menu-style hide-menu " onClick={this.changeHide}>Домашнее задание</Link>
                      <span hidden={this.state.checkHomework} id="homework" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true"  ></i></span>
                      <span hidden={!this.state.checkHomework} id="homework" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true"  ></i></span>
                      </Link>
                      <ul className="nav" hidden={!this.state.checkHomework}>
                        <li><Link to="/studenthomeworks" className="waves-effect" style={{paddingLeft: "45px"}} >Все задания</Link></li>
                        <li><Link to="/studentaddhomework" className="waves-effect" style={{paddingLeft: "45px"}} >Добавить задание</Link></li>
                      </ul>
                    </li>

                      <li><Link to="#" className="waves-effect" name="mark" onClick={this.changeHide}>
                          <i className="fa fa-line-chart fa-lg icons" id="mark" aria-hidden="true" ></i>
                          <Link to="#" name="mark" className="hidden-menu-style hide-menu " onClick={this.changeHide}>Оценки</Link>
                          <span hidden={this.state.checkMark} id="mark" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true"  ></i></span>
                          <span hidden={!this.state.checkMark} id="mark" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg pointer hide-menu " aria-hidden="true"  ></i></span>
                          </Link>
                          <ul className="nav" hidden={!this.state.checkMark}>
                            <li><Link to="/student_mark" className="waves-effect" style={{paddingLeft: "45px"}} >Мои Оценки</Link></li>
                            <li><Link to="/student_get_final_mark" className="waves-effect" style={{paddingLeft: "45px"}} >Моя Итоговая Ведомость</Link></li>
                          </ul>
                      </li>
                    <li><Link to="/student_attendance" className="waves-effect"><i className="fa fa-file-text-o fa-lg icons" aria-hidden="true" ></i>
                        <Link to="/student_attendance" className="hidden-menu-style hide-menu " >Моя посещаемость</Link>
                        </Link></li>
                    <li><Link to="/logout" className="waves-effect"><i className="fa fa-sign-out fa-lg icons" aria-hidden="true" ></i>
                          <Link to="/logout" className="hidden-menu-style hide-menu ">Выход</Link></Link></li>
                </ul>
              </div>
            </nav>
            </div>
            </div>
            </div>
          ):(Auth.isUserAuthenticated() && (this.state.status == "parent")) ?(
            <div>
              <nav className="navbar navbar-default m-b-0">
                <div className="navbar-header myheader">
                    <div className="top-left-part">
                      <Link to="/" className="logo">
                        <b><img src={require("../../../public/static/img/ol_logo.svg")} height="50" style={{marginLeft: '20px'}} alt="home"/></b>
                        <span className="hidden-xs">
                            <strong></strong>
                        </span>
                      </Link>
                    </div>
                </div>
              </nav>
              <div className="row">
                <div className="col-md-2 well-white">
                  <nav className="navbar side-navbar">
                    <div className="navbar-header">
                      <ul className="nav nav-stacked">
                        <li><Link to="/" className="waves-effect"><i className="fa fa-home fa-lg icons" aria-hidden="true"></i><Link to ="/" className="hidden-menu-style hide-menu ">Главная</Link></Link></li>
                        <li><Link to="/parent_mark" className="waves-effect"><i className="fa fa-check-square-o fa-lg icons" aria-hidden="true" ></i>
                            <Link to="/parent_mark" className="hidden-menu-style hide-menu ">Оценки</Link>
                          </Link></li>
                        <li><Link to="/parent_get_final_mark" className="waves-effect"><i className="fa fa-check-square-o fa-lg icons" aria-hidden="true" ></i>Итоговые Оценки</Link></li>
                        <li><Link to="/parent_attendance" className="waves-effect"><i className="fa fa-file-text-o fa-lg icons" aria-hidden="true" ></i><Link to="parent_attendance" className="hidden-menu-style hide-menu ">Посещаемость</Link></Link></li>
                        <li><Link to="/logout" className="waves-effect"><i className="fa fa-sign-out fa-lg icons" aria-hidden="true" ></i><Link to ="/logout" className="hidden-menu-style hide-menu ">Выход</Link></Link></li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          ):(
            <div>
            </div>
          )}
      </div>);
  }
}

export default Base;
