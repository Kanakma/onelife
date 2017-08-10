import React from 'react';
import axios from 'axios';
import Auth from '../modules/Auth';
import InputElement from 'react-input-mask';

class AdminAddFaculty extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      message: '',
      errors: {},
      faculty: {
        faculty_code: '',
        faculty_name: '',
        faculty_dean: '',
        faculty_email: '',
        faculty_phone: ''
      },
      departments: [],
      teachers: [],
      checked_departments: [],
      checkContent: false
    };
    this.changeFaculty = this.changeFaculty.bind(this);
    this.changeCheckbox = this.changeCheckbox.bind(this);
    this.addFaculty = this.addFaculty.bind(this);
    this.clearContent = this.clearContent.bind(this);
  }
 
  componentDidMount() {
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

  changeFaculty(event){
    const field = event.target.name;
    const faculty = this.state.faculty;
    faculty[field] = event.target.value;
    if((this.state.faculty.faculty_code.length > 0) && (this.state.faculty.faculty_name.length > 0)
        && (this.state.faculty.faculty_email.length > 0)
        && (this.state.faculty.faculty_phone.length > 0)){
      this.setState({
        faculty: faculty,
        checkContent: true,
        message: '',
        errors: {}
      })
    } else {
      this.setState({
        faculty: faculty,
        checkContent: false,
        message: '',
        errors: {}
      })
    }
  }

  changeCheckbox(event){
    const checked_departments = this.state.checked_departments;
    let index;

    if (event.target.checked) {
      checked_departments.push(event.target.value)
    } else {
      index = checked_departments.indexOf(event.target.value)
      checked_departments.splice(index, 1)
    }
    if((this.state.faculty.faculty_code.length > 0) && (this.state.faculty.faculty_name.length > 0)
        && (this.state.faculty.faculty_dean.length > 0) && (this.state.faculty.faculty_email.length > 0)
        && (this.state.faculty.faculty_phone.length > 0) && (this.state.checked_departments.length > 0)){
          this.setState({
            checked_departments: checked_departments,
            checkContent: true })
        } else {
          this.setState({
            checked_departments: checked_departments,
            checkContent: false })
        }

  }

  addFaculty(event){
    event.preventDefault();
    const formData = `faculty=${JSON.stringify(this.state.faculty)}&departments=${JSON.stringify(this.state.checked_departments)}`;
    axios.post('/api/addfaculty', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'}
    })
      .then(res => {
          this.setState({
            message: res.data.message,
            errors: {},
            faculty: {
              faculty_code: '',
              faculty_name: '',
              faculty_dean: '',
              faculty_email: '',
              faculty_phone: ''
            },
            checked_departments: [],
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
      faculty: {
        faculty_code: '',
        faculty_name: '',
        faculty_dean: '',
        faculty_email: '',
        faculty_phone: ''
      },
      checked_departments: [],
      checkContent: false
    })
  }
  render() {
    var teachers = this.state.teachers;
    var departments = this.state.departments;
    return (
      <div className="container clearfix">
      <div className="col-md-10 col-md-offset-2 bg-title">
        <h4>Добавить факультет</h4>
      </div>
      <div className="col-md-9 my-content add-content" style={{background: 'white'}}>
      <h5 style={{marginBottom: '3%'}} className="text-uppercase">Описание факультета</h5>
      {this.state.message && <h5 style={{ fontSize: '14px', color: 'green' }}>{this.state.message}</h5>}
      {this.state.errors.summary && <h5 style={{ fontSize: '14px', color: 'red' }}>{this.state.errors.summary}</h5>}
      <form action="/" onSubmit={this.addFaculty}>
        <div className="form-group">
          <label>Название факультета</label>
          <input type="text" className="form-control" placeholder="Название факультета"
          name="faculty_name"
          onChange={this.changeFaculty}
          value={this.state.faculty.faculty_name} />
          <span className="bar"></span>
        </div>
        <div className="form-group">
          <label>Код факультета</label>
          <input type="text" className="form-control" placeholder="Код факультета"
          name="faculty_code"
          onChange={this.changeFaculty}
          value={this.state.faculty.faculty_code} />
          <span className="bar"></span>
        </div>
        <div className="form-group">
          <label>E-mail</label>
          <input type="email" className="form-control" placeholder="Введите E-mail факультета"
          name="faculty_email"
          onChange={this.changeFaculty}
          value={this.state.faculty.faculty_email} />
          <span className="bar"></span>
        </div>
        <div className="form-group">
          <label>Телефон</label>
          <InputElement mask="+7 (999) 999-99-99" className="form-control" placeholder="Введите номер телефона"
          name="faculty_phone"
          onChange={this.changeFaculty}
          value={this.state.faculty.faculty_phone} />
          <span className="bar"></span>
        </div>
        {teachers ?(
          <div className="form-group">
            <label>Декан</label>
            <select className="form-control" name="faculty_dean" value={this.state.faculty.faculty_dean} onChange={this.changeFaculty}>
              <option value=''>Выберите декана факультета</option>
              {teachers.map((teacher, t) =>
                  <option key={t} value={teacher.teacher_id}>{teacher.name} {teacher.lastname}</option>
              )}
            </select>
            <span className="bar"></span>
          </div>
          ) : (
          <div className="form-group">
            <label>Декан</label>
            <select className="form-control" name="faculty_dean" value={this.state.faculty.faculty_dean} onChange={this.changeFaculty}>
              <option value=''>Добавьте преподавателей</option>
            </select>
            <span className="bar"></span>
          </div>
          )}
        <div>
          <button type="submit" className="btn btn-info waves-effect waves-light m-r-10" disabled={!this.state.checkContent} style={{paddingLeft: '5%', paddingRight: '5%'}}>Добавить</button>
          <button type="button" onClick={this.clearContent} className="btn btn-inverse waves-effect waves-light m-r-10" style={{paddingLeft: '5%', paddingRight: '5%'}}>Отмена</button>
        </div>
      </form>
      </div>
      </div>);
  }
}

export default AdminAddFaculty;
