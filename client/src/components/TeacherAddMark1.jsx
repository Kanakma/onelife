import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';

class TeacherAddMark extends React.Component {

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
      marks: [],
      mark_date:'',
      grade: {
           
           mark: '',
           comment:''


      }
   

    };
  
    this.updateStudents = this.updateStudents.bind(this);
    this.changeMark = this.changeMark.bind(this);
    this.sendMark = this.sendMark.bind(this);
    this.changeDate=this.changeDate.bind(this);
  
  }

  componentDidMount() {
    axios.get('/api/getattendanceteacher',  {
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
  changeDate(event){

     this.setState({
        mark_date: value
      });

  }
    changeMark(event){
      console.log('changemark')
        const field = event.target.name;
        console.log(this.state.grade.mark)
  //       this.setState({
  //         mark: this.state.grade.mark
  //       })
  // //    const student = this.state.student;
    //  student[field] = event.target.value;
  
     // this.setState({
     //    mark: value
     //  });

  }

  sendMark(event){
    event.preventDefault();
    const subject_id= this.state.subject_id;
    const mark_date=this.state.mark_date;

    const formData = `data=${JSON.stringify(this.state.attendances)}&subject_id=${subject_id}&mark_date=${mark_date}`;

   axios.post('/api/addattendance', formData, {

    responseType: 'json',
    headers: {
          'Content-type': 'application/x-www-form-urlencoded'}
   })
    .then(res=>{
      this.setState({
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

    return (
      <div className="container clearfix">
      <div className=" bg-title">
        <h4>Выставить оценки</h4>

      </div>
      <div className="my-content  ">
      <div className="table-responsive">
     
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
              <DatePicker  onChange={this.changeDate}  value={this.state.mark_date} className="form-control mydatepicker"/>
            </div>
         
          </div>
                <table id="myTable" className="table table-striped">
              <thead>
                  <tr>
                      <th>№</th>
                      <th>ID</th>
                      <th>ФИО</th>
                   
                      <th>Оценка</th>
                      <th>Комментарий</th>
                      
                  </tr>
              </thead>
                <tbody>
              {this.state.students.map((student, s) =>
                <tr key={s}>
                    <td>{s+1}</td>
                    <td>{student.user_id.username}</td>
                    <td >{student.user_id.name} {student.user_id.lastname}</td>
                    
                    <td  ><input type="text" className="form-control " value={this.state.grade.mark} onChange={this.changeMark} placeholder="Выставите оценку"
                name="mark"/></td>
                    <td  ><input type="text" className="form-control " value={this.state.grade.comment} onChange={this.changeMark} placeholder="Выставите комментарий"
                name="comment"/></td>
                    
                </tr>
              )}
              </tbody>
                       
          </table>
          <div className="row">
           {this.state.message && <h5 style={{ fontSize: '14px', color: 'green', textAlign: 'center' }}>{this.state.message}</h5>}
           <button className="btn pull-right btn-success" style={{paddingLeft: '1%', paddingRight: '1%'}} onClick={this.sendMark}>Выставить оценки</button>
           </div>
      </div>

      </div>
      </div>);
  }
}

export default TeacherAddMark;
