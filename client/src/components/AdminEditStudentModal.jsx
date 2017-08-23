import React from 'react';
import Auth from '../modules/Auth';
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';
import InputElement from 'react-input-mask';

class AdminEditStudentModal extends React.Component {

  constructor(props){
    super(props);
    this.state={
      student: {
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
    }
      this.changeStudent = this.changeStudent.bind(this);
      this.birthdayChange = this.birthdayChange.bind(this);
      this.changeImg = this.changeImg.bind(this);
      this.deleteStudent = this.deleteStudent.bind(this);
      this.editStudentFunc = this.editStudentFunc.bind(this);
      this.addImg = this.addImg.bind(this);
      this.clearContent = this.clearContent.bind(this);
  };
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
        axios.get('/api/getgroups',  {
          responseType: 'json',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          }
        })
          .then(res => {
            this.setState({
              groups: res.data.allGroups
            });
          });
    }

  editStudentFunc(){
    event.preventDefault();
    if(this.state.filename.length>0){
      this.addImg();
    }
    const student_id = this.props.student._id;
    const birthday =this.state.birthday;
    const formData = `student=${JSON.stringify(this.state.student)}&student_id=${student_id}&birthday=${this.state.birthday}`;
    axios.post('/api/editstudent', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
  }

  deleteStudent(){
    var student_id = this.props.student._id;
    const formData = `student_id=${student_id}`;
    axios.post('/api/deletestudent', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
  }
  addImg(){
    const student_id = this.props.student.student_id;
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
      const student = this.state.student;
      student[field] = event.target.value;
      if((this.state.student.password.length>0) || (this.state.student.checkpassword.length>0)){
        if(this.state.student.password!=this.state.student.checkpassword){
          document.getElementById('wrongpass').style.display = "block"
          this.setState({
            checkPass: false
          })
        } else if(this.state.student.password === this.state.student.checkpassword){
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
          student: student
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
    }

   birthdayChange(value){
        this.setState({
          birthday: value,
        });
      }
      clearContent(){
        this.setState({
          student: {
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
          birthday: '',
          checkContent: false,
          file: '',
          filename: ''
        })
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
      minHeight: 300,
      margin: '35px auto',
      padding: 30
    };
    return (
      <div style={backdropStyle}>
        <div style={modalStyle}>
              <button className="btn btn-info waves-effect waves-light m-r-10" style={{float:"right"}} onClick={this.props.onClose}>
                X
              </button>
          <div>
            <form action="/students" onSubmit={this.editStudentFunc}>
              <div className="form-group">
        <label>Имя студента</label>
          <input type="text" className="form-control" placeholder={this.props.student.user_id.name}
                name="name"
                onChange={this.changeStudent}
                value={this.state.student.name} />
          <span className="bar"></span>
        </div>
        <div className="form-group">
        <label>Фамилия студента</label>
          <input type="text" className="form-control" placeholder={this.props.student.user_id.lastname}
                name="lastname"
                onChange={this.changeStudent}
                value={this.state.student.lastname} />
          <span className="bar"></span>
        </div>
        <div className="form-group">
        <label>ИИН</label>
          <input type="text" className="form-control" placeholder={this.props.student.user_id.passport_id}
                name="passport_id"
                onChange={this.changeStudent}
                value={this.state.student.passport_id} />
          <span className="bar"></span>
        </div>
        <div className="form-group row">
          <div className="col-md-6">
            <label>Пол</label>
            <select className="form-control" name="gender" value={this.state.student.gender} onChange={this.changeStudent}>
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
            placeholder={this.props.student.user_id.birthday}
            />
        </div>
        <div className="form-group row">
          <div className="col-md-6">
          <label>Год поступления</label>
            <input type="number" className="form-control"
                  name="admission_year"
                  onChange={this.changeStudent}
                  value={this.state.student.admission_year}
                  placeholder={this.props.student.admission_year}
            />
            <span className="bar"></span>
          </div>
          <div className="col-md-6">
          <label>Год выпуска</label>
            <input type="number" className="form-control"
                  name="graduation_year"
                  onChange={this.changeStudent}
                  value={this.state.student.graduation_year}
                  placeholder={this.props.student.graduation_year}
                  />
            <span className="bar"></span>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-6">
            <label>Специальность</label>
            <select className="form-control" name="major_id"
                    value={this.state.student.major_id}
                    onChange={this.changeStudent}>
              <option value=''>Выберите специальность</option>
              {this.state.majors.map((major, m) =>
                  <option key={m} value={major.major_id}>{major.major_name}</option>
              )}
            </select>
            <span className="bar"></span>
          </div>
          <div className="col-md-6">
            <label>Группа</label>
            <select className="form-control" name="group_id"
                    value={this.state.student.group_id}
                    onChange={this.changeStudent}>
              <option value=''>Выберите группу</option>
              {this.state.groups.map((group, g) =>
                  <option key={g} value={group.group_id}>{group.group_name}</option>
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
        <div className="form-group text-center"  id="wrongpass" style={{display: 'none'}}>
          <p style={{color: 'red'}}>Пароли не совпадают</p>
        </div>
              <button type="submit" className="btn btn-info waves-effect waves-light m-r-10" disabled={!this.state.checkPass} >
                Сохранить изменения
              </button>
              <button className="btn btn-info waves-effect waves-light m-r-10" onClick={this.deleteStudent}>
                Удалить студента
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminEditStudentModal;
