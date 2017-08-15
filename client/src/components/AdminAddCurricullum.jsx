import React from 'react';
import axios from 'axios';
import Auth from '../modules/Auth'
import InputElement from 'react-input-mask';

class AdminAddCurricullum extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      teachers:[]
    }
  }
  componentDidMount() {
    axios.get('/api/getteachers',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          teachers: res.data.allTchrs
        });
      });
  }
  render() {
    return (
        <div>
          <div className="container clearfix">
            <div className="bg-title">
              <h4>Добавить расписание</h4>
            </div>
            <div className=" my-content">
            <div className = "table-responsive">
            <h5 style={{marginBottom: '3%'}} className="text-uppercase">Расписание</h5>
            <form action="/">
            </form>
            </div>
            </div>
          </div>
        </div>
);
  }
}

export default AdminAddCurricullum;
