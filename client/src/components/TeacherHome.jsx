import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';

class TeacherHome extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
       userId: '',
       teacher: {
         user_id: {}
       },

       img: 'default.jpg'

    }
  }
  componentDidMount() {
    if(Auth.isUserAuthenticated()){
      var token = Auth.getToken();
      var decoded = jwtDecode(token);
      this.setState({
        userId: decoded.sub
      });
      axios.get('/api/getteacherprofileinfo?teacherId='+decoded.sub,  {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          this.setState({
            teacher: res.data.teacher,
            img: res.data.teacher.img
          });
        });
    }
  }

  render() {
    return (
      <div className="container clearfix">
        <div className="page-wrapper">
          <div className="bg-title" style={{margin: '0px' }}>
            <h4>Главная преподавателя</h4>
          </div>
          <div className="profile-heading text-center vertical-align">
            <div className="teacher-progress-bar"></div>
            <div className="teacher-progress-bar"></div>
            <div className="teacher-progress-bar"></div>
            <div className="profile-heading-name ">
            </div>
            <div style={{fontSize: '20px', color: 'black'}}></div>
          </div>
          <div className="teacher-statistics">
            <div className="teacher-mini-profile  text-center" >
              <div className="white-box text-center" style={{height: '100%'}}>
                <div style={{width: '100%'}}>
                  <img src={require("../../../public/teacher-img/"+this.state.img)} alt="user" className="img-circle img-responsive profile-teacher-img" style={{display: 'block',margin: '10px auto'}}/>
                </div>
                <p className="profile-teacher-name">{this.state.teacher.user_id.name} {this.state.teacher.user_id.lastname}</p>
                <p>{this.state.teacher.degree}</p>
                <button className="profile-teacher-btn">Настройки</button>
              </div>
            </div>
            <div className="teacher-common-statistic ">
              <div className="white-box" style={{height: '100%'}}>
                <p className="teacher-common-statistic-text">Общая статистика</p>
              </div>
            </div>
            <div className="teacher-number-statistic">
              <div className="white-box" style={{height: '100%'}}>
                <p className="teacher-number-statistic-text">Количество студентов</p>
              </div>
            </div>
            <div className="teacher-number-statistic">
              <div className="white-box" style={{height: '100%'}}>
                  <p className="teacher-number-statistic-text">Учебный год</p>
              </div>
            </div>
            <div className="teacher-courses-statistic">
              <div className="white-box"  style={{height: '100%'}}></div>
            </div>
            <div className="teacher-progress-statistic">
              <div className="white-box"  style={{height: '100%'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherHome;
