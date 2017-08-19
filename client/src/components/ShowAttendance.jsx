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
      att_date:''
    };
  
    this.updateStudents = this.updateStudents.bind(this);
    this.changeAttendance = this.changeAttendance.bind(this);
    this.changeDate=this.changeDate.bind(this);
    this.dateFormat=this.dateFormat.bind(this);
  }

  componentDidMount() {
    axios.get('/api/getsubjectteacher',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        this.setState({
          subjects: res.data.subjects
        });
      });
  }

  dateFormat(date){
    var fDate = new Date(date);
    var m = ((fDate.getMonth() * 1 + 1) < 10) ? ("0" + (fDate.getMonth() * 1 + 1)) : (fDate.getMonth() * 1 + 1);
    var d = ((fDate.getDate() * 1) < 10) ? ("0" + (fDate.getDate() * 1)) : (fDate.getDate() * 1);
    return m + "/" + d + "/" + fDate.getFullYear()
  }

  changeDate(value){
    var date = this.dateFormat(value)
     this.setState({
        att_date: value
      });
  }

  changeAttendance(event){
   // console.log('vizval!')
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
    const field = event.target.name; // id student
    const attendance = this.state.attendance;
    var temp = this.state.attendances;
    var temp1 =this.state.attendance;

      console.log(temp,'old temp')
      var old = IndInObjArr(temp,event.target.name, 'name');
      if(old.length > 0){
        console.log(old, 'Found')
        temp[old[0]].att_status = event.target.value;
      } else {
       temp.push({
             name:event.target.name,
             att_status: event.target.value
        })
      }

      console.log(temp,'new temp')


      this.setState({

        attendances: temp,  
        attendance :{
             name:event.target.name,
             att_status: event.target.value
        },

      checkAttendance: true ,

      })
        

  }




  updateStudents(event){
    //console.log(event.target.value,'tARGET VALUE')
    if(event.target.value.length > 0){

      this.setState({
        subject_id: event.target.value,
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
    axios.get('/api/getattendanceforall?subjectId='+event.target.value, {
            responseType: 'json',
            headers: {
              'Content-type': 'application/x-www-form-urlencoded'
            }
    })
      .then(res => {
      
        this.setState({
          attendances: res.data.attendances
        });
      });


  }

  render() {
      // function thisDate(value) {
      //   if(this.state.att_date!='' && this.state.att_date == value.date){
      //     return value;
      //   } else{
      //     console.log('+++++++++++++')
      //   }
      // }
      // var attendances=this.state.attendances.filter(thisDate);


      // console.log(attendances)
      //console.log(attendance).
    //console.log(res.data.students)
    // console.log(this.state.att_date)
    return (

      <div className="container clearfix">
      <div className=" bg-title">
        <h4>Вся посещаемость</h4>

      </div>
      <div className="my-content  ">
      <div className="table-responsive">
     
        <div className="form-group col-md-6">
        <label>Выберите предмет</label>
          <select className="form-control " name="subject_id" value={this.state.subject_id} onChange={this.updateStudents}>
          <option value=''>Выберите предмет</option>
          {this.state.subjects.map((subject, s) =>
            <option key={s} value={subject._id}>{subject.subject_name}</option>
          )}
          </select>
        </div>
          <div className="form-group row">
            <div className="col-md-6">
              <label>Дата проведения Пары</label>
              <DatePicker  onChange={this.changeDate}  value={this.state.att_date} className="form-control mydatepicker"/>
            </div>
         
          </div>
                <table id="myTable" className="table table-striped">
              <thead>
                  <tr>
                      <th>№</th>
                      <th>ID</th>
                      <th>ФИО</th>
                   
                      <th>Cтатус</th>
                      <th>Дата</th>
                      
                  </tr>
              </thead>
                <tbody>
              {this.state.attendances.map((student, s) =>
                <tr key={s}>
                    <td>{s+1}</td>
                    <td>{student.student.user_id.username}</td>
                    <td >{student.student.user_id.name} {student.student.user_id.lastname}</td>
                    <td>{student.stud_attendance}</td>
                    <td>{student.date}</td>
                   
             
                    
                </tr>
              )}
              </tbody>
                       
          </table>
        
      </div>

      </div>
      </div>);
  }
}

export default TeacherAddAttendance;
