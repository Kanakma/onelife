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
  getSubjects(_id){
    axios.get('/api/getsubjforschedule?_id=' + _id,  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          subjects: res.data.subjects
        })
      })
  }
  selectGroup(event){
    event.preventDefault();
    if(event.target.value.length>0){
      this.getSubjects(event.target.value)
      this.setState({
        group_name:event.target.value
      })
    }
  }
          
  render() {
    console.log(this.state.subjects)
    return (
      <div className="container clearfix">
        <div className="bg-title">
          <h4>Добавить расписание</h4>
        </div>
        <div className="my-content">
          <div className="table-responsive">
            <div className="form-group col-md-6">
              <label>Выберите группу</label>
              <select className="form-control " name="group_name" value={this.state.group_name} onChange={this.selectGroup}>
              <option value=''>Выберите группу</option>
              {this.state.groups.map((group, s) =>
                <option key={s} value={group._id}>{group.group_name}</option>
              )}
              </select>
            </div>
            <table id="myTable" className="table table-striped">
              <thead>
                <tr>
                  <th>Предмет</th>
                  <th>Понедельник</th>
                  <th>Вторник</th>
                  <th>Среда</th>
                  <th>Четверг</th>
                  <th>Пятница</th>
                  <th>Суббота</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.subjects.length>0? (
                    this.state.subjects.map(function(subject, index){
                      return (
                      <tr key={index}>
                        <td>
                          <b>{subject.subject_name}</b><br/>
                          <em>Преподаватель:</em> {subject.teacher_id.user_id.name} {subject.teacher_id.user_id.lastname}
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      )
                    })
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

      </div>);
  }
}

export default AdminAddSchedule;
