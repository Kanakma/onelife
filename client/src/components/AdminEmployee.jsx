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
      employee:{}
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
  }
  componentDidMount() {
    axios.get('/api/getemployees',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          employees:res.data.employees
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
  render() {
    return (
      <div className="container clearfix">
      <div className="bg-title" >
        <div className="row">
          <div className="col-md-9">
            <h4>Все сотрудники</h4>
          </div>
        </div>
      </div>
      <div className="my-content">
        <div className="table-responsive">
          <table id="myTable" className="table table-striped">
              <thead>
                  <tr>
                    <th>№</th>
                    <th>ФИО</th>
                    <th>Пол</th>
                    <th>Адрес прописки</th>
                    <th>Адрес проживания</th>
                    <th>№ телефона</th>
                    <th>Почта</th>
                    <th>Подробнее</th>
                  </tr>
              </thead>
              {
                this.state.employees ? (
                    this.state.employees.map((employee, g) =>
                      <tbody key={g}>
                        <tr>
                          <td>{g+1}</td>
                          <td>{employee.lastname} {employee.name}</td>
                          <td>{employee.gender}</td>
                          <td>{employee.address_de_jure}</td>
                          <td>{employee.address_de_facto}</td>
                          <td>{employee.phone}</td>
                          <td>{employee.email}</td>
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
