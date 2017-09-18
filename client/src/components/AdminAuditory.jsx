import React from 'react';
import axios from 'axios';
import AdminEditAuditoryModal from './AdminEditAuditoryModal.jsx'

class AdminAuditory extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    	auditories:[],
    	auditory:{},
    	isOpen:false
    };
    this.getAuditory=this.getAuditory.bind(this)
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
  }
  componentDidMount(){
  	this.getAuditory()
  }

  getAuditory(){
    axios.get('/api/getauditories',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          auditories: res.data.auditories
        });
      });
  }

  toggleModal(auditory) {
      this.setState({
        isOpen: !this.state.isOpen,
        auditory:auditory
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
	        <h4>Все аудитории</h4>
	      </div>
      	<div className=" my-content">
					<div className="table-responsive  hidden-mobile visible-max visible-middle visible-ipad">
          	<table id="myTable" className="table table-striped functional-table">
          		<thead>
                  <tr>
                      <th className="table-head-text">№</th>
                      <th className="table-head-text table-b-left">Наименование аудитории</th>
                      <th className="table-head-text table-b-left">Корпус</th>
                      <th className="table-head-text table-b-left">Этаж</th>
                      <th className="table-head-text table-b-left">Вместимость <em>(мест)</em></th>
                      <th className="table-head-text table-b-left">Опции</th>
                  </tr>
              </thead>
              <tbody>
              	{
              		this.state.auditories.length>0 ? (
              			this.state.auditories.map((auditory, index) =>
              				<tr key={index}>
												<td>{index+1}</td>
												<td className="table-b-left">{auditory.auditory_name}</td>
												<td className="table-b-left">{auditory.auditory_corp}</td>
												<td className="table-b-left">{auditory.auditory_level}</td>
												<td className="table-b-left">{auditory.auditory_places}</td>
												<td className="table-b-left">
	                        <button onClick={this.toggleModal.bind(this, auditory)} className="btn btn-default btn-circle edit-btn-moreinfo" style={{background: 'none', position: 'absolute'}}>
	                        	<i className="fa fa-pencil"></i>
	                        </button>
                      	</td>
              				</tr>
              			)
              		) : (
              				<tr>
												<td>---</td>
												<td>---</td>
												<td>---</td>
												<td>---</td>
												<td>---</td>
												<td>---</td>
              				</tr>
               		)
              	}
              </tbody>
          	</table>
	      	</div>
          <div className="table-responsive  visible-mobile hidden-max-media hidden-middle hidden-ipad">
          	<table id="myTable" className="table table-striped">
              <tbody>
              	{
              		this.state.auditories.length>0 ? (
              			this.state.auditories.map((auditory, index) =>
                    <div key={index}>
              				<tr>
                        <td className="mobile-table"></td>
												<td>{index+1}</td>
                      </tr>
                      <tr>
                        <td className="mobile-table">Аудитория</td>
                        <td>{auditory.auditory_name}</td>
                      </tr>
                      <tr>
                        <td className="mobile-table">Корпус</td>
                        <td>{auditory.auditory_corp}</td>
                      </tr>
                      <tr>
                        <td className="mobile-table">Этаж</td>
                        <td>{auditory.auditory_level}</td>
                      </tr>
                      <tr>
                        <td className="mobile-table">Места</td>
                        <td>{auditory.auditory_places}</td>
                      </tr>
                      <tr>
                        <td className="mobile-table">Опции</td>
												<td>
	                        <button onClick={this.toggleModal.bind(this, auditory)} className="btn btn-default btn-circle edit-btn-moreinfo" style={{background: 'none', position: 'absolute'}}>
	                        	<i className="fa fa-pencil"></i>
	                        </button>
                      	</td>
              				</tr>
                      <br/>
                      </div>
              			)
              		) : (
              				<tr>
												<td>---</td>
												<td>---</td>
												<td>---</td>
												<td>---</td>
												<td>---</td>
												<td>---</td>
              				</tr>
               		)
              	}
              </tbody>
          	</table>
	      	</div>
      	</div>
      	<AdminEditAuditoryModal
      		show={this.state.isOpen}
          onClose={this.toggleModalClose}
					auditory={this.state.auditory}
      	/>
    	</div>
    );
  }
}

export default AdminAuditory;
