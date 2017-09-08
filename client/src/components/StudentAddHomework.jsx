import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import DatePicker from 'react-bootstrap-date-picker';
import StudentAddHomeworkModal from './StudentAddHomeworkModal.jsx';

class StudentAddHomework extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homeworks: [],
      subjects: [],
      user_id: '',
      filename: '',
      homework_id: '',
      studenthomeworks: [],
      homework: []
    };
    this.getStatus = this.getStatus.bind(this);
    this.getHomeworks = this.getHomeworks.bind(this);
    this.chooseSubject = this.chooseSubject.bind(this);
    this.dateFormat = this.dateFormat.bind(this);
    this.changeHW = this.changeHW.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
  }
  componentDidMount() {
    this.getStatus();
  }
  componentWillMount() {
  }
  toggleModal(homework) {
    this.setState({
      isOpen: !this.state.isOpen,
      homework:homework
    });
  }
  toggleModalClose() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  changeHW(homework){
    this.setState({
      filename: homework.file,
      homework_id: homework._id
    })
  }
  dateFormat(date){
    var fDate = new Date(date);
    var m = ((fDate.getMonth() * 1 + 1) < 10) ? ("0" + (fDate.getMonth() * 1 + 1)) : (fDate.getMonth() * 1 + 1);
    var d = ((fDate.getDate() * 1) < 10) ? ("0" + (fDate.getDate() * 1)) : (fDate.getDate() * 1);
    return m + "/" + d + "/" + fDate.getFullYear()
  }
  getHomeworks(){
    axios.get('/api/gethomeworks',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        this.setState({
          homeworks: res.data.homeworks
        });
      });
  }
  getStatus(){
    if(Auth.isUserAuthenticated()){
      var token = Auth.getToken();
      var decoded = jwtDecode(token);
      this.setState({
        status: decoded.userstatus,
        user_id: decoded.sub
      });
      axios.get('/api/getsubjectswithhw?user_id='+decoded.sub,  {
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
  }
  chooseSubject(event){
    const formData = `user_id=${this.state.user_id}&subject_id=${event.target.value}`;
      axios.post('/api/gethomeworksofsubjectwithstatus', formData, {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          this.setState({
            homeworks: res.data.homeworks,
            student_id: res.data.student_id

          })
        })
  }
 clearContent(){
   this.setState({
   })
 }

  render() {
    return (
      <div className="container clearfix">
        <div className="bg-title">
          <h4>Все домашние задания</h4>
        </div>
        <div className="my-content">
          <div className="table-responsive" style={{minHeight: '400px'}}>
          <div className="form-group">
            <label>Выберите предмет</label>
            <select className="form-control"  onChange={this.chooseSubject} >
              <option >Выберите предмет</option>
                {this.state.subjects.map((subject, s) =>
                  <option key={s} value={subject._id} name={subject.subject_name}>{subject.subject_name}</option>
                )}
            </select>
          </div>
          {
            this.state.homeworks.length !=0 ?
          (
          <table id="myTable" className="table table-striped">
            <thead>
                <tr>
                    <th>№</th>
                    <th>Начало</th>
                    <th>Дедлайн</th>
                    <th>Статус</th>
                    <th>Выполнить</th>
                </tr>
            </thead>
            <tbody>
              {this.state.homeworks.map((homework, h) =>
                <tr key={h}>
                    <td>{h+1}</td>
                    <td>{this.dateFormat(homework.lessonDate)}</td>
                    <td>{this.dateFormat(homework.deadline)}</td>
                    <td>{homework.answer.map((ans, a)=>{
                      if(ans.student_id.indexOf(this.state.student_id)!=-1){
                        if(ans.status==false)
                        return (<p key={a} style={{color: 'red'}}>Не выполнено</p>)
                        else{
                          return (<p key={a}>Выполнено</p>)
                        }
                      }
                      else{
                        return (<div></div>)
                      }
                    })
                    }
                    </td>
                    <td><div className="row" style={{textAlign: 'center', marginTop: '20px'}}>
                      <button type="submit" onClick={this.toggleModal.bind(this, homework)} className="btn btn-success" style={{paddingLeft: '1%', paddingRight: '1%'}}  >Добавить ответ</button>
                    </div></td>
                </tr>

              )}
            </tbody>
          </table>) :(
          <table id="myTable" className="table table-striped">
            <thead>
                <tr>
                  <th>№</th>
                  <th>Начало</th>
                  <th>Дедлайн</th>
                  <th>Статус</th>
                  <th>Выполнить</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>Ничего не найдено</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>
            </tbody>
          </table>
            )
          }
          </div>
        </div>
        <StudentAddHomeworkModal
          show={this.state.isOpen}
          onClose={this.toggleModalClose}
          homework={this.state.homework}
          student_id={this.state.student_id}
        />
      </div>);
  }
}
export default StudentAddHomework;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import Auth from '../modules/Auth'
// import axios from 'axios';
// import jwtDecode from 'jwt-decode';
// import PropTypes from 'prop-types';
// function IndInObjArr(objArray, subj, inkey, sensetive) {
//       var sens = ((typeof inkey) === "boolean") ? inkey : false;
//       var found = false;
//       var result = [];
//       if (objArray.length > 0) {
//         objArray.forEach(function(obj, ind) {
//           if (!sens && inkey) {
//             var sub1 = sensetive ? obj[inkey] : obj[inkey].toString().toLowerCase();
//             var sub2 = sensetive ? subj : subj.toString().toLowerCase();
//             if (sub1 == sub2) {
//               found = true;
//               result.push(ind);
//             }
//           } else {
//             for (var key in obj) {
//               if (obj.hasOwnProperty(key)) {
//                 var sub1 = sens ? obj[key] : obj[key].toString().toLowerCase();
//                 var sub2 = sens ? subj : subj.toString().toLowerCase();
//                 if (sub1 == sub2) {
//                   found = true;
//                   result.push(ind);
//                 }
//               }
//             }
//           }
//         })
//       }
//       if (found) {
//         return result;
//       } else {
//         return false;
//       }
//     }
// class StudentAddHomework extends React.Component {
//   constructor(props, context) {
//     super(props, context);
//     this.state = {
//       subjects: [],
//       status: '',
//       checkFilter: false,
//       isOpen:false,
//       subject:{}
//     };
//     this.openSubject = this.openSubject.bind(this);
//     this.getStatus = this.getStatus.bind(this);
//     this.changeFilter = this.changeFilter.bind(this);
//     this.toggleModal = this.toggleModal.bind(this);
//     this.toggleModalClose = this.toggleModalClose.bind(this);
//   }
//   componentDidMount() {
//     this.getStatus();
//   }
//   getStatus(){
//     if(Auth.isUserAuthenticated()){
//       var token = Auth.getToken();
//       var decoded = jwtDecode(token);
//       this.setState({
//         status: decoded.userstatus
//       });
//       axios.get('/api/getsubjectsofstudent?user_id='+decoded.sub,  {
//         responseType: 'json',
//         headers: {
//           'Content-type': 'application/x-www-form-urlencoded'
//         }
//       })
//         .then(res => {
//           this.setState({
//             subjects: res.data.subjects
//           });
//         });
//     }
//   }
//   openSubject(event){
//     this.context.router.history.push('/choosesubjects', {subject: event.target.id})
//   }
//   changeFilter(event){
//     if(event.target.id == 'list'){
//       this.setState({
//         checkFilter: true
//       })
//     } else {
//       this.setState({
//         checkFilter: false
//       })
//     }
//   }
//     toggleModal(subject) {
//         this.setState({
//           isOpen: !this.state.isOpen,
//           subject:subject
//       });
//     }
//     toggleModalClose() {
//         this.setState({
//           isOpen: !this.state.isOpen
//         });
//     }
//   render() {
//     return (
//       <div className="container clearfix">
//       <div className="bg-title" style={{paddingRight: '3%'}}>
//
//         <div className="row">
//           <div className="col-md-9">
//             <h4>Все предметы</h4>
//           </div>
//           <div className="col-md-3 text-right" style={{marginTop: '1%'}}>
//             <i className="fa fa-list-ul fa-lg" aria-hidden="true" id="list" onClick={this.changeFilter} style={{marginRight: '15%'}}></i>
//             <i className="fa fa-th-large fa-lg" aria-hidden="true" id="block" onClick={this.changeFilter} style={{marginRight: '15%'}}></i>
//             <i className="fa fa-filter fa-lg" aria-hidden="true" style={{color: '#00c292'}}></i>
//           </div>
//         </div>
//       </div>
//       <div className=" my-content" hidden={this.state.checkFilter}>
//         <div className="row"  >
//         { this.state.subjects ? (
//             this.state.subjects.map((subject, s) =>
//               <div key={s} className="col-md-4 col-xs-12 col-sm-6" style={{padding: '0px 7.5px'}}>
//                   <img className="img-responsive subject-img" alt="user" src={require("../../../public/subject-img/"+subject.img)} />
//                   <div className="white-box">
//                       <h4>{subject.subject_name}</h4>
//                       <div className="text-muted m-b-20"><span className="m-r-10"><i className="fa fa-clock-o"></i> {subject.course_number} курс</span>
//                           <span className="m-l-10"><i className="fa fa-usd"></i> {subject.credit_number} кредита</span>
//                       </div>
//                       <p><span><i className="fa fa-clock-o"></i> Период: {subject.period} месяцев</span></p>
//                       <p><span><i className="fa fa-user-o"></i> Преподаватель: {subject.teacher_id.user_id.name} {subject.teacher_id.user_id.lastname}</span></p>
//                         <button id={subject._id} onClick={this.openSubject} className="btn btn-success btn-rounded waves-effect waves-light " style={{color: 'white'}}>Подробнее</button>
//                   </div>
//               </div>
//             )
//           ):(
//               <div key={s} className="col-md-4 col-xs-12 col-sm-6" style={{padding: '0px 7.5px'}}>
//                 Нет предметов Добавьте предметы.
//               </div>
//           )
//         }
//         </div>
//       </div>
//       <div className="my-content"  hidden={!this.state.checkFilter}>
//       <div className="table-responsive">
//           <table id="myTable" className="table table-striped">
//               <thead>
//                   <tr>
//                       <th>№</th>
//                       <th>Название</th>
//                       <th>Преподаватель</th>
//                       <th>Курс</th>
//                       <th>Информация</th>
//                   </tr>
//               </thead>
//               <tbody>
//               {
//                 this.state.subjects ?(
//                   this.state.subjects.map((subject, s) =>
//                     <tr key={s}>
//                         <td>{s+1}</td>
//                         <td>{subject.subject_name}</td>
//                         <td>{subject.major_name}</td>
//                         <td>{subject.teacher_name}</td>
//                         <td><center>{subject.course_number}</center></td>
//                         <td><center>{subject.remained}</center></td>
//                         <td>
//
//                           <button id={subject._id} onClick={this.openSubject} className="btn btn-success btn-rounded waves-effect waves-light" style={{color: 'white'}}>Подробнее</button>
//
//
//                         </td>
//                     </tr>
//                   )
//                 ):(
//                   <tr>
//                     <td>---</td>
//                     <td>---</td>
//                     <td>---</td>
//                     <td>---</td>
//                     <td><center>---</center></td>
//                     <td>---</td>
//                   </tr>
//                 )
//               }
//               </tbody>
//           </table>
//         </div>
//         </div>
//       </div>);
//   }
// }
// StudentAddHomework.contextTypes = {
//   router: PropTypes.object.isRequired
// };
// export default StudentAddHomework;
