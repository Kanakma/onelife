import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import DatePicker from 'react-bootstrap-date-picker';

class TeacherAllHomeworks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: '',
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
  }
  componentDidMount() {
    this.getStatus();
    // this.getSubject();
  }
  componentWillMount() {

  }
  addHomework(event){
    event.preventDefault();
    const lesson = encodeURIComponent(this.state.lesson);
    const deadline = encodeURIComponent(this.state.deadline);
    const description = encodeURIComponent(this.state.description);
    const subjectId = encodeURIComponent(this.state.subjectId);
    const user_id = encodeURIComponent(this.state.user_id);
    if(this.state.filename.length>0){
      let fileFormData = new FormData();
      fileFormData.append('file', this.state.file);
      fileFormData.append('lesson', this.state.lesson);
      fileFormData.append('deadline', this.state.deadline);
      fileFormData.append('description', this.state.description);
      fileFormData.append('subjectId', this.state.subjectId);
      fileFormData.append('user_id', this.state.user_id);
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
              console.log(response.data)
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
        console.log(res.data)
        this.clearContent();
      })
    }
  }
  getSubject(){
    axios.get('/api/getonesubject?subjectId='+this.state.subjectId,  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        console.log(res.data)
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
  handleSubmit(e) {
   e.preventDefault();
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
     description: ''
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
            <label>Дата проведения Пары</label>
            <DatePicker value={this.state.lesson} onChange={this.lessonChange} className="form-control mydatepicker"/>
          </div>
            <div className="form-group row">
              <div className="col-md-6">
                <label>Дедлайн</label>
                <DatePicker value={this.state.deadline} onChange={this.deadlineChange}  className="form-control mydatepicker"/>
              </div>

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
export default TeacherAllHomeworks;
