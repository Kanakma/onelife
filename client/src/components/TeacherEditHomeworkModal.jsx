import React from 'react';
import Auth from '../modules/Auth';
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';
import InputElement from 'react-input-mask';

class TeacherEditHomeworkModal extends React.Component {

  constructor(props){
    super(props);
    this.state={
      file: '',
      filename: '',
      description: '',
      homework: this.props.homework,
      subject_id: '',
      group_id: '',
      lessonDate: '',
      deadline: ''

    }
      this.dateFormat = this.dateFormat.bind(this);
      this.clearContent = this.clearContent.bind(this);
      this.handleFile = this.handleFile.bind(this);
      this.lessonChange = this.lessonChange.bind(this);
      this.deadlineChange = this.deadlineChange.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.changeFile = this.changeFile.bind(this);
      this.changeHomework = this.changeHomework.bind(this);
      this.deleteHomework = this.deleteHomework.bind(this);
  };
    componentDidMount() {
    }
    dateFormat(date){
      var fDate = new Date(date);
      var m = ((fDate.getMonth() * 1 + 1) < 10) ? ("0" + (fDate.getMonth() * 1 + 1)) : (fDate.getMonth() * 1 + 1);
      var d = ((fDate.getDate() * 1) < 10) ? ("0" + (fDate.getDate() * 1)) : (fDate.getDate() * 1);
      return m + "/" + d + "/" + fDate.getFullYear()
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
    lessonChange(value){
      this.setState({
        lessonDate: value
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
    changeHomework(){
      // event.preventDefault();
      if(this.state.filename.length>0){
        let fileFormData = new FormData();
        fileFormData.append('file', this.state.file);
        fileFormData.append('lessonDate', this.state.lessonDate);
        fileFormData.append('deadline', this.state.deadline);
        fileFormData.append('description', this.state.description);
        fileFormData.append('subject_id', this.props.homework.subject_id);
        fileFormData.append('group_id', this.props.homework.group_id._id);
        axios.post('/api/edithomework?filename='+this.state.filename, fileFormData, {
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
        const formData = `lessonDate=${this.state.lessonDate}&deadline=${this.state.deadline}&description=${this.state.description}&subject_id=${this.props.homework.subject_id}&group_id=${this.props.homework.group_id._id}`;
        axios.post('/api/edithomework', formData, {
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
    deleteHomework(event){
      event.preventDefault();
        const formData = `subject_id=${this.props.homework.subject_id}&group_id=${this.props.homework.group_id._id}`;
        axios.post('/api/deletehomework', formData, {
          responseType: 'json',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          }
        })
        .then(res =>{
          this.setState({
            message: res.data.message
          });
          this.clearContent();
        })
    }
    clearContent(){
      this.setState({
        file: '',
        filename: '',
        description: '',
        lessonDate: '',
        deadline: ''
      })
    }
  render(){
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50,
      marginLeft: 200,
      overflow: 'auto'
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 1000,
      minHeight: 300,
      margin: '35px auto',
      padding: 30
    };

    return (
      <div style={backdropStyle}>
        <div style={modalStyle}>
        <div className="row">
              <button className="btn btn-info waves-effect waves-light m-r-10" style={{float:"right"}} onClick={this.props.onClose}>
                X
              </button>
            </div>
          <div>
          <form action="/teacherhomeworks"  onSubmit={this.changeHomework}>
            <div className="form-group col-md-6">
              <label>Дата проведения пары</label>
              <DatePicker value={this.state.lessonDate} onChange={this.lessonChange} placeholder={this.dateFormat(this.props.homework.lessonDate)} className="form-control mydatepicker"/>
            </div>
            <div className="form-group row">
              <div className="col-md-6">
                <label>Дедлайн</label>
                <DatePicker value={this.state.deadline} onChange={this.deadlineChange}  placeholder={this.dateFormat(this.props.homework.deadline)} className="form-control mydatepicker"/>
              </div>
            </div>
            <div className="row" style={{textAlign: 'center', marginBottom: '20px'}}>
              <textarea maxLength="500" type="text" value={this.state.description} placeholder={this.props.homework.message} rows="6" className="homework-message" onChange={this.handleChange}></textarea>
            </div>
            <div  style={{textAlign: 'center'}}>
              <label>Выберите файл</label>
            </div>
            <div className="fileinput input-group fileinput-new homework-file" data-provides="fileinput" style={{marginBottom: '25px'}}>
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
                {this.props.homework.file.length > 0 ?(
                  <span className="fileinput-exists" placeholder={this.props.homework.file}>Изменить</span>
                ):(
                  <span className="fileinput-new">Выбрать</span>
                )}
                  <input type="hidden" value="" name="..."/>
                  <input type="file" name="" onChange={this.changeFile} />
                </span>
            </div>
              <button type="submit" className="btn btn-info waves-effect waves-light m-r-10" >
              Сохранить изменения
              </button>
              <button className="btn btn-info waves-effect waves-light m-r-10" onClick={this.deleteHomework}>
              Удалить домашнее задание
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherEditHomeworkModal;
