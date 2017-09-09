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
import AdminReports from './components/AdminReports.jsx';
import TeacherProfile from './components/TeacherProfile.jsx';
import TeacherEditProfile from './components/TeacherEditProfile.jsx';
import TeacherAddAttendance from './components/TeacherAddAttendance.jsx'
import TeacherAddMark from './components/TeacherAddMark.jsx';
import TeacherAddHomework from './components/TeacherAddHomework.jsx';
import AdminAddParrent from './components/AdminAddParrent.jsx';
import AdminParrents from './components/AdminParrents.jsx';
import TeacherSubjects from './components/TeacherSubjects.jsx';
import StudentSubjects from './components/StudentSubjects.jsx';
import StudentEditProfile from './components/StudentEditProfile.jsx';
import AdminSubjectInfo from './components/AdminSubjectInfo.jsx';
import TeacherShowMarks from './components/TeacherShowMarks.jsx';
import TeacherHomeworks from './components/TeacherHomeworks.jsx';
import TeacherAddNewHomework from './components/TeacherAddNewHomework.jsx';
import AdminAddSchedule from './components/AdminAddSchedule.jsx';
import AdminSchedules from './components/AdminSchedules.jsx'
import AdminGroups from './components/AdminGroups.jsx';
import AdminAddGroups from './components/AdminAddGroups.jsx';
import AdminAuditory from './components/AdminAuditory.jsx';
import AdminAddAuditory from './components/AdminAddAuditory.jsx';
import TeacherShowAttendance1 from './components/TeacherShowAttendance1.jsx';
import StudentLookAttendance from './components/StudentLookAttendance.jsx';
import StudentLookMark from './components/StudentLookMark.jsx';
import StudentAddHomework from './components/StudentAddHomework.jsx';
import StudentHomeworks from './components/StudentHomeworks.jsx';
import ParentLookAttendance from './components/ParentLookAttendance1.jsx';
import ParentLookMark from './components/ParentLookMark.jsx';
import TeacherAddFinalMark from './components/TeacherAddFinalMark.jsx';
import TeacherSetFinalMark from './components/TeacherSetFinalMark.jsx';
import TeacherGetFinalMark from './components/TeacherGetFinalMark.jsx';
import StudentGetFinalMark from './components/StudentGetFinalMark.jsx';

import Auth from './modules/Auth';
import TeacherCheckHomeworks from './components/TeacherCheckHomeworks.jsx';

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
      <Route path="/teacher_attendances" component={TeacherShowAttendance1}/>
      <Route path="/marks" component={TeacherShowMarks}/>
      <Route path="/teacheraddhomework" component={TeacherAddHomework}/>
      <Route path="/teacherhomeworks" component={TeacherHomeworks}/>
      <Route path="/newhomework" component={TeacherAddNewHomework}/>
      <Route path="/schedules" component={AdminSchedules}/>
      <Route path="/addschedule" component={AdminAddSchedule}/>
      <Route path="/reports" component={AdminReports}/>
      <Route path="/groups" component={AdminGroups}/>
      <Route path="/addgroups" component={AdminAddGroups}/>
      <Route path="/editprofile" component={TeacherEditProfile}/>
      <Route path="/editstudentprofile" component={StudentEditProfile}/>
      <Route path="/auditories" component={AdminAuditory}/>
      <Route path="/addauditories" component={AdminAddAuditory}/>
      <Route path="/student_attendance" component={StudentLookAttendance}/>
      <Route path="/student_mark" component={StudentLookMark}/>
      <Route path="/parent_attendance" component={ParentLookAttendance}/>
      <Route path="/parent_mark" component={ParentLookMark}/>
      <Route path="/teacher_final_mark" component={TeacherAddFinalMark}/>
      <Route path="/studentaddhomework" component={StudentAddHomework}/>
      <Route path="/studenthomeworks" component={StudentHomeworks}/>
      <Route path="/checkanswers" component={TeacherCheckHomeworks}/>
      <Route path="/teacher_set_final_mark" component={TeacherSetFinalMark}/>
      <Route path="/teacher_get_final_mark" component={TeacherGetFinalMark}/>
      <Route path="/student_get_final_mark" component={StudentGetFinalMark}/>
      <Route path="/logout" render={() => { Auth.deauthenticateUser(); return <Redirect to="/"/>; } }/>
    </div>
  </BrowserRouter>
),
      document.getElementById('react-app'));
