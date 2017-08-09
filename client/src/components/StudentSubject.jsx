import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';

class StudentSubject extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      subjectId:  this.props.location.state.subject,
      subject: {},
      myImg: 'c2.jpg',
      already: false,
      message: '',
      status: ''
    };
    this.chooseSubject = this.chooseSubject.bind(this);
    this.getSubject = this.getSubject.bind(this);
  }
  componentDidMount() {
    this.getSubject();
    this.getStatus();
  }
  componentWillMount() {
    this.getSubject();
    this.getStatus();
  }
  componentWillReceiveProps(){
    this.getSubject();
    this.getStatus();
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
        this.setState({
          subject: res.data.subject,
          already: res.data.already,
          message: res.data.message,
          myImg: res.data.subject.img
        });
      });
  }
  getStatus(){
    if(Auth.isUserAuthenticated()){
      var token = Auth.getToken();
      var decoded = jwtDecode(token);
      this.setState({
        status: decoded.userstatus
      });
    }
  }
  chooseSubject() {
    const subjectId = encodeURIComponent(this.state.subjectId);
    const formData = `subjectId=${subjectId}`;
    axios.post('/api/choosesubject', formData, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        this.componentDidMount()
      });
  }
  render() {
    return (
      <div className="container clearfix">
        <div className="col-md-10 col-md-offset-2 bg-title">
          <h4>Информация о предмете</h4>
        </div>
        <div className="col-md-9 my-content">
        <div className="row" style={{marginTop: '-15px'}}>
          <div className="col-md-12 col-xs-12"  style={{padding: '0px 7.5px'}}>
              <div className="white-box">
                  <div className="row">
                      <div className="col-md-12 m-b-20">
                          <img className="img-responsive" src={require("../../../public/subject-img/"+this.state.myImg)} alt="course-image"/>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-4 col-xs-6 b-r"> <strong>Наименование курса</strong>
                          <br/>
                          <p className="text-muted">{this.state.subject.subject_name}</p>
                      </div>
                      <div className="col-md-3 col-xs-6 b-r"> <strong>Количество кредитов</strong>
                          <br/>
                          <p className="text-muted">{this.state.subject.credit_number}</p>
                      </div>
                      <div className="col-md-3 col-xs-6 b-r"> <strong>Профессор</strong>
                          <br/>
                          <p className="text-muted">{this.state.subject.teacher_name}</p>
                      </div>
                      <div className="col-md-2 col-xs-6"> <strong>Курс</strong>
                          <br/>
                          <p className="text-muted">{this.state.subject.course_number}</p>
                      </div>
                  </div>
                  <hr/>
                  <div className="row">
                      <div className="col-md-12">
                          <p>{this.state.subject.description}</p>
                      </div>
                  </div>
                  {this.state.already && (this.state.status == "student") ?(
                    <div>
                    <hr/>
                    <div className="row text-center">
                        <h4 style={{color: 'red'}}>{this.state.message}</h4>
                    </div>
                    </div>
                  ):(!this.state.already && (this.state.status == "student")) ?(
                    <div>
                    <hr/>
                    <div className="row text-center">
                        <button type="button" onClick={this.chooseSubject} className="btn btn-danger btn-lg">Записаться</button>
                    </div>
                    </div>
                  ):(
                    <div></div>
                  )}

              </div>
          </div>
        </div>
        </div>
      </div>);
  }
}
export default StudentSubject;
