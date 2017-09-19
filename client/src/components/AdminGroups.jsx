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
      group: {},
      allgroups: []
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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
          groups: res.data.groups,
          allgroups: res.data.groups
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
  handleSearch(event){
    var searchQuery = event.target.value.toLowerCase();
    if(searchQuery){
    var groups = this.state.allgroups.filter(function(el){
      var searchValue = el.group_name.toLowerCase() + ' ' + el.major.major_name.toLowerCase() + ' ' + el.major.major_department.department_name.toLowerCase();
      return searchValue.indexOf(searchQuery)!== -1;
    });
    this.setState({
      groups: groups
    });
  } else {
    this.setState({
      groups: this.state.allgroups
    });
  }

  }

  render() {
    return (
      <div className="container clearfix">
      <div className="bg-title" style={{display: 'flex'}}>
        <h4 style={{width: '70%'}}>Все группы</h4>
        <div style={{width: '30%', display: 'flex'}}><h4>Поиск</h4><input onChange={this.handleSearch} className="adminsearch" type="search" placeholder=""/></div>
      </div>
      <div className=" my-content" >
      <div className="table-responsive  hidden-mobile visible-max visible-middle visible-ipad">
          <table id="myTable" className="table table-striped functional-table">
              <thead>
                  <tr>
                    <th className="table-head-text">№</th>
                    <th className="table-head-text table-b-left">Название группы</th>
                    <th className="table-head-text table-b-left">Специальность</th>
                    <th className="table-head-text table-b-left">Кафедра</th>
                    <th className="table-head-text table-b-left">Курс</th>
                    <th className="table-head-text table-b-left">Куратор</th>
                    <th className="table-head-text table-b-left">
                      <center>
                          Кол-во студентов
                      </center>
                    </th>
                    <th className="table-head-text table-b-left">
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
                          <td className="table-b-left">{group.group_name}</td>
                          <td className="table-b-left">{group.major.major_name}</td>
                          <td className="table-b-left">{group.major.major_department.department_name}</td>
                          <td className="table-b-left" style={{textAlign: 'center'}}>{group.course_number}</td>
                          <td className="table-b-left">{group.curator.user_id.name} {group.curator.user_id.lastname}</td>
                          <td style={{textAlign: 'center'}} className="table-b-left">{group.students.length}</td>
                          <td style={{padding: '10px 20px'}} className="table-b-left">
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
        <div className="table-responsive visible-mobile hidden-max-media hidden-middle hidden-ipad">
            <table id="myTable" className="table table-striped">
                {
                  this.state.groups ? (
                      this.state.groups.map((group, g) =>
                        <tbody key={g}>
                          <tr>
                            <td className="mobile-table"></td>
                            <td>{g+1}</td>
                          </tr>
                          <tr>
                            <td className="mobile-table">Название</td>
                            <td>{group.group_name}</td>
                          </tr>
                          <tr>
                            <td className="mobile-table">Специальность</td>
                            <td>{group.major.major_name}</td>
                          </tr>
                          <tr>
                            <td className="mobile-table">Кафедра</td>
                            <td>{group.major.major_department.department_name}</td>
                          </tr>
                          <tr>
                            <td className="mobile-table">Курс</td>
                            <td style={{textAlign: 'center'}}>{group.course_number}</td>
                          </tr>
                          <tr>
                            <td className="mobile-table">Кол-во студентов</td>
                            <td style={{textAlign: 'center'}}>{group.students.length}</td>
                          </tr>
                          <tr>
                            <td className="mobile-table">Куратор</td>
                            <td>{group.curator.user_id.name} {group.curator.user_id.lastname}</td>
                          </tr>
                          <tr>
                            <td className="mobile-table">Опции</td>
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
