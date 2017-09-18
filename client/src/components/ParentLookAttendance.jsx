import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';

class ParentLookAttendance extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

      childs : []


    };

    this.updateMe = this.updateMe.bind(this);

  }

  componentDidMount() {

        if(Auth.isUserAuthenticated()){
      var token = Auth.getToken();
      var decoded = jwtDecode(token);
      this.setState({
        userId: decoded.sub
      });
      console.log(decoded.sub,'suuub')
      axios.get('/api/mychildgroup?parentId='+decoded.sub,  {
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
          //  console.log(this.state.userId, event.target.value)
            const  userId =this.state.student.students;
            const subjectId=event.target.value;
            const formData=`userId=${userId}&subjectId=${event.target.value}`;

            axios.post('/api/updatemyattendance', formData, {
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
            } else {
              this.setState({
                subject_id: event.target.value,
                checkSubject: false,
                message: ''
              })
            }



        }






  render() {
   console.log(this.state.childs,'childdd')

   //{this.state.child.childs.group_id.group_name}

    return (

      <div className="container clearfix">
      <div className=" bg-title">
        <h4>Посещаемость Студента</h4>
        <h4>  {this.state.childs.map((sub, s) =>
                <p key={s} value={sub._id}>{sub.user_id.name} {sub.user_id.lastname}</p>
              )}
        </h4>
      </div>
      <div className="my-content  ">

      <div className="table-responsive">

          <div className="form-group col-md-6">

           <label>Выберите предмет</label>
              <select className="form-control " name="subject_id" value={this.state.subject_id} onChange={this.updateMe}>
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
                    <td className="table-b-left"> {student.stud_attendance}</td>
                    <td className="table-b-left">{student.date}</td>

                </tr>
              )}
              </tbody>) :(
              <tbody>
                  <tr>
                  <td>У вас пока нет посещаемости</td>
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

export default  ParentLookAttendance;
