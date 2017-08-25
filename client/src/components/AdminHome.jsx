import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Auth from '../modules/Auth';
import Progress from 'react-progressbar';
import { Line, Circle } from 'rc-progress';
import PropTypes from 'prop-types';
import {  PieChart, Pie, Sector, Cell,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadialBarChart, RadialBar} from 'recharts';
import AdminEditMajorModal from './AdminEditMajorModal.jsx';

const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
const COLORS = ['#0B9EAF', '#FFC31D ', '#F05254 ', '#3A4240 '];

const RADIAN = Math.PI / 180;

var renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 // setTimeout(function(){
  // console.log('adsdad')
// },1000)
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'}  dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

//legend
const renderLegend = (props) => {
  const { payload } = props;

  return (
    <ul className="hr">{
        payload.map((entry, index) => (
          <li key={`item-${index}`}>{entry.value}</li>
        ))
      }
    </ul>
  );
}
//bar
var a =40;
var kof=0.25;
var b= a*kof;
var c= a-b;//30
const data1 = [
      {name: '2011', uv: 40, black: c, red: b,  blue: b, umber:10},
      {name: '2012', uv: 30, black: 13, red: 22, blue: 34, number:20},
      {name: '2013', uv: 20, black: 50, red: 22, blue: 10,  number:30},
      {name: '2014', uv: 27, black: 39, red: 20,blue: 18, number:40},
      {name: '2015', uv: 18, black: 48, red: 21,blue: 23, number:50},
      {name: '2016', uv: 23, black: 38, red: 25,blue: 50, number:60},
      {name: '2017', uv: 34, black: 43, red: 21,blue: 47, number:100},
];
// const {PropTypes} = React;

const CustomTooltip  = React.createClass({
  propTypes: {
    type: PropTypes.string,
    payload: PropTypes.array,
    label: PropTypes.string,
  },

  getIntroOfPage(label) {
    if (label === '2011') {
      return "2011";
    } else if (label === '2012') {
      return "2012";
    } else if (label === '2013') {
      return "2013";
    } else if (label === '2014') {
      return "2014";
    } else if (label === '2015') {
      return "2015";
    } else if (label === '2016') {
      return "2016";
    }
  },

  render() {
    const { active } = this.props;

    if (active) {
      const { payload, label } = this.props;
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
          <p className="intro">{this.getIntroOfPage(label)}</p>
          <p className="desc">Anything you want can be displayed here.</p>
        </div>
      );
    }

    return null;
  }
});

const SimpleBarChart = React.createClass({
  render () {
    return (
      <BarChart width={600} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip content={<CustomTooltip/>}/>
       <Legend />
       <Bar dataKey="pv" barSize={20} fill="#8884d8" />
      </BarChart>
    );
  }
})



const style = {
  	top: 0,
  	left: 350,
  	lineHeight: '24px'
  };
