import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import { ComposedChart, Area, PieChart, Pie, Sector, Cell,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadialBarChart, RadialBar} from 'recharts';
import { Line, Circle } from 'rc-progress';


class TeacherEditProfile extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {


    }
  }
  componentDidMount() {

  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default TeacherEditProfile;
