import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import AdminEditSubjectModal from './AdminEditSubjectModal.jsx'

class AdminSubjects extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      subjects: [],
      status: '',
      checkFilter: false,
      isOpen:false,
      subject:{}
    };
    this.openSubject = this.openSubject.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
  }
    componentDidMount() {
      axios.get('/api/getsubjects',  {
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

    openSubject(event){
      this.context.router.history.push('/subjectinfo', {subject: event.target.id})
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
              <h4>Все предметы</h4>
            </div>
          </div>
        </div>
          { this.state.subjects.length>0 ? (
              <div className=" my-content">
                <div className="row hidden-max-media visible-middle hidden-ipad hidden-mobile">
                  {
                    this.state.subjects.map((subject, s) =>
                      <div key={s} className="col-md-4 col-xs-12 col-sm-6" style={{padding: '0px 7.5px'}}>
                        <img className="img-responsive subject-img" alt="user" src={require("../../../public/subject-img/"+subject.img)} />
                        <div className="white-box">
                          <h4>{subject.subject_name}</h4>
                          <div className="text-muted m-b-20"><span className="m-r-10"><i className="fa fa-clock-o"></i> {subject.course_number} курс</span>
                              <span className="m-l-10"><i className="fa fa-usd"></i> {subject.credit_number} кредита</span>
                          </div>
                          <p><span><i className="fa fa-clock-o"></i> Период: {subject.period} месяцев</span></p>
                          {
                            subject.faculty_id ? (
                              <p><span><i className="fa fa-graduation-cap"></i> Факультет: {subject.faculty_id.faculty_name}</span></p>
                            ):(
                              <p><span><i className="fa fa-graduation-cap"></i>Предмет общеобразовательный</span></p>
                            )
                          }
                          <p><span><i className="fa fa-user-o"></i> Преподаватель: {subject.teacher_id.user_id.name} {subject.teacher_id.user_id.lastname}</span></p>
                            <div>
                              <button onClick={this.openSubject} id={subject._id}  className="btn btn-success btn-rounded waves-effect waves-light " style={{color: 'white'}}>Подробнее</button>
                              <button onClick={this.toggleModal.bind(this, subject)} className="btn btn-default btn-circle m-t-10 pull-right edit-btn-moreinfo" style={{background: 'none'}} >
                                  <i className="fa fa-pencil" style={{color: '#717171'}}></i>
                              </button>
                            </div>
                        </div>
                      </div>
                    )
                  }
                </div>
                <div className="row visible-max visible-ipad hidden-max-media hidden-mobile"  >
                  {
                    this.state.subjects.map((subject, s) =>
                      <div key={s} className="col-md-4 col-xs-12 col-sm-6 col-lg-3" style={{padding: '0px 7.5px'}}>
                        <img className="img-responsive subject-img" alt="user" src={require("../../../public/subject-img/"+subject.img)} />
                        <div className="white-box">
                          <h4>{subject.subject_name}</h4>
                          <div className="text-muted m-b-20"><span className="m-r-10"><i className="fa fa-clock-o"></i> {subject.course_number} курс</span>
                              <span className="m-l-10"><i className="fa fa-usd"></i> {subject.credit_number} кредита</span>
                          </div>
                          <p><span><i className="fa fa-clock-o"></i> Период: {subject.period} месяцев</span></p>
                          {
                            subject.faculty_id ? (
                              <p><span><i className="fa fa-graduation-cap"></i> Факультет: {subject.faculty_id.faculty_name}</span></p>
                            ):(
                              <p><span><i className="fa fa-graduation-cap"></i>Предмет общеобразовательный</span></p>
                            )
                          }
                          <p><span><i className="fa fa-user-o"></i> Преподаватель: {subject.teacher_id.user_id.name} {subject.teacher_id.user_id.lastname}</span></p>
                            <div>
                              <button onClick={this.openSubject} id={subject._id}  className="btn btn-success btn-rounded waves-effect waves-light " style={{color: 'white'}}>Подробнее</button>
                              <button onClick={this.toggleModal.bind(this, subject)} className="btn btn-default btn-circle m-t-10 pull-right edit-btn-moreinfo" style={{background: 'none'}} >
                                  <i className="fa fa-pencil" style={{color: '#717171'}}></i>
                              </button>
                            </div>
                        </div>
                      </div>
                    )
                  }
                </div>
                <div className="row visible-mobile hidden-max-media hidden-middle hidden-ipad"  >
                  {
                    this.state.subjects.map((subject, s) =>
                      <div key={s} className="col-md-4 col-xs-10 col-sm-6 col-lg-3" style={{padding: '0px 7.5px', margin:' 0 10%'}}>
                        <img className="img-responsive subject-img" alt="user" src={require("../../../public/subject-img/"+subject.img)} />
                        <div className="white-box" style={{padding: '15px'}}>
                          <h4>{subject.subject_name}</h4>
                          <div className="text-muted m-b-20"><span className="m-r-10"><i className="fa fa-clock-o"></i> {subject.course_number} курс</span>
                              <span className="m-l-10"><i className="fa fa-usd"></i> {subject.credit_number} кредита</span>
                          </div>
                          <p><span style={{fontSize: '12px'}}><i className="fa fa-clock-o"></i> Период: {subject.period} месяцев</span></p>
                          {
                            subject.faculty_id ? (
                              <p><span style={{fontSize: '12px'}}><i className="fa fa-graduation-cap"></i> Факультет: {subject.faculty_id.faculty_name}</span></p>
                            ):(
                              <p><span style={{fontSize: '12px'}}><i className="fa fa-graduation-cap"></i>Предмет общеобразовательный</span></p>
                            )
                          }
                          <p><span style={{fontSize: '12px'}}><i className="fa fa-user-o"></i> Преподаватель: {subject.teacher_id.user_id.name} {subject.teacher_id.user_id.lastname}</span></p>
                            <div>
                              <button onClick={this.openSubject} id={subject._id}  className="btn btn-success btn-rounded waves-effect waves-light " style={{color: 'white', fontSize: '9px'}}>Подробнее</button>
                              <button onClick={this.toggleModal.bind(this, subject)} className="btn btn-default btn-circle pull-right edit-btn-moreinfo" style={{background: 'none'}} >
                                  <i className="fa fa-pencil" style={{color: '#717171'}}></i>
                              </button>
                            </div>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            ):(
              <div className=" my-content">
                <div className="row">
                  <p>Нет предметов</p>
                </div>
              </div>
            )
          }

        <AdminEditSubjectModal
          subject={this.state.subject}
          show={this.state.isOpen}
          onClose={this.toggleModalClose}
        />
      </div>);
  }
}
AdminSubjects.contextTypes = {
  router: PropTypes.object.isRequired
};
export default AdminSubjects;
