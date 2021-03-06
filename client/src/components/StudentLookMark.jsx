import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';

class TeacherAddAttendance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: [],
      group_name:'',
      message: '',
      errors: {},
      subjects: [],
      subject: [],
      subject_groups: [],
      students: [],
      subject_id: '',
      checkSubject: false,
      checkQuestion: false,
      main_students: [],
      stud_attendance: {},
      checkAttendance: false,
      attendances: [],
      att_date:'',
      att_students: [],
      mygroup:'',
      userId:'',
      student: {
         user_id: {}
       },
      group_name:'',
      student: '',
      mark: [],
      onestudent: {}
    };
    this.updateMe = this.updateMe.bind(this);
    this.dateFormat=this.dateFormat.bind(this);
  }

  componentDidMount() {
      if(Auth.isUserAuthenticated()){
      var token = Auth.getToken();
      var decoded = jwtDecode(token);
      this.setState({
        userId: decoded.sub
      });
      axios.get('/student/mygroup1?studentId='+decoded.sub,  {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          this.setState({
            subject: res.data.subject,
            student: res.data.student,
            onestudent: res.data.onestudent
          });
        });
  }
}
 dateFormat(date){
    var fDate = new Date(date);
    var m = ((fDate.getMonth() * 1 + 1) < 10) ? ("0" + (fDate.getMonth() * 1 + 1)) : (fDate.getMonth() * 1 + 1);
    var d = ((fDate.getDate() * 1) < 10) ? ("0" + (fDate.getDate() * 1)) : (fDate.getDate() * 1);
    return m + "/" + d + "/" + fDate.getFullYear()
  }
updateMe(event){
   if(event.target.value.length > 0){
        this.setState({
          subject_id: event.target.value,
          checkSubject: true,
          message: '',
          students: this.state.main_students.filter(function(student) {
                                    return student.lastname.indexOf(event.target.value) > -1;
                                })
        })
      console.log(this.state.userId, event.target.value)
      const  userId =this.state.onestudent._id;
      const subjectId=event.target.value;
      const formData=`userId=${userId}&subjectId=${event.target.value}`;

      axios.post('/mark/updatemymark', formData, {
              responseType: 'json',
              headers: {
                'Content-type': 'application/x-www-form-urlencoded'
              }
      })
        .then(res => {
          this.setState({
            mark:res.data.mark
          });
        });
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
          <h4>Мои оценки</h4>
          <h4> Вы принадлежите к группе {this.state.student.group_name}</h4>
        </div>
        <div className="my-content  ">
          <div className="table-responsive hidden-mobile visible-max visible-ipad visible-middle">
            <p className="teacher-pages-title">Все оценки</p>
            <div className="form-group col-md-6">
                <label className="teacher-choosed">Предмет</label>
                <select className="form-control " name="subject_id" value={this.state.subject_id} onChange={this.updateMe}>
                <option value=''>предмет не выбран</option>
                {this.state.subject.map((sub, s) =>
                  <option key={s} value={sub._id}>{sub.subject_name}</option>
                )}
                </select>
            </div>
            <h5 style={{ fontSize: '14px', color: 'grey'}}>{this.state.message}</h5>
            <table id="myTable" className="table table-striped functional-table">
              <thead>
                  <tr>
                      <th className="table-head-text ">№</th>
                      <th className="table-head-text table-b-left">ID</th>
                      <th className="table-head-text table-b-left">ФИО</th>
                      <th className="table-head-text table-b-left">Оценка</th>
                      <th className="table-head-text table-b-left">Дата</th>

                  </tr>
              </thead>
              {
                this.state.mark.length !=0 ?
                ( <tbody>
                  {this.state.mark.map((student, s) =>
                    <tr key={s}>
                        <td className="table-b-left">{s+1}</td>
                        <td className="table-b-left">{student.student.user_id.username}</td>
                        <td className="table-b-left">{student.student.user_id.name}  {student.student.user_id.lastname}</td>
                        <td className="table-b-left"> {student.stud_mark}</td>
                        <td className="table-b-left">{this.dateFormat(student.date)}</td>

                    </tr>
                  )}
                </tbody>) :(
                <tbody>
                    <tr>
                    <td>У вас пока нет успеваемости</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    </tr>
                </tbody>
                )
              }
          </table>
        </div>
      <div className="table-responsive visible-mobile hidden-max-media hidden-ipad hidden-middle">
        <div className="form-group col-md-6">
            <label>Выберите предмет</label>
              <select className="form-control " name="subject_id" value={this.state.subject_id} onChange={this.updateMe}>
              <option value=''>предмет не выбран</option>
              {this.state.subject.map((sub, s) =>
                <option key={s} value={sub._id}>{sub.subject_name}</option>
              )}
              </select>
         </div>
         <h5 style={{ fontSize: '14px', color: 'grey'}}>{this.state.message}</h5>
         <table id="myTable" className="table table-striped functional-table">
         {
          this.state.mark.length !=0 ?
            ( <tbody>
              {this.state.mark.map((student, s) =>
                <div>
                  <tr key={s}>
                    <td className="mobile-table">№</td><td>{s+1}</td>
                  </tr>
                  <tr>
                    <td className="mobile-table">ФИО</td><td>{student.student.user_id.username}</td>
                  </tr>
                  <tr>
                    <td className="mobile-table">ID</td><td>{student.student.user_id.name}  {student.student.user_id.lastname}</td>
                  </tr>
                  <tr>
                    <td className="mobile-table">Оценка</td><td> {student.stud_mark}</td>
                  </tr>
                  <tr>
                    <td className="mobile-table" >Дата</td><td>{this.dateFormat(student.date)}</td>
                  </tr>
                  <br/>
                </div>
              )}
              </tbody>) :(
              <tbody>
                  <tr>
                  <td>У вас пока нет успеваемости</td>
                  </tr>
              </tbody>
              )
            }
          </table>
        </div>
      </div>
    </div>);
  }
}

export default TeacherAddAttendance;
