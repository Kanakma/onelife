import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import AdminHome from './AdminHome.jsx';
import StudentHome from './StudentHome.jsx';
import TeacherHome from './TeacherHome.jsx';
import ParentHome from './ParentHome.jsx';
import App from './App.jsx';
import Base from './Base.jsx';
import jwtDecode from 'jwt-decode';

class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      status: ''
    };
  }

  componentWillMount(){
    var token = Auth.getToken();
    var decoded = jwtDecode(token);
    this.setState({
      status: decoded.userstatus
    });
  }
  render() {
    return (
      <div>
      {this.state.status == "admin" ?(
          <AdminHome />
      ): (this.state.status == "student") ?(
        <StudentHome />
      ):(this.state.status == "teacher") ?(
        <TeacherHome />
      ):(
        <ParentHome />
      )}
      </div>);
  }
}

export default HomePage;
