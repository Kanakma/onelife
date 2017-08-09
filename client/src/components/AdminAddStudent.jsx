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
          faculty_id: '',
          major_id: '',
          passport_id: '',
          admission_year: '',
          graduation_year: ''
        },
        birthday: '',
        faculties: [],
        majors: [],
        checkContent: false
      };
      this.changeStudent = this.changeStudent.bind(this);
      this.addStudent = this.addStudent.bind(this);
      this.birthdayChange = this.birthdayChange.bind(this);
      this.clearContent = this.clearContent.bind(this);
    }
    componentDidMount() {
      axios.get('/api/getfacultiesmajors',  {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          this.setState({
            faculties: res.data.faculties,
            majors: res.data.majors
          });
        });
    }
    changeStudent(event){
      const field = event.target.name;
      const student = this.state.student;
      student[field] = event.target.value;
      if((this.state.student.passport_id.length > 0) && (this.state.student.name.length > 0) && (this.state.student.lastname.length > 0)
            && (this.state.student.major_id.length > 0) && (this.state.student.faculty_id.length > 0) && (this.state.birthday.length > 0) && (this.state.student.admission_year > 0) && (this.state.student.graduation_year > 0)){
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
      const faculty_id = encodeURIComponent(this.state.student.faculty_id);
      const major_id = encodeURIComponent(this.state.student.major_id);
      const birthday = encodeURIComponent(this.state.birthday);
      const admission_year = encodeURIComponent(this.state.student.admission_year);
      const graduation_year = encodeURIComponent(this.state.student.graduation_year);
      const passport_id = encodeURIComponent(this.state.student.passport_id);
      const formData = `passport_id=${passport_id}&name=${name}&lastname=${lastname}&faculty_id=${faculty_id}&major_id=${major_id}&birthday=${birthday}&admission_year=${admission_year}&graduation_year=${graduation_year}`;
      axios.post('/api/addstudent', formData, {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'}
      })
        .then(res => {
            this.setState({
              message: res.data.message,
              errors: {},
              student: {
                name: '',
                lastname: '',
                faculty_id: '',
                major_id: '',
                passport_id: '',
                admission_year: '',
                graduation_year: ''
              },
              birthday: '',
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
    birthdayChange(value){
      if((this.state.student.passport_id.length > 0) && (this.state.student.name.length > 0) && (this.state.student.lastname.length > 0)
            && (this.state.student.major_id.length > 0) && (this.state.student.faculty_id.length > 0) && (this.state.birthday.length > 0) && (this.state.student.admission_year > 0) && (this.state.student.graduation_year > 0)){
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
    clearContent(){
      this.setState({
        student: {
          name: '',
          lastname: '',
          faculty_id: '',
          major_id: '',
          passport_id: '',
          admission_year: '',
          graduation_year: ''
        },
        birthday: '',
        checkContent: false
      })
    }
  render() {
    return (
      <div className="container clearfix">
        <div className="bg-title">
          <h4>Добавить студента</h4>
        </div>
        <div className=" my-content">
          <div className="table-responsive">
          <h5 style={{marginBottom: '3%'}} className="text-uppercase">Основная информация</h5>
          {this.state.message && <h5 style={{ fontSize: '14px', color: 'green' }}>{this.state.message}</h5>}
          {this.state.errors.summary && <h5 style={{ fontSize: '14px', color: 'red' }}>{this.state.errors.summary}</h5>}
          <form action="/"  onSubmit={this.addStudent}>
            <div className="form-group">
              <label>Имя студента</label>
              <input type="text" className="form-control mydatepicker" placeholder="Имя студента"
                    name="name"
                    onChange={this.changeStudent}
                    value={this.state.student.name} />
              <span className="bar"></span>
            </div>
            <div className="form-group">
              <label>Фамилия студента</label>
              <input type="text" className="form-control mydatepicker" placeholder="Фамилия студента"
                    name="lastname"
                    onChange={this.changeStudent}
                    value={this.state.student.lastname} />
              <span className="bar"></span>
            </div>
            <div className="form-group">
              <label>ИИН</label>
              <input type="text" className="form-control mydatepicker" placeholder="ИИН"
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
                <input type="number" className="form-control mydatepicker" placeholder="Год поступления"
                      name="admission_year"
                      onChange={this.changeStudent}
                      value={this.state.student.admission_year} />
                <span className="bar"></span>
              </div>
              <div className="col-md-6">
              <label>Год выпуска</label>
              <input type="number" className="form-control mydatepicker" placeholder="Год выпуска"
                      name="graduation_year"
                      onChange={this.changeStudent}
                      value={this.state.student.graduation_year} />
                <span className="bar"></span>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-6">
                <select className="form-control mydatepicker" name="faculty_id" value={this.state.student.faculty_id} onChange={this.changeStudent}>
                <option value=''>Выберите факультет</option>
                {this.state.faculties.map((faculty, f) =>
                    <option key={f} value={faculty._id}>{faculty.faculty_name}</option>
                )}
                </select>
                <span className="bar"></span>
              </div>
              <div className="col-md-6">
                <select className="form-control mydatepicker" name="major_id" value={this.state.student.major_id} onChange={this.changeStudent}>
                  <option value=''>Выберите специальность</option>
                  {this.state.majors.map((major, m) =>
                      <option key={m} value={major._id}>{major.major_name}</option>
                  )}
                </select>
                <span className="bar"></span>
              </div>
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
