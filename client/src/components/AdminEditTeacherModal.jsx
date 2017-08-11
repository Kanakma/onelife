import React from 'react';
import Auth from '../modules/Auth';
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';
import InputElement from 'react-input-mask';

class AdminEditTeacherModal extends React.Component {

  constructor(props){
    super(props);
    this.state={
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
      birthday:'',
      entry_year:'',
      file: '',
      filename:'',
      // social:this.props.teacher.social,
      faculties:[],
      checkPass: true
    }
    this.editTeacherFunc=this.editTeacherFunc.bind(this);
    this.changeTeacher=this.changeTeacher.bind(this);
    this.birthdayChange=this.birthdayChange.bind(this);
    this.entry_yearChange=this.entry_yearChange.bind(this);
    this.dateFormat=this.dateFormat.bind(this);
    this.deleteTeacher=this.deleteTeacher.bind(this);
    this.changeImg = this.changeImg.bind(this);
    this.addImg = this.addImg.bind(this);
    // this.changeTeacherSocial=this.changeTeacherSocial.bind(this);
  };

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

  dateFormat(date){
    var fDate = new Date(date);
    var m = ((fDate.getMonth() * 1 + 1) < 10) ? ("0" + (fDate.getMonth() * 1 + 1)) : (fDate.getMonth() * 1 + 1);
    var d = ((fDate.getDate() * 1) < 10) ? ("0" + (fDate.getDate() * 1)) : (fDate.getDate() * 1);
    return m + "/" + d + "/" + fDate.getFullYear()
  }

  editTeacherFunc(){
    event.preventDefault();
    if(this.state.filename.length>0){
      this.addImg();
    }
    const teacher_id = this.props.teacher.teacher_id;
    const birthday = this.state.birthday;
    const entry_year = this.state.entry_year;
    const formData = `editedTeacher=${JSON.stringify(this.state.editedTeacher)}&teacher_id=${teacher_id}&birthday=${birthday}&entry_year=${entry_year}`;
    axios.post('/api/editteacher', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    });
  }


  deleteTeacher(){
    const formData = `teacher_id=${JSON.stringify(this.props.teacher.teacher_id)}`;
    axios.post('/api/deleteteacher', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
  }

  addImg(){
    var teacher_id = this.props.teacher.teacher_id;
    return new Promise((resolve, reject) => {
      let imageFormData = new FormData();
      imageFormData.append('imageFile', this.state.file);
      axios.post('/api/editteacherimg?teacher_id='+teacher_id, imageFormData, {
        responseType: 'json',
        headers: {
        'Content-type': 'application/x-www-form-urlencoded'
        }
      })
    });
  }

  changeTeacher(event){
    const field = event.target.name;
    const editedTeacher = this.state.editedTeacher;
    editedTeacher[field] = event.target.value;
    if((this.state.editedTeacher.password>0)&&(this.state.editedTeacher.checkpassword>0)&&(this.state.editedTeacher.password!=this.state.editedTeacher.checkpassword)){
      this.setState({
        checkPass: false
      })
      document.getElementById('wrongpass').style.display = "block"

    }
    else if(this.state.editedTeacher.password===this.state.editedTeacher.checkpassword)  {
      this.setState({
        checkPass: true
      })
      document.getElementById('wrongpass').style.display = "none"
    }
    this.setState({
      editedTeacher
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
    }
    reader.readAsDataURL(file);
  }

  birthdayChange(value){
      this.setState({
        birthday: value
      });
  }

  entry_yearChange(value){
      this.setState({
        entry_year: value
      });
  }
  render(){

    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }
    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50,
      marginLeft: 200,
      overflow: 'auto'
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 1000,
      minHeight: 700,
      margin: '35px auto',
      padding: 30
    };
    return (
      <div style={backdropStyle}>
        <div style={modalStyle}>
          <div>
              <button className="btn btn-info waves-effect waves-light m-r-10" style={{float:"right"}} onClick={this.props.onClose}>
                X
              </button>
            <form action="/teachers" onSubmit={this.editTeacherFunc}>
              <div className="form-group">
                <label>Имя</label>
                <input type="text" className="form-control" placeholder={this.props.teacher.name}
                name="name"
                onChange={this.changeTeacher}
                value={this.state.editedTeacher.name} />
                <span className="bar"></span>
              </div>
              <div className="form-group">
                <label>Фамилия</label>
                <input type="text" className="form-control" placeholder={this.props.teacher.lastname}
                name="lastname"
                onChange={this.changeTeacher}
                value={this.state.editedTeacher.lastname} />
                <span className="bar"></span>
              </div>
              <div className="form-group">
                <label>ИИН</label>
                <input type="text" className="form-control" placeholder={this.props.teacher.passport_id}
                name="passport_id"
                onChange={this.changeTeacher}
                value={this.state.editedTeacher.passport_id}/>
                <span className="bar"></span>
              </div>
              <div className="form-group">
                <label>День рождения</label>
                <DatePicker value={this.state.birthday}
                onChange={this.birthdayChange}
                placeholder={this.dateFormat(this.props.teacher.birthday)}
                className="form-control mydatepicker"/>
              </div>
              <div className="form-group">
                <label>День начала работы</label>
                <DatePicker value={this.state.entry_year}
                placeholder={this.dateFormat(this.props.teacher.entry_year)}
                onChange={this.entry_yearChange}
                className="form-control mydatepicker"/>
              </div>
              <div className="form-group row">
                <div className="col-md-6">
                  <label>Пол</label>
                  <select className="form-control" name="gender" value={this.state.editedTeacher.gender} onChange={this.changeTeacher}>
                    <option value="">Выберите пол</option>
                    <option value="Мужчина">Мужчина</option>
                    <option value="Женщина">Женщина</option>
                  </select>
                  <span className="bar"></span>
                </div>
                <div className="col-md-6">
                  <label>Степень</label>
                  <select className="form-control" name="degree" value={this.state.editedTeacher.degree} onChange={this.changeTeacher}>
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
              {this.state.faculties ? (
                <div className="form-group">
                  <select className="form-control" name="faculty_id" value={this.state.editedTeacher.faculty_id} onChange={this.changeTeacher}>
                    <option value=''>Выберите факультет</option>
                    {this.state.faculties.map((faculty, f) =>
                      <option key={f} value={faculty._id}>{faculty.faculty_name}</option>
                    )}
                  </select>
                  <span className="bar"></span>
                </div>
                ) : (
                <div className="form-group">
                  <select className="form-control" name="faculty_id" value={this.state.editedTeacher.faculty_id} onChange={this.changeTeacher}>
                    <option value=''>Факультеты не добавлены</option>
                  </select>
                  <span className="bar"></span>
                </div>
                )}
              <div className="form-group">
                <label>E-mail</label>
                <input type="email" className="form-control" placeholder={this.props.teacher.email}
                      name="email"
                      onChange={this.changeTeacher}
                      value={this.state.editedTeacher.email} />
                <span className="bar"></span>
            </div>
              <div className="form-group">
                <label>Телефон</label>
                <InputElement mask="+7 (999) 999-99-99" className="form-control" placeholder={this.props.teacher.phone}
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

export default AdminEditTeacherModal;
