import React from 'react';
import AdminEditFacultyModal from './AdminEditFacultyModal.jsx';
import axios from 'axios';
import Auth from '../modules/Auth'

class AdminFaculties extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        faculties: [],
        status: '',
        faculty:{},
        departments: [],
        teachers: [],
        isOpen:false
      };
      this.toggleModal = this.toggleModal.bind(this);
      this.toggleModalClose = this.toggleModalClose.bind(this);
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
            faculties: res.data.allFclts
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



  render() {
    return (
      <div className="container clearfix">
      <div className="col-md-10 col-md-offset-2 bg-title">
        <h4>Все факультеты</h4>
      </div>
      <div className="col-md-9 my-content" style={{background: 'white'}}>
      <div className="table-responsive">
        <table id="myTable" className="table table-striped">
          <thead>
              <tr>
                  <th>№</th>
                  <th>Код факультета</th>
                  <th>Название факультета</th>
                  <th>Декан</th>
                  <th>Телефон</th>
                  <th>E-mail</th>
                  <th>
                      <center>
                          Кафедры
                      </center>
                  </th>
                  <th>
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
                        <td>{faculty.faculty_dean}</td>
                        <td>{faculty.faculty_phone}</td>
                        <td>{faculty.faculty_email}</td>
                        <td>
                            <center>
                              {faculty.departments.length}
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
        <AdminEditFacultyModal
          show={this.state.isOpen}
          onClose={this.toggleModalClose}
          faculty={this.state.faculty}
        />
      </div>);
  }
}
 
export default AdminFaculties;