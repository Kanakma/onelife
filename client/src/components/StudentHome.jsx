import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import { Line as Line1,Circle } from 'rc-progress';
import {LineChart, Line, Pie, Sector, Cell,PieChart, Legend, Tooltip,AreaChart, XAxis, YAxis, CartesianGrid, Area} from 'recharts';


//SIMPLE PIE
const data03 = [{name: 'Group A', value: 80}, {name: 'Group B', value: 20},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

const SimplePieChart = React.createClass({
  render () {
    return (
      <PieChart width={400} height={400} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data03}
          cx={250}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={0}
        >
          {
            data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
               <Tooltip/>

      </PieChart>
    );
  }
})
//linechart
const data05 = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
];

const TinyLineChart = React.createClass({
  render () {
    return (
      <LineChart width={300} height={100} data={data05}>
        <Line type='monotone' dataKey='pv' cx={300}
          cy={180}  stroke='#ffffff' strokeWidth={2} />
               <Tooltip/>
      </LineChart>
    );
  }
})
//pie chart credits


//two area chart
const data = [
      {name: 'Январь', uv: 1500, pv: 2400, amt: 2400},
      {name: 'Февраль', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Март', uv: 2500, pv: 9800, amt: 2290},
      {name: 'Апрель', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Май', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Июнь', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Сентябрь', uv: 3490, pv: 4300, amt: 2100},
];


const SimpleAreaChart = React.createClass({
  render () {
    return (
      <AreaChart width={900} height={400} data={data}
            margin={{top: 30, right: 30, left: 0, bottom: 0}}>
        <XAxis dataKey="name"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Area type='monotone' dataKey='uv' stroke='#yellow' fill='#FFC31D' fillOpacity={0.3}/>
        <Area type='monotone' dataKey='pv' stroke='#82ca9d' fill='#0B9EAF' fillOpacity={0.3}/>
      </AreaChart>
    );
  }
})

//gpa pie chart
const data_gpa = [{name: 'Group A', value: 80}, {name: 'Group B', value: 20}];
const COLORS1 = ['#e14e50', '#d9d9d9'];



const SimplePieChart1 = React.createClass({
  render () {
    return (
      <PieChart width={400} height={270} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data_gpa}
          cx={250}
          cy={170}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={0}
        >
          {
            data.map((entry, index) => <Cell fill={COLORS1[index % COLORS1.length]}/>)
          }
        </Pie>
               <Tooltip/>

      </PieChart>
    );
  }
})

class StudentHome extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
       userId: '',
       student: {
         user_id: {},
         major_id: {},
         faculty_id: {},
         group_id:{}
       },
       img: '599c14d780239a46c51aa04b-default_avatar.png'
    },
    this.openProfile = this.openProfile.bind(this);
  }
  componentDidMount() {
    if(Auth.isUserAuthenticated()){
      var token = Auth.getToken();
      var decoded = jwtDecode(token);
      this.setState({
        userId: decoded.sub
      });
      axios.get('/api/getstudentprofileinfo?studentId='+decoded.sub,  {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          this.setState({
            student: res.data.student,
            img: res.data.student.img
          });
        });
    }
  }
  openProfile(event){
    this.context.router.history.push('/editstudentprofile', {userId: event.target.id})
  }
  render() {
    return (
    <div className="container clearfix" style={{height:"1800px"}}>
    <div className="page-wrapper">
      <div className="bg-title" style={{marginLeft: '0px' }}>
        <h4>Главная студента</h4>
      </div>
      <div className="profile-heading text-center ">
      <div className="university_logo">

      </div>
        <div className="profile-heading-name ">

       Университет имени Сулеймана Демиреля
           </div>
        <div ></div>
      </div>
      <div className="page-content">
        <div className=" col-md-4">
          <div className="white-box text-center" style={{height: '502px'}}>
            <div style={{width: '100%'}}>
              <img src={require("../../../public/student-img/"+this.state.img)} alt="user" className="img-circle img-responsive profile-teacher-img" style={{display: 'block',margin: '10px auto'}}/>
            </div>
            <p className="profile-teacher-name">{this.state.student.user_id.name} {this.state.student.user_id.lastname}</p>
            <p className="profile-teacher-name">ID{this.state.student.user_id.username}</p>
            <div className="student_main_info">
              <span className="student_name_main1"> Факуьтет:</span> <span className="student_name_main"> {this.state.student.faculty_id.faculty_name} </span><br/>
              <span className="student_name_main1"> Cпециальность:</span><span className="student_name_main"> {this.state.student.major_id.major_name}</span><br/>
              <span className="student_name_main1"> Группа:</span><span className="student_name_main"> {this.state.student.group_id.group_name}</span><br/>
              <span className="student_name_main1"> Курс:</span><span className="student_name_main"> {this.state.student.group_id.course_number}</span>
            </div>
            <button className="profile-teacher-btn" onClick={this.openProfile} id={this.state.userId}>Настройки</button>
          </div>
        </div>
        <div className=" col-md-4">
          <div className="student_gpa_stat">
          <div className="student_ocenka_stat">
            <p className="student_gpa_title">Оценка (GPA)</p>
            <div className="student_line">
              <TinyLineChart />
            </div>
          </div>
            <div className="student_gparechart_stat">

            <p className="student_max_score">Средний бал <br/>из максимальных 4.0</p>
            <p className="student_gpa">3.84</p>
            <div className="student_pie_chart">
            <span className="student_total_gpa">80%</span>
             <SimplePieChart1 />
             </div>

            </div>
          </div>
        </div>
        <div className=" col-md-4">
          <div className="student_courses_stat ">
            <div className="student_credits_stat">
              <div className="students_courses_titles">
                <p className="student_courses_title">Курсы</p>
                <p className="student_courses_subtitle">Количество кредитов</p>
              </div>
              <div className="students_total_numbers">
                <p className="student_total_courses_title">ВСЕГО КРЕДИТОВ</p>
                <p className="student_total_courses_subtitle">18</p>
              </div>
              <div className="stud_pie">
                <SimplePieChart />
              </div>
            </div>
            <div className="student_daysleft_stat">
              <div className="student_gpa_main_title">
                <p className="student_current_year">Учебный год</p>
                <p className="student_days_left">До конца учебного года осталось:</p>
                <div className="student_count_days_left">
                  <span className="student_number">263</span><span className="student_days">дней</span>
                  <Line1 percent="10" strokeWidth="1" trailWidth="1" trailColor="#D3D3D3" strokeColor="#f2b91d" />

                </div>
                <div className="student_progress_line">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 student_row">
        <div className="student_attendance">
        <div className="student_mixed_statistic">
          <div className="student_mixed_title">Статистика успеваемости и посещения</div>
          <div className="student_mixed_subtitle">За 2 месяца</div>
        </div>
        <div className="stud_icons">
         <img className="stud_img" src="./img/yellow1.png"/><span>Посещаемость</span>
         <img className="stud_img" src="./img/blue1.png"/><span>Успеваемость</span>
        </div>
         <SimpleAreaChart />
        </div>
        </div>

  <div id="main">

  <div >

  <p className="student_today">Расписание на СЕГОДНЯ</p>


<table className="zui-table zui-table-horizontal">
    <thead>
        <tr>
            <th>#</th>
            <th>Время</th>
            <th>Предмет</th>
            <th>Преподаватель</th>
            <th>Место</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>10:00-11:00</td>
            <td>Математика</td>
            <td>Оразмков В.Д.</td>
            <td>497</td>
        </tr>
        <tr>
            <td>2</td>
            <td>10:00-11:00</td>
            <td>Python I</td>
            <td>Морозкина И.В.</td>
            <td>473</td>
        </tr>
        <tr>
            <td>3</td>
            <td>10:00-11:00</td>
            <td>UX/UI Design</td>
            <td>Молдагулова А.Х.</td>
            <td>$295</td>
        </tr>
        <tr>
            <td>4</td>
            <td>10:00-11:00</td>
            <td>Oracle</td>
            <td>Кепимс В.Й.</td>
            <td>700</td>
        </tr>
        <tr>
            <td>5</td>
            <td>10:00-11:00</td>
            <td>SDP4</td>
            <td>Булкина В.Ф.</td>
            <td>300</td>
        </tr>
    </tbody>
</table>


  </div>

  <div >

  <p className="student_today">Расписание на ЗАВТРА</p>


<table className="zui-table zui-table-horizontal">
    <thead>
        <tr>
            <th>#</th>
            <th>Время</th>
            <th>Предмет</th>
            <th>Преподаватель</th>
            <th>Место</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>10:00-11:00</td>
            <td>Математика</td>
            <td>Оразмков В.Д.</td>
            <td>497</td>
        </tr>
        <tr>
            <td>2</td>
            <td>10:00-11:00</td>
            <td>Python I</td>
            <td>Морозкина И.В.</td>
            <td>473</td>
        </tr>
        <tr>
            <td>3</td>
            <td>10:00-11:00</td>
            <td>UX/UI Design</td>
            <td>Молдагулова А.Х.</td>
            <td>$295</td>
        </tr>
        <tr>
            <td>4</td>
            <td>10:00-11:00</td>
            <td>Oracle</td>
            <td>Кепимс В.Й.</td>
            <td>700</td>
        </tr>
        <tr>
            <td>5</td>
            <td>10:00-11:00</td>
            <td>SDP4</td>
            <td>Булкина В.Ф.</td>
            <td>300</td>
        </tr>
    </tbody>
</table>


  </div>
 </div>





      </div>
    </div>
    </div>);
  }
}
StudentHome.contextTypes = {
  router: PropTypes.object.isRequired
};
export default StudentHome;
