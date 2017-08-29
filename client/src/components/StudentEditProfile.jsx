import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import { ComposedChart, Area, PieChart, Pie, Sector, Cell,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadialBarChart, RadialBar} from 'recharts';
import { Line, Circle } from 'rc-progress';
import DatePicker from 'react-bootstrap-date-picker';
import InputElement from 'react-input-mask';


class StudentEditProfile extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    }
  }
  componentDidMount() {

  }
  // dateFormat(date){
  //   var fDate = new Date(date);
  //   var m = ((fDate.getMonth() * 1 + 1) < 10) ? ("0" + (fDate.getMonth() * 1 + 1)) : (fDate.getMonth() * 1 + 1);
  //   var d = ((fDate.getDate() * 1) < 10) ? ("0" + (fDate.getDate() * 1)) : (fDate.getDate() * 1);
  //   return m + "/" + d + "/" + fDate.getFullYear()
  // }


  render() {

    return (
      <div className="container clearfix">
          <div className="bg-title" style={{marginLeft: '220px', marginBottom: '25px' }}>
            <h4>Редактировать профиль</h4>
          </div>
          <div className=" my-content" >
            <div className="table-responsive">
          <form action="/" onSubmit="">

        
          </form>
        </div>
        </div>
      </div>
    );
  }
}

export default StudentEditProfile;
