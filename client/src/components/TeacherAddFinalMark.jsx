import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth';
import AdminEditFacultyModal from './AdminEditFacultyModal.jsx';
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

class TeacherAddFinalMark extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        groups: [],
      group_name:'',
      message: '',
      marks: [],
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
      subject_groups: [],
      mark_count:[{}],
      markvalues:[],
      marktype:[{}]

    };

    this.updateStudents = this.updateStudents.bind(this);
    this.updateGroups = this.updateGroups.bind(this);
    this.changeDate=this.changeDate.bind(this);
    this.dateFormat=this.dateFormat.bind(this);
    this.changeMarkValue=this.changeMarkValue.bind(this);
    this.calculateSemesterMark=this.calculateSemesterMark.bind(this);

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
    const  subject_id =this.state.subject_id;

    const val= value;

    const formData = `subject_id=${subject_id}&att_date=${val}`;
   axios.post('/api/updatestudentsformark', formData, {

    responseType: 'json',
    headers: {
          'Content-type': 'application/x-www-form-urlencoded'}
   })
       .then(res=>{
      this.setState({
        attendances: res.data.attendances,
        message: res.data.message

      })

   })


  }
 updateStudents(event){
     // console.log(event.target.value)
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

    const  subject_id =this.state.subject_id;
    const group_name=event.target.value;
    const formData = `subject_id=${subject_id}&group_name=${group_name}`;
   axios.post('/api/updatestudentsallmarks', formData, {

    responseType: 'json',
    headers: {
          'Content-type': 'application/x-www-form-urlencoded'}
   })
       .then(res=>{
      this.setState({
        mark_count: res.data.mark_count,
        message: res.data.message

      })

   })



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


  changeMarkValue(event){
    const field = event.target.id;
    var marktype=this.state.marktype;
    marktype[field] =event.target.value;
    var temp =this.state.markvalues;


    var old = IndInObjArr(temp,event.target.id, 'name');

       if(old.length > 0){
        temp[old[0]].stud_mark = event.target.value;
      } else {

         temp.push({
         name: event.target.id
    })
      }
       this.setState({
        markvalues: temp,
        checkAttendance: true
      })

   // console.log(this.state.markvalues, 'asda')

  }
  calculateSemesterMark(event){
    const group_name=this.state.group_name;
    const subject_id=this.state.subject_id;
       const formData = `data=${JSON.stringify(this.state.markvalues)}&group_name=${group_name}&subject_id=${subject_id}`;
        axios.post('/api/calculateSemesterMark', formData, {
           responseType: 'json',
           headers: {
          'Content-type': 'application/x-www-form-urlencoded'}
        }) .then(res=>{
      this.setState({
       // message: res.data.message
      })
   })
  }

  render() {

    return (
      <div className="container clearfix">
      <div className=" bg-title">
        <h4>Вся Успеваемость</h4>

      </div>
      <div className="my-content  ">

      <div className="table-responsive hidden-mobile visible-max visible-ipad visible-middle">
            <div className="form-group col-md-6">


           <label className="teacher-choosed">Предмет</label>
              <select className="form-control " name="subject_id" value={this.state.subject_id} onChange={this.updateGroups}>
              <option value=''>предмет не выбран</option>
              {this.state.subjects.map((subject, s) =>
                <option key={s} value={subject._id}>{subject.subject_name}</option>
              )}
              </select>
         </div>
        <div className="form-group col-md-6">
        <label className="teacher-choosed">Группа</label>
               {
          this.state.subject_groups.length!=0 ?
          (     <select className="form-control " name="group_name" value={this.state.group_name} onChange={this.updateStudents}>
          <option value=''>Выберите группу</option>
          {this.state.subject_groups.map((group, s) =>
            <option key={s} value={group._id}>{group.group_name}</option>
          )}
          </select>) :
          ( <select className="form-control " name="group_name" value={this.state.group_name} onChange={this.updateStudents}>
          <option value=''>групп не найдено</option>
          </select>
          )
        }        </div>

          <h5 style={{ fontSize: '14px', color: 'grey'}}>{this.state.message}</h5>
                <table id="myTable" className="table table-striped">
              <thead>
                  <tr>
                      <th>№</th>
                      <th>Тип Задания</th>
                      <th>Его количество за семестр</th>
                      <th>Максимальная оценка за это задание</th>
                  </tr>
              </thead>
                <tbody>
            { this.state.mark_count.map((marktype,s)=>
              <tr key={s}>
                    <td>{s+1}</td>
                    <td>{marktype._id}</td>
                    <td>{marktype.count}</td>
                    <td> <input type="number" className="form-control "  id={marktype._id} value={marktype.mark} onChange={this.changeMarkValue} min="0" placeholder="Выставите оценку" /></td>

</tr>
                    )}
              </tbody>
          </table>

                 <button className="btn pull-right btn-success" style={{paddingLeft: '1%', paddingRight: '1%'}} onClick={this.calculateSemesterMark}>Посмтреть предворительные оценки</button>

      </div>

      <div className="table-responsive visible-mobile hidden-max-media hidden-ipad hidden-middle">
            <div className="form-group col-md-6">


           <label  className="teacher-choosed">Выберите предмет</label>
              <select className="form-control " name="subject_id" value={this.state.subject_id} onChange={this.updateGroups}>
              <option value=''>предмет не выбран</option>
              {this.state.subjects.map((subject, s) =>
                <option key={s} value={subject._id}>{subject.subject_name}</option>
              )}
              </select>
         </div>
        <div className="form-group col-md-6">
        <label className="teacher-choosed">Выберите Группу</label>
               {
          this.state.subject_groups.length!=0 ?
          (     <select className="form-control " name="group_name" value={this.state.group_name} onChange={this.updateStudents}>
          <option value=''>Выберите группу</option>
          {this.state.subject_groups.map((group, s) =>
            <option key={s} value={group._id}>{group.group_name}</option>
          )}
          </select>) :
          ( <select className="form-control " name="group_name" value={this.state.group_name} onChange={this.updateStudents}>
          <option value=''>групп не найдено</option>
          </select>
          )
        }        </div>

          <h5 style={{ fontSize: '14px', color: 'grey'}}>{this.state.message}</h5>
                <table id="myTable" className="table table-striped">

                <tbody>
            { this.state.mark_count.map((marktype,s)=>
              <div>
              <tr key={s}>
                    <td>{s+1}</td></tr>
                    <tr>
                    <td>{marktype._id}</td></tr>
                    <tr>
                    <td>{marktype.count}</td></tr>
                    <tr>
                    <td> <input type="number" className="form-control "  id={marktype._id} value={marktype.mark} onChange={this.changeMarkValue} min="0" placeholder="Выставите оценку" /></td>

</tr>
</div>
                    )}
              </tbody>
          </table>

                 <button className="btn pull-right btn-success" style={{paddingLeft: '1%', paddingRight: '1%'}} onClick={this.calculateSemesterMark}>Посмтреть предворительные оценки</button>

      </div>

      </div>


      </div>);
  }
}

export default TeacherAddFinalMark;
