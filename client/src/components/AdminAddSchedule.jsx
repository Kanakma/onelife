import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

class AdminAddSchedule extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      groups:[],
      subjects: [],
      group_name:''
    }
    this.getGroup=this.getGroup.bind(this);
    this.getSubjects=this.getSubjects.bind(this);
    this.selectGroup=this.selectGroup.bind(this);
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
          groups: res.data.groups
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
  selectGroup(event){
    
  }

  render() {
    console.log(this.state.groups, this.state.subjects)
    return (
      <div className="container clearfix">
        <div className="bg-title">
          <h4>Добавить расписание</h4>
        </div>
        <div className="my-content">
          <div className="form-group col-md-6">
            <label>Выберите группу</label>
            <select className="form-control " name="group_name" value={this.state.group_name} onChange={this.selectGroup}>
            <option value=''>Выберите группу</option>
            {this.state.groups.map((group, s) =>
              <option key={s} value={group._id}>{group.group_name}</option>
            )}
            </select>
          </div>
        </div>
      </div>);
  }
}

export default AdminAddSchedule;
