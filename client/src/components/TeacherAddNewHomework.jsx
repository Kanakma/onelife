import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import DatePicker from 'react-bootstrap-date-picker';

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
      message: ''
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
  }

  componentDidMount() {
    this.getStatus();
    this.getGroup();
  }
  componentWillMount() {
    this.getStatus();
  }
  getGroup(){
    axios.get('/api/getgroups',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          groups:res.data.allGroups
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
   this.setState({
      group_id: event.target.value
   })
 }
 clearContent(){
   document.getElementById('success').style = "display: block"
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
          <h4></h4>
        </div>
        <div className="my-content  ">
        <div className="table-responsive" style={{minHeight: '400px'}}>
        <form action="/"  onSubmit={this.addHomework}>
          <div className="form-group col-md-6">
            <label>Дата проведения пары</label>
            <DatePicker value={this.state.lesson} onChange={this.lessonChange} className="form-control mydatepicker"/>
          </div>
          <div className="form-group row">
            <div className="col-md-6">
              <label>Дедлайн</label>
              <DatePicker value={this.state.deadline} onChange={this.deadlineChange}  className="form-control mydatepicker"/>
            </div>
          </div>
            <div className="form-group">
              <label>Группа</label>
              <select className="form-control" name="group_id" value={this.state.group_id} onChange={this.changeGroup}>
                <option value=''>Группа</option>
                {this.state.groups.map((group, g) =>
                  <option key={g} value={group.group_id}>{group.group_name}</option>
                )}
              </select>
              <span className="bar"></span>
            </div>
          <div className="row" style={{textAlign: 'center', marginBottom: '20px'}}>
            <textarea maxLength="500" type="text" value={this.state.description} placeholder="Опишите задание" rows="6" className="homework-message" onChange={this.handleChange}></textarea>
          </div>
          <div  style={{textAlign: 'center'}}>
            <label>Выберите файл</label>
          </div>
          <div className="fileinput input-group fileinput-new homework-file" data-provides="fileinput">
              <div className="form-control" data-trigger="fileinput">
              {this.state.filename.length > 0 ?(
                <div>
                  <i className="glyphicon glyphicon-file fileinput-exists"></i>
                  <span className="fileinput-filename">{this.state.filename}</span>
                </div>
              ):(
                <span></span>
              )}
              </div>
              <span className="input-group-addon btn btn-default btn-file">
              {this.state.filename.length > 0 ?(
                <span className="fileinput-exists">Изменить</span>
              ):(
                <span className="fileinput-new">Выбрать</span>
              )}
                <input type="hidden" value="" name="..."/>
                <input type="file" name="" onChange={this.changeFile} />
              </span>
          </div>
          <div id="success" >
            Задание отправлено
          </div>
          <div className="row" style={{textAlign: 'center', marginTop: '20px'}}>
            <button type="submit" className="btn btn-success" style={{paddingLeft: '1%', paddingRight: '1%'}} >Отправить задание</button>
          </div>
          </form>
        </div>
        </div>
      </div>);
  }
}
export default TeacherAddNewHomework;
