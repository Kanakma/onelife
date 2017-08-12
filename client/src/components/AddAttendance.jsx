import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import DatePicker from 'react-bootstrap-date-picker';
import moment from 'moment';
import Proptypes from 'prop-types';
moment.locale('ru');

class AdminStudents extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      students: [],
      attendance : {
        name: '',
        lastname: '',
        group: '',
        lesson_date:'',
        status:''
      }
     

    };
    this.addAttendance = this.addAttendance.bind(this);
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
  addAttendance(event){
       const field = event.target.name;
       const attendance = this.state.attendance;
       attendance[field]= this.target.value;
       this.setState({
        teacher:teacher,
        errors: {}
       })
  }

  entry_yearChange(value){
      this.setState({
        entry_year: value
      });
      this.checkContent();
  }
  render() {
    return (
      <div className="container clearfix">

    

       <div className="bg-title">
        <h4>Выберите группу</h4>


      </div>

      <div className=" my-content" >
<div className="form-group row">
             <div className="col-md-6">
             <label>Выберите группу</label>
              <select className="form-control" name="group" value={this.state.attendance.group} onChange="this.addAttendance" >
                <option value="">---</option>
                <option value="Мужчина">IS-1510</option>
                <option value="Женщина">1S-1509</option>
              </select>
              <span className="bar"></span>
            </div>
            <div className="col-md-6">
              <label>Дата Пары</label>
              <DatePicker value={this.state.entry_year} onChange={this.entry_yearChange}  className="form-control mydatepicker"/>
            </div>
          </div>


      <div className="table-responsive">
          <table id="myTable" className="table table-striped">
              <thead>
                  <tr>
                      <th>№</th>
                     
                      <th>ФИО</th>
                      <th>Группа</th>
                      <th>Был </th>
                      <th>Не Был</th>
                 
                  </tr>
              </thead>
              <tbody>
              {this.state.students.map((student, s) =>
                <tr key={s}>
                    
                    <td>{student.username}</td>
                    <td>{student.name} {student.lastname}</td>
                    <td>{student.major_id}</td>
                    <td><input type="radio" name="check" ></input></td>
                    <td><input type="radio" name="check" ></input></td>
                   
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
