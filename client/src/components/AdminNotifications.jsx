import React from 'react';
import axios from 'axios';
import Auth from '../modules/Auth'
import AddEventNotificationModal from './AddEventNotificationModal.jsx'

class AdminNotifications extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen:false
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
  }

  toggleModal(employee){
      this.setState({
        isOpen: !this.state.isOpen
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
        <div className="bg-title">
          <h4>Уведомления</h4>
        </div>
        <div className="my-content" >
          <div className="row">
            <div className="col-md-4 col-xs-12 col-sm-6" style={{padding: '0px 7.5px'}}>
              <img className="img-responsive subject-img" alt="user" src={require("../../../public/subject-img/default.jpg")} />
              <div className="white-box">
                <h4>Создать уведомление о мероприятии!</h4>
                
                <button onClick={this.toggleModal} style={{paddingLeft: '5%', paddingRight: '5%'}} className="btn btn-inverse waves-effect waves-light m-r-10">
                  Создать уведомление о мероприятии!
                </button>
              </div>
            </div>
          </div>
        </div>
        <AddEventNotificationModal
          show={this.state.isOpen}
          onClose={this.toggleModalClose}/>
      </div>);
  }
}

export default AdminNotifications;