import React from 'react';
import axios from 'axios';
import Auth from '../modules/Auth';
import AdminEditGroupModal from './AdminEditGroupModal.jsx';


class AdminGroups extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen:false,
      groups: [],
      group: {}
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
  }
  componentDidMount() {
    axios.get('/api/getgroups',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          groups: res.data.allGroups
        });
      });
  }

  toggleModal(group) {
      this.setState({
        isOpen: !this.state.isOpen,
        group: group
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
        <h4>Все группы</h4>
      </div>
      <div className=" my-content" >
      <div className="table-responsive">
          <table id="myTable" className="table table-striped">
              <thead>
                  <tr>
                      <th>№</th>
                      <th>Название группы</th>
                      <th>Специальность</th>
                      <th>Кафедра</th>
                      <th>Курс</th>
                      <th>Куратор</th>
                      <th>
                          <center>
                              Кол-во студентов
                          </center>
                      </th>
                      <th>
                          <center>Опции</center>
                      </th>
                  </tr>
              </thead>
              {
                this.state.groups ? (
                    this.state.groups.map((group, g) =>
                      <tbody key={g}>
                        <tr>
                            <td>{g+1}</td>
                            <td>{group.group_name}</td>
                            <td>{group.major_name}</td>
                            <td>{group.group_department}</td>
                            <td style={{textAlign: 'center'}}>{group.course_number}</td>
                            <td>{group.curator_name} {group.curator_lastname}</td>
                            <td style={{textAlign: 'center'}}>{group.students.length}</td>
                            <td style={{padding: '10px 20px'}}>
                                <button onClick={this.toggleModal.bind(this, group)} className="btn btn-default btn-circle edit-btn-moreinfo" style={{background: 'none', position: 'absolute'}}>
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
        <AdminEditGroupModal
          show={this.state.isOpen}
          onClose={this.toggleModalClose}
          group={this.state.group}
        />
      </div>);
  }
}

export default AdminGroups;