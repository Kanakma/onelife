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
       img: '599bec7ea17a7a2088d03fc4-default_avatar.png'
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
          <div className="bg-title" style={{marginLeft: '0px' }}>
            <h4>Главная преподавателя</h4>
          </div>
          <div className="profile-heading text-center vertical-align">
            <div className="profile-heading-name ">
            {this.state.teacher.user_id.name} {this.state.teacher.user_id.lastname}</div>
            <div style={{fontSize: '20px', color: 'black'}}>{this.state.teacher.degree} </div>
          </div>
          <div className="page-content">
            <div className=" col-md-4">
              <div className="white-box text-center">
                <div style={{width: '100%'}}>
                  <img src={require("../../../public/teacher-img/"+this.state.img)} alt="user" className="img-circle img-responsive profile-teacher-img" style={{display: 'block',margin: '10px auto'}}/>
                </div>
                <p className="profile-teacher-name">{this.state.teacher.user_id.name} {this.state.teacher.user_id.lastname}</p>
                <p>{this.state.teacher.degree}</p>
                <button className="profile-teacher-btn">Настройки</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherHome;
