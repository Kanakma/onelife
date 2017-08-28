import React from 'react';
import axios from 'axios';
import Auth from '../modules/Auth'
import InputElement from 'react-input-mask';

class AdminAddDepartment extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      message: '',
      errors: {},
      department: {
        department_code: '',
        department_name: '',
        department_director: '',
        department_email: '',
        department_phone: '',
        department_faculty:''
      },
      faculties:[],
      teachers: [],
      majors: [],
      checked_majors: [],
      checkContent: false
    };
    this.changeDepartment = this.changeDepartment.bind(this);
    this.changeMajorGroup = this.changeMajorGroup.bind(this);
    this.changeCheckbox = this.changeCheckbox.bind(this);
    this.addDepartment = this.addDepartment.bind(this);
    this.clearContent = this.clearContent.bind(this);
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
          majors: res.data.allMjrs,
        });
        axios.get('/api/getfaculties',  {
          responseType: 'json',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          }
        })
        .then(res => {
          this.setState({
            faculties: res.data.faculties
          });
        });
      });
    axios.get('/api/getteachers',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          teachers: res.data.allTchrs
        });
      });
  }

  changeDepartment(event){
    const field = event.target.name;
    const department = this.state.department;
    department[field] = event.target.value;
    if((this.state.department.department_code.length > 0) && (this.state.department.department_name.length > 0)
          && (this.state.department.department_director.length > 0) && (this.state.department.department_email.length > 0)
          && (this.state.department.department_phone.length > 0)){
      this.setState({
        department: department,
        checkContent: true,
        message: '',
        errors: {}
      })
    } else {
      this.setState({
        department: department,
        checkContent: false,
        message: '',
        errors: {}
      })
    }
  }

  changeMajorGroup(event){
    this.setState({
      major_group: event.target.value,
      majors: this.state.majors_main.filter(function(major) {
                          return major.major_group.indexOf(event.target.value) > -1;
                      })
    })
  }

  changeCheckbox(event){
    const checked_majors = this.state.checked_majors;
    let index;

    if (event.target.checked) {
      checked_majors.push(event.target.value)
    } else {
      index = checked_majors.indexOf(event.target.value)
      checked_majors.splice(index, 1)
    }
    this.setState({ checked_majors: checked_majors })
  }

  addDepartment(event){
    event.preventDefault();
    const formData = `department=${JSON.stringify(this.state.department)}&majors=${JSON.stringify(this.state.checked_majors)}`;
    axios.post('/api/adddepartment', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'}
    })
      .then(res => {
          this.setState({
            message: res.data.message,
            errors: {},
            department: {
              department_code: '',
              department_name: '',
              department_director: '',
              department_email: '',
              department_phone: '',
              department_faculty:''
            },
            checked_majors: [],
            checkContent: false
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
  clearContent(){
    this.setState({
      department: {
        department_code: '',
        department_name: '',
        department_director: '',
        department_email: '',
        department_phone: '',
        department_faculty:''
      },
      checkContent: false
    })
  }
  render() {
    return (
      <div>
        {
          this.state.faculties ? (
          <div className="container clearfix">
            <div className="bg-title">
              <h4>Добавить кафедру</h4>
            </div>
            <div className=" my-content">
            <div className = "table-responsive">
            <h5 style={{marginBottom: '3%'}} className="text-uppercase">Описание кафедры</h5>
            {this.state.message && <h5 style={{ fontSize: '14px', color: 'green' }}>{this.state.message}</h5>}
            {this.state.errors.summary && <h5 style={{ fontSize: '14px', color: 'red' }}>{this.state.errors.summary}</h5>}
            <form action="/" onSubmit={this.addDepartment}>
              <div className="form-group">
                <label>Название кафедры</label>
                <input type="text" className="form-control" placeholder="Введите название кафедры"
                name="department_name"
                onChange={this.changeDepartment}
                value={this.state.department.department_name} />
                <span className="bar"></span>
              </div>
              <div className="form-group">
                <label>Код кафедры</label>
                <input type="text" className="form-control" placeholder="Введите код кафедры"
                name="department_code"
                onChange={this.changeDepartment}
                value={this.state.department.department_code} />
                <span className="bar"></span>
              </div>
              <div className="form-group">
                <label>Факультет</label>
                <select className="form-control" name="department_faculty" value={this.state.department.department_faculty} onChange={this.changeDepartment}>
                  <option value=''>Выберите факультет</option>
                  {this.state.faculties.map((faculty, f) =>
                    <option key={f} value={faculty._id}>{faculty.faculty_name}</option>
                  )}
                </select>
                <span className="bar"></span>
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <input type="email" className="form-control" placeholder="Введите E-mail"
                name="department_email"
                onChange={this.changeDepartment}
                value={this.state.department.department_email} />
                <span className="bar"></span>
              </div>
              <div className="form-group">
                <label>Телефон</label>
                <InputElement  mask="+7 (999) 999-99-99" className="form-control" placeholder="Введите номер телефона"
                name="department_phone"
                onChange={this.changeDepartment}
                value={this.state.department.department_phone} />
                <span className="bar"></span>
              </div>
              {
                this.state.teachers ? (
                  <div className="form-group">
                    <label>Заведующий кафедрой</label>
                    <select className="form-control" name="department_director" value={this.state.department.department_director} onChange={this.changeDepartment}>
                      <option value=''>Выберите заведующего кафедры</option>
                      {this.state.teachers.map((teacher, t) =>
                          <option key={t} value={teacher.teacher_id}>{teacher.name} {teacher.lastname}</option>
                      )}
                    </select>
                    <span className="bar"></span>
                  </div>
                  ):(
                  <div className="form-group">
                    <label>Заведующий кафедрой</label>
                    <select className="form-control" name="department_director" value={this.state.department.department_director} onChange={this.changeDepartment}>
                      <option value=''>Добавьте преподавателей</option>
                    </select>
                    <span className="bar"></span>
                  </div>
                )
              }
              <div>
                <button type="submit" className="btn btn-info waves-effect waves-light m-r-10" disabled={!this.state.checkContent} style={{paddingLeft: '5%', paddingRight: '5%'}}>Добавить</button>
                <button type="button" onClick={this.clearContent} className="btn btn-inverse waves-effect waves-light m-r-10" style={{paddingLeft: '5%', paddingRight: '5%'}}>Отмена</button>
              </div>
            </form>
            </div>
            </div>
          </div>
          ) : (
            <div className="container clearfix">
              <div className="bg-title">
                <h4>Добавить кафедру</h4>
              </div>
              <div className=" my-content">
                <div className = "table-responsive">
                  <h4>Нет факультетов. Добавьте факультеты</h4>
                </div>
              </div>
            </div>
          )
        }
      </div>
);
  }
}

export default AdminAddDepartment;
