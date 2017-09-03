import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import DatePicker from 'react-bootstrap-date-picker';
import TeacherAddHomeworkModal from './TeacherAddHomeworkModal.jsx';

class TeacherAddNewHomework extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups:[],
      status: '',
      group_id:'',
      subject: {},
      subjectId: this.props.location.state.subject,
      filename: '',
      file: '',
      lesson: '',
      deadline: '',
      data_uri: null,
      description: '',
      user_id: '',
      message: '',
      group_students: [],
      isOpen: false,
      student: {}
    };
    this.addHomework = this.addHomework.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.changeFile = this.changeFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.lessonChange = this.lessonChange.bind(this);
    this.deadlineChange = this.deadlineChange.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.getGroup = this.getGroup.bind(this);
    this.changeGroup = this.changeGroup.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
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
    axios.get('/api/getsubjectgroups?subjectId='+this.state.subjectId,  {
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
    const lesson = this.state.lesson;
    const deadline = this.state.deadline;
    const description = this.state.description;
    const subjectId = this.state.subjectId;
    const user_id = this.state.user_id;
    const group_id = this.state.group_id;
    if(this.state.filename.length>0){
      let fileFormData = new FormData();
      fileFormData.append('file', this.state.file);
      fileFormData.append('lesson', this.state.lesson);
      fileFormData.append('deadline', this.state.deadline);
      fileFormData.append('description', this.state.description);
      fileFormData.append('subjectId', this.state.subjectId);
      fileFormData.append('user_id', this.state.user_id);
      fileFormData.append('group_id', this.state.group_id);
      axios.post('/api/addhomeworkfile', fileFormData, {
        responseType: 'json',
        headers: {
        'Content-type': 'application/x-www-form-urlencoded'
        }
      })
        .then(response => {
            this.setState({
              message: response.data.message
            });
            this.clearContent();
        });
    }
    else{
      const formData = `lesson=${lesson}&deadline=${deadline}&description=${description}&subject_id=${subjectId}&user_id=${user_id}`;
      axios.post('/api/addhomework', formData, {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'}
      })
      .then(res =>{
        this.setState({
          message: res.data.message
        });
        this.clearContent();
      })
    }
  }
  getSubject(){
    axios.get('/api/getonesubject?subjectId='+this.state.subjectId,  {
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
  changeFile(e){
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if(file.size>1000000){
      this.setState({
        file: '',
        filename: ''
      })
      alert("Размер файла не должен превышать 1 Мб!")
    } else{
      reader.onloadend = () => {
        this.setState({
          file: file,
          filename: file.name
        });
      }
      reader.readAsDataURL(file);
    }
  }

 handleFile(e) {
   var self = this;
   var reader = new FileReader();
   var file = e.target.files[0];
   reader.onload = function(upload) {
     self.setState({
       data_uri: upload.target.result,
     });
   }
   reader.readAsDataURL(file);
 }
 lessonChange(value){
   this.setState({
     lesson: value
   });
 }
 deadlineChange(value){
   this.setState({
     deadline: value
   });
 }
 handleChange(event){
   this.setState({
      description: event.target.value
   })
 }
 changeGroup(event){
  //  this.setState({
  //     group_id: event.target.value
  //  })
  // event.preventDefault();
  event.persist();
  console.log(event.target.value)
   axios.get('/api/getstudentsofgroup?groupId='+event.target.value,  {
     responseType: 'json',
     headers: {
       'Content-type': 'application/x-www-form-urlencoded'
     }
   })
     .then(res => {
       console.log(res.data.students)
       this.setState({
         group_students: res.data.students,
         group_id: event.target.value
       });
     });
 }
 clearContent(){
   this.setState({
     status: '',
     subject: {},
     filename: '',
     file: '',
     lesson: '',
     deadline: '',
     data_uri: null,
     description: '',
     group_id:''
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
        <form action="/"  onSubmit={this.addHomework}>
            <div className="form-group">
              <label>Выберите группу</label>
              <select className="form-control" name="group_id" value={this.state.group_id} onChange={this.changeGroup}>
                <option value=''>Группа</option>
                {this.state.groups.map((group, g) =>
                  <option key={g} value={group._id}>{group.group_name}</option>
                )}
              </select>
              <table id="myTable" className="table table-striped">
            <thead>
                <tr>
                    <th>№</th>
                    <th><input type="checkbox" value="был" name="" />Выбрать все</th>
                    <th>ID</th>
                    <th>ФИО</th>
                </tr>
            </thead>
            {
              this.state.group_students.length !=0 ?
              ( <tbody>
            {this.state.group_students.map((student, s) =>
              <tr key={s}>
                  <td>{s+1}</td>
                  <td><input type="checkbox" value="был" name={student._id} /></td>
                  <td>{student.user_id.username}</td>
                  <td>{student.user_id.name}  {student.user_id.lastname}</td>
              </tr>
            )}
            </tbody>) :(
            <tbody>
                <tr>
                <td>Ничего не найдено</td>
                <td></td>
                <td></td>
                <td></td>
                </tr>
                </tbody>
              )
            }


        </table>
              <span className="bar"></span>
            </div>

          <div className="row" style={{textAlign: 'center', marginTop: '20px'}}>
            <button type="submit" onClick={this.toggleModal} className="btn btn-success" style={{paddingLeft: '1%', paddingRight: '1%'}} >Добавить задание</button>
          </div>
          </form>
        </div>
        </div>
        <TeacherAddHomeworkModal
          show={this.state.isOpen}
          onClose={this.toggleModalClose}
        />
      </div>);
  }
}
export default TeacherAddNewHomework;
