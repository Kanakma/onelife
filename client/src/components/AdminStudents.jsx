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
      checkFilter: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
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
          students: res.data.students
        });
      });
  }
  toggleModal(student){
      this.setState({
        isOpen: !this.state.isOpen,
        student:student
    });
  }
  toggleModalClose() {
      this.setState({
        isOpen: !this.state.isOpen
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
  render() {
    console.log(this.state.students)
    return (
      <div className="container clearfix">
      <div className="bg-title" >
        <div className="row">
          <div className="col-md-9">
            <h4>Все студенты</h4>
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
        {this.state.students ? (
            this.state.students.map((student, s) =>{
              return (
                <div key={s} className="col-md-4 col-sm-4 " style={{padding: '0px 7.5px'}}>
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
                                <abbr title="Email">E:</abbr> 
                                <br/>
                                <abbr title="Phone">P:</abbr> 
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
                Нет преподавателей. Добавьте преподавателей.
              </div>
          )
        }
      </div>
      </div>
      <div className=" my-content" hidden={!this.state.checkFilter} >
      <div className="table-responsive">
          <table id="myTable" className="table table-striped">
              <thead>
                  <tr>
                      <th>№</th>
                      <th>ID</th>
                      <th>ФИО</th>
                      <th>Специальность</th>
                      <th>Факультет</th>
                      <th>Год пост.</th>
                      <th>
                          <center>Опции</center>
                      </th>
                  </tr>
              </thead>
              <tbody>
              {this.state.students.map((student, s) =>
                <tr key={s}>
                    <td>{s+1}</td>
                    <td>{student.user_id.username}</td>
                    <td>{student.user_id.name} {student.user_id.lastname}</td>
                    <td>{student.major_id.major_name}</td>
                    <td>{student.faculty_id.faculty_name}</td>
                    <td>{student.admission_year}</td>
                    <td className="text-center">
                        <button onClick={this.toggleModal.bind(this, student)} className="btn btn-default btn-circle edit-btn-moreinfo" style={{background: 'none'}}>
                           <i className="fa fa-pencil"></i>
                        </button>
                    </td>
                </tr>
              )}
              </tbody>
          </table>
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
