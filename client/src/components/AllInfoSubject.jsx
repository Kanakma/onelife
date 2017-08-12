import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';

class AllInfoSubject extends React.Component {

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
    //console.log(this.context.router)
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
            <h4>Информация о предмете</h4>
        </div>
      </div>
      <div className=" my-content" hidden={this.state.checkFilter}>
      <div className="white-box">
        <div className="row"  >
        { this.state.subjects ? (
            this.state.subjects.map((subject, s) =>
              <div key={s} className="col-md-12" style={{padding: '0px 7.5px'}}>
                  <div className="row">
                    <div className="col-md-offset-4 col-md-4 text-center">
                      <img className="img-responsive subject-img" alt="user" src={require("../../../public/subject-img/"+subject.img)} />
                    </div>
                  </div>
                  <div className="row" style={{margin: '0px', marginTop: '15px'}}>
                    <div className="col-md-3 col-xs-6 b-r">
                      <strong>Наименование курса</strong>
                      <p className="text-muted">{subject.subject_name}</p>
                    </div>
                    <div className="col-md-3 col-xs-6 b-r">
                      <strong>Количество кредитов</strong>
                      <p className="text-muted">{subject.credit_number}</p>
                    </div>
                    <div className="col-md-3 col-xs-6 b-r">
                      <strong>Профессор</strong>
                      <p className="text-muted">{subject.teacher_name}</p>
                    </div>
                    <div className="col-md-3 col-xs-6 ">
                      <strong>Уровень сложности</strong>
                      <p className="text-muted">{subject.subject_name}</p>
                    </div>
                  </div>
                  <hr/>
                  <div className="row" style={{margin: '0px', marginTop: '15px'}}>
                    <div className="col-md-12">
                      <p>{subject.description}</p>
                    </div>
                  </div>
                  <div className="row text-center"></div>
                      {(this.state.status == "admin") ?(
                        <div>
                        </div>
                      ):(
                        <button id={subject._id} onClick={this.openSubject} className="btn btn-success btn-rounded waves-effect waves-light m-t-10" style={{color: 'white'}}>Подробнее</button>
                      )}
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
      </div>
      </div>);
  }
}

export default AllInfoSubject;
