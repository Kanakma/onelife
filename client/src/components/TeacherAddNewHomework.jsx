import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import DatePicker from 'react-bootstrap-date-picker';
class TeacherAddNewHomework extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: '',
      subject: {},
      subjectId: this.props.location.state.subject
    };
  }
  componentDidMount() {

  }
  componentWillMount() {

  }
  getSubject(){
    axios.get('/api/getonesubject?subjectId='+this.state.subjectId,  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        this.setState({
          subject: res.data.subject
        });
      });
  }
  getStatus(){
    if(Auth.isUserAuthenticated()){
      var token = Auth.getToken();
      var decoded = jwtDecode(token);
      this.setState({
        status: decoded.userstatus
      });
    }
  }

  render() {
    return (
      <div className="container clearfix">
        <div className="bg-title">
          <h4>Информация о предмете</h4>
        </div>
        <div className="my-content  ">
        <div className="table-responsive" style={{minHeight: '400px'}}>

          <div className="form-group col-md-6">
            <label>Дата проведения Пары</label>
            <DatePicker value="" className="form-control mydatepicker"/>
          </div>
            <div className="form-group row">
              <div className="col-md-6">
                <label>Дедлайн</label>
                <DatePicker value="" className="form-control mydatepicker"/>
              </div>

            </div>
            <div className="row" style={{textAlign: 'center', marginBottom: '20px'}}>
              <textarea maxLength="500" type="text" placeholder="Описание задания" rows="6" className="homework-message"></textarea>
            </div>
            <div className="row" style={{textAlign: 'center'}}>
             <button className="btn btn-success" style={{paddingLeft: '1%', paddingRight: '1%'}} onClick="">Отправить задание</button>
             </div>
        </div>

        </div>
      </div>);
  }
}
export default TeacherAddNewHomework;
