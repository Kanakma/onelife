import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import AdminEditCandidateModal from './AdminEditCandidateModal.jsx'
import Proptypes from 'prop-types';

class AdminCandidate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      candidates: [],
      isOpen:false,
      candidate:{}
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
  }
  componentDidMount() {
    axios.get('/api/getcandidates',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          candidates:res.data.candidates
        })
      })
  }
  toggleModal(candidate){
      this.setState({
        isOpen: !this.state.isOpen,
        candidate:candidate
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
            <h4>Все абитуриенты</h4>
          </div>
        </div>
      </div>
      <div className="my-content">
        <div className="table-responsive hidden-mobile visible-max visible-middle visible-ipad">
          <table id="myTable" className="table table-striped functional-table">
              <thead>
                  <tr>
                    <th className="table-head-text">№</th>
                    <th className="table-head-text">ФИО</th>
                    <th className="table-head-text">Пол</th>
                    <th className="table-head-text">Адрес прописки</th>
                    <th className="table-head-text">Адрес проживания</th>
                    <th className="table-head-text">№ телефона</th>
                    <th className="table-head-text">Почта</th>
                    <th className="table-head-text">Подробнее</th>
                  </tr>
              </thead>
              {
                this.state.candidates ? (
                    this.state.candidates.map((candidate, g) =>
                      <tbody key={g}>
                        <tr>
                          <td>{g+1}</td>
                          <td>{candidate.lastname} {candidate.name}</td>
                          <td>{candidate.gender}</td>
                          <td>{candidate.address_de_jure}</td>
                          <td>{candidate.address_de_facto}</td>
                          <td>{candidate.phone}</td>
                          <td>{candidate.email}</td>
                          <td>
                            <button onClick={this.toggleModal.bind(this, candidate)} className="btn btn-default btn-circle edit-btn-moreinfo" style={{background: 'none', position: 'absolute'}}>
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
        <div className="table-responsive visible-mobile hidden-max-media hidden-middle hidden-ipad">
          <table id="myTable" className="table table-striped">
              {
                this.state.candidates ? (
                    this.state.candidates.map((candidate, g) =>
                      <tbody key={g}>
                        <tr>
                          <td className="mobile-table"></td>
                          <td>{g+1}</td>
                        </tr>
                        <tr>
                          <td className="mobile-table">ФИО</td>
                          <td>{candidate.lastname} {candidate.name}</td>
                        </tr>
                        <tr>
                          <td className="mobile-table">Пол</td>
                          <td>{candidate.gender}</td>
                        </tr>
                        <tr>
                          <td className="mobile-table">Прописка</td>
                          <td>{candidate.address_de_jure}</td>
                        </tr>
                        <tr>
                          <td className="mobile-table">Адрес</td>
                          <td>{candidate.address_de_facto}</td>
                        </tr>
                        <tr>
                          <td className="mobile-table">Телефон</td>
                          <td>{candidate.phone}</td>
                        </tr>
                        <tr>
                          <td className="mobile-table">E-mail</td>
                          <td>{candidate.email}</td>
                        </tr>
                        <tr>
                          <td className="mobile-table">Опции</td>
                          <td>
                            <button onClick={this.toggleModal.bind(this, candidate)} className="btn btn-default btn-circle edit-btn-moreinfo" style={{background: 'none', position: 'absolute'}}>
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
        <AdminEditCandidateModal
          show={this.state.isOpen}
          onClose={this.toggleModalClose}
          candidate={this.state.candidate}
        />
      </div>);
  }
}

export default AdminCandidate;
