import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import { ComposedChart, Area, PieChart, Pie, Sector, Cell,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadialBarChart, RadialBar} from 'recharts';
import { Line, Circle } from 'rc-progress';
import DatePicker from 'react-bootstrap-date-picker';
import InputElement from 'react-input-mask';


class StudentEditProfile extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userId:  this.props.location.state.userId,
      student: {
        user_id: {}
      },
      img: '',
      editedStudent: {
        name: '',
        lastname: '',
        major_id: '',
        group_id: '',
        passport_id: '',
        admission_year: '',
        graduation_year: '',
        password:'',
        checkpassword:''
      },
      majors: [],
      groups: [],
      birthday:'',
      file: '',
      filename: '',
      checkPass: false

    },
    this.editStudentFunc = this.editStudentFunc.bind(this);
    this.changeStudent = this.changeStudent.bind(this);
    this.changeImg = this.changeImg.bind(this);
    this.addImg = this.addImg.bind(this);
    this.birthdayChange = this.birthdayChange.bind(this);
  }
  componentDidMount() {
    axios.get('/api/getstudentprofileinfo?studentId='+this.state.userId,  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          student: res.data.student,
          img: res.data.student.img
        });
      });
  }
  birthdayChange(value){
       this.setState({
         birthday: value,
         checkPass: true
       });
     }
  dateFormat(date){
    var fDate = new Date(date);
    var m = ((fDate.getMonth() * 1 + 1) < 10) ? ("0" + (fDate.getMonth() * 1 + 1)) : (fDate.getMonth() * 1 + 1);
    var d = ((fDate.getDate() * 1) < 10) ? ("0" + (fDate.getDate() * 1)) : (fDate.getDate() * 1);
    return m + "/" + d + "/" + fDate.getFullYear()
  }
  editStudentFunc(){
    event.preventDefault();
    if(this.state.filename.length>0){
      var student_id = this.state.student._id
      return new Promise((resolve, reject) => {
        let imageFormData = new FormData();
        imageFormData.append('imageFile', this.state.file);
        imageFormData.append('data', JSON.stringify(this.state.editedStudent));
        imageFormData.append('birthday', JSON.stringify(this.state.birthday));
        axios.post('/api/editstudent?student_id=' + student_id, imageFormData, {
          responseType: 'json',
          headers: {
          'Content-type': 'application/x-www-form-urlencoded'
          }
        })
        .then(response => {
            window.location.reload();
          });
      });
    } else{
      const formData = `data=${JSON.stringify(this.state.editedStudent)}&student_id=${this.state.student._id}&birthday=${this.state.birthday}`;
      axios.post('/api/editstudent', formData, {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'}
      })
      .then(response => {
        window.location.reload();
      });
    }
  }
  addImg(){
    const student_id = this.state.student._id;
    return new Promise((resolve, reject) => {
      let imageFormData = new FormData();
      imageFormData.append('imageFile', this.state.file);
      axios.post('/api/addstudentimg?student_id='+student_id, imageFormData, {
        responseType: 'json',
        headers: {
        'Content-type': 'application/x-www-form-urlencoded'
        }
      })
    });
  }
  changeStudent(event){
      const field = event.target.name;
      const student = this.state.editedStudent;
      student[field] = event.target.value;
      if((this.state.editedStudent.password.length>0) || (this.state.editedStudent.checkpassword.length>0)){
        if(this.state.editedStudent.password!=this.state.editedStudent.checkpassword){
          document.getElementById('wrongpass').style.display = "block"
          this.setState({
            checkPass: false
          })
        } else if(this.state.editedStudent.password === this.state.editedStudent.checkpassword){
          this.setState({
            checkPass: true
          })
          document.getElementById('wrongpass').style.display = "none"
        }
      }
      else {
        document.getElementById('wrongpass').style.display = "none"
        this.setState({
          checkPass: true
        })
      }
      this.setState({
          editedStudent: student
        })

      }

  changeImg(e){
      e.preventDefault();

      let reader = new FileReader();
      let file = e.target.files[0];
      if(file.size>1000000){
        this.setState({
          file: '',
          filename: ''
        })
        alert("Размер файла не должен превышать 1 Мб!")
      } else{
        reader.onloadend = () => {
          this.setState({
            file: file,
            filename: file.name
          });
        }
        reader.readAsDataURL(file);
      }
      this.setState({
        checkPass: true
      })
    }
  render() {
    return (
      <div className="container clearfix">
          <div className="bg-title" style={{marginLeft: '220px', marginBottom: '25px' }}>
            <h4>Настройки профиля</h4>
          </div>
          <div className=" my-content" >
            <div className="table-responsive">
          <form action="/" onSubmit={this.editStudentFunc}>
          <div className="form-group">
          <label>Имя студента</label>
            <input type="text" className="form-control" placeholder={this.state.student.user_id.name}
                  name="name"
                  onChange={this.changeStudent}
                  value={this.state.editedStudent.name} />
            <span className="bar"></span>
          </div>
          <div className="form-group">
          <label>Фамилия студента</label>
            <input type="text" className="form-control" placeholder={this.state.student.user_id.lastname}
                  name="lastname"
                  onChange={this.changeStudent}
                  value={this.state.editedStudent.lastname} />
            <span className="bar"></span>
          </div>
          <div className="form-group">
          <label>ИИН</label>
            <input type="text" className="form-control" placeholder={this.state.student.user_id.passport_id}
                  name="passport_id"
                  onChange={this.changeStudent}
                  value={this.state.editedStudent.passport_id} />
            <span className="bar"></span>
          </div>
          <div className="form-group row">
            <div className="col-md-6">
              <label>Пол</label>
              <select className="form-control" name="gender" value={this.state.editedStudent.gender} onChange={this.changeStudent} style={{cursor: 'pointer'}}>
                <option value="">Выберите пол</option>
                <option value="Мужчина">Мужчина</option>
                <option value="Женщина">Женщина</option>
              </select>
              <span className="bar"></span>
            </div>
          </div>
          <div className="form-group">
              <label>День рождения</label>
              <DatePicker value={this.state.birthday}
              onChange={this.birthdayChange}
              className="form-control mydatepicker"
              placeholder={this.state.student.user_id.birthday}
              />
          </div>
          <div className="form-group row">
            <div className="col-md-6">
            <label>Год поступления</label>
              <input type="number" className="form-control"
                    name="admission_year"
                    onChange={this.changeStudent}
                    value={this.state.editedStudent.admission_year}
                    placeholder={this.state.student.admission_year}
              />
              <span className="bar"></span>
            </div>
            <div className="col-md-6">
            <label>Год выпуска</label>
              <input type="number" className="form-control"
                    name="graduation_year"
                    onChange={this.changeStudent}
                    value={this.state.editedStudent.graduation_year}
                    placeholder={this.state.student.graduation_year}
                    />
              <span className="bar"></span>
            </div>
          </div>
          <div className="form-group">
          <label>Изображение студента</label>
            <div className="fileinput input-group fileinput-new" data-provides="fileinput">
                <div className="form-control" data-trigger="fileinput">
                {this.state.filename.length > 0 ?(
                  <div>
                  <i className="glyphicon glyphicon-file fileinput-exists"></i>
                  <span className="fileinput-filename">{this.state.filename}</span>
                  </div>
                  ):(
                  <span></span>
                      )}
                </div>
                <span className="input-group-addon btn btn-default btn-file">
                  {this.state.filename.length > 0 ?(
                  <span className="fileinput-exists">Изменить</span>
                ):(
                  <span className="fileinput-new">Выбрать</span>
                )}
                  <input type="hidden" value="" name="..."/>
                  <input type="file" name="" onChange={this.changeImg}/>
                </span>
            </div>
          </div>
          <div className="form-group">
            <label>Пароль</label>
            <input type="password" className="form-control" placeholder="Введите пароль"
                  name="password"
                  onChange={this.changeStudent}
                  value={this.state.editedStudent.password} />
            <span className="bar"></span>
          </div>
          <div className="form-group">
            <label>Подтверждение пароля</label>
            <input type="password" className="form-control" placeholder="Повторите пароль"
                  name="checkpassword"
                  onChange={this.changeStudent}
                  value={this.state.editedStudent.checkpassword} />
            <span className="bar"></span>
          </div>
          <div className="form-group text-center"  id="wrongpass" style={{display: 'none'}}>
            <p style={{color: 'red'}}>Пароли не совпадают</p>
          </div>
          <button type="submit" className="btn btn-info waves-effect waves-light m-r-10" disabled={!this.state.checkPass} >
            Сохранить изменения
          </button>
          </form>
        </div>
        </div>
      </div>
    );
  }
}

export default StudentEditProfile;
