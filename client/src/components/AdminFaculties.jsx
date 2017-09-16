import React from 'react';
import AdminEditFacultyModal from './AdminEditFacultyModal.jsx';
import axios from 'axios';
import Auth from '../modules/Auth'

class AdminFaculties extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        faculties: [],
        faculty_dean:{
          user_id:{
            name:'',
            lastname:''
          }
        },
        faculty:{},
        isOpen:false,
        allfaculties: []
      };
      this.toggleModal = this.toggleModal.bind(this);
      this.toggleModalClose = this.toggleModalClose.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
      axios.get('/api/getfaculties',  {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          this.setState({
            faculties: res.data.faculties,
            allfaculties: res.data.faculties,
            faculty_dean: res.data.faculties.faculty_dean
          });
        });
    }

    toggleModal(faculty) {
        this.setState({
          isOpen: !this.state.isOpen,
          faculty:faculty
      });
    }

    toggleModalClose() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }
    handleSearch(event){
      var searchQuery = event.target.value.toLowerCase();
      if(searchQuery){
        var faculties = this.state.allfaculties.filter(function(el){
          var searchValue = el.faculty_name.toLowerCase();
          return searchValue.indexOf(searchQuery)!== -1;
        });
        this.setState({
          faculties: faculties
        });
      } else {
        this.setState({
          faculties: this.state.allfaculties
        });
      }
    }
  render() {
    return (
      <div className="container clearfix">
      <div className="bg-title" style={{display: 'flex'}}>
        <h4 style={{width: '70%'}}>Все факультеты</h4>
        <div style={{width: '30%', display: 'flex'}}><h4>Поиск</h4><input onChange={this.handleSearch} className="adminsearch" type="search" placeholder=""/></div>
      </div>
      <div className="my-content" >
        <div className="table-responsive hidden-mobile visible-max visible-middle visible-ipad">
          <table id="myTable" className="table table-striped functional-table">
            <thead>
                <tr>
                    <th className="table-head-text">№</th>
                    <th className="table-head-text">Код факультета</th>
                    <th className="table-head-text">Название факультета</th>
                    <th className="table-head-text">Декан</th>
                    <th className="table-head-text">Телефон</th>
                    <th className="table-head-text">E-mail</th>
                    <th className="table-head-text">
                        <center>
                            Кафедры
                        </center>
                    </th>
                    <th className="table-head-text">
                        <center>Опции</center>
                    </th>
                </tr>
            </thead>
              {
                this.state.faculties ? (
                  this.state.faculties.map((faculty, f) =>
                    <tbody key={f}>
                      <tr>
                        <td>{f+1}</td>
                        <td>{faculty.faculty_code}</td>
                        <td>{faculty.faculty_name}</td>
                        {
                          faculty.faculty_dean ? (
                            <td>{faculty.faculty_dean.user_id.name} {faculty.faculty_dean.user_id.lastname}</td>
                          ):(
                            <td>Декан не назначен!</td>
                          )
                        }
                        <td>{faculty.faculty_phone}</td>
                        <td>{faculty.faculty_email}</td>
                        <td>
                            <center>
                              {faculty.departments.map((department, d)=>
                                <p key={d}>{department.department_name}</p>
                              )}
                            </center>
                        </td>
                        <td style={{padding: '10px 20px'}}>
                          <button onClick={this.toggleModal.bind(this, faculty)} className="btn btn-default btn-circle edit-btn-moreinfo" style={{background: 'none', position: 'absolute'}}>
                              <i className="fa fa-pencil"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  )
                ) : (
                      <tbody>
                        <tr>
                          <td>---</td>
                          <td>---</td>
                          <td>---</td>
                          <td>---</td>
                          <td>---</td>
                          <td>---</td>
                          <td>
                            <center>---</center>
                          </td>
                          <td style={{padding: '10px 20px'}}>---
                          </td>
                        </tr>
                      </tbody>
                )
              }
            </table>
          </div>
          <div className="table-responsive visible-mobile hidden-max-media hidden-middle hidden-ipad">
            <table id="myTable" className="table table-striped">
                {
                  this.state.faculties ? (
                    this.state.faculties.map((faculty, f) =>
                      <tbody key={f}>
                        <tr>
                          <td className="mobile-table"></td><td>{f+1}</td>
                        </tr>
                        <tr>
                          <td className="mobile-table">Код</td><td>{faculty.faculty_code}</td>
                        </tr>
                        <tr>
                          <td className="mobile-table">Название</td><td>{faculty.faculty_name}</td>
                        </tr>
                        <tr>
                          <td className="mobile-table">Декан</td>
                          {
                            faculty.faculty_dean ? (
                              <td>{faculty.faculty_dean.user_id.name} {faculty.faculty_dean.user_id.lastname}</td>
                            ):(
                              <td>Декан не назначен!</td>
                            )
                          }
                        </tr>
                        <tr>
                          <td className="mobile-table">Номер</td><td>{faculty.faculty_phone}</td>
                        </tr>
                        <tr>
                          <td className="mobile-table">E-mail</td><td>{faculty.faculty_email}</td>
                        </tr>
                          <tr>
                          <td className="mobile-table">Кафедры</td>
                          <td>
                              <center>
                                {faculty.departments.map((department, d)=>
                                  <p key={d}>{department.department_name}</p>
                                )}
                              </center>
                          </td>
                          </tr>
                        <tr>
                        <td className="mobile-table">Редактировать</td>
                          <td style={{padding: '10px 20px'}}>
                            <button onClick={this.toggleModal.bind(this, faculty)} className="btn btn-default btn-circle edit-btn-moreinfo" style={{background: 'none', position: 'absolute'}}>
                                <i className="fa fa-pencil"></i>
                            </button>
                          </td>
                        </tr>
                        <br />
                      </tbody>
                    )
                  ) : (
                        <tbody>
                          <tr>
                            <td>---</td>
                            <td>---</td>
                            <td>---</td>
                            <td>---</td>
                            <td>---</td>
                            <td>---</td>
                            <td>
                              <center>---</center>
                            </td>
                            <td style={{padding: '10px 20px'}}>---
                            </td>
                          </tr>
                        </tbody>
                  )
                }
              </table>
            </div>
        </div>

        <AdminEditFacultyModal
          show={this.state.isOpen}
          onClose={this.toggleModalClose}
          faculty={this.state.faculty}
        />
      </div>);
  }
}

export default AdminFaculties;
