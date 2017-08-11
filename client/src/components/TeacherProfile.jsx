import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import AdminEditTeacherModal from './AdminEditTeacherModal.jsx';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import TeacherProfileNav from './TeacherProfileNav.jsx';
moment.locale('ru');

class TeacherProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      teachers: [],
      teacher:{},
      isOpen:false,
      status: '',
      checkFilter: false,
      teacherId: this.props.location.state.teacherId,
    };
    this.changeFilter = this.changeFilter.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
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
    console.log(this.state.teachers);
    return (
      <div className="container clearfix">
      <div className="bg-title">
        <div className="row">
          <div className="col-md-9">
            <h4>Профиль преподавателя</h4>
          </div>
        </div>
      </div>
      <div className="my-content" hidden={this.state.checkFilter}>
      <div className="row" style={{marginRight: '-7.5px', marginLeft: '-7.5px'}}>
        {
          this.state.teachers.map((teacher, index) =>{
            return (
            <div>
              <div key={index} className="col-md-4 col-sm-4 col-xs-12">
                <div className="white-box">
                  <div className="user-bg">
                    <a href="professor-profile.html"><img src={require("../../../public/teacher-img/"+teacher.img)} alt="user" className="img-responsive teacher-profile-img"/></a>
                  </div>
                  <div className="user-btm-box">
                    <div className="row text-center m-t-10">
                      <div className = "col-md-6">
                        <strong>Имя</strong>
                        <p>{teacher.name} {teacher.lastname}</p>
                      </div>
                      <div className = "col-md-6">
                        <strong>Степень</strong>
                        <p>{teacher.degree}</p>
                      </div>
                    </div>
                    <div className="row text-center m-t-10">
                      <div className = "col-md-6">
                        <strong>E-mail</strong>
                        <p>{teacher.email}</p>
                      </div>
                      <div className = "col-md-6">
                        <strong>Телефон</strong>
                        <p>{teacher.phone}</p>
                      </div>
                    </div>
                    <div className="row text-center m-t-10">
                      <div className = "col-md-12">
                        <strong>Кафедра</strong>
                        <p>{teacher.department}</p>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4 text-center">
                    </div>
                    <div className="col-md-4 col-sm-4 text-center">
                    </div>
                    <div className="col-md-4 col-sm-4 text-center">
                    </div>

                  </div>
                    <div className="row">
                        <div className="col-md-4 col-sm-4 text-center">

                        </div>
                        <div className="col-md-8 col-sm-8">
                            <button onClick={this.toggleModal.bind(this, teacher)} className="btn btn-default btn-circle m-t-10 pull-right edit-btn-moreinfo" style={{background: 'none'}}>
                                <i style={{color: '#8c8c8c'}} className="fa fa-pencil"></i>
                            </button>
                        </div>
                    </div>
                </div>
              </div>
              <div className="col-md-8 col-xs-12">
                <div className="white-box">
                  <TeacherProfileNav />
                </div>
              </div>
            </div>
            )
          })
        }
      </div>
      </div>
      <div className="my-content" hidden={!this.state.checkFilter}>
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
                this.state.teachers.map((teacher, t) =>{
                return(
                <tr key={t}>
                    <td>{t+1}</td>
                    <td>{teacher.name} {teacher.lastname}</td>
                    <td>{teacher.degree}</td>
                    <td>{teacher.faculty_id}</td>
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

export default TeacherProfile;
