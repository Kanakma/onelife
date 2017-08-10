import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'

class AdminHome extends React.Component {
  render() {
    return (
      <div className="container clearfix">
      <div className="col-md-10 col-md-offset-2 bg-title">
        <h4>Главная админа</h4>
      </div>
      </div>);
  }
}

export default AdminHome;
