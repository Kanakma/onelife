import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';

class TeacherAddAttendance extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      message: '',
      errors: {},
      subjects: [], //delete potom
      groups: [],
      subject: {},
      groups: [],
      att_students: [
      ],
      subject_id: '',//kogdra zarabotaet udali
      group_name:'',
      checkSubject: false,
      checkQuestion: false,
      main_students: [],
      stud_attendance: {},
      checkAttendance: false,
      attendances: [],
      att_date:'',
      chk:''

    };
  
    this.updateStudents = this.updateStudents.bind(this);
    this.changeAttendance = this.changeAttendance.bind(this);
    this.sendAttendance = this.sendAttendance.bind(this);
    this.changeDate=this.changeDate.bind(this);
  
  }

  componentDidMount() {

       axios.get('/api/getgroupteacher',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        this.setState({
          groups: res.data.groups
        });
      });
  }


  dateFormat(date){
    var fDate = new Date(date);
    var m = ((fDate.getMonth() * 1 + 1) < 10) ? ("0" + (fDate.getMonth() * 1 + 1)) : (fDate.getMonth() * 1 + 1);
    var d = ((fDate.getDate() * 1) < 10) ? ("0" + (fDate.getDate() * 1)) : (fDate.getDate() * 1);
    return m + "/" + d + "/" + fDate.getFullYear()
  }

  dateFormat1(dd){
    var fDate = new Date(dd);
    var m = ((fDate.getMonth() * 1 + 1) < 10) ? ("0" + (fDate.getMonth() * 1 + 1)) : (fDate.getMonth() * 1 + 1);
    var d = ((fDate.getDate() * 1) < 10) ? ("0" + (fDate.getDate() * 1)) : (fDate.getDate() * 1);
    return m + "/" + d + "/" + fDate.getFullYear()
  }
  changeDate(value){
     this.setState({
        att_date: value
      });
  }
  changeAttendance(event){
    function IndInObjArr(objArray, subj, inkey, sensetive) {
      var sens = ((typeof inkey) === "boolean") ? inkey : false;
      var found = false;
      var result = [];
      if (objArray.length > 0) {
        objArray.forEach(function(obj, ind) {
          if (!sens && inkey) {
            var sub1 = sensetive ? obj[inkey] : obj[inkey].toString().toLowerCase();
            var sub2 = sensetive ? subj : subj.toString().toLowerCase();
            if (sub1 == sub2) {
              found = true;
              result.push(ind);
            }
          } else {
            for (var key in obj) {
              if (obj.hasOwnProperty(key)) {
                var sub1 = sens ? obj[key] : obj[key].toString().toLowerCase();
                var sub2 = sens ? subj : subj.toString().toLowerCase();
                if (sub1 == sub2) {
                  found = true;
                  result.push(ind);
                }
              }
            }
          }
        })
      }
      if (found) {
        return result;
      } else {
        return false;
      }
    }
    var temp = this.state.attendances;
      var old = IndInObjArr(temp,event.target.name, 'name');
      if(old.length > 0){
        temp[old[0]].att_status = (event.target.value!='')?event.target.value:'был';
      } else {
       temp.push({
         name:event.target.name,
         att_status: (event.target.value!='')?event.target.value:'был'
        })
      }
      this.setState({
        attendances: temp,
        checkAttendance: true
      })
  }

  sendAttendance(event){
 
    var dd= new Date();

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
      dd='0'+dd;
    } 
    if(mm<10){
      mm='0'+mm;
    } 

    var today = mm+'/'+dd+'/'+yyyy;

    event.preventDefault();
    const group_name= this.state.group_name;
    const att_date=this.state.att_date;
    var dd= this.dateFormat1(att_date);
  
    // if(today===dd){
          const formData = `data=${JSON.stringify(this.state.attendances)}&group_name=${group_name}&att_date=${att_date}`;

   axios.post('/api/addattendance', formData, {

    responseType: 'json',
    headers: {
          'Content-type': 'application/x-www-form-urlencoded'}
   })
    .then(res=>{
      this.setState({
        message: res.data.message
      })
   })
//  } 
  // if(today!=dd){
//       this.setState({
//         message: 'Вы можете выставлять посещаемость только на текущую дату'
//       })
// // }
  // else{
  //   this.setState({
  //       message: 'Укажите пожалуйста дату'
  //     })
  // }

  }

  //update students on rabotaet bez filtracii
  updateStudents(event){
    if(event.target.value.length > 0){

      this.setState({
        group_name: event.target.value,
        checkSubject: true,
        message: '',
        students: this.state.main_students.filter(function(student) {
                                  return student.lastname.indexOf(event.target.value) > -1;
                              })
      })
    } else {
      this.setState({
        subject_id: event.target.value,
        checkSubject: false,
        message: ''
      })
    }
    axios.get('/api/getgroupsforstudents?group_name='+event.target.value, {
            responseType: 'json',
            headers: {
              'Content-type': 'application/x-www-form-urlencoded'
            }
    })
      .then(res => {
        this.setState({
          att_students: res.data.att_students.students
        });
      });


  }

 


  render() {
    return (
      <div className="container clearfix">
      <div className=" bg-title">
        <h4>Выставить посещаемость</h4>
      </div>
      <div className="my-content  ">
      <div className="table-responsive">
        <div className="form-group col-md-6">
        <label>Выберите группу</label>
          <select className="form-control " name="group_name" value={this.state.group_name} onChange={this.updateStudents}>
          <option value=''>Выберите предмет</option>
          {this.state.groups.map((group, s) =>
            <option key={s} value={group._id}>{group.group_name}</option>
          )}
          </select>
        </div>
          <div className="form-group row">
            <div className="col-md-6">
              <label>Дата проведения Пары</label>
              <DatePicker  language="ru-ru" locale="ru-ru" onChange={this.changeDate}  value={this.state.att_date} className="form-control mydatepicker"/>
            </div>
         
          </div>
                <table id="myTable" className="table table-striped">
              <thead>
                  <tr>
                      <th>№</th>
                      <th>ID</th>
                      <th>ФИО</th>
                   
                      <th>Был</th>
                      <th>Не Был</th>
                      
                  </tr>
              </thead>
                <tbody>
              {this.state.att_students.map((student, s) =>
                <tr key={s}>
                    <td>{s+1}</td>
                    <td>{student.user_id.username}</td>
                    <td>{student.user_id.name}  {student.user_id.lastname}</td>
                    <td><input type="radio" value="был" name={student._id} onClick={this.changeAttendance} /></td>
                    <td><input type="radio" value="был" name={student._id} onClick={this.changeAttendance} /></td>
                     
              
                </tr>
              )}
              </tbody>
                       
          </table>
          <div className="row">

            {
              this.state.message==='Вы можете выставлять посещаемость только на текущую дату' ? (
                <h5 style={{ fontSize: '14px', color: 'red', textAlign: 'center' }}>{this.state.message}</h5>
              ) : (
                <h5 style={{ fontSize: '14px', color: 'green', textAlign: 'center' }}>{this.state.message}</h5>
              )
            }
          
           <button className="btn pull-right btn-success" style={{paddingLeft: '1%', paddingRight: '1%'}} onClick={this.sendAttendance}>Выставить посещаемость</button>
           </div>
      </div>

      </div>
      </div>);
  }
}

export default TeacherAddAttendance;
