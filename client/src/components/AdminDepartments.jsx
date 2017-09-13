import React from 'react';
import axios from 'axios';
import Auth from '../modules/Auth'
import AdminEditDepartmentModal from './AdminEditDepartmentModal.jsx'

class AdminDepartments extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        departments: [],
        department:{},
        isOpen:false
      };
      this.toggleModal = this.toggleModal.bind(this);
      this.toggleModalClose = this.toggleModalClose.bind(this);
    }
    componentDidMount() {
      axios.get('/api/getdepartments',  {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          this.setState({
            departments: res.data.departments
          });
        });
    }
    toggleModal(department) {
        this.setState({
          isOpen: !this.state.isOpen,
          department:department
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
        <h4>Все кафедры</h4>
      </div>
      <div className="my-content" >
        <div className="table-responsive hidden-mobile visible-max visible-middle visible-ipad">
            <table id="myTable" className="table table-striped functional-table">
                <thead>
                    <tr>
                        <th className="table-head-text">№</th>
                        <th className="table-head-text">Код кафедры</th>
                        <th className="table-head-text">Факультет</th>
                        <th className="table-head-text">Наименование кафедры</th>
                        <th className="table-head-text">Зав. кафедры</th>
                        <th className="table-head-text">Телефон</th>
                        <th className="table-head-text">E-mail</th>
                        <th className="hidden-ipad table-head-text">
                            <center>
                                Специальности
                            </center>
                        </th>
                        <th className="table-head-text">
                            <center>Опции</center>
                        </th>
                    </tr>
                </thead>

                {
                  this.state.departments ? (
                      this.state.departments.map((department, d) =>
                      <tbody key={d}>
                        <tr>
                          <td>{d+1}</td>
                          <td>{department.department_code}</td>
                          <td>{department.department_faculty.faculty_name}</td>
                          <td>{department.department_name}</td>
                          <td>{department.department_director.user_id.name} {department.department_director.user_id.lastname}</td>
                          <td>{department.department_phone}</td>
                          <td>{department.department_email}</td>
                          <td className="hidden-ipad">
                              <center>
                                  {department.majors.map((major, m)=>
                                    <p key= {m}>{major.major_name}</p>
                                  )}
                              </center>
                          </td>
                          <td style={{padding: '10px 20px'}}>
                              <button onClick={this.toggleModal.bind(this, department)} className="btn btn-default btn-circle edit-btn-moreinfo" style={{background: 'none', position: 'absolute'}}>
                                  <i className="fa fa-pencil"></i>
                              </button>
                          </td>
                        </tr>
                      </tbody>
                    )
                      ) : (
                      <tbody>
                        <tr>
                          <td>--</td>
                          <td>--</td>
                          <td>--</td>
                          <td>--</td>
                          <td>--</td>
                          <td>--</td>
                          <td>--</td>
                          <td className="hidden-ipad">
                              <center>
                                  --
                              </center>
                          </td>
                          <td style={{padding: '10px 20px'}}>
                              --
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
                    this.state.departments ? (
                        this.state.departments.map((department, d) =>
                        <tbody key={d}>
                          <tr>
                            <td className="mobile-table"></td><td>{d+1}</td>
                          </tr>
                          <tr>
                            <td className="mobile-table">Код</td><td>{department.department_code}</td>
                          </tr>
                          <tr>
                            <td className="mobile-table">Нзавание</td><td>{department.department_faculty.faculty_name}</td>
                          </tr>
                          <tr >
                            <td className="mobile-table">Кафедра</td><td>{department.department_name}</td>
                          </tr>
                          <tr>
                            <td className="mobile-table">Зав. кафедры</td><td>{department.department_director.user_id.name} {department.department_director.user_id.lastname}</td>
                          </tr>
                          <tr>
                            <td className="mobile-table">Телефон</td><td>{department.department_phone}</td>
                          </tr>
                          <tr>
                            <td className="mobile-table">E-mail</td><td>{department.department_email}</td>
                          </tr>
                          <tr className="hidden-mobile">
                            <td className="hidden-ipad">
                                <center>
                                    {department.majors.map((major, m)=>
                                      <p key= {m}>{major.major_name}</p>
                                    )}
                                </center>
                            </td>
                          </tr>
                          <tr>
                            <td className="mobile-table">Редактировать</td><td style={{padding: '10px 20px'}}>
                                <button onClick={this.toggleModal.bind(this, department)} className="btn btn-default btn-circle edit-btn-moreinfo" style={{background: 'none', position: 'absolute'}}>
                                    <i className="fa fa-pencil"></i>
                                </button>
                            </td>
                          </tr>
                        </tbody>
                      )
                        ) : (
                        <tbody>
                          <tr>
                            <td>--</td>
                            <td>--</td>
                            <td>--</td>
                            <td>--</td>
                            <td>--</td>
                            <td>--</td>
                            <td>--</td>
                            <td className="hidden-ipad">
                                <center>
                                    --
                                </center>
                            </td>
                            <td style={{padding: '10px 20px'}}>
                                --
                            </td>
                          </tr>
                        </tbody>
                      )

    }
              </table>
            </div>
        </div>
        <AdminEditDepartmentModal
          show={this.state.isOpen}
          onClose={this.toggleModalClose}
          department={this.state.department}
        />
      </div>);
  }
}

export default AdminDepartments;
