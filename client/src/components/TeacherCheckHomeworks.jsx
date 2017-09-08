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
      students_lastname: []
    }

  }
  componentDidMount() {
    this.getStatus();
    this.getHomework();
  }
  getHomework(){
    axios.get('/api/gethomework?homework_id='+this.state.homework_id,  {
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
      axios.get('/api/getteachersubjects?teacherId='+decoded.sub,  {
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

  render() {
    console.log(this.state.students_name)
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
          <table id="myTable" className="table table-striped">
            <thead>
                <tr>
                    <th>№</th>
                    <th>Студент</th>
                    <th>Файл</th>
                    <th>Сообщение</th>
                    <th>Редактировать</th>
                </tr>
            </thead>
            <tbody>
            {this.state.answer.map((ans, a) =>
              <tr key={a}>
                  <td>{a+1}</td>
                  <td>{this.state.students_name[a-1]} {this.state.students_lastname[a-1]}</td>
                  {ans.answer_file?(
                    <td><a target="_blank" style={{color: 'black', textDecoration: 'none'}} href={'/api/downloadanswer/'+ans.answer_file+'?id='+ans._id}>{ans.answer_file}</a></td>
                  ):(
                    <td>Нет файлов</td>
                  )
                  }
                  <td>{ans.answer_message}</td>
                  <td> </td>
              </tr>
            )}
            </tbody>
          </table>) :(
          <table id="myTable" className="table table-striped">
            <thead>
                <tr>
                  <th>№</th>
                  <th>Начало</th>
                  <th>Файл</th>
                  <th>Ответы</th>
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

export default TeacherCheckHomeworks;
