import React from 'react';
import axios from 'axios';
import Auth from '../modules/Auth'

class AdminParser extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      filename: '',
      uploaded: false,
      file: '',
      sfilename: '',
      suploaded: false,
      sfile: ''
    }
    this.addFile = this.addFile.bind(this)
    this.submitFile = this.submitFile.bind(this)
    this.addStudFile = this.addStudFile.bind(this)
    this.submitStudFile = this.submitStudFile.bind(this)
  }
  addStudFile(event){
    event.preventDefault();
    let reader = new FileReader();
    let sfile = event.target.files[0];
    var type = sfile.name.split('.')
    if(type[1]!='xlsx'){
      this.setState({
        sfile: '',
        sfilename: '',
        suploaded:false
      })
      alert("Расширение файла должно быть .xlsx")
    } else{
      reader.onloadend = () => {
        this.setState({
          sfile: sfile,
          suploaded: true,
          sfilename: sfile.name
        });
      }
      reader.readAsDataURL(sfile)
    }
  }
  addFile(event){
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    var type = file.name.split('.')
    if(type[1]!='xlsx'){
      this.setState({
        file: '',
        filename: '',
        uploaded:false
      })
      alert("Расширение файла должно быть .xlsx")
    } else{
      reader.onloadend = () => {
        this.setState({
          file: file,
          uploaded: true,
          filename: file.name
        });
      }
      reader.readAsDataURL(file)
    }
  }
  submitStudFile(event){
    event.preventDefault();
    return new Promise((resolve, reject) => {
      let imageFormData = new FormData();
      imageFormData.append('file', this.state.sfile);
      axios.post('/notification/studparser', imageFormData, {
        responseType: 'json',
        headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
        }
      })
        .then(res => {
            this.setState({
              suploaded: false,
              sfilename:''
            });
            alert(res.data.message)
        })
    })
  }
  submitFile(event){
    event.preventDefault();
    return new Promise((resolve, reject) => {
      let imageFormData = new FormData();
      imageFormData.append('file', this.state.file);
      axios.post('/notification/teachparser', imageFormData, {
        responseType: 'json',
        headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
        }
      })
        .then(res => {
            this.setState({
              uploaded: false,
              filename:''
            });
            alert(res.data.message)
        })
    })
  }

  render() {
    return (
      <div className="container clearfix">
        <div className="bg-title">
          <h4>Парсеры</h4>
        </div>
        <div className="my-content" >
          <div className="row">
            <div className="col-md-4 col-xs-12 col-sm-6" style={{padding: '0px 7.5px'}}>
              <img className="img-responsive subject-img" alt="user" src={require("../../../public/subject-img/default.jpg")} />
              <div className="white-box">
                <h4>Преподаватели</h4>
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
                <span>
                  {this.state.filename.length > 0 ?(
                    <label className="btn btn-inverse waves-effect waves-light m-r-10">
                      <input style={{display: "none"}} type="file" onChange={this.addFile} />
                      Изменить файл
                   </label>
                    ):(
                    <label className="btn btn-inverse waves-effect waves-light m-r-10">
                      <input style={{display: "none"}} type="file" onChange={this.addFile} />
                      Выбрать файл
                   </label>
                  )}
                  <button onClick={this.submitFile} disabled={!this.state.uploaded} style={{paddingLeft: '5%', paddingRight: '5%'}} className="btn btn-inverse waves-effect waves-light m-r-10">
                    Отправить
                  </button>
                </span>
              </div>
            </div>
            <div className="col-md-4 col-xs-12 col-sm-6" style={{padding: '0px 7.5px'}}>
              <img className="img-responsive subject-img" alt="user" src={require("../../../public/subject-img/default.jpg")} />
              <div className="white-box">
                <h4>Студенты</h4>
                <div className="form-control" data-trigger="fileinput">
                  {this.state.sfilename.length > 0 ?(
                    <div>
                    <i className="glyphicon glyphicon-file fileinput-exists"></i>
                    <span className="fileinput-filename">{this.state.sfilename}</span>
                    </div>
                    ):(
                    <span></span>
                    )}
                </div>
                <span>
                  {this.state.sfilename.length > 0 ?(
                    <label className="btn btn-inverse waves-effect waves-light m-r-10">
                      <input style={{display: "none"}} type="file" onChange={this.addStudFile} />
                      Изменить файл
                   </label>
                    ):(
                    <label className="btn btn-inverse waves-effect waves-light m-r-10">
                      <input style={{display: "none"}} type="file" onChange={this.addStudFile} />
                      Выбрать файл
                   </label>
                  )}
                  <button onClick={this.submitStudFile} disabled={!this.state.suploaded} style={{paddingLeft: '5%', paddingRight: '5%'}} className="btn btn-inverse waves-effect waves-light m-r-10">
                    Отправить
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div> 

      </div>);
  }
} 

export default AdminParser;