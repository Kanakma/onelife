import React from 'react';
import Auth from '../modules/Auth';
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';
import InputElement from 'react-input-mask';

class StudentAddHomeworkModal extends React.Component {

  constructor(props){
    super(props);
    this.state={
      file: '',
      filename: '',
      answer_message: '',
      students: this.props.students,
      subject_id: this.props.subject_id,
      answer: [],
      homework: this.props.homework,
      show: false
    }
      this.clearContent = this.clearContent.bind(this);
      this.handleFile = this.handleFile.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.changeFile = this.changeFile.bind(this);
      this.addHomework = this.addHomework.bind(this);
      this.show = this.show.bind(this);
  };
  show(){

    if(this.props.show){
      if(!this.state.show){
        var student_id = this.props.student_id;
        var answer = this.props.homework.answer.filter(function(ans){
            return ans.student_id.indexOf(student_id) != -1;
          });
        this.setState({
          answer: answer,
          show: true
        })

      }
    }else {
      if(this.state.show){
        this.setState({
          show: false
        })
      }
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
    handleChange(event){
      this.setState({
         answer_message: event.target.value
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
      addHomework(){
        if(this.state.filename.length>0){
          let fileFormData = new FormData();
          fileFormData.append('file', this.state.file);
          fileFormData.append('answer_message', this.state.answer_message);
          fileFormData.append('homework_id', this.props.homework._id);
          fileFormData.append('student_id', this.props.student_id);
          axios.post('/api/addanswer?filename='+this.state.filename, fileFormData, {
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
          const formData = `answer_message=${this.state.answer_message}&student_id=${this.props.student_id}&homework_id=${this.props.homework._id}`;
          axios.post('/api/addanswer', formData, {
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
      clearContent(){
        this.setState({
          file: '',
          filename: '',
          answer_message: ''
        })
      }
  render(){
    // console.log(this.props.homework._id, 'kjdsgfgsdh')
    // console.log(this.props.homework.answer)
    // console.log(this.state.answer)
    // Render nothing if the "show" prop is false
    this.show();
    if(!this.state.show) {
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
      padding: '20%',
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
          <form action="/" onSubmit={this.addHomework}  >
          <div className="row" style={{textAlign: 'center'}}>
          {this.props.homework.message?(
            <div>
              <h4>Ваше задание:</h4>
              <p>{this.props.homework.message}</p>
            </div>
          ):(
            <div></div>
          )
          }
          {this.props.homework.file?(
            <div className="row" style={{textAlign: 'center', margin: '20px 0'}}>
              <i className="fa fa-download" aria-hidden="true"></i>
              <a target="_blank" style={{color: 'black', textDecoration: 'none'}} href={'/api/downloadhw/'+this.props.homework.file+'?id='+this.props.homework._id}>{this.props.homework.file} </a>
            </div>
          ):(
            <div></div>
          )
          }
          </div>
            <div className="row" style={{textAlign: 'center', marginBottom: '20px'}}>
              <textarea maxLength="500" type="text" value={this.state.answer_message} placeholder="Напишите ответ" rows="6" className="homework-message" onChange={this.handleChange}></textarea>
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
                {this.state.filename.length > 0 ?(
                  <span className="fileinput-exists">Изменить</span>
                ):(
                  <span className="fileinput-new">Выбрать</span>
                )}
                  <input type="hidden" value="" name="..."/>
                  <input type="file" name="" onChange={this.changeFile} />
                </span>
            </div>
              <button type="submit" className="btn btn-info waves-effect waves-light m-r-10">
              Отправить задание
              </button>
              <button className="btn btn-info waves-effect waves-light m-r-10" onClick={this.clearContent}>
              Отмена
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentAddHomeworkModal;
