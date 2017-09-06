import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import DatePicker from 'react-bootstrap-date-picker';

class StudentAddHomework extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
    this.getStatus = this.getStatus.bind(this);
  }
  componentDidMount() {
    this.getStatus();
    // this.getSubject();
  }
  componentWillMount() {

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
 clearContent(){
   this.setState({

   })
 }
  render() {
    return (
      <div className="container clearfix">
        <div className="bg-title">
          <h4>Выполнение домашнего задания</h4>
        </div>
        <div className="my-content  ">
        <div className="table-responsive" style={{minHeight: '400px'}}>
        <form action="/" >
          </form>
        </div>
        </div>
      </div>);
  }
}
export default StudentAddHomework;
