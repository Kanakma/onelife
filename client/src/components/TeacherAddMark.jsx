import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';

class TeacherAddMark extends React.Component {

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
      att_date:'',
      chk:'',
      mark:'', 
      marks: [],
      student: [{}]

    };
  
    this.updateStudents = this.updateStudents.bind(this);
    
    this.changeAttendance = this.changeAttendance.bind(this);
    this.sendMark = this.sendMark.bind(this);
    this.changeDate=this.changeDate.bind(this);
    this.changeMark=this.changeMark.bind(this);
    this.changeComment=this.changeComment.bind(this);
  
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

  
  changeComment(event){



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
  
  

    const field = event.target.id;
    const student = this.state.student;
    student[field] = event.target.value;
    console.log(event.target.value,'value')
    console.log(event.target.id,'comments')
    var temp=this.state.marks;
    var old = IndInObjArr(temp,event.target.id, 'name');
      if(old.length > 0){
        temp[old[0]].stud_comment = event.target.value;
      } else {

         temp.push({
         name: event.target.id
    })
      }
       this.setState({
        comments: temp,
        checkAttendance: true
      })
   
   //console.log(temp,'temp')
    




  }
 


  changeMark(event) {

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
  
  

    const field = event.target.id;
    const student = this.state.student;
    student[field] = event.target.value;
   //console.log(event.target.value,'value')//mark
   // console.log(event.target.id,'stud_id')
    var temp=this.state.marks;
    var old = IndInObjArr(temp,event.target.id, 'name');
    if(event.target.value<100){
      
      if(old.length > 0){
        temp[old[0]].stud_mark = event.target.value;
      } else {

         temp.push({
         name: event.target.id
    })
      }
       this.setState({
        marks: temp,
        checkAttendance: true
      })

    } else {
      this.setState({
        message: 'Ваше значение должно быть меньше 100'
      })
    }


   
    console.log(temp,'temp111')
    



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
    //console.log(event.target.name,'oldddd')
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

  sendMark(event){
 
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
    const subject_id= this.state.subject_id;
    const att_date=this.state.att_date;
    console.log(subject_id,'subject_id')
    console.log(att_date,'att_')
    var dd= this.dateFormat1(att_date);
  
    if(today===dd){
          const formData = `data=${JSON.stringify(this.state.marks)}&subject_id=${subject_id}&att_date=${att_date}`;

   axios.post('/api/addmark', formData, {

    responseType: 'json',
    headers: {
          'Content-type': 'application/x-www-form-urlencoded'}
   })
    .then(res=>{
      this.setState({
        message: res.data.message
      })
   })
  } 
  if(today!=dd){
      this.setState({
        message: 'Вы можете выставлять посещаемость только на текущую дату'
      })
  }
  else{
    this.setState({
        message: 'Укажите пожалуйста дату'
      })
  }

  }

  //update students on rabotaet bez filtracii
  updateStudents(event){
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
    axios.get('/api/getsubjectsforstudents?subjectId='+event.target.value, {
            responseType: 'json',
            headers: {
              'Content-type': 'application/x-www-form-urlencoded'
            }
    })
      .then(res => {
        this.setState({
          students: res.data.students
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
                   
                      <th>Оценка</th>
                      <th>Комментарий</th>
                      
                  </tr>
              </thead>
                <tbody>
              {this.state.students.map((student, s) =>
                <tr key={s}>
                    <td>{s+1}</td>
                    <td>{student.user_id.username}</td>
                    <td >{student.user_id.name} {student.user_id.lastname}</td>
                    
                    <td  ><input type="number" className="form-control " id={student._id} value={student.mark} onChange={this.changeMark} placeholder="Выставите оценку" /></td>
                    <td  ><input type="text" className="form-control " id={student._id} value={student.comment} onChange={this.changeComment} placeholder="Оставьте комментарий" name="mark"/></td>
                    
                </tr>
              )}
              </tbody>
                       
          </table>
          <div className="row">

      {
              this.state.message==='Вы можете выставлять посещаемость только на текущую дату'||
              this.state.message==='Ваше значение должно быть меньше 100'

               ? (
                <h5 style={{ fontSize: '14px', color: 'red', textAlign: 'center' }}>{this.state.message}</h5>
              ) : (
                <h5 style={{ fontSize: '14px', color: 'green', textAlign: 'center' }}>{this.state.message}</h5>
              )
            }
          
           <button className="btn pull-right btn-success" style={{paddingLeft: '1%', paddingRight: '1%'}} onClick={this.sendMark}>Выставить посещаемость</button>
           </div>
      </div>

      </div>
      </div>);
  }
}

export default TeacherAddMark;