const data02 = [
    { name: 'САП', uv: 0, pv: 4800, fill: '#0B9EAF '},
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
      subjectName: {},
      subject1: {},
      subject2: {},
      subject3: {}
    };
    this.openSubject = this.openSubject.bind(this);
    this.randomSubjects = this.randomSubjects.bind(this);
  }
  componentDidMount() {
    const displayedSubjects=[];
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
          this.randomSubjects();
        });

        // displayedSubjects.push(this.state.subject1);
        // displayedSubjects.push(this.state.subject2);
        // displayedSubjects.push(this.state.subject3);
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
  randomSubjects(){
    const displayedSubjects = [];
    displayedSubjects.push(this.state.subject1);
    displayedSubjects.push(this.state.subject2);
    displayedSubjects.push(this.state.subject3);
    this.setState({
      displayedSubjects: displayedSubjects
    })

  }
  render() {
    // data02[0].name= this.state.subject1.subject_name;
    // data02[1].name= this.state.subject2.subject_name;
    // data02[2].name= this.state.subject3.subject_name;
    data02[0].uv= this.state.value1;
    data02[1].uv= this.state.value2;
    data02[2].uv= this.state.value3;
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
                  <RadialBarChart width={500} height={300} cx={100} cy={90} innerRadius={30} outerRadius={80} barSize={5} data={data02} >
                      <RadialBar minAngle={20} label background clockWise={false} dataKey='uv'/>
                      <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle'/>
                  </RadialBarChart>
                <p className="leveled-pie-text">Успеваемость студентов (за месяц)</p>
                </div>
                <div className="big_stat">

                <ul className="hr">
                <div className="pie_text">
                <p className="pie_title">Статистика Поступивших</p>
                <p className="pie_subtext">Количество студентов за семестр</p>

                </div>
          <li className="li_inline" > <img src="./img/blue.png" className="mini_png"  />Парней</li>
          <li ><img src="./img/red.png" className="mini_png" />Девушек</li>
                </ul>
                       <BarChart className="bar_chart" width={810} height={260} data={data1}
                              margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                         <XAxis dataKey="name"/>
                         <YAxis dataKey="number" />
                         <CartesianGrid strokeDasharray="3 3"/>
                         <Tooltip  content={<CustomTooltip/>}/>
                         <Bar dataKey="black" stackId="a" fill="#3A4240" />
                         <Bar dataKey="red" stackId="a" fill="#F05254 " />
                         <Bar dataKey="black" stackId="b" fill="#3A4240" />
                         <Bar dataKey="blue" stackId="b" fill="#0B9EAF  " />



                      </BarChart>
                </div>
                <div style={{ display: 'flex-root', width: '31%', marginTop: '20px'}} >
                  <div className ="leveled_pie" style={{width: '100%', marginTop: '0px'}}>
                                                  <PieChart className="pie_chart" width={370} height={185} onMouseEnter={this.onPieEnter}>
                                        <Pie
                                          data={data}
                                          cx={280}
                                          cy={100}
                                          labelLine={false}
                                          label={renderCustomizedLabel}
                                          outerRadius={80}
                                          fill="#8884d8"
                                        >
                                          {
                                            data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                                          }
                                        </Pie>
                                </PieChart>
                  <div className="pie_menu">
                  <ul>
                  <li><img src="./img/blue.png" className="mini_png"  />Основы Права</li>
         <li><img src="./img/red.png" className="mini_png"  />Матем Анализ</li>

                  </ul>
                  </div>
                 <p className="letniki_text">Статистика летников 2017 года</p>
                  </div>
                  <div className ="mini_stat">
                                           <p className = "time_stat">До конца учебного года осталось:</p>
                       <div className="mini_row">
                         <span className ="number_big">123</span>
                             <span className ="day_big">дня</span>
                        </div>

                  </div>

                </div>

              </div>
                <div className="row"  style={{marginRight: '-7px', marginLeft: '-7px', marginTop: '20px'}} >
                { this.state.displayedSubjects ? (
                    this.state.displayedSubjects.map((subject, s) =>
                      <div key={s} className="col-md-4 col-xs-12 col-sm-6" style={{padding: '0px 7.5px'}}>
                          <img className="img-responsive subject-img" alt="user" src={require("../../../public/subject-img/"+subject.img)} />
                          <div className="white-box">
                              <h4>{subject.subject_name}</h4>
                              <div className="text-muted m-b-20"><span className="m-r-10"><i className="fa fa-clock-o"></i> {subject.course_number} курс</span>
                                  <span className="m-l-10"><i className="fa fa-usd"></i> {subject.credit_number} кредита</span>
                              </div>
                              <p><span><i className="fa fa-clock-o"></i> Период: {subject.period} месяцев</span></p>
                              <p><span><i className="fa fa-graduation-cap"></i> Специальность: {subject.major_name}</span></p>
                              <p><span><i className="fa fa-user-o"></i> Преподаватель: {subject.teacher_name}</span></p>
                              <p><span><i className="fa fa-user-plus"></i> Осталось мест: {subject.remained}</span></p>
                              {(this.state.status == "admin") ?(
                                <div>
                                  <button onClick={this.openSubject} id={subject._id}  className="btn btn-success btn-rounded waves-effect waves-light " style={{color: 'white'}}>Подробнее</button>
                                  <button onClick={this.toggleModal.bind(this, subject)} className="btn btn-default btn-circle m-t-10 pull-right edit-btn-moreinfo" style={{background: 'none'}} >
                                      <i className="fa fa-pencil" style={{color: '#717171'}}></i>
                                  </button>
                                </div>
                              ):(
                                <button id={subject._id} onClick={this.openSubject} className="btn btn-success btn-rounded waves-effect waves-light " style={{color: 'white'}}>Подробнее</button>
                              )}
                          </div>
                      </div>
                    )
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
