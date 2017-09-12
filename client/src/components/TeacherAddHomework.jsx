import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import AdminEditSubjectModal from './AdminEditSubjectModal.jsx'

class TeacherAddHomework extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      subjects: [],
      status: '',
      checkFilter: false,
      isOpen:false,
      subject:{},
      userId: ''
    };
    this.openSubject = this.openSubject.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
  }
  componentDidMount() {
    this.getStatus();
  }
  getStatus(){
    if(Auth.isUserAuthenticated()){
      var token = Auth.getToken();
      var decoded = jwtDecode(token);
      this.setState({
        status: decoded.userstatus,
        userId: decoded.sub
      });
      axios.get('/api/getteachersubjects?teacherId='+decoded.sub,  {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          this.setState({
            subjects: res.data.subjects
          });
        });
    }
  }
  openSubject(event){
    this.context.router.history.push('/newhomework', {subject: event.target.id})
  }
  changeFilter(event){
    if(event.target.id == 'list'){
      this.setState({
        checkFilter: true
      })
    } else {
      this.setState({
        checkFilter: false
      })
    }
  }
    toggleModal(subject) {
        this.setState({
          isOpen: !this.state.isOpen,
          subject:subject
      });
    }
    toggleModalClose() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }
  render() {
    return (
      <div className="container clearfix">
      <div className="bg-title" style={{paddingRight: '3%'}}>

        <div className="row">
          <div className="col-md-9">
            <h4>Добавить домашнее задание</h4>
          </div>
        </div>
      </div>
      <div className=" my-content" hidden={this.state.checkFilter}>
        <div className="row"  >
        { this.state.subjects ? (
            this.state.subjects.map((subject, s) =>
              <div key={s} className="col-md-4 col-xs-12 col-sm-6 col-lg-3" style={{padding: '0px 7.5px'}}>
                  <img className="img-responsive subject-img" alt="user" src={require("../../../public/subject-img/"+subject.img)} />
                  <div className="white-box">
                      <h4>{subject.subject_name}</h4>
                      <div className="text-muted m-b-20"><span className="m-r-10"><i className="fa fa-clock-o"></i> {subject.course_number} курс</span>
                          <span className="m-l-10"><i className="fa fa-usd"></i> {subject.credit_number} кредита</span>
                      </div>
                      <p><span><i className="fa fa-clock-o"></i> Период: {subject.period} месяцев</span></p>
                      <p><span><i className="fa fa-user-o"></i> Преподаватель: {subject.teacher_id.user_id.name} {subject.teacher_id.user_id.lastname}</span></p>
                      <p><span><i className="fa fa-user-plus"></i> Количество возможных студентов: {subject.max_students}</span></p>
                      {(this.state.status == "admin") ?(
                        <div>
                          <button onClick={this.openSubject} id={subject._id}  className="btn btn-success btn-rounded waves-effect waves-light " style={{color: 'white'}}>Добавить дз</button>
                          <button onClick={this.toggleModal.bind(this, subject)} className="btn btn-default btn-circle m-t-10 pull-right edit-btn-moreinfo" style={{background: 'none'}} >
                              <i className="fa fa-pencil" style={{color: '#717171'}}></i>
                          </button>
                        </div>
                      ):(
                        <button id={subject._id} onClick={this.openSubject} className="btn btn-success btn-rounded waves-effect waves-light " style={{color: 'white'}}>Добавить дз</button>
                      )}
                  </div>
              </div>
            )
          ):(
              <div key={s} className="col-md-4 col-xs-12 col-sm-6" style={{padding: '0px 7.5px'}}>
                Нет предметов Добавьте предметы.
              </div>
          )
        }
        </div>
      </div>
      </div>);
  }
}
TeacherAddHomework.contextTypes = {
  router: PropTypes.object.isRequired
};
export default TeacherAddHomework;
