import React from 'react';
import axios from 'axios';
import Auth from '../modules/Auth';
import { PieChart, Pie, Legend, Tooltip} from 'recharts';
import AdminEditMajorModal from './AdminEditMajorModal.jsx';


class AdminMajors extends React.Component {

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
                </div>
                <div style={{ display: 'flex-root', width: '31%', marginTop: '20px'}} >
                  <div className ="leveled_pie" style={{width: '100%', marginTop: '0px'}}>
                  </div>
                  <div className ="mini_stat">
                  </div>
                </div>
              </div>
            </div>
</div>
  );
  }
}

export default AdminMajors;
