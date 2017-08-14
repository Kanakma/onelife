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
    this.getStatus = this.getStatus.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
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
        this.getStatus();
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
  openSubject(event){
    console.log(this.context)
    this.context.router.history.push('/choosesubjects', {subject: event.target.id})
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
          <div className="col-md-3 text-right" style={{marginTop: '1%'}}>
            <i className="fa fa-list-ul fa-lg" aria-hidden="true" id="list" onClick={this.changeFilter} style={{marginRight: '15%'}}></i>
            <i className="fa fa-th-large fa-lg" aria-hidden="true" id="block" onClick={this.changeFilter} style={{marginRight: '15%'}}></i>
            <i className="fa fa-filter fa-lg" aria-hidden="true" style={{color: '#00c292'}}></i>
          </div>
        </div>
      </div>
      <div className=" my-content" hidden={this.state.checkFilter}>
        <div className="row"  >
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
                      <p><span><i className="fa fa-graduation-cap"></i> Специальность: {subject.major_name}</span></p>
                      <p><span><i className="fa fa-user-o"></i> Преподаватель: {subject.teacher_name}</span></p>
                      <p><span><i className="fa fa-user-plus"></i> Осталось мест: {subject.remained}</span></p>
                      {(this.state.status == "admin") ?(
                        <div>
                          <Link to="/infosubject" id={subject._id} onClick={this.openSubject} className="btn btn-success btn-rounded waves-effect waves-light m-t-10" style={{color: 'white'}}>Подробнее</Link>
                          <button onClick={this.toggleModal.bind(this, subject)} className="btn btn-default btn-circle m-t-10 pull-right edit-btn-moreinfo" style={{background: 'none'}} >
                              <i className="fa fa-pencil" style={{color: '#717171'}}></i>
                          </button>
                        </div>
                      ):(
                        <button id={subject._id} onClick={this.openSubject} className="btn btn-success btn-rounded waves-effect waves-light m-t-10" style={{color: 'white'}}>Подробнее</button>
                      )}
                  </div>
              </div>
            )
          ):(
              <div key={s} className="col-md-4 col-xs-12 col-sm-6" style={{padding: '0px 7.5px'}}>
                Нет предметовю Добавьте предметы.
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
                      <th>Название</th>
                      <th>Специальность</th>
                      <th>Преподаватель</th>
                      <th>Курс</th>
                      <th><center>Осталось мест</center></th>
                      <th>Информация</th>
                      {(this.state.status == "admin") ?(
                        <th>Опиции</th>
                      ):(
                        <th></th>
                      )}
                  </tr>
              </thead>
              <tbody>
              {
                this.state.subjects ?(
                  this.state.subjects.map((subject, s) =>
                    <tr key={s}>
                        <td>{s+1}</td>
                        <td>{subject.subject_name}</td>
                        <td>{subject.major_name}</td>
                        <td>{subject.teacher_name}</td>
                        <td><center>{subject.course_number}</center></td>
                        <td><center>{subject.remained}</center></td>
                        <td>
                          <button id={subject._id} onClick={this.openSubject} className="btn btn-success btn-rounded waves-effect waves-light m-t-10" style={{color: 'white'}}>Регистрация</button>
                        </td>
                        {(this.state.status == "admin") ?(
                          <td className="text-center ">
                          <button onClick={this.toggleModal.bind(this, subject)} className="btn btn-default btn-circle m-t-10 edit-btn-moreinfo" style={{background: 'none'}} >
                            <i className="fa fa-pencil" style={{color: '#717171'}}></i>
                          </button>
                          </td>
                        ):(
                          <td></td>
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
AdminSubjects.contextTypes = {
  router: PropTypes.object.isRequired
};
export default AdminSubjects;
