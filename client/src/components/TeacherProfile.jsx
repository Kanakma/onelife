import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import AdminEditTeacherModal from './AdminEditTeacherModal.jsx';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import TeacherProfileNav from './TeacherProfileNav.jsx';

moment.locale('ru');

class TeacherProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      teacherId:  this.props.location.state.teacherId,
      teacher:{},
      isOpen:false,
      status: '',
      checkFilter: false,
      myImg: '59916a04a2ab162c0b1dc507-default_avatar.png'
    };
    this.changeFilter = this.changeFilter.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
    this.getTeacher = this.getTeacher.bind(this);
  }
  componentDidMount() {
    this.getTeacher();

  }
  getTeacher(){
    axios.get('/api/getoneteacher?teacherId='+this.state.teacherId,  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          teacher: res.data.teacher,
          myImg: res.data.teacher.img
        });
      });
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

  getStatus(){
    if(Auth.isUserAuthenticated()){
      var token = Auth.getToken();
      var decoded = jwtDecode(token);
      this.setState({
        status: decoded.userstatus
      });
    }
  }


  toggleModal(teacher) {
      this.setState({
        isOpen: !this.state.isOpen,
        teacher:teacher
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
      <div className="bg-title">
        <div className="row">
          <div className="col-md-9">
            <h4>Профиль преподавателя</h4>
          </div>
        </div>
      </div>
      <div className="my-content" hidden={this.state.checkFilter}>
      <div className="row" style={{marginRight: '-7.5px', marginLeft: '-7.5px'}}>
            <div className="row">
              <div  className="col-md-4 col-sm-4 col-xs-12">
                <div className="white-box">
                  <div className="user-bg">
                    <img className="img-responsive" src={require("../../../public/teacher-img/"+this.state.myImg)} alt="course-image" style={{width:'100%', height: '100%'}}/>
                  </div>
                  <div className="user-btm-box">
                    <div className="row text-center m-t-10">
                      <div className = "col-md-6">
                        <strong>Имя</strong>
                        <p>{this.state.teacher.teacher_name} {this.state.teacher.teacher_lastname}</p>
                      </div>
                      <div className = "col-md-6">
                        <strong>Степень</strong>
                        <p>{this.state.teacher.degree}</p>
                      </div>
                    </div>
                    <div className="row text-center m-t-10">
                      <div className = "col-md-6">
                        <strong>E-mail</strong>
                        <p>{this.state.teacher.email}</p>
                      </div>
                      <div className = "col-md-6">
                        <strong>Телефон</strong>
                        <p>{this.state.teacher.phone}</p>
                      </div>
                    </div>
                    <div className="row text-center m-t-10">
                      <div className = "col-md-12">
                        <strong>Кафедра</strong>
                        <p></p>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4 text-center">
                    </div>
                    <div className="col-md-4 col-sm-4 text-center">
                    </div>
                    <div className="col-md-4 col-sm-4 text-center">
                    </div>

                  </div>
                    <div className="row">
                        <div className="col-md-4 col-sm-4 text-center">

                        </div>
                        <div className="col-md-8 col-sm-8">
                            <button onClick={this.toggleModal.bind(this, teacher)} className="btn btn-default btn-circle m-t-10 pull-right edit-btn-moreinfo" style={{background: 'none'}}>
                                <i style={{color: '#8c8c8c'}} className="fa fa-pencil"></i>
                            </button>
                        </div>
                    </div>
                </div>
              </div>
              <div className="col-md-8 col-xs-12">
                <div className="white-box">
                  <TeacherProfileNav />
                </div>
              </div>


      </div>
      </div>
      </div>

          <AdminEditTeacherModal
            show={this.state.isOpen}
            onClose={this.toggleModalClose}
            teacher={this.state.teacher}
          />


      </div>);
  }
}

export default TeacherProfile;
