import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';

class AdminStudents extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      students: []
    };
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
  render() {
    return (
      <div className="container clearfix">
      <div className="bg-title">
        <h4>Все студенты</h4>
      </div>
      <div className="my-content">
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
                    <td>{student.major_id}</td>
                    <td>{student.faculty_id}</td>
                    <td>{student.admission_year}</td>
                    <td className="text-center">
                        <div className="btn btn-default btn-circle edit-btn-moreinfo" style={{background: 'none'}}>
                            <a href="edit-department.html" style={{color: '#a6abb3', cursor: 'pointer'}}><i className="fa fa-pencil"></i></a>
                        </div>
                    </td>
                </tr>
              )}
              </tbody>
          </table>
        </div>
        </div>
      </div>);
  }
}

export default AdminStudents;
