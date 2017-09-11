import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Auth from '../modules/Auth';
import Progress from 'react-progressbar';
import { Line, Circle } from 'rc-progress';
import PropTypes from 'prop-types';
import AdminEditMajorModal from './AdminEditMajorModal.jsx';

const { PieChart, Pie, Sector, Cell , BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadialBarChart, RadialBar } = require('recharts')// Recharts;
const data= [{name: 'ИС', value: 500}, {name: 'ВТиПО', value: 500}, {name: 'МКМ', value: 500}, {name: 'sfsdf', value: 500}];

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
class Counter extends React.Component {
  constructor (props) {
    super(props);
    this.state = { counter : props.val }
  }

  render() {
    var x = this;
    var { counter } = this.state;
    setTimeout(function() {
      if (counter > 0) {
        x.setState({ counter: counter - 1 });
      }
    }, 86400);
    return <span>{counter}</span>;
  }
}


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
      days_left: 272,
      subjects: [],
      displayedSubjects: [],
      subjectName: {},
      subject1: {},
      subject2: {},
      subject3: {},
      girls:'',
      all:'',
      majNames:[]
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


      axios.get('/api/gender_girl', {
      	responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }

      })
      .then(res => {
      	this.setState({
      		girls: res.data.girls
      	})


      })


    axios.get('/api/gender_all', {
      	responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }

      })
      .then(res => {
      	this.setState({
      	    all: res.data.all
      	})

      })
    axios.get('/api/count_majors', {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }

      })
      .then(res => {
        this.setState({
            majNames: res.data.majNames
        })

     })



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
    //console.log(this.state.majNames,'maaajnames')

    data[0].name= this.state.subject1.subject_name;
    data[1].name= this.state.subject2.subject_name;
    data[2].name= this.state.subject3.subject_name;
    data02[0].uv= this.state.value1;
    data02[1].uv= this.state.value2;
    data02[2].uv= this.state.value3;

var girls=this.state.girls;
var boys= this.state.all-girls;
//console.log(boys,'girrrll')

//console.log(this.state.all,'girrrll')
const data1 = [
      {name: '2011', ВсеПоступившие: 40, black: 15, Девушки: 23,  Парни: 22, umber:10},
      {name: '2012', ВсеПоступившие: 30, black: 13, Девушки: 22, Парни: 34, number:20},
      {name: '2013', ВсеПоступившие: 20, black: 50, Девушки: 22, Парни: 10,  number:30},
      {name: '2014', ВсеПоступившие: 27, black: 39, Девушки: 20,Парни: 18, number:40},
      {name: '2015', ВсеПоступившие: 18, black: 48, Девушки: 21,Парни: 23, number:50},
      {name: '2016', ВсеПоступившие: 23, black: 38, Девушки: 25,Парни: 50, number:60},
      {name: '2017', ВсеПоступившие: 34, black: 43, Девушки: girls,Парни: boys, number:100},
];
   // console.log(this.state.majNames.name,'maaajnames')



