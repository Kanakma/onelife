import React from 'react';
import ReactDom from 'react-dom';
import jwtDecode from 'jwt-decode';
import { Redirect, BrowserRouter as Router, Route, Link } from 'react-router-dom';

const TeacherProfileNav = () => (
  <Router>
    <div>
      <ul className="nav nav-tabs tabs customtab teacher-nav">
        <li><Link to="/biography">Biography</Link></li>
        <li><Link to="/activity">Activity</Link></li>
        <li><Link to="/editinfo">Edit information</Link></li>
      </ul>
      <Route exact path="/biography" component={Biography}/>
      <Route path="/activity" component={Activity}/>
      <Route path="/editinfo" component={EditInfo}/>
    </div>
  </Router>
)

const Biography = () => (
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
)

const Activity = () => (
  <div>
    <h2>Activity</h2>
  </div>
)

const EditInfo = () => (
  <div>
    <h2>Edit Information</h2>
  </div>
)



export default TeacherProfileNav;
