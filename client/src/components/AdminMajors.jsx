import React from 'react';
import axios from 'axios';
import Auth from '../modules/Auth';
import AdminEditMajorModal from './AdminEditMajorModal.jsx';


class AdminMajors extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      majors: [],
      isOpen:false,
      major:{},
      allmajors: []
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    axios.get('/major/getmajors',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          majors: res.data.majors,
          allmajors: res.data.majors
        });
      });
  }

  toggleModal(major) {
      this.setState({
        isOpen: !this.state.isOpen,
        major:major
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
      var majors = this.state.allmajors.filter(function(el){
        var searchValue = el.major_name.toLowerCase() + ' ' + el.major_code.toLowerCase();
        return searchValue.indexOf(searchQuery)!== -1;
      });
      this.setState({
        majors: majors
      });
    } else {
      this.setState({
        majors: this.state.allmajors
      });
    }

  }
  render() {
    return (
      <div className="container clearfix">
      <div className="bg-title" style={{display: 'flex'}}>
        <h4 style={{width: '70%'}}>Все специальности</h4>
        <div style={{width: '30%', display: 'flex'}}><h4>Поиск</h4><input onChange={this.handleSearch} className="adminsearch" type="search" placeholder=""/></div>
      </div>
      <div className=" my-content" >
      <div className="table-responsive hidden-mobile visible-max visible-middle visible-ipad">
          <table id="myTable" className="table table-striped functional-table">
              <thead>
                  <tr>
                      <th className="table-head-text">№</th>
                      <th className="table-head-text table-b-left">Код специальности</th>
                      <th className="table-head-text table-b-left">Название специальности</th>
                      <th className="table-head-text table-b-left">Кафедра</th>
                      <th className="table-head-text table-b-left">Наименование групп специальностей</th>
                      <th className="hidden-ipad table-head-text table-b-left">Все группы</th>
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
                this.state.majors ? (
                    this.state.majors.map((major, m) =>
                      <tbody key={m}>
                        <tr>
                            <td>{m+1}</td>
                            <td className="table-b-left">{major.major_code}</td>
                            <td className="table-b-left">{major.major_name}</td>
                            <td className="table-b-left">{major.major_department.department_name}</td>
                            <td className="table-b-left">{major.major_group}</td>
                            <td className="hidden-ipad table-b-left">{major.groups.map((group, g) =>
                              <p key ={g}>{group.group_name}</p>
                            )}</td>
                            <td className="table-b-left">
                                <center>
                                    350
                                </center>
                            </td>
                            <td style={{padding: '10px 20px'}} className="table-b-left">
                                <button onClick={this.toggleModal.bind(this, major)} className="btn btn-default btn-circle edit-btn-moreinfo" style={{background: 'none', position: 'absolute'}}>
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
                          <td className="hidden-ipad">---</td>
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
                  this.state.majors ? (
                      this.state.majors.map((major, m) =>
                        <tbody key={m}>
                          <tr>
                            <td className="mibile-table"></td>
                            <td>{m+1}</td>
                          </tr>
                          <tr>
                            <td className="mobile-table">Код</td>
                            <td>{major.major_code}</td>
                          </tr>
                          <tr>
                            <td className="mobile-table">Название</td>
                            <td>{major.major_name}</td>
                          </tr>
                          <tr>
                            <td className="mobile-table">Кафедра</td>
                            <td>{major.major_department.department_name}</td>
                          </tr>
                          <tr className="hidden-mobile">
                            <td className="mobile-table">Наименование групп</td>
                            <td>{major.major_group}</td>
                          </tr>
                          <tr>
                            <td className="hidden-ipad hidden-mobile">{major.groups.map((group, g) =>
                              <p key ={g}>{group.group_name}</p>
                            )}</td>
                          </tr>
                          <tr>
                            <td className="mobile-table">Кол-во студентов</td>
                            <td>
                              <center>
                              350
                              </center>
                            </td>
                          </tr>
                          <tr>
                            <td className="mobile-table">Опции</td>
                              <td style={{padding: '10px 20px'}}>
                                <button onClick={this.toggleModal.bind(this, major)} className="btn btn-default btn-circle edit-btn-moreinfo" style={{background: 'none', position: 'absolute'}}>
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
                            <td className="hidden-ipad">---</td>
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
        <AdminEditMajorModal
          show={this.state.isOpen}
          onClose={this.toggleModalClose}
          major={this.state.major}
        />
      </div>);
  }
}

export default AdminMajors;
