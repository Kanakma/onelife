import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import DatePicker from 'react-bootstrap-date-picker';

class TeacherAddAttendance extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        groups: [],
      group_name:'',
      message: '',
      errors: {},
      subjects: [],
      subject: {},
      students: [],
      subject_id: '',
      checkSubject: false,
      checkQuestion: false,
      main_students: [],
      stud_attendance: {},
      checkAttendance: false,
      attendances: [],
      att_date:'',
      subject_groups: [],
      fm: [],
      final_gpa:'',
      description: '',
      marktype:''
    };

   this.sendTelegram = this.sendTelegram.bind(this);
   this.handleChange = this.handleChange.bind(this);
   this.changeMarkType=this.changeMarkType.bind(this);
  }
sendTelegram(event){

  const description =this.state.description
  const marktype=this.state.marktype
  const parent_id=this.state.userId
  const formData=`marktype=${this.state.marktype}&description=${this.state.description}&parent_id=${parent_id}`
      axios.post('/api/parenttelegram',formData,  {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
      .then(res => {
          this.setState({
          message:res.data.message
          });
        })
}
  componentDidMount() {


        if(Auth.isUserAuthenticated()){
      var token = Auth.getToken();
      var decoded = jwtDecode(token);
      this.setState({
        userId: decoded.sub
      });
      //console.log(decoded.sub,'suuub')
      axios.get('/api/mychildfinalmarks?parent_id='+decoded.sub,  {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          this.setState({
            fm: res.data.fm,
           final_gpa: res.data.final_gpa
          });
        })


}

  }

 changeMarkType(event){
      this.setState({
      marktype:event.target.value
    })

  }
  handleChange(event){

      this.setState({
         description: event.target.value
      })
    }
 





  render() {
console.log(this.state.userId,'1111')
    return (

      <div className="container clearfix">
      <div className=" bg-title">
        <h4>Моя Итоговая Ведомость</h4>

      </div>
      <div className="my-content  ">

      <div className="table-responsive">
           <h5 style={{ color: 'green'}}>{this.state.message}</h5>
 
          <h5 style={{ fontSize: '14px', color: 'grey'}}>Вы можете узнать ответы на все интересующие вас вопросы, запросить справку, узнать телфоны всех сотрудников колледжа испльзуя телеграм бот @OneLifeKz_Bot.
          Необдохимо найти его и нажать /start</h5>
          <div className="form-group row">
              <div className="col-md-3"><input type="radio" name="marktype" value="Задать Вопрос" onChange={this.changeMarkType} />Задать Вопрос</div>
              <div className="col-md-3"><input type="radio" name="marktype" value="Узнать Контакты" onChange={this.changeMarkType}/>Узнать Контакты</div>
              <div className="col-md-3"><input type="radio" name="marktype" value="Жалоба" onChange={this.changeMarkType}/>Жалоба</div>
                <textarea maxLength="500" type="text" value={this.state.description} placeholder="Опишите задание" rows="6" className="homework-message" onChange={this.handleChange}></textarea>
          </div>
          <button className="btn pull-right btn-success" style={{paddingLeft: '1%', paddingRight: '1%'}} onClick={this.sendTelegram}>Оставить заявку</button>

      </div>

      </div>
      </div>);
  }
}

export default TeacherAddAttendance;
