import React from 'react';
import axios from 'axios';
import Auth from '../modules/Auth';
import {  PieChart, Pie, Sector, Cell,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
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
    <ul className="hr">
      
        
          
        {

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
console.log(a,b,c)
const data1 = [
      {name: '2011', uv: 40, black: c, red: b,  blue: b, umber:10},
      {name: '2012', uv: 30, black: 13, red: 22, blue: 34, number:20},
      {name: '2013', uv: 20, black: 50, red: 22, blue: 10,  number:30},
      {name: '2014', uv: 27, black: 39, red: 20,blue: 18, number:40},
      {name: '2015', uv: 18, black: 48, red: 21,blue: 23, number:50},
      {name: '2016', uv: 23, black: 38, red: 25,blue: 50, number:60},
      {name: '2017', uv: 34, black: 43, red: 21,blue: 47, number:100},
];
const {PropTypes} = React;

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

class AdminHome extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      majors: [],
      isOpen:false,
      major:{}
    };
    //this.toggleModal = this.toggleModal.bind(this);
    //this.toggleModalClose = this.toggleModalClose.bind(this);
  }



  render() {
 return (
<div className="container clearfix">
            <div className="bg-title">
              <h4>Dashboard</h4>

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
   
     
                </div>
                <div className ="courses_stat">

                </div>
                <div className ="courses_stat">

                </div>
                <div className ="leveled_pie">
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
            </div>
</div>



  );
  }
}

export default AdminHome;
