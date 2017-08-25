import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

class AdminAddSchedule extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      groups:[],
      subjects: []
    }
    this.getGroup=this.getGroup.bind(this);
    this.getSubjects=this.getSubjects.bind(this);
  }
  componentDidMount(){
    this.getGroup();
    this.getSubjects();
  }
  getGroup(){
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
  getSubjects(){
    axios.get('/api/getsubjects',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          subjects: res.data.subjects
        });
      });
  }

  render() {
    console.log(this.state.groups, this.state.subjects)
    return (
      <div className="container clearfix">
        <div className="bg-title">
          <h4>Добавить расписание</h4>
        </div>
        <div className="my-content chess">
          
        </div>
      </div>);
  }
}

export default AdminAddSchedule;
