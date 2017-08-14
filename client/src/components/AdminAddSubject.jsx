import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Auth from '../modules/Auth'

class AdminAddSubject extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      message: '',
      errors: {},
      subject: {
        subject_code: '',
        subject_name: '',
        teacher_id: '',
        major_id: '',
        period: 0,
        course_number: 0,
        credit_number: 0,
        max_students: 0,
        description: ''
      },
      file: '',
      filename: '',
      major_group: '',
      main_majors: [],
      majors: [],
      faculty_name: '',
      faculties: [],
      main_teachers: [],
      teachers: [],
      checkMajor: false,
      checkContent: false,
      checkFaculty: false
    };
    this.changeSubject = this.changeSubject.bind(this);
    this.addSubject = this.addSubject.bind(this);
    this.changeMajorGroup = this.changeMajorGroup.bind(this);
    this.changeFaculty = this.changeFaculty.bind(this);
    this.clearContent = this.clearContent.bind(this);
    this.changeImg = this.changeImg.bind(this);
    this.checkContent = this.checkContent.bind(this);
  }
  componentDidMount() {
    axios.get('/api/getforsubject',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          main_majors: res.data.majors,
          faculties: res.data.faculties,
          main_teachers: res.data.teachers
        });
      });
  }
  changeSubject(event){
    const field = event.target.name;
    const subject = this.state.subject;
    subject[field] = event.target.value;
          this.setState({
            subject: subject,
            message: '',
            errors: {}
          })
          this.checkContent()
  }
  changeMajorGroup(event){
          if(event.target.value.length > 0){
            this.setState({
              major_group: event.target.value,
              checkMajor: true,
              message: '',
              errors: {},
              majors: this.state.main_majors.filter(function(major) {
                                  return major.major_group.indexOf(event.target.value) > -1;
                              })
            })
          } else {
            this.setState({
              major_group: event.target.value,
              checkMajor: false,
              message: '',
              errors: {}
            })
          }
          this.checkContent();
  }
  changeFaculty(event){
          if(event.target.value.length > 0){
            this.setState({
              faculty_name: event.target.value,
              checkFaculty: true,
              message: '',
              errors: {},
              teachers: this.state.main_teachers.filter(function(teacher) {
                                  return teacher.faculty_id.indexOf(event.target.value) > -1;
                              })
            })
          } else {
            this.setState({
              faculty_name: event.target.value,
              checkFaculty: false,
              message: '',
              errors: {}
            })
          }
          this.checkContent()

  }
  addSubject(event){
    event.preventDefault();
    const formData = `data=${JSON.stringify(this.state.subject)}`;
    axios.post('/api/addsubject', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'}
    })
      .then(res => {
        var subject_id = res.data.subject._id;
        return new Promise((resolve, reject) => {
          let imageFormData = new FormData();
          imageFormData.append('imageFile', this.state.file);
          axios.post('/api/addsubjectimg?subject_id='+subject_id, imageFormData, {
            responseType: 'json',
            headers: {
            'Content-type': 'application/x-www-form-urlencoded'
            }
          })
            .then(response => {
                this.setState({
                  message: response.data.message,
                  errors: {},
                  major_group: '',
                  faculty_name: ''
                });
                this.clearContent()
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
  clearContent(){
    this.setState({
      subject: {
        subject_code: '',
        subject_name: '',
        teacher_id: '',
        major_id: '',
        period: 0,
        course_number: 0,
        credit_number: 0,
        max_students: 0,
        description: ''
      },
      file: '',
      filename: '',
      checkMajor: false,
      checkContent: false,
      checkFaculty: false
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
  checkContent(){
    if((this.state.subject.description.length > 0) && (this.state.subject.subject_code.length > 0) && (this.state.subject.subject_name.length > 0) && (this.state.subject.teacher_id.length > 0) && (this.state.subject.major_id.length > 0)
        && (this.state.subject.period > 0) && (this.state.subject.course_number > 0) && (this.state.subject.credit_number > 0)
        && (this.state.subject.max_students > 0) && (this.state.major_group.length > 0) && (this.state.filename.length > 0)){
          this.setState({
            checkContent: true
          });
        } else {
          this.setState({
            checkContent: false
          });
        }
  }
  render() {
    return (
      <div className="container clearfix">
      <div className=" bg-title">
        <h4>Добавить предмет</h4>
      </div>
      <div className="my-content" >
      <div className = "table-responsive">
      <h5 style={{marginBottom: '3%'}} className="text-uppercase">Описание предмета</h5>
          {this.state.message && <h5 style={{ fontSize: '14px', color: 'green' }}>{this.state.message}</h5>}
          {this.state.errors.summary && <h5 style={{ fontSize: '14px', color: 'red' }}>{this.state.errors.summary}</h5>}
          <form action="/" onSubmit={this.addSubject}>
            <div className="form-group">
                <label>Код предмета</label>
                <input type="text" className="form-control" placeholder="Код предмета"
                     name="subject_code" value={this.state.subject.subject_code} onChange={this.changeSubject} />
                <span className="bar"></span>
            </div>
            <div className="form-group">
                <label>Название предмета</label>
                <input type="text" className="form-control" placeholder="Название предмета"
                     name="subject_name" value={this.state.subject.subject_name} onChange={this.changeSubject} />
                <span className="bar"></span>
            </div>
            <div className="form-group row">
            <div className="col-md-6">
              <select className="form-control" name="major_group" value={this.state.major_group} onChange={this.changeMajorGroup}>
                <option value="">Наименование групп специальностей</option>
                <option value="Образование">Образование</option>
                <option value="Гуманитарные науки">Гуманитарные науки</option>
                <option value="Право">Право</option>
                <option value="Искусство">Искусство</option>
                <option value="Социальные науки, экономика и бизнес">Социальные науки, экономика и бизнес</option>
                <option value="Естественные науки">Естественные науки</option>
                <option value="Технические науки и технологии">Технические науки и технологии</option>
                <option value="Сельскохозяйственные науки">Сельскохозяйственные науки</option>
                <option value="Услуги">Услуги</option>
                <option value="Военное дело и безопасность">Военное дело и безопасность</option>
                <option value="Здравоохранение и социальное обеспечение (медицина)">Здравоохранение и социальное обеспечение (медицина)</option>
              </select>
              <span className="bar"></span>
            </div>
            <div className="col-md-6">
              <select className="form-control" name="major_id" value={this.state.subject.major_id} onChange={this.changeSubject} disabled={!this.state.checkMajor}>
                <option value=''>Выберите специальность</option>
                {this.state.majors.map((major, m) =>
                  <option key={m} value={major._id}>{major.major_name}</option>
                )}
              </select>
              <span className="bar"></span>
            </div>
            </div>
            <div className="form-group row">
            <div className="col-md-6">
              <select className="form-control" name="faculty_id" value={this.state.faculty_name} onChange={this.changeFaculty}>
                <option value=''>Выберите факультет</option>
                {this.state.faculties.map((faculty, f) =>
                  <option key={f} value={faculty._id}>{faculty.faculty_name}</option>
                )}
              </select>
              <span className="bar"></span>
            </div>
            <div className="col-md-6">
              <select className="form-control" name="teacher_id" value={this.state.subject.teacher_id} onChange={this.changeSubject} disabled={!this.state.checkFaculty}>
                <option value='dvdv'>Выберите преподавателя</option>
                {this.state.teachers.map((teacher, t) =>
                  <option key={t} value={teacher._id}>{teacher.lastname} {teacher.name}</option>
                )}
              </select>
              <span className="bar"></span>
            </div>
            </div>
            <div className="form-group row">
                <div className="col-md-3">
                  <label>Период (месяц)</label>
                  <input type="number" className="form-control" placeholder="Период"
                         name="period" value={this.state.subject.period} onChange={this.changeSubject} />
                  <span className="bar"></span>
                </div>
                <div className="col-md-3">
                  <label>Курс</label>
                  <input type="number" className="form-control" placeholder="Курс"
                         name="course_number" value={this.state.subject.course_number} onChange={this.changeSubject} />
                  <span className="bar"></span>
                </div>
                <div className="col-md-3">
                  <label>Кредиты</label>
                  <input type="number" className="form-control" placeholder="Кредиты"
                         name="credit_number" value={this.state.subject.credit_number} onChange={this.changeSubject} />
                  <span className="bar"></span>
                </div>
                <div className="col-md-3">
                  <label>Количество студентов</label>
                  <input type="number" className="form-control" placeholder="Количество студентов"
                         name="max_students" value={this.state.subject.max_students} onChange={this.changeSubject} />
                  <span className="bar"></span>
                </div>
            </div>
            <div className="form-group">
            <label>Изображение</label>
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
              <textarea type="text"
                           className="form-control"
                           value={this.state.subject.description}
                           name="description"
                           onChange={this.changeSubject}
                           placeholder="Введите описание предмета"
                           rows="5"></textarea>
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

export default AdminAddSubject;
