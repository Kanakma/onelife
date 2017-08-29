import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import {ComposedChart, Area, PieChart, Pie, Sector, Cell,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadialBarChart, RadialBar} from 'recharts';
import { Line, Circle } from 'rc-progress';

const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}];
const COLORS = [ '#036b77', '#ffc31d', '#ffffff'];
const data1 = [{name: 'Page A', uv: 590, pv: 800, amt: 1400, h: 0},
              {name: 'Page B', uv: 868, pv: 967, amt: 1506, h: 450},
              {name: 'Page C', uv: 1397, pv: 1098, amt: 989, h: 900},
              {name: 'Page D', uv: 1480, pv: 1200, amt: 1228, h: 1000},
              {name: 'Page E', uv: 1520, pv: 1108, amt: 1100, h: 1350},
              {name: 'Page F', uv: 1400, pv: 680, amt: 1700, h: 1800}];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
}
class TeacherHome extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
       userId: '',
       teacher: {
         user_id: {}
       },

       img: 'default.jpg',
       students: [],
       subjects: [],
       credit_number: 0,
       subject1: {},
       subject2: {},
       subject3: {}

    },
    this.creditsNumber = this.creditsNumber.bind(this);
    this.openProfile = this.openProfile.bind(this);
    // this.maxStudents = this.maxStudents.bind(this);
  }
  componentDidMount() {
    if(Auth.isUserAuthenticated()){
      var token = Auth.getToken();
      var decoded = jwtDecode(token);
      this.setState({
        userId: decoded.sub
      });
      axios.get('/api/getteacherprofileinfo?teacherId='+decoded.sub,  {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          this.setState({
            teacher: res.data.teacher,
            img: res.data.teacher.img
          });
        });

        axios.get('/api/getteachersubjects?teacherId='+decoded.sub,  {
          responseType: 'json',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          }
        })
          .then(res => {
            this.setState({
              subjects: res.data.subjects
            });
            this.creditsNumber();
          });

    }
    axios.get('/api/getstudents',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          students: res.data.students
        });
      });

  }
  creditsNumber(){
    let creditsNumber = 0;
    this.state.subjects.map(function(subject){
      creditsNumber += subject.credit_number;
      return subject.credit_number;
    })
    this.setState({
      credit_number: creditsNumber
    })
  }
  openProfile(event){
    this.context.router.history.push('/editprofile', {userId: event.target.id})
  }
  // maxStudents(){
  //   let max= 0;
  //
  //   this.state.subjects.map(function(subject, s){
  //     if(subject.students.length>max){
  //       max = subject.students.length;
  //     }
  //     return subject;
  //   })
  //   let subject1= {};
  //   this.state.subjects.map(function(subject, s){
  //     if(subject.students.length==max){
  //       subject1 == subject;
  //     }
  //   })
  // }
  render() {
    return (
      <div className="container clearfix">
        <div className="page-wrapper">
          <div className="bg-title" style={{margin: '0px' }}>
            <h4>Главная преподавателя</h4>
          </div>
          <div className="profile-heading text-center vertical-align">
            <div className="teacher-progress-bar" >
              <div style={{width: '100%'}}><img className="teacher-heading-icons" src= "./img/graduate.png"/></div>
              <div style={{width: '100%'}}><p className="teacher-heading-text">ОБЩЕЕ КОЛИЧЕСТВО СТУДЕНТОВ</p></div>
              <p className="teacher-heading-number" style={{color: '#cf4a4c'}}>{this.state.students.length}</p>
              <Line percent="10" strokeWidth="2" trailWidth="2" trailColor="#D3D3D3" strokeColor="#cf4a4c" />
            </div>
            <div className="teacher-progress-bar" style={{borderLeft: '1px solid  #ffffff'}}>
              <div><img className="teacher-heading-icons" src= "./img/clock.png"/></div>
              <div><p className="teacher-heading-text">ОБЩЕЕ КОЛИЧЕСТВО ЧАСОВ (МЕСЯЦ)</p></div>
              <p className="teacher-heading-number" style={{color: '#0b9eaf'}}>{this.state.credit_number}</p>
              <Line percent="70" strokeWidth="2" trailWidth="2" trailColor="#D3D3D3" strokeColor="#0b9eaf" />
            </div>
            <div className="teacher-progress-bar" style={{borderLeft: '1px solid  #ffffff'}}>
              <div><img className="teacher-heading-icons" src= "./img/data-viewer.png"/></div>
              <div><p className="teacher-heading-text">ЧИСЛО ПОСЕЩЕНИЙ ВАШЕЙ СТРАНИЦЫ</p></div>
              <p className="teacher-heading-number" style={{color: '#f3ba1d'}}>120</p>
              <Line percent="50" strokeWidth="2" trailWidth="2" trailColor="#D3D3D3" strokeColor="#f3ba1d"/>
            </div>
            <div className="profile-heading-name ">
            </div>
            <div style={{fontSize: '20px', color: 'black'}}></div>
          </div>
          <div className="teacher-statistics">
            <div className="teacher-mini-profile  text-center" >
              <div className="white-box text-center" style={{height: '100%'}}>
                <div style={{width: '100%'}}>
                  <img src={require("../../../public/teacher-img/"+this.state.img)} alt="user" className="img-circle img-responsive profile-teacher-img" style={{display: 'block',margin: '10px auto'}}/>
                </div>
                <p className="profile-teacher-name">{this.state.teacher.user_id.name} {this.state.teacher.user_id.lastname}</p>
                <p>{this.state.teacher.degree}</p>
                <button onClick={this.openProfile} id={this.state.userId} className="profile-teacher-btn">Настройки</button>
              </div>
            </div>
            <div className="teacher-common-statistic ">
              <div className="white-box" style={{height: '100%'}}>
                <p className="teacher-common-statistic-text">Общая статистика</p>
                <ComposedChart width={530} height={200} data={data1}>
                  <XAxis dataKey="name" />
                  <YAxis type="number"/>
                  <Tooltip />
                  <Legend />
                  <CartesianGrid stroke="#f5f5f5" />
                  <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                  <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                  <line type="monotone" dataKey="uv" stroke="#ff7300" />
                </ComposedChart>
              </div>
            </div>
            <div className="teacher-number-statistic">
              <div className="white-box" style={{height: '100%'}}>
                <p className="number-statistic-title">Количество студентов</p>
                <p className="number-statistic-text">Записанные на ваши курсы</p>
                <p className= "number-statistic-number">{this.state.students.length}</p>
                <Line percent="10" strokeWidth="1" trailWidth="1" trailColor="#D3D3D3" strokeColor="#cf4a4c" />
                <p className="number-statistic-percent">22% выше с прошлого года</p>
              </div>
            </div>
            <div className="teacher-number-statistic">
              <div className="white-box" style={{height: '100%'}}>
                  <p className="number-statistic-title">Учебный год</p>
                  <p className="number-statistic-text">До конца учебного года остаось:</p>
                  <p className= "number-statistic-number" style={{color: '#0b9eaf'}}>123</p>
                  <Line percent="10" strokeWidth="1" trailWidth="1" trailColor="#D3D3D3" strokeColor="#0b9eaf" />
              </div>
            </div>
            <div className="teacher-courses-statistic">
              <p className= "courses-statistic-title">СТАТИСТИКА КУРСОВ</p>
              <p className = "courses-statistic-text">Количество студентов, записанные на ваши курсы</p>
              <div style={{display: 'flex'}}>
                <PieChart width={450} height={200} onMouseEnter={this.onPieEnter} >
                  <Pie
                    data={data}
                    cx={300}
                    cy={100}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={90}
                    fill="#8884d8"
                  >
                  	{
                    	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                    }
                  </Pie>
                </PieChart>
                <div style={{display: 'table-column', padding: '50px 0'}}>
                  <div style={{display: 'flex', margin: 'auto'}}>
                    <div className="students-number-color" style={{backgroundColor: '#ffffff'}}></div>
                    <p className="number-subject-text"></p>
                  </div>
                  <div style={{display: 'flex', margin: 'auto'}}>
                    <div className="students-number-color" style={{backgroundColor: '#ffc31d'}}></div>
                    <p className="number-subject-text"></p>
                  </div>
                  <div style={{display: 'flex', margin: 'auto'}}>
                    <div className="students-number-color" style={{backgroundColor: '#036b77'}}></div>
                    <p className="number-subject-text"></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="teacher-progress-statistic">
              <p className= "courses-statistic-title">УСПЕВАЕМОСТЬ</p>
              <p className = "courses-statistic-text">Средний бал студентов</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
TeacherHome.contextTypes = {
  router: PropTypes.object.isRequired
};
export default TeacherHome;
