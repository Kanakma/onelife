import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';

class AdminSubjectInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      subjectId:  this.props.location.state.subject,
      subject: {},
      img: '59907daeab55a310c391a057-1.jpg',
      already: false,
      message: '',
      status: '',
      teacher: {},
      user: {}
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

    axios.get('/api/getsubject?subjectId='+this.state.subjectId,  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        this.setState({
          subject: res.data.subject,
          teacher: res.data.teacher,
          user: res.data.user,
          img: res.data.img
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
        <div className="bg-title">
          <h4>Информация о предмете</h4>
        </div>
        <div className="my-content">
        <div className="row" >
          <div className="col-md-12 col-xs-12"  style={{padding: '0px 7.5px'}}>
              <div className="white-box">
                  <div className="row">
                      <div className="col-md-offset-4 col-md-4 text-center">
                          <img className="img-responsive" src={require("../../../public/subject-img/"+this.state.img)} alt="course-image" style={{width: '100%', height: '100%'}}/>
                      </div>
                  </div>
                  <div className="row" style={{margin: '0px', marginTop: '15px'}}>
                      <div className="col-md-3 col-xs-6 b-r">
                        <strong>Наименование курса</strong>
                        <br/>
                        <p className="text-muted">{this.state.subject.subject_name}</p>
                      </div>
                      <div className="col-md-3 col-xs-6 b-r">
                        <strong>Количество кредитов</strong>
                        <br/>
                        <p className="text-muted">{this.state.subject.credit_number}</p>
                      </div>
                      <div className="col-md-3 col-xs-6 b-r">
                        <strong>Профессор</strong>
                        <br/>
                        <p className="text-muted">{this.state.user.name} {this.state.user.lastname}</p>
                      </div>
                      <div className="col-md-3 col-xs-6">
                        <strong>Курс</strong>
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
export default AdminSubjectInfo;
