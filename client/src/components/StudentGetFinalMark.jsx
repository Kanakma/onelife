import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
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
      subject_groups: [],
      fm: [],
      final_gpa:''
    };
  
  }

  componentDidMount() {


        if(Auth.isUserAuthenticated()){
      var token = Auth.getToken();
      var decoded = jwtDecode(token);
      this.setState({
        userId: decoded.sub
      });
      //console.log(decoded.sub,'suuub')
      axios.get('/api/myfinalmarks?student_id='+decoded.sub,  {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          this.setState({
            fm: res.data.fm,
           final_gpa: res.data.final_gpa
          });
        })


}

  }

  render() {
 console.log(this.state.final_gpa)
    return (

      <div className="container clearfix">
      <div className=" bg-title">
        <h4>Моя Итоговая Ведомость</h4>

      </div>
      <div className="my-content  ">

      <div className="table-responsive hidden-mobile visible-max visible-ipad visible-middle">
           
 
          <h5 style={{ fontSize: '14px', color: 'grey'}}>{this.state.message}</h5>
                <table id="myTable" className="table table-striped">
              <thead>
                  <tr>
                      <th>№</th>
                     
                      <th>Предмет</th>
                      <th>РК1</th>
                      <th>РК2</th>
                      <th>Сессия</th>
                      <th>Итог</th>
                      <th>Статус</th>    
                  </tr>
              </thead>
                <tbody>
              {this.state.fm.map((sub, s) =>
                <tr key={s}>
                    <td>{s+1}</td>
                    <td>{sub.subject_name.subject_name} </td>
                    <td>{sub.final_mark.rk1}</td>
                    <td>{sub.final_mark.rk2}</td>
                    <td>{sub.final_mark.final_m}</td>
                    <td>{sub.stud_final_mark.stud_final}</td>
                    <td>{sub.subject_stat}</td>
                    
             
                    
                </tr>
              )}
              </tbody>
                       
          </table>
         <h5 style={{ fontSize: '14px', color: 'grey'}}>Мой текущий GPA: {this.state.final_gpa}</h5>
      </div>




      <div className="table-responsive visible-mobile hidden-max-media hidden-ipad hidden-middle">
           
 
          <h5 style={{ fontSize: '14px', color: 'grey'}}>{this.state.message}</h5>
                <table id="myTable" className="table table-striped">
      
                <tbody>
              {this.state.fm.map((sub, s) =>
                <div>
                <tr key={s}>
                    <td>{s+1}</td></tr>
                    <tr>
                    <td className="mobile-table">ФИО</td><td>{sub.subject_name.subject_name} </td></tr>
                    <tr>
                    <td className="mobile-table">РК1</td><td>{sub.final_mark.rk1}</td></tr>
                    <tr>
                    <td className="mobile-table">РК2</td><td>{sub.final_mark.rk2}</td></tr>
                    <tr>
                    <td className="mobile-table">Сессия</td><td>{sub.final_mark.final_m}</td></tr>
                    <tr>
                    <td className="mobile-table">Итог</td><td>{sub.stud_final_mark.stud_final}</td></tr>
                     <tr>
                    <td className="mobile-table">Статус</td><td>{sub.subject_stat}</td></tr>
                </div>
              )}
              </tbody>
                       
          </table>
         <h5 style={{ fontSize: '14px', color: 'grey'}}>Мой текущий GPA: {this.state.final_gpa}</h5>
      </div>

      </div>
      </div>);
  }
}

export default TeacherAddAttendance;
