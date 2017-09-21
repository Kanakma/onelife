import React from 'react';
import Auth from '../modules/Auth';
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';
import InputElement from 'react-input-mask';

class AdminAddFaqModal extends React.Component {

  constructor(props){
    super(props);
    this.state={
      file: '',
      filename: '',
      question: '',
      answer: '',
      checkContent: false
    }
      this.clearContent = this.clearContent.bind(this);
      this.handleFile = this.handleFile.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.answerChange = this.answerChange.bind(this);
      this.changeFile = this.changeFile.bind(this);
      this.addFaq = this.addFaq.bind(this);
      this.checkContent = this.checkContent.bind(this);
  };
    componentDidMount(){
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
         question: event.target.value
      })
      this.checkContent();
    }
    answerChange(event){
      this.setState({
        answer: event.target.value
      })
      this.checkContent();
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
      addFaq(){
        if(this.state.filename.length>0){
          let fileFormData = new FormData();
          fileFormData.append('file', this.state.file);
          fileFormData.append('question', this.state.question);
          fileFormData.append('answer', this.state.answer);
          axios.post('/faq/addfaq?filename='+this.state.filename, fileFormData, {
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
          const formData = `question=${this.state.question}&answer=${this.state.answer}`;
          axios.post('/faq/addfaq', formData, {
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
      checkContent(){
        if(this.state.question.length>0 && this.state.answer.length>0){
          this.setState({
            checkContent: true
          })
        } else{
          this.setState({
            checkContent: false
          })
        }
      }
      clearContent(){
        this.setState({
          file: '',
          filename: '',
          question: '',
          answer: ''
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
        <form action="/adminfaq" onSubmit={this.addFaq}  >
          <div className="row" style={{textAlign: 'center', marginBottom: '20px'}}>
            <textarea maxLength="500" type="text" value={this.state.question} placeholder="Напишите вопрос" rows="3" className="faq-question" onChange={this.handleChange}></textarea>
          </div>
          <div className="row" style={{textAlign: 'center', marginBottom: '20px'}}>
            <textarea maxLength="500" type="text" value={this.state.answer} placeholder="Напишите ответ" rows="6" className="faq-question" onChange={this.answerChange}></textarea>
          </div>
          <div  style={{textAlign: 'center'}}>
            <label className="teacher-choosed">Выберите файл</label>
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
          <button type="submit" className="btn btn-info waves-effect waves-light m-r-10" disabled={!this.state.checkContent}>
          Добавить
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

export default AdminAddFaqModal;
