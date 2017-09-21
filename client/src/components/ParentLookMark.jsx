import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';

class ParentCheckAttendance extends React.Component {

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
      attendance: [],
      onestudent: {},
      childs: []
    };
   this.updateAtt = this.updateAtt.bind(this);
   this.dateFormat=this.dateFormat.bind(this);
  }
  componentDidMount() {
      if(Auth.isUserAuthenticated()){
      var token = Auth.getToken();
      var decoded = jwtDecode(token);
      this.setState({
        userId: decoded.sub
      });
      axios.get('/parent/mychildgroup?parentId='+decoded.sub,  {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          this.setState({
            childs: res.data.childs
          });
    }
  )}
}
 dateFormat(date){
    var fDate = new Date(date);
    var m = ((fDate.getMonth() * 1 + 1) < 10) ? ("0" + (fDate.getMonth() * 1 + 1)) : (fDate.getMonth() * 1 + 1);
    var d = ((fDate.getDate() * 1) < 10) ? ("0" + (fDate.getDate() * 1)) : (fDate.getDate() * 1);
    return m + "/" + d + "/" + fDate.getFullYear()
  }
updateAtt(event){
  if(event.target.value.length > 0){
              this.setState({
                subject_id: event.target.value,
              })

    const  userId =this.state.userId;
    const subjectId=event.target.value;
    const formData=`userId=${userId}&subjectId=${event.target.value}`;
      axios.post('/mark/updatemychildmark', formData, {
            responseType: 'json',
            headers: {
              'Content-type': 'application/x-www-form-urlencoded'
            }
    })
         .then(res => {
        this.setState({
          //subject_groups: res.data.subject_groups.groups
          attendance: res.data.attendance
        });
      });

    }  else {
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
          <h4>Успеваемость</h4>
        </div>
        <div className="my-content  ">
          <div className="table-responsive">
            <div className="form-group col-md-6">
              <label>Выберите предмет</label>
              <select className="form-control " name="subject_id" value={this.state.subject_id} onChange={this.updateAtt}>
              <option value=''>предмет не выбран</option>
              {this.state.childs.map((sub, s) =>
                <option key={s} value={sub._id}>{sub.subject_name}</option>
              )}
              </select>
            </div>
            <h5 style={{ fontSize: '14px', color: 'grey'}}>{this.state.message}</h5>
              <table id="myTable" className="table table-striped">
              <thead>
                  <tr>
                      <th>№</th>
                      <th className="table-b-left">ID</th>
                      <th className="table-b-left">ФИО</th>
                      <th className="table-b-left">Статус</th>
                      <th className="table-b-left">Дата</th>
                  </tr>
              </thead>
              {
                this.state.attendance.length !=0 ?
                ( <tbody>
                  {this.state.attendance.map((student, s) =>
                    <tr key={s}>
                        <td>{s+1}</td>
                        <td className="table-b-left">{student.student.user_id.username}</td>
                        <td className="table-b-left">{student.student.user_id.name}  {student.student.user_id.lastname}</td>
                        <td className="table-b-left"> {student.stud_mark}</td>
                        <td className="table-b-left">{this.dateFormat(student.date)}</td>

                    </tr>
                  )}
                  </tbody>) :(
                    <tbody>
                      <tr>
                      <td>Нет успеваемости</td>
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

export default ParentCheckAttendance;
