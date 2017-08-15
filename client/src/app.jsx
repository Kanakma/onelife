import React from 'react';
import ReactDom from 'react-dom';
import jwtDecode from 'jwt-decode';
import { Redirect, BrowserRouter, Route, Link, History } from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import AdminHome from './components/AdminHome.jsx';
import TeacherHome from './components/TeacherHome.jsx';
import AdminFaculties from './components/AdminFaculties.jsx';
import AdminMajors from './components/AdminMajors.jsx';
import AdminStudents from './components/AdminStudents.jsx';
import AdminSubjects from './components/AdminSubjects.jsx';
import AdminTeachers from './components/AdminTeachers.jsx';
import AdminAddFaculty from './components/AdminAddFaculty.jsx';
import AdminAddMajor from './components/AdminAddMajor.jsx';
import AdminAddStudent from './components/AdminAddStudent.jsx';
import AdminAddSubject from './components/AdminAddSubject.jsx';
import AdminAddTeacher from './components/AdminAddTeacher.jsx';
import StudentSubject from './components/StudentSubject.jsx';
import TeacherTest from './components/TeacherTest.jsx';
import TeacherAddTest from './components/TeacherAddTest.jsx';
import StudentPassTest from './components/StudentPassTest.jsx';
import AdminAddDepartment from './components/AdminAddDepartment.jsx';
import AdminDepartments from './components/AdminDepartments.jsx';
import TeacherProfile from './components/TeacherProfile.jsx';
import AllInfoSubject from './components/AllInfoSubject.jsx';
import AdminAddParrent from './components/AdminAddParrent.jsx';
import AdminParrents from './components/AdminParrents.jsx';
import Auth from './modules/Auth';

ReactDom.render((
  <BrowserRouter>
    <div>
      <Base />
      <Route exact={true} path="/" render={() =>
        (Auth.isUserAuthenticated() ? (
            <HomePage />
          ) : (
            <LoginPage />
          )
        )}/>
      <Route path="/choosesubjects" component={StudentSubject}/>
      <Route path="/starttest" component={StudentPassTest}/>
      <Route path="/tests" component={TeacherTest}/>
      <Route path="/addtest" component={TeacherAddTest}/>
      <Route path="/faculties" component={AdminFaculties}/>
      <Route path="/addfaculties" component={AdminAddFaculty}/>
      <Route path="/majors" component={AdminMajors}/>
      <Route path="/addmajors" component={AdminAddMajor}/>
      <Route path="/subjects" component={AdminSubjects}/>
      <Route path="/addsubjects" component={AdminAddSubject}/>
      <Route path="/teachers" component={AdminTeachers}/>
      <Route path="/addteachers" component={AdminAddTeacher}/>
      <Route path="/students" component={AdminStudents}/>
      <Route path="/addstudents" component={AdminAddStudent}/>
      <Route path="/departments" component={AdminDepartments}/>
      <Route path="/adddepartments" component={AdminAddDepartment}/>
      <Route path= "/teacherprofile" component={TeacherProfile}/>
      <Route path= "/infosubject" component={AllInfoSubject}/>
      <Route path="/addparrent" component={AdminAddParrent}/>
      <Route path= "/parrents" component={AdminParrents}/>
      <Route path="/logout" render={() => { Auth.deauthenticateUser(); return <Redirect to="/"/>; } }/>
    </div>
  </BrowserRouter>
),
      document.getElementById('react-app'));
