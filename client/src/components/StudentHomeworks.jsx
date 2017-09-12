import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import DatePicker from 'react-bootstrap-date-picker';
import StudentAddHomeworkModal from './StudentAddHomeworkModal.jsx';

class StudentHomeworks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homeworks: [],
      subjects: [],
      user_id: '',
      filename: '',
      homework_id: '',
      studenthomeworks: [],
      homework: []
    };
    this.getStatus = this.getStatus.bind(this);
    this.getHomeworks = this.getHomeworks.bind(this);
    this.chooseSubject = this.chooseSubject.bind(this);
    this.dateFormat = this.dateFormat.bind(this);
    this.changeHW = this.changeHW.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
  }
  componentDidMount() {
    this.getStatus();
  }
  componentWillMount() {
  }
  toggleModal(homework) {
    this.setState({
      isOpen: !this.state.isOpen,
      homework:homework
    });
  }
  toggleModalClose() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  changeHW(homework){
    this.setState({
      filename: homework.file,
      homework_id: homework._id
    })
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
            homeworks: res.data.homeworks,
            student_id: res.data.student_id

          })
        })
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
          <div className="table-responsive hidden-mobile visible-max visible-ipad visible-middle" style={{minHeight: '400px'}}>
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
                    <th>Статус</th>
                    <th>Выполнить</th>
                </tr>
            </thead>
            <tbody>
              {this.state.homeworks.map((homework, h) =>
                <tr key={h}>
                    <td>{h+1}</td>
                    <td>{this.dateFormat(homework.lessonDate)}</td>
                    <td>{this.dateFormat(homework.deadline)}</td>
                    <td>{homework.answer.map((ans, a)=>{
                      if(ans.student_id.indexOf(this.state.student_id)!=-1){
                        if(ans.status==false)
                        return (<p key={a} style={{color: 'red'}}>Не выполнено</p>)
                        else{
                          return (<p key={a}>Выполнено</p>)
                        }
                      }
                      else{
                        return (<div></div>)
                      }
                    })
                    }
                    </td>
                    <td><div className="row" style={{textAlign: 'center', marginTop: '20px'}}>
                      <button type="submit" onClick={this.toggleModal.bind(this, homework)} className="btn btn-success" style={{paddingLeft: '1%', paddingRight: '1%'}}  >Добавить ответ</button>
                    </div></td>
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
                  <th>Статус</th>
                  <th>Выполнить</th>
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

  <div className="table-responsive visible-mobile hidden-max-media hidden-ipad hidden-middle" style={{minHeight: '400px'}}>
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
         
            <tbody>
              {this.state.homeworks.map((homework, h) =>
                <div>
                <tr key={h}>
                    <td className="mobile-table">№</td><td>{h+1}</td></tr>
                    <tr>
                    <td className="mobile-table">Дата</td><td>{this.dateFormat(homework.lessonDate)}</td></tr>
                    <tr>
                    <td className="mobile-table">Статус</td><td>{this.dateFormat(homework.deadline)}</td></tr>
                    <tr>
                    <td className="mobile-table">Номер</td><td>{homework.answer.map((ans, a)=>{
                      if(ans.student_id.indexOf(this.state.student_id)!=-1){
                        if(ans.status==false)
                        return (<p key={a} style={{color: 'red'}}>Не выполнено</p>)
                        else{
                          return (<p key={a}>Выполнено</p>)
                        }
                      }
                      else{
                        return (<div></div>)
                      }
                    })
                    }
                    </td>
                    </tr>
                    <tr>
                    <td><div className="row" style={{textAlign: 'center', marginTop: '20px'}}>
                      <button type="submit" onClick={this.toggleModal.bind(this, homework)} className="btn btn-success" style={{paddingLeft: '1%', paddingRight: '1%'}}  >Добавить ответ</button>
                    </div></td>
                </tr>
                </div>

              )}
            </tbody>
          </table>) :(
          <table id="myTable" className="table table-striped">
            <thead>
                <tr>
                  <th>№</th>
                  <th>Начало</th>
                  <th>Дедлайн</th>
                  <th>Статус</th>
                  <th>Выполнить</th>
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




        <StudentAddHomeworkModal
          show={this.state.isOpen}
          onClose={this.toggleModalClose}
          homework={this.state.homework}
          student_id={this.state.student_id}
        />
      </div>


      );




  }
}
export default StudentHomeworks;
