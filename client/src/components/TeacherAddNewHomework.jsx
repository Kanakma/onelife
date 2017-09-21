import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import DatePicker from 'react-bootstrap-date-picker';
import TeacherAddHomeworkModal from './TeacherAddHomeworkModal.jsx';
function IndInObjArr(objArray, subj, inkey, sensetive) {
      var sens = ((typeof inkey) === "boolean") ? inkey : false;
      var found = false;
      var result = [];
      if (objArray.length > 0) {
        objArray.forEach(function(obj, ind) {
          if (!sens && inkey) {
            var sub1 = sensetive ? obj[inkey] : obj[inkey].toString().toLowerCase();
            var sub2 = sensetive ? subj : subj.toString().toLowerCase();
            if (sub1 == sub2) {
              found = true;
              result.push(ind);
            }
          } else {
            for (var key in obj) {
              if (obj.hasOwnProperty(key)) {
                var sub1 = sens ? obj[key] : obj[key].toString().toLowerCase();
                var sub2 = sens ? subj : subj.toString().toLowerCase();
                if (sub1 == sub2) {
                  found = true;
                  result.push(ind);
                }
              }
            }
          }
        })
      }
      if (found) {
        return result;
      } else {
        return false;
      }
    }

class TeacherAddNewHomework extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectId: this.props.location.state.subject,
      groups:[],
      message: '',
      group_students: [],
      user_id: '',
      status: '',
      group_id:'',
      subject: {},
      data_uri: null,
      isOpen: false,
      student: {},
      students: [{}],
      temp: [],
      group_name: '',
      checkStudents: false
    };
    this.addHomework = this.addHomework.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.getGroup = this.getGroup.bind(this);
    this.changeGroup = this.changeGroup.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
    this.addStudentToList = this.addStudentToList.bind(this);
    // this.checkAll = this.checkAll.bind(this);
  }

  componentDidMount() {
    this.getStatus();
    this.getGroup();
  }
  componentWillMount() {
    this.getStatus();
  }
  toggleModal(faculty) {
      this.setState({
        isOpen: !this.state.isOpen,
        faculty:faculty
    });
  }
  toggleModalClose() {
      this.setState({
        isOpen: !this.state.isOpen
      });
  }
  getGroup(){
    axios.get('/group/getsubjectgroups?subjectId='+this.state.subjectId,  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          groups:res.data.groups
        });
      });
  }
  addHomework(event){
    event.preventDefault();
  }
  getSubject(){
    axios.get('/subject/getonesubject?subjectId='+this.state.subjectId,  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          subject: res.data
        });
      });
  }
  getStatus(){
    if(Auth.isUserAuthenticated()){
      var token = Auth.getToken();
      var decoded = jwtDecode(token);
      this.setState({
        status: decoded.userstatus,
        user_id: decoded.sub
      });
    }
  }

 changeGroup(event){
  // event.preventDefault();
  event.persist();
   axios.get('/student/getstudentsofgroup?groupId='+event.target.value,  {
     responseType: 'json',
     headers: {
       'Content-type': 'application/x-www-form-urlencoded'
     }
   })
     .then(res => {
       this.setState({
         group_students: res.data.students,
         group_id: event.target.value,
         students: [],
         group_name: event.target.name
       });
     });
 }

 addStudentToList(event){
   var students = this.state.students;
   var temp = IndInObjArr(students,  event.target.value, 'student_id');
   if(temp){
     students.splice(temp[0], 1);
     if(students.length!=0){
       this.setState({
         students: students,
         checkStudents: true
       })
     }else{
       this.setState({
         students: students,
         checkStudents: false
       })
     }
   }
   else{
     students.push({
       student_id: event.target.value
     });
     if(students.length!=0){
       this.setState({
         students: students,
         checkStudents: true
       })
     }else{
       this.setState({
         students: students,
         checkStudents: false
       })
     }
   }
 }
 clearContent(){
   this.setState({

   })
 }
  render() {
    return (
      <div className="container clearfix">
        <div className="bg-title">
          <h4>Добавление домашних заданий</h4>
        </div>
        <div className="my-content  ">
          <div className="table-responsive" style={{minHeight: '400px'}}>
            <p className="teacher-pages-title">Добавление домашнего задания</p>
            <form action="/"  onSubmit={this.addHomework}>
              <div className="form-group">
                <label className="teacher-choosed" style={{padding: '0 15px'}}>Группа</label>
                <select className="form-control" onChange={this.changeGroup} >
                  <option >Выберите группу</option>
                    {this.state.groups.map((group, g) =>
                      <option key={g} value={group._id} name={group.group_name} >{group.group_name}</option>
                    )}
                </select>
                {
                  this.state.group_students.length !=0 ?
                (
                <table id="myTable" className="table table-striped functional-table">
                  <thead>
                      <tr>
                          <th className="table-head-text">№</th>
                          <th className="table-head-text table-b-left"><input type="checkbox" />Выбрать все</th>
                          <th className="table-head-text table-b-left">ID</th>
                          <th className="table-head-text table-b-left">ФИО</th>
                      </tr>
                  </thead>
                  <tbody>
                    {this.state.group_students.map((student, s) =>
                      <tr key={s}>
                          <td>{s+1}</td>
                          <td className="table-b-left"><input type="checkbox" value={student._id} onChange={this.addStudentToList}/></td>
                          <td className="table-b-left">{student.user_id.username}</td>
                          <td className="table-b-left">{student.user_id.name}  {student.user_id.lastname}</td>
                      </tr>
                    )}
                  </tbody>
                </table>) :(
                <table id="myTable" className="table table-striped">
                  <thead>
                      <tr>
                        <th className="table-head-text">№</th>
                        <th className="table-head-text">ID</th>
                        <th className="table-head-text">ФИО</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                      <td>Ничего не найдено</td>
                      <td></td>
                      <td></td>
                      </tr>
                  </tbody>
                </table>
                  )
                }
                  <span className="bar"></span>
              </div>
              <div className="row" style={{textAlign: 'center', marginTop: '20px'}}>
                <button type="submit" onClick={this.toggleModal} className="btn btn-success" style={{paddingLeft: '1%', paddingRight: '1%'}} disabled={!this.state.checkStudents} >Добавить задание</button>
              </div>
            </form>
          </div>
        </div>
        <TeacherAddHomeworkModal
          show={this.state.isOpen}
          onClose={this.toggleModalClose}
          students={this.state.students}
          subject_id={this.state.subjectId}
          group_id={this.state.group_id}
        />
      </div>);
  }
}

export default TeacherAddNewHomework;
