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
      student:{}
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
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
  render() {
    return (
      <div className="container clearfix">
      <div className=" bg-title">
        <h4>Все студенты</h4>
      </div>
      <div className=" my-content" >
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
                    <td>{student.username}</td>
                    <td>{student.name} {student.lastname}</td>
                    <td>{student.major_name}</td>
                    <td>{student.faculty_name}</td>
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
