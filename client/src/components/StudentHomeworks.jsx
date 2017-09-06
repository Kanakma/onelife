import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import DatePicker from 'react-bootstrap-date-picker';

class StudentHomeworks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      homeworks: [],
      subjects: [],
      user_id: ''
    };
    this.getStatus = this.getStatus.bind(this);
    this.getHomeworks = this.getHomeworks.bind(this);
    this.chooseSubject = this.chooseSubject.bind(this);
    this.dateFormat = this.dateFormat.bind(this);
  }
  componentDidMount() {
    this.getStatus();
  }
  componentWillMount() {
  }
  dateFormat(date){
    var fDate = new Date(date);
    var m = ((fDate.getMonth() * 1 + 1) < 10) ? ("0" + (fDate.getMonth() * 1 + 1)) : (fDate.getMonth() * 1 + 1);
    var d = ((fDate.getDate() * 1) < 10) ? ("0" + (fDate.getDate() * 1)) : (fDate.getDate() * 1);
    return m + "/" + d + "/" + fDate.getFullYear()
  }
  getHomeworks(){
    axios.get('/api/gethomeworks',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        this.setState({
          homeworks: res.data.homeworks
        });
      });
  }
  getStatus(){
    if(Auth.isUserAuthenticated()){
      var token = Auth.getToken();
      var decoded = jwtDecode(token);
      this.setState({
        status: decoded.userstatus,
        user_id: decoded.sub
      });
      axios.get('/api/getsubjectsofstudent?user_id='+decoded.sub,  {
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
  }
  chooseSubject(event){
    const formData = `user_id=${this.state.user_id}&subject_id=${event.target.value}`;
      axios.post('/api/gethomeworksofsubject', formData, {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          this.setState({
            homeworks: res.data.homeworks
          });
        });

  }
 clearContent(){
   this.setState({
   })
 }
  render() {
    return (
      <div className="container clearfix">
        <div className="bg-title">
          <h4>Все домашние задания</h4>
        </div>
        <div className="my-content">
          <div className="table-responsive" style={{minHeight: '400px'}}>
          <div className="form-group">
            <label>Выберите предмет</label>
            <select className="form-control"  onChange={this.chooseSubject} >
              <option >Выберите предмет</option>
                {this.state.subjects.map((subject, s) =>
                  <option key={s} value={subject._id} name={subject.subject_name}>{subject.subject_name}</option>
                )}
            </select>
          </div>
          {
            this.state.homeworks.length !=0 ?
          (
          <table id="myTable" className="table table-striped">
            <thead>
                <tr>
                    <th>№</th>
                    <th>Начало</th>
                    <th>Дедлайн</th>
                    <th>Файл</th>
                    <th>Редактировать</th>
                </tr>
            </thead>
            <tbody>
              {this.state.homeworks.map((homework, h) =>
                <tr key={h}>
                    <td>{h+1}</td>
                    <td>{this.dateFormat(homework.lessonDate)}</td>
                    <td>{this.dateFormat(homework.deadline)}</td>
                    {homework.file?(
                      <td>{homework.file}</td>
                    ):(
                      <td>Нет файлов</td>
                    )
                    }

                </tr>
              )}
            </tbody>
          </table>) :(
          <table id="myTable" className="table table-striped">
            <thead>
                <tr>
                  <th>№</th>
                  <th>Начало</th>
                  <th>Дедлайн</th>
                  <th>Файл</th>
                  <th>Редактировать</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>Ничего не найдено</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>
            </tbody>
          </table>
            )
          }
          </div>
        </div>
      </div>);
  }
}
export default StudentHomeworks;
