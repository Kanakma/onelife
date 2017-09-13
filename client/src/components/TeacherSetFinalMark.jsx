import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';

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
  
class TeacherAddMark extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      groups: [],
      group_name:'',
      att_students: [
      ],
      subject_groups: [
      ],
      message: '',
      errors: {},
      subjects: [],
      subject: {},
      students: [],
      subject_id: '',
      main_students: [],
      stud_attendance: {},
      checkAttendance: false,
      attendances: [],
      att_date:'',
      chk:'',
      mark:'', 
      marks: [],
      student: [{}],
      marktype: ''

    };
  
    this.updateStudents = this.updateStudents.bind(this);
    
 
    this.updateGroups=this.updateGroups.bind(this);
    this.sendMark = this.sendMark.bind(this);
    this.changeMark=this.changeMark.bind(this);
    this.changeMarkType=this.changeMarkType.bind(this);
    this.changeDate=this.changeDate.bind(this);

  
  
  }
  componentDidMount() {
    
      axios.get('/api/getsubjectteacher', {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    }) .then(res => {
        this.setState({
          subjects: res.data.subjects
        });
      });

  }


  
 

  changeMark(event) {

    const field = event.target.id;
    const student = this.state.student;
    student[field] = event.target.value;
    var temp=this.state.marks;
    var old = IndInObjArr(temp,event.target.id, 'name');
    if(event.target.value<101){
      
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
  }

  sendMark(event){
 
    

    event.preventDefault();
    const subject_id= this.state.subject_id;
    const group_name=this.state.group_name;
    const att_date=this.state.att_date;
    const mark_type=this.state.marktype;



    const formData = `data=${JSON.stringify(this.state.marks)}&subject_id=${subject_id}&att_date=${att_date}&group_name=${group_name}&mark_type=${mark_type}`;

   axios.post('/api/addfinalmark', formData, {

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
        group_name: event.target.value,
        checkSubject: false,
        message: ''
      })
    }
    axios.get('/api/getstudentsgroupsforstudents?group_name='+event.target.value, {
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


 updateGroups(event){

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
    axios.get('/api/getgroupsforstudents?subject_id='+event.target.value, {
            responseType: 'json',
            headers: {
              'Content-type': 'application/x-www-form-urlencoded'
            }
    })
      .then(res => {
        this.setState({
          subject_groups: res.data.subject_groups.groups
        });
      });
}
 

 changeMarkType(event){
    this.setState({
      marktype:event.target.value
    })

  }

  changeDate(value){
     this.setState({
        att_date: value
      });
  }
  render() {


    return (
      <div className="container clearfix">
      <div className=" bg-title">
        <h4>Выставить Успеваемость</h4>

      </div>
      <div className="my-content  ">
      <div className="table-responsive hidden-mobile visible-max visible-ipad visible-middle">
      <div className="form-group col-md-6">
       <label>Выберите предмет</label>
          <select className="form-control " name="subject_id" value={this.state.subject_id} onChange={this.updateGroups}>
          <option value=''>предмет не выбран</option>
          {this.state.subjects.map((subject, s) =>
            <option key={s} value={subject._id}>{subject.subject_name}</option>
          )}
          </select>
     </div>
        <div className="form-group col-md-6">
        <label>Выберите группу</label>

           {
          this.state.subject_groups.length!=0 ?
          (     <select className="form-control " name="group_name" value={this.state.group_name} onChange={this.updateStudents}>
          <option value=''>Выберите группу</option>
          {this.state.subject_groups.map((group, s) =>
            <option key={s} value={group._id}>{group.group_name}</option>
          )}
          </select>) : 
          ( <select className="form-control " name="group_name" value={this.state.group_name} onChange={this.updateStudents}>
          <option value=''>Групп не найдено</option>
          </select>
          )
        }
        </div>


        <div className="form-group col-md-6 ">
        <label>Выберите рк</label>
          <select className="form-control " onChange={this.changeMarkType} >
           
          <option value=''>предмет не выбран</option>
          <option value="Рубежный Контроль1">РК1</option>
          <option value="Рубежный Контроль2">РК2</option>
          <option value="Сессия">Сессия</option>
          </select>
        </div>
         <div className="form-group col-md-6">
          
              <label>Дата проведения Пары</label>
              <DatePicker value={this.state.att_date} onChange={this.changeDate}   className="form-control mydatepicker"/>
            
        </div>

     

                <table id="myTable" className="table table-striped">
              <thead>
                  <tr>
                      <th>№</th>
                      <th>ID</th>
                      <th>ФИО</th>
                   
                      <th>Оценка</th>
            
                      
                  </tr>
              </thead>
              {
                this.state.att_students.length !=0 ?
                (    <tbody>
              {this.state.att_students.map((student, s) =>
                <tr key={s}>
                    <td>{s+1}</td>
                    <td>{student.user_id.username}</td>
                    <td >{student.user_id.name} {student.user_id.lastname}</td>
                    
                    <td  ><input type="number" className="form-control " id={student._id} value={student.mark} onChange={this.changeMark} min="0" placeholder="Выставите оценку" /></td>
                  
                    
                </tr>
              )}
              </tbody>) :
                (<tbody>
                  <tr>
                  <td>Ничего не найдено</td>
                  </tr>
                  </tbody>)
              }
            
                       
          </table>
          <div className="row">

      {
              this.state.message==='Вы можете выставлять успеваемость только на текущую дату'||
              this.state.message==='Ваше значение должно быть меньше 100'  
          
               ? (
                <h5 style={{ fontSize: '14px', color: 'red', textAlign: 'center' }}>{this.state.message}</h5>
              ) : (
                <h5 style={{ fontSize: '14px', color: 'green', textAlign: 'center' }}>{this.state.message}</h5>
              )
            }
          
           <button className="btn pull-right btn-success" style={{paddingLeft: '1%', paddingRight: '1%'}} onClick={this.sendMark}>Выставить Рубежный Контроль</button>
           </div>
      </div>



      <div className="table-responsive visible-mobile hidden-max-media hidden-ipad hidden-middle">
      <div className="form-group col-md-6">
       <label>Выберите предмет</label>
          <select className="form-control " name="subject_id" value={this.state.subject_id} onChange={this.updateGroups}>
          <option value=''>предмет не выбран</option>
          {this.state.subjects.map((subject, s) =>
            <option key={s} value={subject._id}>{subject.subject_name}</option>
          )}
          </select>
     </div>
        <div className="form-group col-md-6">
        <label>Выберите группу</label>

           {
          this.state.subject_groups.length!=0 ?
          (     <select className="form-control " name="group_name" value={this.state.group_name} onChange={this.updateStudents}>
          <option value=''>Выберите группу</option>
          {this.state.subject_groups.map((group, s) =>
            <option key={s} value={group._id}>{group.group_name}</option>
          )}
          </select>) : 
          ( <select className="form-control " name="group_name" value={this.state.group_name} onChange={this.updateStudents}>
          <option value=''>Групп не найдено</option>
          </select>
          )
        }
        </div>


        <div className="form-group col-md-6 ">
        <label>Выберите рк</label>
          <select className="form-control " onChange={this.changeMarkType} >
           
          <option value=''>предмет не выбран</option>
          <option value="Рубежный Контроль1">РК1</option>
          <option value="Рубежный Контроль2">РК2</option>
          <option value="Сессия">Сессия</option>
          </select>
        </div>
         <div className="form-group col-md-6">
          
              <label>Дата проведения Пары</label>
              <DatePicker value={this.state.att_date} onChange={this.changeDate}   className="form-control mydatepicker"/>
            
        </div>

     

                <table id="myTable" className="table table-striped">
          
              {
                this.state.att_students.length !=0 ?
                (    <tbody>
              {this.state.att_students.map((student, s) =>
            <div>
                  <tr key={s}>
                    <td>{s+1}</td></tr>
                    <tr>
                     <td className="mobile-table">ID</td><td>{student.user_id.username}</td></tr>
                    <tr>
                     <td className="mobile-table">ФИО</td><td >{student.user_id.name} {student.user_id.lastname}</td></tr>
                    <tr>
                    
                     <td className="mobile-table">Оценка</td><td  ><input type="number" className="form-control " id={student._id} value={student.mark} onChange={this.changeMark} min="0" placeholder="Выставите оценку" /></td>
                  
                    
                </tr>
                </div>
              )}
              </tbody>) :
                (<tbody>
                  <tr>
                  <td>Ничего не найдено</td>
                  </tr>
                  </tbody>)
              }
            
                       
          </table>
          <div className="row">

      {
              this.state.message==='Вы можете выставлять успеваемость только на текущую дату'||
              this.state.message==='Ваше значение должно быть меньше 100'  
          
               ? (
                <h5 style={{ fontSize: '14px', color: 'red', textAlign: 'center' }}>{this.state.message}</h5>
              ) : (
                <h5 style={{ fontSize: '14px', color: 'green', textAlign: 'center' }}>{this.state.message}</h5>
              )
            }
          
           <button className="btn pull-right btn-success" style={{paddingLeft: '1%', paddingRight: '1%'}} onClick={this.sendMark}>Выставить Рубежный Контроль</button>
           </div>
      </div>

      </div>
      </div>);
  }
}

export default TeacherAddMark;
