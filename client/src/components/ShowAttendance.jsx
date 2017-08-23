import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';

class TeacherAddAttendance extends React.Component {

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
      main_students: [],
      stud_attendance: {},
      checkAttendance: false,
      attendances: [],
      att_date:''
    };
  
    this.updateStudents = this.updateStudents.bind(this);
    this.changeDate=this.changeDate.bind(this);
    this.dateFormat=this.dateFormat.bind(this);
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
  }

  dateFormat(date){
    var fDate = new Date(date);
    var m = ((fDate.getMonth() * 1 + 1) < 10) ? ("0" + (fDate.getMonth() * 1 + 1)) : (fDate.getMonth() * 1 + 1);
    var d = ((fDate.getDate() * 1) < 10) ? ("0" + (fDate.getDate() * 1)) : (fDate.getDate() * 1);
    return m + "/" + d + "/" + fDate.getFullYear()
  }

  changeDate(value){
   var date = this.dateFormat(value)
  
     this.setState({
        att_date: value
      });
     const  subject_id =this.state.subject_id;
     

    const val= value;
    
    const formData = `subject_id=${subject_id}&att_date=${val}`;
   axios.post('/api/updatestudentsforattendance', formData, {

    responseType: 'json',
    headers: {
          'Content-type': 'application/x-www-form-urlencoded'}
   })
       .then(res=>{
      this.setState({
        attendances: res.data.attendances,
        message: res.data.message
      })
   })
    

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


   }

  


  render() {

    return (

      <div className="container clearfix">
      <div className=" bg-title">
        <h4>Вся посещаемость</h4>

      </div>
      <div className="my-content  ">
      <div className="table-responsive">

        <div className="form-group col-md-12">
<h5 style={{ fontSize: '14px', color: 'red'}}>{this.state.message}</h5>
        </div>
            
      
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
              <DatePicker value={this.state.att_date} onChange={this.changeDate}   className="form-control mydatepicker"/>
            </div>
         
          </div>
                <table id="myTable" className="table table-striped">
              <thead>
                  <tr>
                      <th>№</th>
                      <th>ID</th>
                      <th>ФИО</th>
                   
                      <th>Cтатус</th>
                    
                      
                  </tr>
              </thead>
                <tbody>
              {this.state.attendances.map((student, s) =>
                <tr key={s}>
                    <td>{s+1}</td>
                    <td>{student.student.user_id.username}</td>
                    <td >{student.student.user_id.name} {student.student.user_id.lastname}</td>
                    <td>{student.stud_attendance}</td>
                   
                   
             
                    
                </tr>
              )}
              </tbody>
                       
          </table>
        
      </div>

      </div>
      </div>);
  }
}

export default TeacherAddAttendance;
