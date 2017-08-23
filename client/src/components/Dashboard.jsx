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
            <div className=" my-content">
            <div className = "table-responsive first_row " style={{marginRight:"30px"}}>
            </div>


            <div className = "table-responsive  first_row" >
            </div>
            </div>
</div>



  );
  }
}

export default AdminMajors;
