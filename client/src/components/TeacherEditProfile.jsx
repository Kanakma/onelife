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


class TeacherEditProfile extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editedTeacher:{
        name:'',
        lastname:'',
        passport_id:'',
        birthday:'',
        entry_year:'',
        degree:'',
        email:'',
        phone:'',
        faculty_id:'',
        gender:'',
        password: '',
        checkpassword: ''
      },
      file: '',
      filename: '',
      birthday: '',
      entry_year: '',
      userId:  this.props.location.state.userId,
      teacher: {
        user_id: {
          name: '',
          lastname: ''
        }
      },
      checkPass: true

    },
    this.editTeacherFunc=this.editTeacherFunc.bind(this);
    this.dateFormat= this.dateFormat.bind(this);
    this.changeImg = this.changeImg.bind(this);
  }
  componentDidMount() {
    axios.get('/api/getteacherprofileinfo?teacherId='+this.state.userId,  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          teacher: res.data.teacher
        });
      });
  }
  dateFormat(date){
    var fDate = new Date(date);
    var m = ((fDate.getMonth() * 1 + 1) < 10) ? ("0" + (fDate.getMonth() * 1 + 1)) : (fDate.getMonth() * 1 + 1);
    var d = ((fDate.getDate() * 1) < 10) ? ("0" + (fDate.getDate() * 1)) : (fDate.getDate() * 1);
    return m + "/" + d + "/" + fDate.getFullYear()
  }
  editTeacherFunc(){
    event.preventDefault();
    // if(this.state.filename.length>0){
    //   this.addImg();
    // }
    // const teacher_id = this.props.teacher.teacher_id;
    // const birthday = this.state.birthday;
    // const entry_year = this.state.entry_year;
    // const formData = `editedTeacher=${JSON.stringify(this.state.editedTeacher)}&teacher_id=${teacher_id}&birthday=${birthday}&entry_year=${entry_year}`;
    // axios.post('/api/editteacher', formData, {
    //   responseType: 'json',
    //   headers: {
    //     'Content-type': 'application/x-www-form-urlencoded',
    //     'Authorization': `bearer ${Auth.getToken()}`
    //   }
    // });
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
  }
  render() {
    console.log(this.state.teacher)
    return (
      <div className="container clearfix">
          <div className="bg-title" style={{marginLeft: '220px', marginBottom: '25px' }}>
            <h4>Редактировать профиль</h4>
          </div>
          <div className=" my-content" >
            <div className="table-responsive">
          <form action="/" onSubmit={this.editTeacherFunc}>
            <div className="form-group">
              <label>Имя</label>
              <input type="text" className="form-control" placeholder={this.state.teacher.user_id.name}
              name="name"
              onChange={this.changeTeacher}
              value={this.state.editedTeacher.name} />
              <span className="bar"></span>
            </div>
            <div className="form-group">
              <label>Фамилия</label>
              <input type="text" className="form-control" placeholder={this.state.teacher.user_id.lastname}
              name="lastname"
              onChange={this.changeTeacher}
              value={this.state.editedTeacher.lastname} />
              <span className="bar"></span>
            </div>
            <div className="form-group">
              <label>ИИН</label>
              <input type="text" className="form-control" placeholder={this.state.teacher.user_id.passport_id}
              name="passport_id"
              onChange={this.changeTeacher}
              value={this.state.editedTeacher.passport_id}/>
              <span className="bar"></span>
            </div>
            <div className="form-group">
              <label>День рождения</label>
              <DatePicker value={this.state.birthday}
              onChange={this.birthdayChange}
              placeholder={this.dateFormat(this.state.teacher.user_id.birthday)}
              className="form-control mydatepicker"/>
            </div>
            <div className="form-group">
              <label>День начала работы</label>
              <DatePicker value={this.state.entry_year}
              placeholder={this.dateFormat(this.state.teacher.entry_year)}
              onChange={this.entry_yearChange}
              className="form-control mydatepicker"/>
            </div>
            <div className="form-group row">
              <div className="col-md-6">
                <label>Пол</label>
                <select className="form-control" name="gender" value={this.state.editedTeacher.gender} onChange={this.changeTeacher} style={{cursor: 'pointer'}}>
                  <option value="">Выберите пол</option>
                  <option value="Мужчина">Мужчина</option>
                  <option value="Женщина">Женщина</option>
                </select>
                <span className="bar"></span>
              </div>
            </div>
            <div className="form-group">
              <label>E-mail</label>
              <input type="email" className="form-control" placeholder={this.state.teacher.email}
                    name="email"
                    onChange={this.changeTeacher}
                    value={this.state.editedTeacher.email} />
              <span className="bar"></span>
          </div>
            <div className="form-group">
              <label>Телефон</label>
              <InputElement mask="+7 (999) 999-99-99" className="form-control" placeholder={this.state.teacher.phone}
                    name="phone"
                    onChange={this.changeTeacher}
                    value={this.state.editedTeacher.phone} />
              <span className="bar"></span>
          </div>
          <div className="form-group">
            <label>Изображение преподавателя</label>
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
                  <input type="file" name="" onChange={this.changeImg} />
                </span>
            </div>
          </div>
          <div className="form-group">
            <label>Пароль</label>
            <input type="password" className="form-control" placeholder="Введите пароль"
                  name="password"
                  onChange={this.changeTeacher}
                  value={this.state.editedTeacher.password}
                   />
            <span className="bar"></span>
          </div>
          <div className="form-group">
            <label>Подтверждение пароля</label>
            <input type="password" className="form-control" placeholder="Повторите пароль"
                  name="checkpassword"
                  onChange={this.changeTeacher}
                  value={this.state.editedTeacher.checkpassword} />
            <span className="bar"></span>
          </div>
          <div className="form-group text-center"  id="wrongpass" style={{display: 'none'}}>
            <p style={{color: 'red'}}>Пароли не совпадают</p>
          </div>
            <button type="submit" className="btn btn-info waves-effect waves-light m-r-10" disabled={!this.state.checkPass}>
              Сохранить изменения
            </button>
            <button className="btn btn-info waves-effect waves-light m-r-10" onClick={this.deleteTeacher}>
              Удалить Преподователя
            </button>
          </form>
        </div>
        </div>
      </div>
    );
  }
}

export default TeacherEditProfile;
