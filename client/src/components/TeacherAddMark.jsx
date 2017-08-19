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
      student: [{}],
      comment: [{}],
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
       mark: '',
      // marks:[]
      marks: [{ mark: '' }],

    };
  
    this.updateStudents = this.updateStudents.bind(this);
    this.changeAttendance = this.changeAttendance.bind(this);
    this.sendMArk = this.sendMark.bind(this);
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
  changeDate(value){
    console.log(value,'<---')
     this.setState({
        att_date: value
      });

  }


  changeMark(event) {
    const field = event.target.id;
    const student = this.state.student;
    student[field] = event.target.value;
    console.log(student)
   // const newMarks=this.state.marks.map((mark, ss) =>{
   //  if(s!=ss) return mark;
   //  return {mark, mark:event.target.value}
   // })
   // this.setState({ marks: newMarks });
  //     console.log('vizval!')
 
  //  const grade=event.target.value;
  //  const mark = this.state.mark;
  //  var temp=this.state.marks;
  //  this.setState({
  //     mark:event.target.value
  // })
  //  console.log(mark)
  //    temp.push({

  //            mark:event.target.value
  //           // comment: event.target.value
  //       })


  }
  changeComment(event){

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

  sendMark(event){
    event.preventDefault();
    const subject_id= this.state.subject_id;
    const att_date=this.state.att_date;
    //console.log(att_date);
    const formData = `data=${JSON.stringify(this.state.attendances)}&subject_id=${subject_id}&att_date=${att_date}`;

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
  }
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


    // console.log(this.state.students)
   // console.log(this.state.att_date)
    return (
      <div className="container clearfix">
      <div className=" bg-title">
        <h4>Выставить оценки</h4>

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
                   
                      <th>Балл</th>
                      <th>Комментарий</th>
                      
                  </tr>
              </thead>
                <tbody>
              {this.state.students.map((student, s) =>
                <tr key={s}>
                    <td>{s+1}</td>
                    <td>{student.user_id.username}</td>
                    <td >{student.user_id.name} {student.user_id.lastname}</td>
                    
                    <td  ><input type="text" className="form-control " id={student._id} value={student.mark} onChange={this.changeMark} placeholder="Выставите оценку" /></td>
                    <td  ><input type="text" className="form-control " id={student._id} onChange={this.changeComment} placeholder="Оставьте комментарий" name="mark"/></td>

                    
                </tr>
              )}
              </tbody>
                       
          </table>
          <div className="row">
           {this.state.message && <h5 style={{ fontSize: '14px', color: 'green', textAlign: 'center' }}>{this.state.message}</h5>}
           <button className="btn pull-right btn-success" style={{paddingLeft: '1%', paddingRight: '1%'}} onClick={this.sendMark}>Выставить</button>
           </div>
      </div>

      </div>
      </div>);
  }
}

export default TeacherAddMark;
