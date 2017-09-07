import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import InputElement from 'react-input-mask';
import Select from 'react-select';

class AdminAddSchedule extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      groups:[],
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
      subjValue:'',
      selectedGroups:[],
      auditories:[],
      period:{
        year:'',
        semester:''
      },
      value:[]
    }
    this.getGroups=this.getGroups.bind(this);
    this.getSubjects=this.getSubjects.bind(this);
    this.getAuditories=this.getAuditories.bind(this);
    this.changePeriod=this.changePeriod.bind(this);
    this.selectSubj=this.selectSubj.bind(this);
    this.handleSelectChange=this.handleSelectChange.bind(this);
  }

  componentDidMount(){
  }

  getGroups(_id){
    axios.get('/api/getsubjectgroups?subjectId='+_id,  {
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
    if(event.target.value==''){
      this.setState({
        subjValue:'',
        groups:[]
      })
    } else{
      this.getGroups(event.target.value)
      this.setState({
        subjValue:event.target.value
      })
    }
    console.log('Day:' + event.target.name, 'Time:' + event.target.id, 'Subject._id:' + event.target.value,'Auditory:' + event.target.className)
  }

  handleSelectChange (value) {
    this.setState({ value });
  }


  render() {
    
    var subjects = this.state.subjects
    var subject_groups = this.state.groups

    function valueProp(group){
      return { label:group.group_name, value:group._id  }
    }

    var options = this.state.groups.map(valueProp)
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
                          <p><b>8:00-8:50</b>
                              <select className={auditory._id} id='8:00-8:50' value={this.state.subjValue} name='monday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select><br/>
                                <b>Группы:</b><br/>
                              {
                                subject_groups.length>0 ?(
                                  <em>
                                    <Select className="parentStudents"
                                      options={options}
                                      onChange={this.handleSelectChange}
                                      multi={true}
                                      multiSelectAll={true}
                                      value={this.state.value}
                                      placeholder=" "
                                    />
                                  </em>
                                ) : (
                                  <b> нет</b>
                                )
                              }
                          </p>
                          <p><b>9:00-9:50</b>
                              <select className={auditory._id} id='9:00-9:50' name='monday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>10:00-10:50</b>
                              <select className={auditory._id} id='10:00-10:50' name='monday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>11:00-11:50</b>
                              <select className={auditory._id} id='11:00-11:50' name='monday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>12:00-12:50</b>
                              <select className={auditory._id} id='12:00-12:50' name='monday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>13:00-13:50</b>
                              <select className={auditory._id} id='13:00-13:50' name='monday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>14:00-14:50</b>
                              <select className={auditory._id} id='14:00-14:50' name='monday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>15:00-15:50</b>
                              <select className={auditory._id} id='15:00-15:50' name='monday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>16:00-16:50</b>
                              <select className={auditory._id} id='16:00-16:50' name='monday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>17:00-17:50</b>
                              <select className={auditory._id} id='17:00-17:50' name='monday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>18:00-18:50</b>
                              <select className={auditory._id} id='18:00-18:50' name='monday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                        </td>
<td>
                          <p><b>8:00-8:50</b>
                              <select className={auditory._id} id='8:00-8:50' name='tuesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>9:00-9:50</b>
                              <select className={auditory._id} id='9:00-9:50' name='tuesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>10:00-10:50</b>
                              <select className={auditory._id} id='10:00-10:50' name='tuesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>11:00-11:50</b>
                              <select className={auditory._id} id='11:00-11:50' name='tuesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>12:00-12:50</b>
                              <select className={auditory._id} id='12:00-12:50' name='tuesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>13:00-13:50</b>
                              <select className={auditory._id} id='13:00-13:50' name='tuesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>14:00-14:50</b>
                              <select className={auditory._id} id='14:00-14:50' name='tuesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>15:00-15:50</b>
                              <select className={auditory._id} id='15:00-15:50' name='tuesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>16:00-16:50</b>
                              <select className={auditory._id} id='16:00-16:50' name='tuesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>17:00-17:50</b>
                              <select className={auditory._id} id='17:00-17:50' name='tuesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>18:00-18:50</b>
                              <select className={auditory._id} id='18:00-18:50' name='tuesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                        </td>
<td>
                          <p><b>8:00-8:50</b>
                              <select className={auditory._id} id='8:00-8:50' name='wednesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>9:00-9:50</b>
                              <select className={auditory._id} id='9:00-9:50' name='wednesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>10:00-10:50</b>
                              <select className={auditory._id} id='10:00-10:50' name='wednesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>11:00-11:50</b>
                              <select className={auditory._id} id='11:00-11:50' name='wednesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>12:00-12:50</b>
                              <select className={auditory._id} id='12:00-12:50' name='wednesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>13:00-13:50</b>
                              <select className={auditory._id} id='13:00-13:50' name='wednesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>14:00-14:50</b>
                              <select className={auditory._id} id='14:00-14:50' name='wednesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>15:00-15:50</b>
                              <select className={auditory._id} id='15:00-15:50' name='wednesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>16:00-16:50</b>
                              <select className={auditory._id} id='16:00-16:50' name='wednesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>17:00-17:50</b>
                              <select className={auditory._id} id='17:00-17:50' name='wednesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>18:00-18:50</b>
                              <select className={auditory._id} id='18:00-18:50' name='wednesday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                        </td>
<td>
                          <p><b>8:00-8:50</b>
                              <select className={auditory._id} id='8:00-8:50' name='thursday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>9:00-9:50</b>
                              <select className={auditory._id} id='9:00-9:50' name='thursday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>10:00-10:50</b>
                              <select className={auditory._id} id='10:00-10:50' name='thursday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>11:00-11:50</b>
                              <select className={auditory._id} id='11:00-11:50' name='thursday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>12:00-12:50</b>
                              <select className={auditory._id} id='12:00-12:50' name='thursday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>13:00-13:50</b>
                              <select className={auditory._id} id='13:00-13:50' name='thursday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>14:00-14:50</b>
                              <select className={auditory._id} id='14:00-14:50' name='thursday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>15:00-15:50</b>
                              <select className={auditory._id} id='15:00-15:50' name='thursday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>16:00-16:50</b>
                              <select className={auditory._id} id='16:00-16:50' name='thursday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>17:00-17:50</b>
                              <select className={auditory._id} id='17:00-17:50' name='thursday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>18:00-18:50</b>
                              <select className={auditory._id} id='18:00-18:50' name='thursday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                        </td>
<td>
                          <p><b>8:00-8:50</b>
                              <select className={auditory._id} id='8:00-8:50' name='friday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>9:00-9:50</b>
                              <select className={auditory._id} id='9:00-9:50' name='friday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>10:00-10:50</b>
                              <select className={auditory._id} id='10:00-10:50' name='friday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>11:00-11:50</b>
                              <select className={auditory._id} id='11:00-11:50' name='friday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>12:00-12:50</b>
                              <select className={auditory._id} id='12:00-12:50' name='friday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>13:00-13:50</b>
                              <select className={auditory._id} id='13:00-13:50' name='friday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>14:00-14:50</b>
                              <select className={auditory._id} id='14:00-14:50' name='friday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>15:00-15:50</b>
                              <select className={auditory._id} id='15:00-15:50' name='friday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>16:00-16:50</b>
                              <select className={auditory._id} id='16:00-16:50' name='friday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>17:00-17:50</b>
                              <select className={auditory._id} id='17:00-17:50' name='friday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>18:00-18:50</b>
                              <select className={auditory._id} id='18:00-18:50' name='friday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                        </td>
<td>
                          <p><b>8:00-8:50</b>
                              <select className={auditory._id} id='8:00-8:50' name='saturday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>9:00-9:50</b>
                              <select className={auditory._id} id='9:00-9:50' name='saturday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>10:00-10:50</b>
                              <select className={auditory._id} id='10:00-10:50' name='saturday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>11:00-11:50</b>
                              <select className={auditory._id} id='11:00-11:50' name='saturday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>12:00-12:50</b>
                              <select className={auditory._id} id='12:00-12:50' name='saturday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>13:00-13:50</b>
                              <select className={auditory._id} id='13:00-13:50' name='saturday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>14:00-14:50</b>
                              <select className={auditory._id} id='14:00-14:50' name='saturday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>15:00-15:50</b>
                              <select className={auditory._id} id='15:00-15:50' name='saturday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>16:00-16:50</b>
                              <select className={auditory._id} id='16:00-16:50' name='saturday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>17:00-17:50</b>
                              <select className={auditory._id} id='17:00-17:50' name='saturday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
                          </p>
                          <p><b>18:00-18:50</b>
                              <select className={auditory._id} id='18:00-18:50' name='saturday' onChange={this.selectSubj}>
                                <option value=''>Выберите предмет</option>
                                {
                                 subjects.map((subject, index)=>
                                    <option key={index} value={subject._id}>{subject.subject_name}</option>
                                  )
                                }
                              </select>
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
