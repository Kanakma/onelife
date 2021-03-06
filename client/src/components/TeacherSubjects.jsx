import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import AdminEditSubjectModal from './AdminEditSubjectModal.jsx'

class TeacherSubjects extends React.Component {

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
      axios.get('/subject/getteachersubjects?teacherId='+decoded.sub,  {
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
    this.context.router.history.push('/subjectinfo', {subject: event.target.id})
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
              <h4>Все предметы</h4>
            </div>
            <div className="col-md-3 text-right hidden-mobile visible-max visible-middle visible-ipad" style={{marginTop: '1%'}}>
              <i className="fa fa-list-ul fa-lg" aria-hidden="true" id="list" onClick={this.changeFilter} style={{marginRight: '15%'}}></i>
              <i className="fa fa-th-large fa-lg" aria-hidden="true" id="block" onClick={this.changeFilter} style={{marginRight: '15%'}}></i>
              <i className="fa fa-filter fa-lg" aria-hidden="true" style={{color: '#00c292'}}></i>
            </div>
          </div>
        </div>
        <div className=" my-content" hidden={this.state.checkFilter}>
          <div className="row hidden-max-media visible-middle visible-ipad visible-mobile"  >
          { this.state.subjects ? (
              this.state.subjects.map((subject, s) =>
                <div key={s} className="col-md-4 col-xs-12 col-sm-6" style={{padding: '0px 7.5px'}}>
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
                            <button onClick={this.openSubject} id={subject._id}  className="btn btn-success btn-rounded waves-effect waves-light " style={{color: 'white'}}>Подробнее</button>
                            <button onClick={this.toggleModal.bind(this, subject)} className="btn btn-default btn-circle m-t-10 pull-right edit-btn-moreinfo" style={{background: 'none'}} >
                                <i className="fa fa-pencil" style={{color: '#717171'}}></i>
                            </button>
                          </div>
                        ):(
                          <button id={subject._id} onClick={this.openSubject} className="btn btn-success btn-rounded waves-effect waves-light " style={{color: 'white'}}>Подробнее</button>
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
          <div className="row visible-max"  >
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
                          <button onClick={this.openSubject} id={subject._id}  className="btn btn-success btn-rounded waves-effect waves-light " style={{color: 'white'}}>Подробнее</button>
                          <button onClick={this.toggleModal.bind(this, subject)} className="btn btn-default btn-circle m-t-10 pull-right edit-btn-moreinfo" style={{background: 'none'}} >
                              <i className="fa fa-pencil" style={{color: '#717171'}}></i>
                          </button>
                        </div>
                      ):(
                        <button id={subject._id} onClick={this.openSubject} className="btn btn-success btn-rounded waves-effect waves-light " style={{color: 'white'}}>Подробнее</button>
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
        <div className="my-content"  hidden={!this.state.checkFilter}>
          <div className="table-responsive">
              <table id="myTable" className="table table-striped">
                  <thead>
                      <tr>
                          <th>№</th>
                          <th className="table-b-left">Название</th>
                          <th className="table-b-left">Специальность</th>
                          <th className="table-b-left">Преподаватель</th>
                          <th className="table-b-left">Курс</th>
                          <th className="table-b-left"><center>Осталось мест</center></th>
                          <th className="table-b-left">Информация</th>
                          {(this.state.status == "admin") ?(
                            <th className="table-b-left">Опции</th>
                          ):(
                            <th className="table-b-left"></th>
                          )}
                      </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.subjects ?(
                      this.state.subjects.map((subject, s) =>
                        <tr key={s}>
                            <td>{s+1}</td>
                            <td className="table-b-left">{subject.subject_name}</td>
                            <td className="table-b-left">{subject.teacher_id.user_id.name} {subject.teacher_id.user_id.lastname}</td>
                            <td className="table-b-left"><center>{subject.course_number}</center></td>
                            <td className="table-b-left"><center>{subject.max_students}</center></td>
                            <td className="table-b-left">

                              <button id={subject._id} onClick={this.openSubject} className="btn btn-success btn-rounded waves-effect waves-light" style={{color: 'white'}}>Подробнее</button>


                            </td>
                            {(this.state.status == "admin") ?(
                              <td className="text-center table-b-left">
                              <button onClick={this.toggleModal.bind(this, subject)} className="btn btn-default btn-circle edit-btn-moreinfo" style={{background: 'none'}} >
                                <i className="fa fa-pencil" style={{color: '#717171'}}></i>
                              </button>
                              </td>
                            ):(
                              <td className="table-b-left"></td>
                            )}
                        </tr>
                      )
                    ):(
                      <tr>
                        <td>---</td>
                        <td>---</td>
                        <td>---</td>
                        <td>---</td>
                        <td><center>---</center></td>
                        <td>---</td>
                      </tr>
                    )
                  }
                  </tbody>
              </table>
            </div>
          </div>
          <AdminEditSubjectModal
            show={this.state.isOpen}
            onClose={this.toggleModalClose}
            subject={this.state.subject}
          />
      </div>);
  }
}
TeacherSubjects.contextTypes = {
  router: PropTypes.object.isRequired
};
export default TeacherSubjects;
