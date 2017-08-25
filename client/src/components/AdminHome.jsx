import React from 'react';
import axios from 'axios';
import Auth from '../modules/Auth';
import { PieChart, Pie, Legend, Tooltip, RadialBarChart, RadialBar} from 'recharts';
import Progress from 'react-progressbar';
import { Line, Circle } from 'rc-progress';
import PropTypes from 'prop-types';

const style = {
  	top: 0,
  	left: 350,
  	lineHeight: '24px'
  };
const data = [
    { name: 'Алгоритмизация', uv: 0, pv: 4800, fill: '#0B9EAF '},
    { name: 'ТВИМС', uv: 0, pv: 3908, fill: '#FFC31D'},
    { name: 'Матан', uv: 0, pv: 2400, fill: '#F05254'}
];
// <img className="img-responsive subject-img" alt="user" src={require("../../../public/subject-img/"+this.state.subject1.img)} />

class AdminHome extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      majors: [],
      isOpen:false,
      major:{},
      value1: 0,
      value2: 0,
      value3: 0,
      subjects: [],
      displayedSubjects: [],
      subject: '',
      subjectId: [],
      subjectName: {},
      names: [],
      subject1: {},
      subject2: {},
      subject3: {}
    };
    this.openSubject = this.openSubject.bind(this);
  }
  componentDidMount() {
    axios.get('/api/getmajors',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          majors: res.data.allMjrs
        });
      });
      axios.get('/api/getsubjects',  {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })

        .then(res => {
          this.setState({
            subjects: res.data.subjects,
            names: res.data.subject_names,
            subject1: res.data.subjects[Math.floor(Math.random() * res.data.subjects.length)],
            subject2: res.data.subjects[Math.floor(Math.random() * res.data.subjects.length)],
            subject3: res.data.subjects[Math.floor(Math.random() * res.data.subjects.length)]
          });
        });

        const value1 = parseInt(Math.random() * 100, 10);
        const value2 = parseInt(Math.random() * 100, 10);
        const value3 = parseInt(Math.random() * 100, 10);
        this.setState({
          value1: value1,
          value2: value2,
          value3: value3
        });
  }
  openSubject(event){
    this.context.router.history.push('/subjectinfo', {subject: event.target.id})
  }
  render() {
    data[0].name= this.state.subject1.subject_name;
    data[1].name= this.state.subject2.subject_name;
    data[2].name= this.state.subject3.subject_name;
    data[0].uv= this.state.value1;
    data[1].uv= this.state.value2;
    data[2].uv= this.state.value3;
    return (
      <div className="container clearfix">
            <div className="bg-title">
              <h4>Главная админа</h4>
            </div>
            <div className=" my-content ">
              <div className="dashboard">
                <div className = " first_row ">
                  <p className = "dashboard_title">12 преподавателей онлайн</p>
                </div>
                <div className = "second_row" >
                  <p className = "dashboard_title">12 студентов онлайн</p>
                </div>
                <div className ="courses_stat">
                  <p className="course-title"> {this.state.subject1.subject_name}</p>
                  <p className="student-number-text">Количество студентов
                  за семестр</p>
                  <div style={{float: 'right', width: '100%'}}>
                    <img src='./img/pointer.png' style={{width: '25px', float:'right', height: '25px'}}/>
                    <span className="student-number">{this.state.subject1.remained}</span>
                  </div>
                  <div style={{width: '100%'}}><span className="progressbar-value">{this.state.value1}%</span></div>
                  <Line percent={this.state.value1} strokeWidth="4" strokeColor="#0f71bc" trailColor="#D3D3D3" trailWidth='4'/>
                </div>
                <div className ="courses_stat">
                  <p className="course-title"> {this.state.subject2.subject_name}</p>
                  <p className="student-number-text">Количество студентов
                  за семестр</p>
                  <div style={{float: 'right', width: '100%'}}>
                    <img src='./img/pointer2.png' style={{width: '25px', float:'right', height: '25px'}}/>
                    <span className="student-number">{this.state.subject2.remained}</span>
                  </div>
                  <div style={{width: '100%'}}><span className="progressbar-value">{this.state.value2}%</span></div>
                  <Line percent={this.state.value2} strokeWidth="4" strokeColor="#edd11e" trailColor="#D3D3D3" trailWidth='4'/>
                </div>
                <div className ="courses_stat">
                  <p className="course-title"> {this.state.subject3.subject_name}</p>
                  <p className="student-number-text">Количество студентов
                  за семестр</p>
                  <div style={{float: 'right', width: '100%'}}>
                    <img src='./img/pointer3.png' style={{width: '25px', float:'right', height: '25px'}}/>
                    <span className="student-number">{this.state.subject3.remained}</span>
                  </div>
                  <div style={{width: '100%'}}><span className="progressbar-value">{this.state.value3}%</span></div>
                  <Line percent={this.state.value3} strokeWidth="4" strokeColor="#ed1e40" trailColor="#D3D3D3" trailWidth='4' />
                </div>
                <div className ="leveled_pie">
                  <RadialBarChart width={500} height={300} cx={100} cy={90} innerRadius={30} outerRadius={80} barSize={5} data={data} >
                      <RadialBar minAngle={20} label background clockWise={false} dataKey='uv'/>
                      <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle'/>
                  </RadialBarChart>
                <p className="leveled-pie-text">Успеваемость студентов (за месяц)</p>
                </div>
                <div className="big_stat">
                </div>
                <div style={{ display: 'flex-root', width: '31%', marginTop: '20px'}} >
                  <div className ="leveled_pie" style={{width: '100%', marginTop: '0px'}}>
                  </div>
                  <div className ="mini_stat">
                  </div>

                </div>

              </div>
                <div className="row"  style={{marginRight: '-7px', marginLeft: '-7px', marginTop: '20px'}} >
                { this.state.subjects ? (
                  <div>
                      <div className="col-md-4 col-xs-12 col-sm-6" style={{padding: '0px 7.5px'}}>
                        <div className="white-box">
                          <h4>{this.state.subject1.subject_name}</h4>
                          <div className="text-muted m-b-20"><span className="m-r-10"><i className="fa fa-clock-o"></i> {this.state.subject1.course_number} курс</span>
                              <span className="m-l-10"><i className="fa fa-usd"></i> {this.state.subject1.credit_number} кредита</span>
                          </div>
                          <p><span><i className="fa fa-clock-o"></i> Период: {this.state.subject1.period} месяцев</span></p>
                          <p><span><i className="fa fa-graduation-cap"></i> Специальность: {this.state.subject1.major_name}</span></p>
                          <p><span><i className="fa fa-user-o"></i> Преподаватель: {this.state.subject1.teacher_name}</span></p>
                          <p><span><i className="fa fa-user-plus"></i> Осталось мест: {this.state.subject1.remained}</span></p>

                            <button id={this.state.subject1._id} onClick={this.openSubject} className="btn btn-success btn-rounded waves-effect waves-light " style={{color: 'white'}}>Подробнее</button>
                      </div>
                      </div>
                      <div className="col-md-4 col-xs-12 col-sm-6" style={{padding: '0px 7.5px'}}>

                        <div className="white-box">
                            <h4>{this.state.subject2.subject_name}</h4>
                            <div className="text-muted m-b-20"><span className="m-r-10"><i className="fa fa-clock-o"></i> {this.state.subject2.course_number} курс</span>
                                <span className="m-l-10"><i className="fa fa-usd"></i> {this.state.subject2.credit_number} кредита</span>
                            </div>
                            <p><span><i className="fa fa-clock-o"></i> Период: {this.state.subject2.period} месяцев</span></p>
                            <p><span><i className="fa fa-graduation-cap"></i> Специальность: {this.state.subject2.major_name}</span></p>
                            <p><span><i className="fa fa-user-o"></i> Преподаватель: {this.state.subject2.teacher_name}</span></p>
                            <p><span><i className="fa fa-user-plus"></i> Осталось мест: {this.state.subject2.remained}</span></p>

                              <button id={this.state.subject2._id} onClick={this.openSubject} className="btn btn-success btn-rounded waves-effect waves-light " style={{color: 'white'}}>Подробнее</button>
                        </div>
                      </div>
                      <div className="col-md-4 col-xs-12 col-sm-6" style={{padding: '0px 7.5px'}}>

                        <div className="white-box">
                            <h4>{this.state.subject3.subject_name}</h4>
                            <div className="text-muted m-b-20"><span className="m-r-10"><i className="fa fa-clock-o"></i> {this.state.subject3.course_number} курс</span>
                                <span className="m-l-10"><i className="fa fa-usd"></i> {this.state.subject3.credit_number} кредита</span>
                            </div>
                            <p><span><i className="fa fa-clock-o"></i> Период: {this.state.subject3.period} месяцев</span></p>
                            <p><span><i className="fa fa-graduation-cap"></i> Специальность: {this.state.subject3.major_name}</span></p>
                            <p><span><i className="fa fa-user-o"></i> Преподаватель: {this.state.subject3.teacher_name}</span></p>
                            <p><span><i className="fa fa-user-plus"></i> Осталось мест: {this.state.subject3.remained}</span></p>

                              <button id={this.state.subject3._id} onClick={this.openSubject} className="btn btn-success btn-rounded waves-effect waves-light " style={{color: 'white'}}>Подробнее</button>
                        </div>
                      </div>
                      </div>
                  ):(
                      <div key={s} className="col-md-4 col-xs-12 col-sm-6" style={{padding: '0px 7.5px'}}>
                        Нет предметов Добавьте предметы.
                      </div>
                  )
                }
                </div>
            </div>

          </div>
  );
  }
}
AdminHome.contextTypes = {
  router: PropTypes.object.isRequired
};
export default AdminHome;