const data03= [{name: 'ИС', value: 500}, {name: 'ВТиПО', value: 500}, {name: 'МКМ', value: 500}, {name: 'sfsdf', value: 500}];



    return (
      <div className="container clearfix">
        <div className="bg-title">
          <h4>Главная админа</h4>
          </div>
            <div className=" my-content ">
              <div className="dashboard">
                <div className="dash-col">
                  <div className = " first_row ">
                    <p className = "dashboard_title">Кол-во преподавателей 89</p>
                  </div>
                  <div className = "second_row" >
                    <p className = "dashboard_title">Кол-во студентов 346</p>
                  </div>
                  <div className ="courses_stat">
                    <p className="course-title"> {this.state.subject1.subject_name}</p>
                    <p className="student-number-text">Количество студентов
                    за семестр</p>
                  <div className="admin_line">
                    <div style={{float: 'right', width: '100%'}}>
                      <img src='./img/pointer.png' style={{width: '25px', float:'right', height: '25px'}}/>
                      <span className="student-number">{this.state.subject1.remained}</span>
                    </div>
                    <div style={{width: '100%'}}><span className="progressbar-value">{this.state.value1}%</span></div>
                    <Line percent={this.state.value1} strokeWidth="4" strokeColor="#0f71bc" trailColor="#D3D3D3" trailWidth='4'/>
                  </div>

                  </div>
                  <div className ="courses_stat">
                    <p className="course-title"> {this.state.subject2.subject_name}</p>
                    <p className="student-number-text">Количество студентов
                    за семестр</p>
                    <div className="admin_line">
                     <div style={{float: 'right', width: '100%'}}>
                    <img src='./img/pointer2.png' style={{width: '25px', float:'right', height: '25px'}}/>
                    <span className="student-number">{this.state.subject2.remained}</span>
                    </div>
                    <div style={{width: '100%'}}><span className="progressbar-value">{this.state.value2}%</span></div>
                    <Line percent={this.state.value2} strokeWidth="4" strokeColor="#edd11e" trailColor="#D3D3D3" trailWidth='4'/>
                    </div>
                  </div>
                  <div className ="courses_stat">
                    <p className="course-title"> {this.state.subject3.subject_name}</p>
                    <p className="student-number-text">Количество студентов
                    за семестр</p>
                    <div className="admin_line">
              <div style={{float: 'right', width: '100%'}}>
                    <img src='./img/pointer3.png' style={{width: '25px', float:'right', height: '25px'}}/>
                    <span className="student-number">{this.state.subject3.remained}</span>
                    </div>
                    <div style={{width: '100%'}}><span className="progressbar-value">{this.state.value3}%</span></div>
                    <Line percent={this.state.value3} strokeWidth="4" strokeColor="#ed1e40" trailColor="#D3D3D3" trailWidth='4' />
                    </div>
                  </div>
                  <div className ="leveled_pie hidden-max-media visible-middle">

                    <RadialBarChart width={500} height={300} cx={100} cy={90} innerRadius={30} outerRadius={80} barSize={5} data={data02} >
                    <RadialBar minAngle={20} label background clockWise={false} dataKey='uv'/>
                    <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle'/>
                    </RadialBarChart>


                    <p className="leveled-pie-text">Успеваемость студентов (за месяц)</p>
                  </div>
                  <div className="big_stat hidden-ipad">

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
                    <Tooltip />
                    <Bar dataKey="Парни" stackId="a" fill="#F05254" />
                    <Bar dataKey="Девушки" stackId="a" fill="#0B9EAF " />
                    <Bar dataKey="ВсеПоступившие" fill="#3A4240"/>
                    </BarChart>
                  </div>
                  <div className="big_stat hidden-max-media hidden-middle visible-ipad">

                    <ul className="hr">
                    <div className="pie_text">
                    <p className="pie_title">Статистика Поступивших</p>
                    <p className="pie_subtext">Количество студентов за семестр</p>
                    </div>
                    <li className="li_inline" > <img src="./img/blue.png" className="mini_png"  />Парней</li>
                    <li ><img src="./img/red.png" className="mini_png" />Девушек</li>
                    </ul>

                    <BarChart className="bar_chart" width={600} height={260} data={data1}
                    margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="name"/>
                    <YAxis dataKey="number" />
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip />
                    <Bar dataKey="Парни" stackId="a" fill="#F05254" />
                    <Bar dataKey="Девушки" stackId="a" fill="#0B9EAF " />
                    <Bar dataKey="ВсеПоступившие" fill="#3A4240"/>
                    </BarChart>
                  </div>
                  <div className="hidden-max-media visible-middle" style={{ display: 'flex-root', width: '31%', marginTop: '20px'}} >
                  <div className ="leveled_pie" style={{width: '100%', marginTop: '0px'}}>


                    <PieChart className="pie_chart"  width={600} height={185}>
                    <Pie isAnimationActive={false} data={this.state.majNames} cx={200} cy={100} outerRadius={68} fill="#0B9EAF " label>
                    {
                      data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                    }
                    </Pie>
                    <Tooltip/>
                    </PieChart>




                    <div className="pie_menu">

                    <ul>
                    <li><img src="./img/blue.png" className="mini_png"  />ВТиПО</li>
                    <li><img src="./img/red.png" className="mini_png"  />ТВиМС</li>
                    </ul>

                    </div>
                    <p className="letniki_text">Статистика Специальностей 2017 года</p>
                  </div>
                  <div className ="mini_stat">
                    <p className = "time_stat">До конца учебного года осталось:</p>
                    <div className="mini_row">
                    <span className ="number_big"> <Counter val={20} /></span>
                    <span className ="day_big">дней</span>
                    </div>
                  </div>

                  </div>
              </div>
              <div className="dash-col2">
                <div className ="leveled_pie">
                <div className="radialBar_tv">

                  <RadialBarChart width={500} height={300} cx={100} cy={90} innerRadius={30} outerRadius={80} barSize={5} data={data02} >
                  <RadialBar minAngle={20} label background clockWise={false} dataKey='uv'/>
                  <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle'/>
                  </RadialBarChart>
                  </div>
                  <p className="leveled-pie-text">Успеваемость студентов (за месяц)</p>
                </div>
                <div className ="leveled_pie" style={{width: '100%', marginTop: '0px'}}>

         <div className="tv_pie_chart">
                  <PieChart className="pie_chart"  width={600} height={185}>
                  <Pie isAnimationActive={false} data={this.state.majNames} cx={200} cy={100} outerRadius={68} fill="#0B9EAF " label>
                  {
                    data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                  }
                  </Pie>
                  <Tooltip/>
                  </PieChart>
          </div>
                  <div className="pie_menu">

                  <ul>
                  <li><img src="./img/blue.png" className="mini_png"  />ВТиПО</li>
                  <li><img src="./img/red.png" className="mini_png"  />ТВиМС</li>
                  </ul>

                  </div>
                  <p className="letniki_text">Статистика Специальностей 2017 года</p>
                </div>
                <div className ="mini_stat">
                  <p className = "time_stat">До конца учебного года осталось:</p>
                  <div className="mini_row">
                  <span className ="number_big"> <Counter val={250} /></span>
                  <span className ="day_big">дней</span>
                  </div>
                </div>
              </div>
              </div>
                <div className="row hidden-max-media hidden-ipad visible-middle"  style={{marginRight: '-7px', marginLeft: '-7px', marginTop: '20px'}} >
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
