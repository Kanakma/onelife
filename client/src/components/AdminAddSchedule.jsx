import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import InputElement from 'react-input-mask';
import Select from 'react-select';
import { Draggable, Droppable } from 'react-drag-and-drop'
var o;
class AdminAddSchedule extends React.Component {

  constructor(props) {
    super(props);
    this.state={
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
      selectedGroups:[],
      auditories:[],
      period:{
        year:'',
        semester:''
      },
      schedule:[{        
        auditory:{},
        monday: {},
        tuesday: {},
        wednesday:{}, 
        thursday:{}, 
        friday:{}, 
        saturday:{}
      }],
      groups:[]    
    }
    this.getGroups=this.getGroups.bind(this);
    this.getSubjects=this.getSubjects.bind(this);
    this.getAuditories=this.getAuditories.bind(this);
    this.changePeriod=this.changePeriod.bind(this);
    this.onSubjDrop=this.onSubjDrop.bind(this);
    this.onGroupDrop=this.onGroupDrop.bind(this);

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
      this.getGroups()
    }
  }

  onSubjDrop(option, _data, event){
    console.log(option.auditory, option.index)
  }
  onGroupDrop(_data, event){
    console.log(_data.group, event.target)

  }
  render(){
    return (
      <div className="container clearfix">
        <div className="row">
          <div className="bg-title">
            <h4>Добавить расписание</h4>
          </div>
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

                <div className='form-group col-md-2'>
                  {
                    this.state.subjects.length>1?(
                      this.state.subjects.map((subject, index) =>
                        index%2==0 ? (
                            <Draggable key={index} type="subject" data={subject._id}><div className='dragable SkyBlue'>{subject.subject_name}</div></Draggable>
                          ) : (
                            <Draggable key={index} type="subject" data={subject._id}><div className='dragable PowderBlue'>{subject.subject_name}</div></Draggable>
                          )
                      )
                    ) : (
                        <div></div>
                    )
                  }
                </div>

                <div className='form-group col-md-2'>
                  {
                    this.state.groups.length>1?(
                      this.state.groups.map((group, index) =>
                        index%2==0 ? (
                            <Draggable key={index} type="group" data={group._id}><div className='dragable Orchid'>{group.group_name}</div></Draggable>
                          ) : (
                            <Draggable key={index} type="group" data={group._id}><div className='dragable Violet'>{group.group_name}</div></Draggable>
                          )
                      )
                    ) : (
                        <div></div>
                    )
                  }
                </div>

            <div className="row">
                <div className="projectCard-1">
                  <div className="project">Аудитория</div>
                  <div className="project">Понедельник</div>
                  <div className="project">Вторник</div>
                  <div className="project">Среда</div>
                  <div className="project">Четверг</div>
                  <div className="project">Пятница</div>
                  <div className="project">Суббота</div>
                </div>
                {
                  this.state.auditories.length>0?(
                    this.state.auditories.map((auditory, index) =>
                    <div className="projectCard-1" key={index}>
                      <div className="project">{auditory.auditory_name}</div>
                      <div className="project">
                        <Droppable
                            types={['subject']} 
                            onDrop={this.onSubjDrop.bind(this, {auditory, index})}>
                            <div className="ondrop-subject" id={auditory._id}></div>
                        </Droppable>
                        <Droppable
                            types={['group']} 
                            onDrop={this.onGroupDrop}>
                            <div className="ondrop-group"></div>
                        </Droppable>
                      </div>
                      <div className="project">
                        <Droppable
                            types={['subject']}
                            onDrop={this.onSubjDrop}>
                            <div className="ondrop-subject"></div>
                        </Droppable>
                        <Droppable
                            types={['group']} 
                            onDrop={this.onGroupDrop}>
                            <div className="ondrop-group"></div>
                        </Droppable>
                      </div>
                      <div className="project">
                        <Droppable
                            types={['subject']}
                            onDrop={this.onSubjDrop}>
                            <div className="ondrop-subject"></div>
                        </Droppable>
                        <Droppable
                            types={['group']} 
                            onDrop={this.onGroupDrop}>
                            <div className="ondrop-group"></div>
                        </Droppable>
                      </div>
                      <div className="project">
                        <Droppable
                            types={['subject']}
                            onDrop={this.onSubjDrop}>
                            <div className="ondrop-subject"></div>
                        </Droppable>
                        <Droppable
                            types={['group']} 
                            onDrop={this.onGroupDrop}>
                            <div className="ondrop-group"></div>
                        </Droppable>
                      </div>
                      <div className="project">
                          <Droppable
                              types={['subject']}
                              onDrop={this.onSubjDrop}>
                              <div className="ondrop-subject"></div>
                          </Droppable>
                          <Droppable
                            types={['group']} 
                            onDrop={this.onGroupDrop}>
                            <div className="ondrop-group"></div>
                        </Droppable>
                      </div>
                      <div className="project">
                        <Droppable
                            types={['subject']}
                            onDrop={this.onSubjDrop}>
                            <div className="ondrop-subject"></div>
                        </Droppable>
                        <Droppable
                            types={['group']} 
                            onDrop={this.onGroupDrop}>
                            <div className="ondrop-group"></div>
                        </Droppable>
                      </div>
                    </div>
                    )
                  ) : (
                     <div>

                     </div>
                  )
                }
            </div>
          </div>
        </div>
      </div>);
  }
}

export default AdminAddSchedule;
