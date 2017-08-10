import React from 'react';
import axios from 'axios';
import Auth from '../modules/Auth'
import DatePicker from 'react-bootstrap-date-picker';
import InputElement from 'react-input-mask';

class AdminAddTeacher extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      message: '',
      errors: {},
      teacher: {
        name: '',
        lastname: '',
        faculty_id: '',
        passport_id: '',
        gender: '',
        degree: ''
      },
      accTeacher_id:'',
      file: '',
      filename: '',
      account: {
        email: '',
        phone: '',
        password:'',
        checkpassword:''
      },
      social: {
        facebook: '',
        twitter: '',
        instagram: '',
        google: ''
      },
      birthday: '',
      entry_year: '',
      faculties: [],
      checkContent: false
    };
    this.changeTeacher = this.changeTeacher.bind(this);
    this.addTeacher = this.addTeacher.bind(this);
    this.birthdayChange = this.birthdayChange.bind(this);
    this.entry_yearChange = this.entry_yearChange.bind(this);
    this.clearContent = this.clearContent.bind(this);
      this.changeImg = this.changeImg.bind(this);
  }
  componentDidMount() {
    axios.get('/api/getfaculties',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          faculties: res.data.allFclts
        });
      });
  }
  changeTeacher(event){
    const field = event.target.name;
    const teacher = this.state.teacher;
    teacher[field] = event.target.value;
    const account = this.state.account;
    account[field] = event.target.value;
      this.setState({
        teacher: teacher,
        checkContent: true,
        message: '',
        account: account,
        errors: {}
      })
      this.checkContent();
  }
  addTeacher(event){
    event.preventDefault();
    const email = encodeURIComponent(this.state.account.email);
    const phone = encodeURIComponent(this.state.account.phone);
    const password = encodeURIComponent(this.state.account.password);
    const birthday = encodeURIComponent(this.state.birthday);
    const entry_year = encodeURIComponent(this.state.entry_year);
    const formData = `teacher=${JSON.stringify(this.state.teacher)}&birthday=${birthday}&entry_year=${entry_year}&name=${name}&email=${email}&phone=${phone}&password=${password}`;
    axios.post('/api/addteacher', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'}
    })
      .then(res => {
        this.setState({
          accTeacher_id:res.data.teacher._id
        });
        var teacher_id = res.data.teacher._id;
        return new Promise((resolve, reject) => {
          let imageFormData = new FormData();
          imageFormData.append('imageFile', this.state.file);
          axios.post('/api/addteacherimg?teacher_id='+teacher_id, imageFormData, {
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
      this.setState({
        birthday: value
      });
      this.checkContent();
  }
  entry_yearChange(value){
      this.setState({
        entry_year: value
      });
      this.checkContent();
  }
  clearContent(){
    this.setState({
      teacher: {
        name: '',
        lastname: '',
        faculty_id: '',
        passport_id: '',
        gender: '',
        degree: ''
      },
      account: {
        email: '',
        phone: '',
        password:'',
        checkpassword:''
      },
      file: '',
      filename: '',
      birthday: '',
      entry_year: '',
      checkContent: false
    })
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
        this.checkContent();
    }
    reader.readAsDataURL(file)
  }
  checkContent(){
    if((this.state.teacher.passport_id.length > 0) && (this.state.teacher.name.length > 0) && (this.state.teacher.lastname.length > 0)
        && (this.state.birthday.length > 0) && (this.state.entry_year.length > 0) && (this.state.filename.length > 0) && (this.state.teacher.gender.length > 0)
        && (this.state.teacher.degree.length > 0)  ){

          this.setState({
            checkContent: true
          })

        }
        // else if((this.state.account.checkpassword.length >0) && (this.state.account.password != this.state.account.checkpassword)){
        //   document.getElementById('wrongpass').style.display = "block"
        //   this.setState({
        //     checkContent: false
        //   })
        // }
        // else if(this.state.account.password === this.state.account.checkpassword){
        //   document.getElementById('wrongpass').style.display = "none"
        // }
         else {
          this.setState({
            checkContent: false
          })
        }
  }

  render() {
    console.log(this.state.accTeacher_id)
    return (
      <div className="container clearfix">
      <div className="bg-title">
        <h4>Добавить преподавателя</h4>
      </div>
      <div className=" my-content">
        <div className="table-responsive">
          <h5 style={{marginBottom: '3%'}} className="text-uppercase">Основная информация</h5>
            {this.state.message && <h5 style={{ fontSize: '14px', color: 'green' }}>{this.state.message}</h5>}
            {this.state.errors.summary && <h5 style={{ fontSize: '14px', color: 'red' }}>{this.state.errors.summary}</h5>}
            <form action="/"  onSubmit={this.addTeacher}>
              <div className="form-group">
              <label>Имя преподавателя</label>
                <input type="text" className="form-control" placeholder="Введите имя преподавателя"
                      name="name"
                      onChange={this.changeTeacher}
                      value={this.state.teacher.name} />
                <span className="bar"></span>
              </div>
              <div className="form-group">
              <label>Фамилия преподавателя</label>
                <input type="text" className="form-control" placeholder="Введите фамилию преподавателя"
                      name="lastname"
                      onChange={this.changeTeacher}
                      value={this.state.teacher.lastname} />
                <span className="bar"></span>
              </div>
              <div className="form-group">
              <label>ИИН</label>
                <input type="text" className="form-control" placeholder="Введите ИИН"
                      name="passport_id"
                      onChange={this.changeTeacher}
                      value={this.state.teacher.passport_id} />
                <span className="bar"></span>
              </div>
              <div className="form-group row">
                <div className="col-md-6">
                  <label>E-mail</label>
                  <input type="email" className="form-control" placeholder="Введите E-mail"
                        name="email"
                        onChange={this.changeTeacher}
                        value={this.state.account.email} />
                  <span className="bar"></span>
                </div>
                <div className="col-md-6">
                    <label>Телефон</label>
                    <InputElement mask="+7 (999) 999-99-99" className="form-control" placeholder="Введите номер телефона"
                          name="phone"
                          onChange={this.changeTeacher}
                          value={this.state.account.phone} />
                    <span className="bar"></span>
                  <span className="bar"></span>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-6">
                  <select className="form-control" name="gender" value={this.state.teacher.gender} onChange={this.changeTeacher}>
                    <option value="">Выберите пол</option>
                    <option value="Мужчина">Мужчина</option>
                    <option value="Женщина">Женщина</option>
                  </select>
                  <span className="bar"></span>
                </div>
                <div className="col-md-6">
                  <select className="form-control" name="degree" value={this.state.teacher.degree} onChange={this.changeTeacher}>
                    <option value="">Выберите степень</option>
                    <option value="Ассистент">Ассистент</option>
                    <option value="Лаборант">Лаборант</option>
                    <option value="Доктор">Доктор</option>
                    <option value="Профессор">Профессор</option>
                    <option value="Академик">Академик</option>
                  </select>
                  <span className="bar"></span>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-6">
                  <label>День рождения</label>
                  <DatePicker value={this.state.birthday} onChange={this.birthdayChange} className="form-control mydatepicker"/>
                </div>
                <div className="col-md-6">
                  <label>День начала работы</label>
                  <DatePicker value={this.state.entry_year} onChange={this.entry_yearChange}  className="form-control mydatepicker"/>
                </div>
              </div>
              {this.state.faculties ? (
                <div className="form-group">
                  <select className="form-control" name="faculty_id" value={this.state.teacher.faculty_id} onChange={this.changeTeacher}>
                    <option value=''>Выберите факультет</option>
                    {this.state.faculties.map((faculty, f) =>
                      <option key={f} value={faculty._id}>{faculty.faculty_name}</option>
                    )}
                  </select>
                  <span className="bar"></span>
                </div>
                ) : (
                <div className="form-group">
                  <select className="form-control" name="faculty_id" value={this.state.teacher.faculty_id} onChange={this.changeTeacher}>
                    <option value=''>Факультеты не добавлены</option>
                  </select>
                  <span className="bar"></span>
                </div>
                )}
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
              <div className="form-group row">
                <div className="col-md-6">
                  <label>Пароль</label>
                  <input type="password" className="form-control" placeholder="Введите пароль"
                        name="password"
                        onChange={this.changeTeacher}
                        value={this.state.account.password} />
                  <span className="bar"></span>
                </div>
                <div className="col-md-6">
                  <label>Подтверждение пароля</label>
                  <input type="password" className="form-control" placeholder="Повторите пароль"
                        name="checkpassword"
                        onChange={this.changeTeacher}
                        value={this.state.account.checkpassword} />
                  <span className="bar"></span>
                  <span className="bar"></span>
                </div>
              </div>
              <div className="form-group text-center"  id="wrongpass" style={{display: 'none'}}>
              <p style={{color: 'red'}}>Пароли не совпадают</p>
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

export default AdminAddTeacher;
