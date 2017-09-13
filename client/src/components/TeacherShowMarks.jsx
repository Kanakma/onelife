import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';

class TeacherAddAttendance extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        groups: [],
      group_name:'',
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
      att_date:'',
      subject_groups: []
    };
  
    this.updateStudents = this.updateStudents.bind(this);
    this.updateGroups = this.updateGroups.bind(this);
    this.changeDate=this.changeDate.bind(this);
    this.dateFormat=this.dateFormat.bind(this);
  }

  componentDidMount() {
     axios.get('/api/getsubjectteacher', {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    }) .then(res => {
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
   axios.post('/api/updatestudentsformark', formData, {

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
     // console.log(event.target.value)
      if(event.target.value.length > 0){

      this.setState({
        group_name: event.target.value,
        checkSubject: true,
        message: '',
        students: this.state.main_students.filter(function(student) {
                                  return student.lastname.indexOf(event.target.value) > -1;
                              })
      })
    } else {
      this.setState({
        group_name: event.target.value,
        checkSubject: false,
        message: ''
      })
     }
        const  subject_id =this.state.subject_id;
        const group_name=event.target.value;
        const formData = `subject_id=${subject_id}&group_name=${group_name}`;
   axios.post('/api/updatestudentsformark_easy', formData, {

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


updateGroups(event){

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
    axios.get('/api/getgroupsforstudents?subject_id='+event.target.value, {
            responseType: 'json',
            headers: {
              'Content-type': 'application/x-www-form-urlencoded'
            }
    })
      .then(res => {
        this.setState({
          subject_groups: res.data.subject_groups.groups
        });
      });
}
 

  render() {

    return (

      <div className="container clearfix">
      <div className=" bg-title">
        <h4>Вся Успеваемость</h4>

      </div>
      <div className="my-content  ">

      <div className="table-responsive hidden-mobile visible-max visible-ipad visible-middle">
            <div className="form-group col-md-6">

               
           <label>Выберите предмет</label>
              <select className="form-control " name="subject_id" value={this.state.subject_id} onChange={this.updateGroups}>
              <option value=''>предмет не выбран</option>
              {this.state.subjects.map((subject, s) =>
                <option key={s} value={subject._id}>{subject.subject_name}</option>
              )}
              </select>
         </div>    
        <div className="form-group col-md-6">
        <label>Выберите предмет</label>
               {
          this.state.subject_groups.length!=0 ?
          (     <select className="form-control " name="group_name" value={this.state.group_name} onChange={this.updateStudents}>
          <option value=''>Выберите группу</option>
          {this.state.subject_groups.map((group, s) =>
            <option key={s} value={group._id}>{group.group_name}</option>
          )}
          </select>) : 
          ( <select className="form-control " name="group_name" value={this.state.group_name} onChange={this.updateStudents}>
          <option value=''>групп не найдено</option>
          </select>
          )
        }        </div>
          <div className="form-group row">
            <div className="col-md-6 col-md-offset-3">
              <label>Дата проведения Пары</label>
              <DatePicker value={this.state.att_date} onChange={this.changeDate}   className="form-control mydatepicker"/>
            </div>
         
          </div>
          <h5 style={{ fontSize: '14px', color: 'grey'}}>{this.state.message}</h5>
                <table id="myTable" className="table table-striped">
              <thead>
                  <tr>
                      <th>№</th>
                      <th>ID</th>
                      <th>ФИО</th>
                      <th>Оценка</th>
                      <th>Тип Задания</th>
                      <th>Дата</th>
                      
                  </tr>
              </thead>
                <tbody>
              {this.state.attendances.map((student, s) =>
                <tr key={s}>
                    <td>{s+1}</td>
                    <td>{student.student.user_id.username}</td>
                    <td>{student.student.user_id.name} {student.student.user_id.lastname}</td>
                    <td>{student.stud_mark}</td>
                    <td>{student.mark_type}</td>  
                    <td>{this.dateFormat(student.date)}</td>         
                </tr>
              )}
              </tbody>
                       
          </table>
        
      </div>


       <div className="table-responsive visible-mobile hidden-max-media hidden-ipad hidden-middle">
            <div className="form-group col-md-6">

               
           <label>Выберите предмет</label>
              <select className="form-control " name="subject_id" value={this.state.subject_id} onChange={this.updateGroups}>
              <option value=''>предмет не выбран</option>
              {this.state.subjects.map((subject, s) =>
                <option key={s} value={subject._id}>{subject.subject_name}</option>
              )}
              </select>
         </div>    
        <div className="form-group col-md-6">
        <label>Выберите предмет</label>
               {
          this.state.subject_groups.length!=0 ?
          (     <select className="form-control " name="group_name" value={this.state.group_name} onChange={this.updateStudents}>
          <option value=''>Выберите группу</option>
          {this.state.subject_groups.map((group, s) =>
            <option key={s} value={group._id}>{group.group_name}</option>
          )}
          </select>) : 
          ( <select className="form-control " name="group_name" value={this.state.group_name} onChange={this.updateStudents}>
          <option value=''>групп не найдено</option>
          </select>
          )
        }        </div>
          <div className="form-group row">
            <div className="col-md-6 col-md-offset-3">
              <label>Дата проведения Пары</label>
              <DatePicker value={this.state.att_date} onChange={this.changeDate}   className="form-control mydatepicker"/>
            </div>
         
          </div>
          <h5 style={{ fontSize: '14px', color: 'grey'}}>{this.state.message}</h5>
                <table id="myTable" className="table table-striped">
              <thead>
               
              </thead>
                <tbody>
              {this.state.attendances.map((student, s) =>
                <div>
                   <tr key={s}>
                    <td>{s+1}</td></tr>
                    <tr>
                    <td className="mobile-table">ID</td><td>{student.student.user_id.username}</td></tr>
                    <tr>
                    <td className="mobile-table">ФИО</td><td>{student.student.user_id.name} {student.student.user_id.lastname}</td></tr>
                    <tr>
                    <td className="mobile-table">Оценка</td><td>{student.stud_mark}</td></tr>
           
                    <tr>
                   <td className="mobile-table">Дата</td> <td>{this.dateFormat(student.date)}</td>         
                </tr>
                </div>
              )}
              </tbody>
                       
          </table>
        
      </div>

      </div>
      </div>);
  }
}

export default TeacherAddAttendance;
