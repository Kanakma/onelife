import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';

class AdminAddStudent extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        message: '',
        errors: {},
        student: {
          name: '',
          lastname: '',
          major_id: '',
          passport_id: '',
          admission_year: '',
          graduation_year: '',
          password:'',
          checkpassword:''
        },
        birthday: '',
        majors: [],
        checkContent: false,
        file: '',
        filename: ''
      };
      this.changeStudent = this.changeStudent.bind(this);
      this.addStudent = this.addStudent.bind(this);
      this.birthdayChange = this.birthdayChange.bind(this);
      this.clearContent = this.clearContent.bind(this);
      this.changeImg = this.changeImg.bind(this);
    }
    componentDidMount() {
      axios.get('/api/getmajors',  {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          this.setState({
            majors: res.data.allMjrs
          });
        });
    }
    changeStudent(event){
      const field = event.target.name;
      const student = this.state.student;
      student[field] = event.target.value;
      if((this.state.student.passport_id.length > 0) && (this.state.student.name.length > 0) && (this.state.student.lastname.length > 0)
            && (this.state.student.major_id.length > 0) && (this.state.birthday.length > 0) && (this.state.student.admission_year > 0) && (this.state.student.graduation_year > 0) && (this.state.student.password.length > 0) && (this.state.student.checkpassword.length > 0) && (this.state.student.password === this.state.student.checkpassword)){
        this.setState({
          student: student,
          checkContent: true,
          message: '',
          errors: {}
        })
      } else {
        this.setState({
          student: student,
          checkContent: false,
          message: '',
          errors: {}
        })
      }
    }
    addStudent(event){
      event.preventDefault();
      const name = encodeURIComponent(this.state.student.name);
      const lastname = encodeURIComponent(this.state.student.lastname);
      const major_id = encodeURIComponent(this.state.student.major_id);
      const birthday = encodeURIComponent(this.state.birthday);
      const admission_year = encodeURIComponent(this.state.student.admission_year);
      const graduation_year = encodeURIComponent(this.state.student.graduation_year);
      const passport_id = encodeURIComponent(this.state.student.passport_id);
      const password = encodeURIComponent(this.state.student.password);
      const formData = `passport_id=${passport_id}&name=${name}&lastname=${lastname}&major_id=${major_id}&birthday=${birthday}&admission_year=${admission_year}&graduation_year=${graduation_year}&password=${password}`;
      axios.post('/api/addstudent', formData, {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'}
      })
        .then(res => {
              return new Promise((resolve, reject) => {
                let imageFormData = new FormData();
                const student_id = res.data.newStudent._id;
                imageFormData.append('imageFile', this.state.file);
                axios.post('/api/addstudentimg?student_id='+student_id, imageFormData, {
                  responseType: 'json',
                  headers: {
                  'Content-type': 'application/x-www-form-urlencoded'
                  }
                })
                  .then(response => {
                      this.setState({
                        message: response.data.message,
                        errors: {}
                      });
                      this.clearContent();
                  });
                });
          })
            .catch(err => {
              if (err.response) {
                const errors = err.response ? err.response : {};
                errors.summary = err.response.data.message;
                this.setState({
                  errors
                });
              }
            });
    }
    birthdayChange(value){
      if((this.state.student.passport_id.length > 0) && (this.state.student.name.length > 0) && (this.state.student.lastname.length > 0)
            && (this.state.student.major_id.length > 0) && (this.state.birthday.length > 0) && (this.state.student.admission_year > 0) && (this.state.student.graduation_year > 0) && (this.state.student.password.length > 0)){
        this.setState({
          birthday: value,
          checkContent: true
        });
      } else {
        this.setState({
          birthday: value,
          checkContent: false
        });
      }

    }
    changeImg(e){
      e.preventDefault();

      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onloadend = () => {
          this.setState({
            file: file,
            filename: file.name
          });
          console.log(this.state.file)
      }
      reader.readAsDataURL(file)
    }
    clearContent(){
      this.setState({
        student: {
          name: '',
          lastname: '',
          major_id: '',
          passport_id: '',
          admission_year: '',
          graduation_year: '',
          password:'',
          checkpassword:''
        },
        birthday: '',
        checkContent: false,
        file: '',
        filename: ''
      })
    }
  render() {
    return (
      <div className="container clearfix">
      <div className="bg-title">
        <h4>Добавить студента</h4>
      </div>
      <div className="my-content " >
      <div className= "table-responsive">
      <h5 style={{marginBottom: '3%'}} className="text-uppercase">Основная информация</h5>
      {this.state.message && <h5 style={{ fontSize: '14px', color: 'green' }}>{this.state.message}</h5>}
      {this.state.errors.summary && <h5 style={{ fontSize: '14px', color: 'red' }}>{this.state.errors.summary}</h5>}
      <form action="/"  onSubmit={this.addStudent}>
        <div className="form-group">
        <label>Имя студента</label>
          <input type="text" className="form-control" placeholder="Имя студента"
                name="name"
                onChange={this.changeStudent}
                value={this.state.student.name} />
          <span className="bar"></span>
        </div>
        <div className="form-group">
        <label>Фамилия студента</label>
          <input type="text" className="form-control" placeholder="Фамилия студента"
                name="lastname"
                onChange={this.changeStudent}
                value={this.state.student.lastname} />
          <span className="bar"></span>
        </div>
        <div className="form-group">
        <label>ИИН</label>
          <input type="text" className="form-control" placeholder="ИИН"
                name="passport_id"
                onChange={this.changeStudent}
                value={this.state.student.passport_id} />
          <span className="bar"></span>
        </div>
        <div className="form-group">
            <label>День рождения</label>
            <DatePicker value={this.state.birthday} onChange={this.birthdayChange} className="form-control mydatepicker" />
        </div>
        <div className="form-group row">
          <div className="col-md-6">
          <label>Год поступления</label>
            <input type="number" className="form-control" placeholder="Год поступления"
                  name="admission_year"
                  onChange={this.changeStudent}
                  value={this.state.student.admission_year} />
            <span className="bar"></span>
          </div>
          <div className="col-md-6">
          <label>Год выпуска</label>
            <input type="number" className="form-control" placeholder="Год выпуска"
                  name="graduation_year"
                  onChange={this.changeStudent}
                  value={this.state.student.graduation_year} />
            <span className="bar"></span>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-6">
            <select className="form-control" name="major_id" value={this.state.student.major_id} onChange={this.changeStudent}>
              <option value=''>Выберите специальность</option>
              {this.state.majors.map((major, m) =>
                  <option key={m} value={major.major_id}>{major.major_name}</option>
              )}
            </select>
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
                value={this.state.student.password} />
          <span className="bar"></span>
        </div>
        <div className="form-group">
          <label>Подтверждение пароля</label>
          <input type="password" className="form-control" placeholder="Повторите пароль"
                name="checkpassword"
                onChange={this.changeStudent}
                value={this.state.student.checkpassword} />
          <span className="bar"></span>
        </div>
        <div>
          <button type="submit" className="btn btn-info waves-effect waves-light m-r-10" disabled={!this.state.checkContent} style={{paddingLeft: '5%', paddingRight: '5%'}}>Добавить</button>
          <button type="button" onClick={this.clearContent} className="btn btn-inverse waves-effect waves-light m-r-10" style={{paddingLeft: '5%', paddingRight: '5%'}}>Отмена</button>
        </div>
      </form>
      </div>
      </div>
      </div>);
  }
}

export default AdminAddStudent;
