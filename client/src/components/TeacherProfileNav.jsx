import React from 'react';
import ReactDom from 'react-dom';
import jwtDecode from 'jwt-decode';
import { Redirect, BrowserRouter as Router, Route, Link } from 'react-router-dom';

class TeacherProfileNav extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      editedTeacher:{
        name:'',
        lastname:'',
        passport_id:'',
        birthday:'',
        entry_year:'',
        degree:'',
        email:'',
        phone:'',
        faculty_id:'',
        gender:'',
        password: '',
        checkpassword: ''
      },
      birthday:'',
      entry_year:'',
      file: {},
      filename:'',
      // social:this.props.teacher.social,
      faculties:[],
      checkPass: true
    };

  }
  render() {
    return (
  <Router>
    <div>
      <ul className="nav nav-tabs tabs customtab teacher-nav">
        <li><Link to="/biography">Биография</Link></li>
        <li><Link to="/activity">Активность</Link></li>
        <li><Link to="/editinfo">Редактировать информацию</Link></li>
      </ul>
      <Route exact path="/biography" component={Biography}/>
      <Route path="/activity" component={Activity}/>
      <Route path="/editinfo" component={EditInfo}/>
    </div>
  </Router>
)}
}
class Biography extends React.Component{
  render(){
    return(
  <div className="tab-content">
    <div className="row">
      <div className="col-md-3 col-xs-6 b-r">
        <strong>ФИО</strong>
        <br/>
        <p className="text-muted"></p>
      </div>
      <div className="col-md-3 col-xs-6 b-r">
        <strong>Телефон</strong>
        <br/>
        <p className="text-muted"></p>
      </div>
      <div className="col-md-3 col-xs-6 b-r">
        <strong>E-mail</strong>
        <br/>
        <p className="text-muted"></p>
      </div>
      <div className="col-md-3 col-xs-6 ">
        <strong>Место работы</strong>
        <br/>
        <p className="text-muted"></p>
      </div>
    </div>
    <hr/>
    <p style={{marginTop: '30px'}} className=""></p>
    <h4 style={{marginTop: '30px'}}>Навыки</h4>
    <hr/>
    <h4 style={{marginTop: '30px'}}>Образование</h4>
    <hr/>
    <h4 style={{marginTop: '30px'}}>Опыт</h4>
    <hr/>
    <h4 style={{marginTop: '30px'}}>Курсы</h4>
    <hr/>
  </div>
)}
}

class Activity extends React.Component{
  render(){
    return (
      <div>
        <h2>Активность</h2>
      </div>
    )
  }

}

class EditInfo extends React.Component{
  constructor(props){
    super(props);
    this.state={
      editedTeacher:{
        name:'',
        lastname:'',
        passport_id:'',
        birthday:'',
        entry_year:'',
        degree:'',
        email:'',
        phone:'',
        faculty_id:'',
        gender:'',
        password: '',
        checkpassword: ''
      },
      birthday:'',
      entry_year:'',
      file: {},
      filename:'',
      // social:this.props.teacher.social,
      faculties:[],
      checkPass: true
    }
  };
  render(){
    return (
      <div>
        <h2>Редактировать информацию</h2>
      </div>
    )
  }

}



export default TeacherProfileNav;
