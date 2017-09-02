import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import InputElement from 'react-input-mask';

class AdminAddSchedule extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      groups:[],
      subjects: [],
      auditories:[],
      period:{
        year:'',
        semester:''
      },
      group_name:''
    }
    this.getGroups=this.getGroups.bind(this);
    this.getSubjects=this.getSubjects.bind(this);
    this.selectGroup=this.selectGroup.bind(this);
    this.getAuditories=this.getAuditories.bind(this);
    this.changePeriod=this.changePeriod.bind(this);
  }

  componentDidMount(){
  }

  getGroups(){
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

  getAuditories(){
    if(this.state.period.year.length>3 && this.state.period.semester.length>0
      && this.state.period.year != '____' && this.state.period.semester !='_'){
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
    } else{
      this.setState({
        auditories: []
      });
    }
  }

  getSubjects(period){
    axios.get('/api/getsubjforschedule?',  {
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

  changePeriod(event){
    var field = event.target.name
    var period = this.state.period
    period[field] = event.target.value
    this.setState({
      period: period
    })
        this.getAuditories()
  }

  render() {
    console.log(this.state.period.year.length)
    return (
      <div className="container clearfix">
        <div className="bg-title">
          <h4>Добавить расписание</h4>
        </div>
        <div className="my-content">
          <div className="table-responsive">
            <div className="form-group col-md-6">
              <label>Введите год</label>
              <InputElement mask="****" className="form-control" placeholder="Введите год"
                    name="year"
                    onChange={this.changePeriod}
                    value={this.state.period.year} />
              <span className="bar"></span>
            </div>
            <div className="form-group col-md-6">
              <label>Введите cеместр</label>
              <InputElement mask="*" className="form-control" placeholder="Введите cеместр"
                    name="semester"
                    onChange={this.changePeriod}
                    value={this.state.period.semester} />
              <span className="bar"></span>
            </div>
            <table id="myTable" className="table table-striped">
              <thead>
                <tr>
                  <th>Аудитория</th>
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
                  this.state.auditories.length>0? (
                    this.state.auditories.map(function(auditory, index){
                      return (
                      <tr key={index}>
                        <td>
                          <b>{auditory.auditory_name}</b><br/>
                        </td>
                        <td>
                          <select className="form-control">
                            <option value=''>Выберите время</option>
                            <option value='8:00-8:50'>8:00-8:50</option>
                            <option value='9:00-9:50'>9:00-9:50</option>
                            <option value='10:00-10:50'>10:00-10:50</option>
                            <option value='11:00-11:50'>11:00-11:50</option>
                            <option value='12:00-12:50'>12:00-12:50</option>
                            <option value='13:00-13:50'>13:00-13:50</option>
                            <option value='14:00-14:50'>14:00-14:50</option>
                            <option value='15:00-15:50'>15:00-15:50</option>
                            <option value='16:00-16:50'>16:00-16:50</option>
                            <option value='17:00-17:50'>17:00-17:50</option>
                            <option value='18:00-18:50'>18:00-18:50</option>
                            <option value='19:00-19:50'>19:00-19:50</option>
                          </select>
                        </td>
                        <td>
                        </td>
                        <td>                         
                        </td>
                        <td>                
                        </td>
                        <td>                         
                        </td>
                        <td>                        
                        </td>
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
