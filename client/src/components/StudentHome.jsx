import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';

class StudentHome extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
       userId: '',
       student: {
         user_id: {},
         major_id: {}
       },
       img: '5992d14a00877f29c9dc720d-default_avatar.png'
    }
  }
  componentDidMount() {
    if(Auth.isUserAuthenticated()){
      var token = Auth.getToken();
      var decoded = jwtDecode(token);
      this.setState({
        userId: decoded.sub
      });
      axios.get('/api/getstudentprofileinfo?studentId='+decoded.sub,  {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          console.log(res.data.student)
          this.setState({
            student: res.data.student,
            img: res.data.student.img
          });
        });
    }
  }
  render() {
    return (
    <div className="container clearfix">
    <div className="page-wrapper">
      <div className="bg-title" style={{marginLeft: '0px' }}>
        <h4>Главная студента</h4>
      </div>
      <div className="profile-heading text-center vertical-align">
        <div className="profile-heading-name ">
        {this.state.student.user_id.name} {this.state.student.user_id.lastname}</div>
        <div style={{fontSize: '20px', color: 'black'}}></div>
      </div>
      <div className="page-content">
        <div className=" col-md-4">
          <div className="white-box text-center">
            <div style={{width: '100%'}}>
              <img src={require("../../../public/student-img/"+this.state.img)} alt="user" className="img-circle img-responsive profile-teacher-img" style={{display: 'block',margin: '10px auto'}}/>
            </div>
            <p className="profile-teacher-name">{this.state.student.user_id.name} {this.state.student.user_id.lastname}</p>
            <p>{this.state.student.major_id.major_name}</p>
            <button className="profile-teacher-btn">Настройки</button>
          </div>
        </div>
      </div>
    </div>
    </div>);
  }
}

export default StudentHome;
