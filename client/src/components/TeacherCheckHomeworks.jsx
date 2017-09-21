import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';

class TeacherCheckHomeworks extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      homework_id: this.props.location.state.homework_id,
      homework: {},
      answer: [],
      students_name: [],
      students_lastname: [],
      marksforhomework: [],
      message: '',
      userId: ''
    },
    this.sendMark = this.sendMark.bind(this);
    this.addMark = this.addMark.bind(this);

  }
  componentDidMount() {
    this.getStatus();
    this.getHomework();
  }
  getHomework(){
    axios.get('/homework/gethomework?homework_id='+this.state.homework_id,  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          homework: res.data.homework,
          answer: res.data.answer,
          students_name: res.data.students_name,
          students_lastname: res.data.students_lastname
        });
      });
  }
  dateFormat(date){
    var fDate = new Date(date);
    var m = ((fDate.getMonth() * 1 + 1) < 10) ? ("0" + (fDate.getMonth() * 1 + 1)) : (fDate.getMonth() * 1 + 1);
    var d = ((fDate.getDate() * 1) < 10) ? ("0" + (fDate.getDate() * 1)) : (fDate.getDate() * 1);
    return m + "/" + d + "/" + fDate.getFullYear()
  }
  getStatus(){
    if(Auth.isUserAuthenticated()){
      var token = Auth.getToken();
      var decoded = jwtDecode(token);
      this.setState({
        status: decoded.userstatus,
        userId: decoded.sub
      });
      axios.get('/subject/getteachersubjects?teacherId='+decoded.sub,  {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          this.setState({
            subjects: res.data.subjects
          });
        });
    }
  }
  sendMark(event){
    const formData = `homework_id=${this.state.homework_id}&marks=${JSON.stringify(this.state.marksforhomework)}&userId=${this.state.userId}`;
    axios.post('/mark/addmarksforhomework', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
    .then(res => {
      this.setState({
        message: res.data.message
      });
    });
  }
  addMark(event){
    var marks = this.state.marksforhomework;
    var temp;
    var found = false;
    marks.forEach(function(item, index){
      if( item.id && item.id.toString() === event.target.id.toString()){
        temp = item;
        item.mark=event.target.value;
          found = true;
      }
    })
    if(!found){
      marks.push({
        id: event.target.id,
        mark: event.target.value
      })
    }
    this.setState({
      marksforhomework: marks
    })
  }

  render() {
    return (
      <div className="container clearfix">
      <div className="bg-title" style={{paddingRight: '3%'}}>
        <div className="row">
          <div className="col-md-9">
            <h4>Все дз</h4>
          </div>
        </div>
      </div>
      <div className=" my-content">
        <div className="table-responsive" style={{minHeight: '400px'}}>
          <div className="form-group row">
          </div>
          {
            this.state.answer.length?
          (
          <div >
          <table id="myTable" className="table table-striped functional-table">
            <thead>
                <tr>
                    <th className="table-head-text">№</th>
                    <th className="table-head-text table-b-left">Студент</th>
                    <th className="table-head-text table-b-left">Файл</th>
                    <th className="table-head-text table-b-left">Сообщение</th>
                    <th className="table-head-text table-b-left">Статус</th>
                    <th className = "table-head-text table-b-left">Оценка</th>
                </tr>
            </thead>
            <tbody>
            {this.state.answer.map((ans, a) =>
                <tr key={a}>
                <td>{a+1}</td>
                <td className="table-b-left">{this.state.students_name[a]} {this.state.students_lastname[a]}</td>
                {ans.answer_file?(
                  <td className="table-b-left"><a target="_blank" style={{color: 'black', textDecoration: 'none'}} href={'/download/downloadanswer/'+ans.answer_file+'?id='+ans._id+'&homework_id='+this.state.homework_id}>{ans.answer_file} <i className="fa fa-download" aria-hidden="true"></i></a></td>
                ):(
                  <td className="table-b-left">Нет файлов</td>
                )
              }
              {ans.answer_message?(
                <td className="table-b-left">{ans.answer_message}</td>
              ):(
                <td className="table-b-left">Нет сообщений</td>
              )}
              <td className="table-b-left"> {ans.status?(
                <p>Выполнено</p>
              ):(
                <p style={{color: 'red'}}>Не выполнено</p>
              )}</td>
              <td className="table-b-left">{ans.checked?(<p style={{color: 'green'}}>Оценка выставлена</p>):(<input type="number" className="form-control"  min="0"  id={ans._id} onChange={this.addMark} placeholder="Выставите оценку" />)}</td>
              </tr>
            )}
            </tbody>
          </table>
          <button type="submit" className="btn pull-right btn-success"  onClick={this.sendMark} >Выставить оценки</button>
          <div>{this.state.message?(<p style={{color: 'green'}}>{this.state.message}</p>):(<p></p>)}</div>
        </div>) :(
          <table id="myTable" className="table table-striped functional-table">
            <thead>
                <tr>
                  <th className="table-head-text">№</th>
                  <th className="table-head-text">Начало</th>
                  <th className="table-head-text">Файл</th>
                  <th className="table-head-text">Ответы</th>
                  <th className="table-head-text">Статус</th>
                  <th className="table-head-text">Оценка</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>Ничего не найдено</td>
                <td></td>
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

export default TeacherCheckHomeworks;
