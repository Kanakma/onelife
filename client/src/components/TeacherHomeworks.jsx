import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import TeacherEditHomeworkModal from './TeacherEditHomeworkModal.jsx'

class TeacherHomeworks extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      groups: [],
      subjects: [],
      group_students: [],
      group_name: '',
      group_id: '',
      checkSubject: false,
      subjectId: '',
      homeworks: [],
      homework: {},
      isOpen: false,
      groupValue:''

    },
    this.getGroups = this.getGroups.bind(this);
    this.changeGroup = this.changeGroup.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.chooseSubject = this.chooseSubject.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
    this.getHomeworks = this.getHomeworks.bind(this);
    this.dateFormat = this.dateFormat.bind(this);
    this.checkAnswers = this.checkAnswers.bind(this);
  }
  componentDidMount() {
    this.getStatus();
    // this.getGroup();
  }
  toggleModal(homework) {
      this.setState({
        isOpen: !this.state.isOpen,
        homework:homework
    });
  }
  toggleModalClose() {
      this.setState({
        isOpen: !this.state.isOpen
      });
  }
  checkAnswers(event){
      this.context.router.history.push('/checkanswers', {homework_id: event.target.id})
  }
  getGroups(){
    axios.get('/api/getsubjectgroups?subjectId='+this.state.subjectId,  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          groups:res.data.groups
        });
      });
  }
  chooseSubject(event){
    if(event.target.value=="Выберите предмет"){
      this.setState({
        checkSubject: false,
        groupValue:'',
        subjectId: event.target.value,
        homeworks: []
      })
      axios.get('/api/getsubjectgroups?subjectId='+event.target.value,  {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          this.setState({
            groups:res.data.groups
          });
        });
    }else{
      this.setState({
        checkSubject: true,
        subjectId: event.target.value,
        groupValue: '',
        homeworks: []
      })
      axios.get('/api/getsubjectgroups?subjectId='+event.target.value,  {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          this.setState({
            groups:res.data.groups
          });
        });
    }
  }
  changeGroup(event){
      this.setState({
        groupValue:event.target.value
      })
      const formData = `subject_id=${this.state.subjectId}&group_id=${event.target.value}`;
      axios.post('/api/getsubjectandgrouphomeworks', formData, {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          this.setState({
            homeworks: res.data.homeworks
          });
        });
  }
  getHomeworks(){
    const formData = `subject_id=${this.state.subjectId}&group_id=${this.state.groupValue}`;
    axios.get('/api/getsubjectandgrouphomeworks', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          homeworks: res.data.homeworks
        });
      });
  }
  dateFormat(date){
    var fDate = new Date(date);
    var m = ((fDate.getMonth() * 1 + 1) < 10) ? ("0" + (fDate.getMonth() * 1 + 1)) : (fDate.getMonth() * 1 + 1);
    var d = ((fDate.getDate() * 1) < 10) ? ("0" + (fDate.getDate() * 1)) : (fDate.getDate() * 1);
    return m + "/" + d + "/" + fDate.getFullYear()
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

  render() {
    return (
      <div className="container clearfix">
      <div className="bg-title" style={{paddingRight: '3%'}}>
        <div className="row">
          <div className="col-md-9">
            <h4>Домашнее задание</h4>
          </div>
        </div>
      </div>
      <div className=" my-content">
        <div className="table-responsive hidden-mobile visible-max visible-ipad visible-middle" style={{minHeight: '400px'}}>
          <div className="form-group row">
            <div className="col-md-6">
              <label className="teacher-choosed" style={{padding: '0 15px'}}>Предмет</label>
              <select className="form-control"  onChange={this.chooseSubject} >
                <option >Выберите предмет</option>
                  {this.state.subjects.map((subject, s) =>
                    <option key={s} value={subject._id} name={subject.subject_name}>{subject.subject_name}</option>
                  )}
              </select>
            </div>
            <div className="col-md-6" >
              <label className="teacher-choosed">Группа</label>
              <select className="form-control" value={this.state.groupValue} disabled={!this.state.checkSubject} onChange={this.changeGroup} >
                <option value='' >Выберите группу</option>
                  {this.state.groups.map((group, g) =>
                    <option key={g} value={group._id} >{group.group_name}</option>
                  )}
              </select>
            </div>
          </div>
          {
            this.state.homeworks.length !=0 ?
          (
          <table id="myTable" className="table table-striped functional-table">
            <thead>
                <tr>
                    <th className="table-head-text">№</th>
                    <th className="table-head-text table-b-left">Начало</th>
                    <th className="table-head-text table-b-left">Дедлайн</th>
                    <th className="table-head-text table-b-left">Файл</th>
                    <th className="table-head-text table-b-left">Ответы</th>
                    <th className="table-head-text table-b-left">Редактировать</th>
                </tr>
            </thead>
            <tbody>
              {this.state.homeworks.map((homework, h) =>
                <tr key={h}>
                    <td>{h+1}</td>
                    <td className="table-b-left">{this.dateFormat(homework.lessonDate)}</td>
                    <td className="table-b-left">{this.dateFormat(homework.deadline)}</td>
                    {homework.file?(
                      <td className="table-b-left">{homework.file}</td>
                    ):(
                      <td className="table-b-left">Нет файлов</td>
                    )
                    }
                    <td className="table-b-left"><button className="btn btn-success" style={{paddingLeft: '1%', paddingRight: '1%'}} id={homework._id}  onClick={this.checkAnswers}>Проверить</button></td>
                    <td className="table-b-left"> <button onClick={this.toggleModal.bind(this, homework)}  className="btn btn-default btn-circle m-t-10 pull-right edit-btn-moreinfo" style={{background: 'none'}}>
                          <i style={{color: '#8c8c8c'}} className="fa fa-pencil" ></i>
                      </button></td>
                </tr>
              )}
            </tbody>
          </table>) :(
          <table id="myTable" className="table table-striped functional-table">
            <thead>
                <tr>
                  <th className="table-head-text">№</th>
                  <th className="table-head-text">Начало</th>
                  <th className="table-head-text">Дедлайн</th>
                  <th className="table-head-text">Файл</th>
                  <th className="table-head-text">Ответы</th>
                  <th className="table-head-text">Редактировать</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>Ничего не найдено</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>
            </tbody>
          </table>
            )
          }
        </div>

      <div className="table-responsive visible-mobile hidden-max-media hidden-ipad hidden-middle" style={{minHeight: '400px'}}>
          <div className="form-group row">
            <div className="col-md-6">
              <label>Предмет</label>
              <select className="form-control"  onChange={this.chooseSubject} >
                <option >Выберите предмет</option>
                  {this.state.subjects.map((subject, s) =>
                    <option key={s} value={subject._id} name={subject.subject_name}>{subject.subject_name}</option>
                  )}
              </select>
            </div>
            <div className="col-md-6" >
              <label>Группа</label>
              <select className="form-control" value={this.state.groupValue} disabled={!this.state.checkSubject} onChange={this.changeGroup} >
                <option value='' >Выберите группу</option>
                  {this.state.groups.map((group, g) =>
                    <option key={g} value={group._id} >{group.group_name}</option>
                  )}
              </select>
            </div>
          </div>
          {
            this.state.homeworks.length !=0 ?
          (
          <table id="myTable" className="table table-striped">

          {this.state.homeworks.map((homework, h) =>
            <tbody>
                  <tr key={h}>
                    <td>{h+1}</td>
                    </tr>
                    <tr>
                     <td className="mobile-table">Дата</td><td>{this.dateFormat(homework.lessonDate)}</td></tr>
                    <tr>
                     <td className="mobile-table">Дедлайн</td><td>{this.dateFormat(homework.deadline)}</td></tr>
                    <tr>
                    {homework.file?(
                      <td>{homework.file}</td>
                    ):(
                      <td>Нет файлов</td>
                    )
                    }</tr>
                    <tr>
                    <td><button className="btn btn-success" style={{paddingLeft: '1%', paddingRight: '1%'}} id={homework._id}  onClick={this.checkAnswers}>Проверить</button></td>
                    </tr>

            </tbody>
              )}
          </table>) :(
          <table id="myTable" className="table table-striped">

            <tbody>
                <tr>
                <td>Ничего не найдено</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>
            </tbody>
          </table>
            )
          }
        </div>




      </div>
      <TeacherEditHomeworkModal
        show={this.state.isOpen}
        onClose={this.toggleModalClose}
        homework = {this.state.homework}
      />
    </div>);
  }
}
TeacherHomeworks.contextTypes = {
  router: PropTypes.object.isRequired
};
export default TeacherHomeworks;
