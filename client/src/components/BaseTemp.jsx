import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import jwtDecode from 'jwt-decode';

class Base extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkFaculty: false,
      checkMajor: false,
      checkSubject: false,
      checkTeacher: false,
      checkStudent: false,
      status: ''
    };
    this.changeHide = this.changeHide.bind(this);
    this.getStatus = this.getStatus.bind(this);
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
  componentWillMount(){
    this.getStatus();
  }
  componentWillReceiveProps(){
    this.getStatus();
  }
  changeHide(event){
    var nameDropdown = event.target.name;
    var idDropdown = event.target.id;
    if((nameDropdown == "faculty") || (idDropdown == "faculty")){
      this.setState({
        checkFaculty: !this.state.checkFaculty
      })
    } else if((nameDropdown == "major") || (idDropdown == "major")){
      this.setState({
        checkMajor: !this.state.checkMajor
      })
    } else if((nameDropdown == "subject") || (idDropdown == "subject")){
      this.setState({
        checkSubject: !this.state.checkSubject
      })
    } else if((nameDropdown == "teacher") || (idDropdown == "teacher")){
      this.setState({
        checkTeacher: !this.state.checkTeacher
      })
    } else if((nameDropdown == "student") || (idDropdown == "student")){
      this.setState({
        checkStudent: !this.state.checkStudent
      })
    }
  }
  render() {
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
          <div className="col-md-2 well-white">
          <nav className="navbar">
            <div className="navbar-header">
              <ul className="nav nav-stacked">
                  <li><Link to="/" className="waves-effect"><i className="fa fa-home fa-lg" aria-hidden="true" style={{marginRight: '10px'}}></i>Главная</Link></li>

                  <li><Link to="#" className="waves-effect" name="major" onClick={this.changeHide}>
                      <i className="fa fa-building fa-lg" aria-hidden="true" style={{marginRight: '10px'}}></i>Специальности
                      <span hidden={this.state.checkMajor} id="major" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg" aria-hidden="true" style={{marginLeft: '35px'}} ></i></span>
                      <span hidden={!this.state.checkMajor} id="major" onClick={this.changeHide}><i className="fa fa-angle-down fa-lg" aria-hidden="true" style={{marginLeft: '30px'}} ></i></span>
                      </Link>
                      <ul className="nav" hidden={!this.state.checkMajor}>
                        <li><Link to="/majors" className="waves-effect" style={{marginLeft: '35px'}}>Все специальности</Link></li>
                        <li><Link to="/addmajors" className="waves-effect" style={{marginLeft: '35px'}}>Добавить специальность</Link></li>
                      </ul>
                  </li>

                  <li><Link to="#" className="waves-effect" name="faculty" onClick={this.changeHide}>
                      <i className="fa fa-university fa-lg" aria-hidden="true" style={{marginRight: '10px'}}></i>Факультеты
                      <span hidden={this.state.checkFaculty} id="faculty" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg" aria-hidden="true" style={{marginLeft: '55px'}} ></i></span>
                      <span hidden={!this.state.checkFaculty} id="faculty" onClick={this.changeHide}><i className="fa fa-angle-down fa-lg" aria-hidden="true" style={{marginLeft: '50px'}} ></i></span>
                      </Link>
                      <ul className="nav" hidden={!this.state.checkFaculty}>
                        <li><Link to="/faculties" className="waves-effect" style={{marginLeft: '35px'}}>Все факультеты</Link></li>
                        <li><Link to="/addfaculties" className="waves-effect" style={{marginLeft: '35px'}}>Добавить факультет</Link></li>
                      </ul>
                  </li>

                  <li><Link to="#" className="waves-effect" name="subject" onClick={this.changeHide}>
                      <i className="fa fa-book fa-lg" aria-hidden="true" style={{marginRight: '10px'}}></i>Предметы
                      <span hidden={this.state.checkSubject} id="subject" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg" aria-hidden="true" style={{marginLeft: '68px'}} ></i></span>
                      <span hidden={!this.state.checkSubject} id="subject" onClick={this.changeHide}><i className="fa fa-angle-down fa-lg" aria-hidden="true" style={{marginLeft: '63px'}} ></i></span>
                      </Link>
                      <ul className="nav" hidden={!this.state.checkSubject}>
                        <li><Link to="/subjects" className="waves-effect" style={{marginLeft: '35px'}}>Все предметы</Link></li>
                        <li><Link to="/addsubjects" className="waves-effect" style={{marginLeft: '35px'}}>Добавить предмет</Link></li>
                      </ul>
                  </li>
                  <li><Link to="#" className="waves-effect" name="teacher" onClick={this.changeHide}>
                      <i className="fa fa-mortar-board fa-lg" aria-hidden="true" style={{marginRight: '10px'}}></i>Преподаватели
                      <span hidden={this.state.checkTeacher} id="teacher" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg" aria-hidden="true" style={{marginLeft: '25px'}} ></i></span>
                      <span hidden={!this.state.checkTeacher} id="teacher" onClick={this.changeHide}><i className="fa fa-angle-down fa-lg" aria-hidden="true" style={{marginLeft: '20px'}} ></i></span>
                      </Link>
                      <ul className="nav" hidden={!this.state.checkTeacher}>
                        <li><Link to="/teachers" className="waves-effect" style={{marginLeft: '35px'}}>Все преподаватели</Link></li>
                        <li><Link to="/addteachers" className="waves-effect" style={{marginLeft: '35px'}}>Добавить преподавателя</Link></li>
                      </ul>
                  </li>
                  <li><Link to="#" className="waves-effect" name="student" onClick={this.changeHide}>
                      <i className="fa fa-users fa-lg" aria-hidden="true" style={{marginRight: '10px'}}></i>Студенты
                      <span hidden={this.state.checkStudent} id="student" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg" aria-hidden="true" style={{marginLeft: '65px'}} ></i></span>
                      <span hidden={!this.state.checkStudent} id="student" onClick={this.changeHide}><i className="fa fa-angle-down fa-lg" aria-hidden="true" style={{marginLeft: '60px'}} ></i></span>
                      </Link>
                      <ul className="nav" hidden={!this.state.checkStudent}>
                        <li><Link to="/students" className="waves-effect" style={{marginLeft: '35px'}}>Все студенты</Link></li>
                        <li><Link to="/addstudents" className="waves-effect" style={{marginLeft: '35px'}}>Добавить студента</Link></li>
                      </ul>
                  </li>
                  <li><Link to="/logout" className="waves-effect"><i className="fa fa-sign-out fa-lg" aria-hidden="true" style={{marginRight: '10px'}}></i>Выход</Link></li>
              </ul>
            </div>
          </nav>
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
              <div className="col-md-2 well-white">
                <nav className="navbar">
                  <div className="navbar-header">
                    <ul className="nav nav-stacked">
                        <li><Link to="/" className="waves-effect"><i className="fa fa-home fa-lg" aria-hidden="true" style={{marginRight: '10px'}}></i>Главная</Link></li>
                        <li><Link to="/subjects" className="waves-effect"><i className="fa fa-book fa-lg" aria-hidden="true" style={{marginRight: '10px'}}></i>Все предметы</Link></li>
                        <li><Link to="#" className="waves-effect" name="student" onClick={this.changeHide}>
                            <i className="fa fa-file-text-o fa-lg" aria-hidden="true" style={{marginRight: '10px'}}></i>Тест
                            <span hidden={this.state.checkStudent} id="student" onClick={this.changeHide}><i className="fa fa-angle-right fa-lg" aria-hidden="true" style={{marginLeft: '90px'}} ></i></span>
                            <span hidden={!this.state.checkStudent} id="student" onClick={this.changeHide}><i className="fa fa-angle-down fa-lg" aria-hidden="true" style={{marginLeft: '85px'}} ></i></span>
                            </Link>
                            <ul className="nav" hidden={!this.state.checkStudent}>
                              <li><Link to="/tests" className="waves-effect" style={{marginLeft: '35px'}}>Все тесты</Link></li>
                              <li><Link to="/addtest" className="waves-effect" style={{marginLeft: '35px'}}>Добавить тест</Link></li>
                            </ul>
                        </li>
                        <li><Link to="/logout" className="waves-effect"><i className="fa fa-sign-out fa-lg" aria-hidden="true" style={{marginRight: '10px'}}></i>Выход</Link></li>
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
                <nav className="navbar">
                  <div className="navbar-header">
                    <ul className="nav nav-stacked">
                        <li><Link to="/" className="waves-effect"><i className="fa fa-home fa-lg" aria-hidden="true" style={{marginRight: '10px'}}></i>Главная</Link></li>
                        <li><Link to="/subjects" className="waves-effect" name="subject">
                            <i className="fa fa-book fa-lg" aria-hidden="true" style={{marginRight: '10px'}}></i>Предметы
                            </Link>
                        </li>
                        <li><Link to="/tests" className="waves-effect">
                            <i className="fa fa-book fa-lg" aria-hidden="true" style={{marginRight: '10px'}}></i>Тесты
                            </Link>
                        </li>
                        <li><Link to="/logout" className="waves-effect"><i className="fa fa-sign-out fa-lg" aria-hidden="true" style={{marginRight: '10px'}}></i>Выход</Link></li>
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
