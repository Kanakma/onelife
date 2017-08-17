import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'

class TeacherHome extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      
    }
  }

  render() {
    return (
      <div className="container clearfix">
      <div className="bg-title">
        <h4>Главная преподавателя</h4>
      </div>

      </div>);
  }
}

export default TeacherHome;
