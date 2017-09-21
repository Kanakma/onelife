import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';

class TeacherTest extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      tests: [],
      status: ''
    };
    this.openTest = this.openTest.bind(this);
    this.getStatus = this.getStatus.bind(this);
  }
  componentDidMount() {
    axios.get('/test/gettests',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          tests: res.data.tests
        });
        this.getStatus();
      });
  }
  getStatus(){
    if(Auth.isUserAuthenticated()){
      var token = Auth.getToken();
      var decoded = jwtDecode(token);
      this.setState({
        status: decoded.userstatus
      });
    }
  }
  openTest(event){
    //console.log(this.context.router)
    this.context.router.history.push('/starttest', {test_id: event.target.id})
  }

  render() {
    return (
      <div className="container clearfix">
      <div className=" bg-title">
        <h4>Все тесты</h4>
      </div>
      <div className=" my-content" >
      <div className="table-responsive">
        {this.state.tests.map((quiz, s) =>
          <div key={s} >
          {(s == 2) && (this.state.status == "student") ?(
            <div className="col-md-4 well eachSubject">
              <h4>{quiz.subject_name}</h4>
              <br/>
              <p><i className="fa fa-clock-o" aria-hidden="true" style={{marginRight: '10px'}}></i>Количество вопросов: <span className="text-muted">{quiz.q_number} месяцев</span></p>
              <p><i className="fa fa-user" aria-hidden="true" style={{marginRight: '10px'}}></i>Преподаватель: <span className="text-muted">{quiz.teacher_name}</span></p>
              <p><i className="fa fa-user-plus" aria-hidden="true" style={{marginRight: '10px'}}></i>Статус: <span className="text-muted">{quiz.status}</span></p><br/>
              <button id={quiz._id} onClick={this.openTest} className="btn btn-success btn-block">Начать</button>
            </div>
          ):(s != 2) && (this.state.status == "student") ?(
            <div className="col-md-4 well eachSubject" style={{marginRight: '19px'}}>
              <h4>{quiz.subject_name}</h4>
              <br/>
              <p><i className="fa fa-clock-o" aria-hidden="true" style={{marginRight: '10px'}}></i>Количество вопросов: <span className="text-muted">{quiz.q_number}</span></p>
              <p><i className="fa fa-user" aria-hidden="true" style={{marginRight: '10px'}}></i>Преподаватель: <span className="text-muted">{quiz.teacher_name}</span></p>
              <p><i className="fa fa-user-plus" aria-hidden="true" style={{marginRight: '10px'}}></i>Статус: <span className="text-muted">{quiz.status}</span></p><br/>
              <button id={quiz._id} onClick={this.openTest} className="btn btn-success btn-block">Начать</button>
            </div>
          ):(
            <div className="col-md-4 well eachSubject" style={{marginRight: '19px'}}>
              <h4>{quiz.subject_name}</h4>
              <br/>
              <p><i className="fa fa-clock-o" aria-hidden="true" style={{marginRight: '10px'}}></i>Количество вопросов: <span className="text-muted">{quiz.period}</span></p>
              <p><i className="fa fa-user" aria-hidden="true" style={{marginRight: '10px'}}></i>Преподаватель: <span className="text-muted">{quiz.teacher_name}</span></p>
              <p><i className="fa fa-user-plus" aria-hidden="true" style={{marginRight: '10px'}}></i>Статус: <span className="text-muted">{quiz.status}</span></p>
            </div>
          )}
          </div>
        )}
      </div>
      </div>
      </div>);
  }
}

TeacherTest.contextTypes = {
  router: PropTypes.object.isRequired
};

export default TeacherTest;
