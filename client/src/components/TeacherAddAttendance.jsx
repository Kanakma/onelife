import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';

class TeacherAddTest extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      message: '',
      errors: {},
      subjects: [],
      subject: {},
      students: [],
      subject_id: '',
      checkSubject: false,
      checkQuestion: false,
      main_students: []
    };
  
    this.updateStudents = this.updateStudents.bind(this);
  
  }

  componentDidMount() {
    axios.get('/api/getsubjectteacher',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        this.setState({
          subjects: res.data.subjects
        });
      });


          
    //     axios.get('/api/getstudents',  {
    //   responseType: 'json',
    //   headers: {
    //     'Content-type': 'application/x-www-form-urlencoded'
    //   }
    // })
    //   .then(res => {
    //     console.log(res.data)
    //     this.setState({
    //       students: res.data.students
    //     });
    //   });
  }
  updateStudents(event){
    if(event.target.value.length > 0){

      this.setState({
        subject_id: event.target.value,
        checkSubject: true,
        message: '',
        students: this.state.main_students.filter(function(student) {
                                  return student.lastname.indexOf(event.target.value) > -1;
                              })
      })
    } else {
      this.setState({
        subject_id: event.target.value,
        checkSubject: false,
        message: ''
      })
    }

    axios.get('/api/getsubjectsforstudents?subjectId='+event.target.value, {
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
    console.log(this.state.students)
    return (
      <div className="container clearfix">
      <div className=" bg-title">
        <h4>Выставить посещаемость</h4>

      </div>

      <div className="my-content  ">
      <div className="table-responsive">
      {this.state.message && <h5 style={{ fontSize: '14px', color: 'green' }}>{this.state.message}</h5>}

        <div className="form-group col-md-6">
        <label>Выберите предмет</label>
          <select className="form-control " name="subject_id" value={this.state.subject_id} onChange={this.updateStudents}>
          <option value=''>Выберите предмет</option>
          {this.state.subjects.map((subject, s) =>
            <option key={s} value={subject._id}>{subject.subject_name}</option>
          )}
          </select>
        </div>
          <div className="form-group row">
            <div className="col-md-6">
              <label>Дата проведения Пары</label>
              <DatePicker value={this.state.birthday} onChange={this.birthdayChange} className="form-control mydatepicker"/>
            </div>
         
          </div>
                <table id="myTable" className="table table-striped">
              <thead>
                  <tr>
                      <th>№</th>
                      <th>ID</th>
                      <th>ФИО</th>
                   
                      <th>Был</th>
                      <th>Не Был</th>
                      
                  </tr>
              </thead>
                <tbody>
              {this.state.students.map((student, s) =>
                <tr key={s}>
                    <td>{s+1}</td>
                    <td>{student.user_id.username}</td>
                    <td>{student.user_id.name} {student.user_id.lastname}</td>
                    
                    <td><input className="radio" name="att" value="byl" type="radio"></input></td>
                    <td><input className="radio" name="att" value="nebyl" type="radio"></input></td>
                    
                </tr>
              )}
              </tbody>
              
          </table>
      </div>

      </div>
      </div>);
  }
}

export default TeacherAddTest;
