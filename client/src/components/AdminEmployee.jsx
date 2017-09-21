import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import AdminEditEmployeeModal from './AdminEditEmployeeModal.jsx'
import Proptypes from 'prop-types';

class AdminEmployee extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      isOpen:false,
      employee:{},
      allemployees: []
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    axios.get('/employee/getemployees',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          employees:res.data.employees,
          allemployees: res.data.employees
        })
      })
  }
  toggleModal(employee){
      this.setState({
        isOpen: !this.state.isOpen,
        employee:employee
    })
  }
  toggleModalClose() {
      this.setState({
        isOpen: !this.state.isOpen
      })
  }
  handleSearch(event){
    var searchQuery = event.target.value.toLowerCase();
    if(searchQuery){
    var employees = this.state.allemployees.filter(function(el){
      var searchValue = el.name.toLowerCase() + ' ' +el.lastname.toLowerCase();
      return searchValue.indexOf(searchQuery)!== -1;
    });
    this.setState({
      employees: employees
    });
  } else {
    this.setState({
      employees: this.state.allemployees
    });
  }

  }
  render() {
    return (
      <div className="container clearfix">
      <div className="bg-title"  style={{display: 'flex'}} >
            <h4  style={{width: '70%'}}>Все сотрудники</h4>
            <div style={{width: '30%', display: 'flex'}}><h4>Поиск</h4><input onChange={this.handleSearch} className="adminsearch" type="search" placeholder=""/></div>
      </div>
      <div className="my-content">
        <div className="table-responsive hidden-mobile visible-max visible-ipad visible-middle">
          <table id="myTable" className="table table-striped functional-table">
              <thead>
                  <tr>
                    <th className="table-head-text">№</th>
                    <th className="table-head-text table-b-left">ФИО</th>
                    <th className="table-head-text table-b-left">Пол</th>
                    <th className="table-head-text table-b-left">Адрес прописки</th>
                    <th className="table-head-text table-b-left">Адрес проживания</th>
                    <th className="table-head-text table-b-left">№ телефона</th>
                    <th className="table-head-text table-b-left">Почта</th>
                    <th className="table-head-text table-b-left">Подробнее</th>
                  </tr>
              </thead>
              {
                this.state.employees ? (
                    this.state.employees.map((employee, g) =>
                      <tbody key={g}>
                        <tr>
                          <td>{g+1}</td>
                          <td className="table-b-left">{employee.lastname} {employee.name}</td>
                          <td className="table-b-left">{employee.gender}</td>
                          <td className="table-b-left">{employee.address_de_jure}</td>
                          <td className="table-b-left">{employee.address_de_facto}</td>
                          <td className="table-b-left">{employee.phone}</td>
                          <td className="table-b-left">{employee.email}</td>
                          <td className="table-b-left">
                            <button onClick={this.toggleModal.bind(this, employee)} className="btn btn-default btn-circle edit-btn-moreinfo" style={{background: 'none', position: 'absolute'}}>
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
                        <td>
                          <center>---
                          </center>
                        </td>
                        <td style={{padding: '10px 20px'}}>---
                        </td>
                      </tr>
                  </tbody>
                )
              }
          </table>
        </div>
        <div className="table-responsive visible-mobile hidden-max-media hidden-ipad hidden-middle">
          <table id="myTable" className="table table-striped">
              {
                this.state.employees ? (
                    this.state.employees.map((employee, g) =>
                      <tbody key={g}>
                        <tr>
                          <td className="mobile-table"></td>
                          <td>{g+1}</td>
                        </tr>
                        <tr>
                          <td className="mobile-table">Фио</td>
                          <td>{employee.lastname} {employee.name}</td>
                        </tr>
                        <tr>
                          <td className="mobile-table">Пол</td>
                          <td>{employee.gender}</td>
                        </tr>
                        <tr>
                          <td className="mobile-table">Прописка</td>
                          <td>{employee.address_de_jure}</td>
                        </tr>
                        <tr>
                          <td className="mobile-table">Адрес </td>
                          <td>{employee.address_de_facto}</td>
                        </tr>
                        <tr>
                          <td className="mobile-table">Телефон</td>
                          <td>{employee.phone}</td>
                        </tr>
                        <tr>
                          <td className="mobile-table">E-mail</td>
                          <td>{employee.email}</td>
                        </tr>
                        <tr>
                          <td className="mobile-table">Опции</td>
                          <td>
                            <button onClick={this.toggleModal.bind(this, employee)} className="btn btn-default btn-circle edit-btn-moreinfo" style={{background: 'none', position: 'absolute'}}>
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
                        <td>
                          <center>---
                          </center>
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
        <AdminEditEmployeeModal
          show={this.state.isOpen}
          onClose={this.toggleModalClose}
          employee={this.state.employee}
        />
      </div>);
  }
}

export default AdminEmployee;
