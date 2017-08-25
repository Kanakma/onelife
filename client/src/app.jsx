import React from 'react';
import ReactDom from 'react-dom';
import jwtDecode from 'jwt-decode';
import { Redirect, BrowserRouter, Route, Link, History } from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import AdminHome from './components/AdminHome.jsx';
import TeacherHome from './components/TeacherHome.jsx';
import StudentHome from './components/StudentHome.jsx';
import ParentHome from './components/ParentHome.jsx';
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
import SubjectInfo from './components/SubjectInfo.jsx';
import TeacherTest from './components/TeacherTest.jsx';
import TeacherAddTest from './components/TeacherAddTest.jsx';
import StudentPassTest from './components/StudentPassTest.jsx';
import AdminAddDepartment from './components/AdminAddDepartment.jsx';
import AdminDepartments from './components/AdminDepartments.jsx';
import TeacherProfile from './components/TeacherProfile.jsx';
import TeacherAddAttendance from './components/TeacherAddAttendance.jsx'
import TeacherAddMark from './components/TeacherAddMark.jsx';
import TeacherAddHomework from './components/TeacherAddHomework.jsx';
import AdminAddParrent from './components/AdminAddParrent.jsx';
import AdminParrents from './components/AdminParrents.jsx';
import TeacherSubjects from './components/TeacherSubjects.jsx';
import StudentSubjects from './components/StudentSubjects.jsx';
import AdminSubjectInfo from './components/AdminSubjectInfo.jsx';
import ShowAttendance from './components/ShowAttendance.jsx';
import ShowMarks from './components/ShowMarks.jsx';
import TeacherHomework from './components/TeacherHomework.jsx';
import TeacherAddNewHomework from './components/TeacherAddNewHomework.jsx';
import TeacherAllHomeworks from './components/TeacherAllHomeworks.jsx';
import AdminAddSchedule from './components/AdminAddSchedule.jsx';
import AdminSchedules from './components/AdminSchedules.jsx'
import AdminGroups from './components/AdminGroups.jsx';
import AdminAddGroups from './components/AdminAddGroups.jsx';
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
      <Route path="/choosesubjects" component={SubjectInfo}/>
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
      <Route path="/teacherprofile" component={TeacherProfile}/>
      <Route path="/addattendance" component={TeacherAddAttendance}/>
      <Route path="/addmark" component={TeacherAddMark}/>
      <Route path="/addparrent" component={AdminAddParrent}/>
      <Route path="/parrents" component={AdminParrents}/>
      <Route path="/teachersubjects" component={TeacherSubjects}/>
      <Route path="/studentsubjects" component={StudentSubjects}/>
      <Route path="/subjectinfo" component={AdminSubjectInfo}/>
      <Route path="/studentprofile" component={StudentHome}/>
      <Route path="/attendances" component={ShowAttendance}/>
      <Route path="/marks" component={ShowMarks}/>
      <Route path= "/teacheraddhomework" component={TeacherAddHomework}/>
      <Route path= "/teacherhomework" component={TeacherHomework}/>
      <Route path= "/newhomework" component={TeacherAddNewHomework}/>
      <Route path= "/allhomeworks" component={TeacherAllHomeworks}/>
      <Route path= "/schedules" component={AdminSchedules}/>
      <Route path= "/addschedule" component={AdminAddSchedule}/>
      <Route path= "/groups" component={AdminGroups}/>
      <Route path= "/addgroups" component={AdminAddGroups}/>
      <Route path="/logout" render={() => { Auth.deauthenticateUser(); return <Redirect to="/"/>; } }/>
    </div>
  </BrowserRouter>
),
      document.getElementById('react-app'));
