import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import InputElement from 'react-input-mask';

class AdminAddSchedule extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      groups:[],
      subject:{},
      subjects: [{
        course_number:'',
        credit_number:'',
        description:'',
        groups:[{
          course_number:'',
          curator:'',
          group_name:'',
          major:'',
          students:[]
        }],
        optional:'',
        period:'',
        students:[],
        subject_code:'',
        subject_name:'',
        teacher_id:''
      }],
      auditories:[],
      period:{
        year:'',
        semester:''
      }
    }
    this.getGroups=this.getGroups.bind(this);
    this.getSubjects=this.getSubjects.bind(this);
    this.getAuditories=this.getAuditories.bind(this);
    this.changePeriod=this.changePeriod.bind(this);
    this.selectSubj=this.selectSubj.bind(this);
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
      && this.state.period.year != '____' && this.state.period.semester != '_'){
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

  getSubjects(_period){
    axios.get('/api/getsubjforschedule?period='+_period, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        if(res.data.subjects.length>0){
          this.setState({
            subjects: res.data.subjects
          })
        } else{
          var period = {
            semester:'',
            year:''
          }
          this.setState({
            period: period
          })
          alert("В этом периоде нет предметов!")
        }
      })
  }

  changePeriod(event){
    var field = event.target.name
    var period = this.state.period
    period[field] = event.target.value
    this.setState({
      period: period
    })
    this.getAuditories()
    if(this.state.period.semester.length>0 && this.state.period.semester!='_'){
      this.getSubjects(this.state.period.semester)
    }
  }

  selectSubj(event){
    console.log(event.target.name, event.target.id, event.target.value, event.target.className)
    this.setState({
      subject: this.state.subjects.filter(function(subject) {
                            return subject._id.indexOf(event.target.value) > -1;
                        })
    })
  }
  
  render() {
    var subjects = this.state.subjects

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
                  this.state.auditories.length>0?(
                    this.state.auditories.map((auditory, index) =>
                      <tr key={index}>
                        <td>
                          <b>{auditory.auditory_name}</b><br/>
                        </td>
                        <td>
                          <p>8:00-8:50
                              <select className={auditory._id} id='8:00-8:50' name='monday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p>9:00-9:50
                            {
                              <select className={auditory._id} id='9:00-9:50' name='monday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>10:00-10:50
                            {
                              <select className={auditory._id} id='10:00-10:50' name='monday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>11:00-11:50
                            {
                              <select className={auditory._id} id='11:00-11:50' name='monday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>12:00-12:50
                            {
                              <select className={auditory._id} id='12:00-12:50' name='monday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>13:00-13:50
                            {
                              <select className={auditory._id} id='13:00-13:50' name='monday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>14:00-14:50
                            {
                              <select className={auditory._id} id='14:00-14:50' name='monday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>15:00-15:50
                            {
                              <select className={auditory._id} id='15:00-15:50' name='monday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>16:00-16:50
                            {
                              <select className={auditory._id} id='16:00-16:50' name='monday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>17:00-17:50
                            {
                              <select className={auditory._id} id='17:00-17:50' name='monday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>18:00-18:50
                            {
                              <select className={auditory._id} id='18:00-18:50' name='monday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                        </td>
<td>
                          <p>8:00-8:50
                              <select className={auditory._id} id='8:00-8:50' name='tuesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p>9:00-9:50
                            {
                              <select className={auditory._id} id='9:00-9:50' name='tuesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>10:00-10:50
                            {
                              <select className={auditory._id} id='10:00-10:50' name='tuesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>11:00-11:50
                            {
                              <select className={auditory._id} id='11:00-11:50' name='tuesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>12:00-12:50
                            {
                              <select className={auditory._id} id='12:00-12:50' name='tuesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>13:00-13:50
                            {
                              <select className={auditory._id} id='13:00-13:50' name='tuesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>14:00-14:50
                            {
                              <select className={auditory._id} id='14:00-14:50' name='tuesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>15:00-15:50
                            {
                              <select className={auditory._id} id='15:00-15:50' name='tuesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>16:00-16:50
                            {
                              <select className={auditory._id} id='16:00-16:50' name='tuesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>17:00-17:50
                            {
                              <select className={auditory._id} id='17:00-17:50' name='tuesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>18:00-18:50
                            {
                              <select className={auditory._id} id='18:00-18:50' name='tuesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                        </td>
<td>
                          <p>8:00-8:50
                              <select className={auditory._id} id='8:00-8:50' name='wednesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p>9:00-9:50
                            {
                              <select className={auditory._id} id='9:00-9:50' name='wednesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>10:00-10:50
                            {
                              <select className={auditory._id} id='10:00-10:50' name='wednesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>11:00-11:50
                            {
                              <select className={auditory._id} id='11:00-11:50' name='wednesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>12:00-12:50
                            {
                              <select className={auditory._id} id='12:00-12:50' name='wednesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>13:00-13:50
                            {
                              <select className={auditory._id} id='13:00-13:50' name='wednesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>14:00-14:50
                            {
                              <select className={auditory._id} id='14:00-14:50' name='wednesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>15:00-15:50
                            {
                              <select className={auditory._id} id='15:00-15:50' name='wednesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>16:00-16:50
                            {
                              <select className={auditory._id} id='16:00-16:50' name='wednesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>17:00-17:50
                            {
                              <select className={auditory._id} id='17:00-17:50' name='wednesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>18:00-18:50
                            {
                              <select className={auditory._id} id='18:00-18:50' name='wednesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                        </td>
<td>
                          <p>8:00-8:50
                              <select className={auditory._id} id='8:00-8:50' name='thursday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p>9:00-9:50
                            {
                              <select className={auditory._id} id='9:00-9:50' name='thursday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>10:00-10:50
                            {
                              <select className={auditory._id} id='10:00-10:50' name='thursday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>11:00-11:50
                            {
                              <select className={auditory._id} id='11:00-11:50' name='thursday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>12:00-12:50
                            {
                              <select className={auditory._id} id='12:00-12:50' name='thursday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>13:00-13:50
                            {
                              <select className={auditory._id} id='13:00-13:50' name='thursday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>14:00-14:50
                            {
                              <select className={auditory._id} id='14:00-14:50' name='thursday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>15:00-15:50
                            {
                              <select className={auditory._id} id='15:00-15:50' name='thursday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>16:00-16:50
                            {
                              <select className={auditory._id} id='16:00-16:50' name='thursday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>17:00-17:50
                            {
                              <select className={auditory._id} id='17:00-17:50' name='thursday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>18:00-18:50
                            {
                              <select className={auditory._id} id='18:00-18:50' name='thursday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                        </td>
<td>
                          <p>8:00-8:50
                              <select className={auditory._id} id='8:00-8:50' name='friday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p>9:00-9:50
                            {
                              <select className={auditory._id} id='9:00-9:50' name='friday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>10:00-10:50
                            {
                              <select className={auditory._id} id='10:00-10:50' name='friday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>11:00-11:50
                            {
                              <select className={auditory._id} id='11:00-11:50' name='friday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>12:00-12:50
                            {
                              <select className={auditory._id} id='12:00-12:50' name='friday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>13:00-13:50
                            {
                              <select className={auditory._id} id='13:00-13:50' name='friday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>14:00-14:50
                            {
                              <select className={auditory._id} id='14:00-14:50' name='friday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>15:00-15:50
                            {
                              <select className={auditory._id} id='15:00-15:50' name='friday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>16:00-16:50
                            {
                              <select className={auditory._id} id='16:00-16:50' name='friday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>17:00-17:50
                            {
                              <select className={auditory._id} id='17:00-17:50' name='friday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>18:00-18:50
                            {
                              <select className={auditory._id} id='18:00-18:50' name='friday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                        </td>
<td>
                          <p>8:00-8:50
                              <select className={auditory._id} id='8:00-8:50' name='saturday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p>9:00-9:50
                            {
                              <select className={auditory._id} id='9:00-9:50' name='saturday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>10:00-10:50
                            {
                              <select className={auditory._id} id='10:00-10:50' name='saturday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>11:00-11:50
                            {
                              <select className={auditory._id} id='11:00-11:50' name='saturday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>12:00-12:50
                            {
                              <select className={auditory._id} id='12:00-12:50' name='saturday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>13:00-13:50
                            {
                              <select className={auditory._id} id='13:00-13:50' name='saturday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>14:00-14:50
                            {
                              <select className={auditory._id} id='14:00-14:50' name='saturday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>15:00-15:50
                            {
                              <select className={auditory._id} id='15:00-15:50' name='saturday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>16:00-16:50
                            {
                              <select className={auditory._id} id='16:00-16:50' name='saturday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>17:00-17:50
                            {
                              <select className={auditory._id} id='17:00-17:50' name='saturday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
                          <p>18:00-18:50
                            {
                              <select className={auditory._id} id='18:00-18:50' name='saturday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                            }
                          </p>
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
