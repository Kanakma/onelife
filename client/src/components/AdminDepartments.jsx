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
        <div className="table-responsive">
            <table id="myTable" className="table table-striped">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Код кафедры</th>
                        <th>Факультет</th>
                        <th>Наименование кафедры</th>
                        <th>Зав. кафедры</th>
                        <th>Телефон</th>
                        <th>E-mail</th>
                        <th>
                            <center>
                                Кол-во спец-ей
                            </center>
                        </th>
                        <th>
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
                          <td>
                              <center>
                                  {department.majors.length}
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
                          <td>
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
