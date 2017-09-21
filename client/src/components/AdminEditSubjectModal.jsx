import React from 'react';
import Auth from '../modules/Auth';
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';

class AdminEditSubjectModal extends React.Component {

  constructor(props){
    super(props);
    this.state={
      message: '',
      errors: {},
      subject: {
        subject_code: '',
        subject_name: '',
        teacher_id: '',
        period: 0,
        course_number: 0,
        credit_number: 0,
        max_students: 0,
        description: ''
      },
      checkElective:true,
      optional:false,
      file: '',
      filename: '',
      major_group: '',
      main_majors: [],
      majors: [],
      faculty_name:'',
      faculties: [{
        departmnets:[{
          majors:[{
            major_name:'',
            major_code:'',
            major_group:''
          }]
        }]
      }],
      main_teachers: [],
      teachers: [],
      checkMajor: false,
      checkContent: false,
      checkFaculty: false,
      checkTeacher:false,
      typeValue:'Общеобразовательный',
      optionalValue:'Факультативный'
    }
    this.changeSubject = this.changeSubject.bind(this);
    this.editSubjectFunc = this.editSubjectFunc.bind(this);
    this.changeMajorGroup = this.changeMajorGroup.bind(this);
    this.changeFaculty = this.changeFaculty.bind(this);
    this.changeImg = this.changeImg.bind(this);
    this.changeElective = this.changeElective.bind(this);
    this.getTeachers = this.getTeachers.bind(this);
    this.getForSubjects = this.getForSubjects.bind(this);
    this.changeOptional = this.changeOptional.bind(this);
    this.deleteSubject = this.deleteSubject.bind(this);
  };

  componentDidMount() {
    this.getForSubjects();
    this.getTeachers();
  }

  getForSubjects(){
    axios.get('/subject/getforsubject',  {
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

  getTeachers(){
    axios.get('/teacher/getteachers',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          teachers:res.data.allTchrs
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
  }

  changeFaculty(event){
    if(event.target.value.length > 0){
      this.setState({
        faculty_name: event.target.value,
        checkFaculty: true,
        message: '',
        errors: {},
        checkTeacher:false,
        teachers: this.state.main_teachers.filter(function(teacher) {
                            return teacher.faculty_id.indexOf(event.target.value) > -1;
                        })
      })
    } else {
      this.setState({
        faculty_name: event.target.value,
        checkFaculty: false,
        message: '',
        errors: {},
        checkTeacher:true
      })
    }
  }

  editSubjectFunc(){
    if(this.state.filename.length>0){
      var subject_id = this.props.subject._id
      return new Promise((resolve, reject) => {
        let imageFormData = new FormData();
        imageFormData.append('imageFile', this.state.file);
        imageFormData.append('data', JSON.stringify(this.state.subject));
        imageFormData.append('optional', JSON.stringify(this.state.optional));
        imageFormData.append('faculty_id', JSON.stringify(this.state.faculty_name));
        axios.post('/subject/editsubject?subject_id=' + subject_id, imageFormData, {
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
      const formData = `data=${JSON.stringify(this.state.subject)}&subject_id=${this.props.subject._id}&optional=${this.state.optional}&faculty_id=${this.state.faculty_name}`;
      axios.post('/subject/editsubject', formData, {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'}
      })
      .then(response => {
        window.location.reload();
      });
    }
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
   // && (this.state.checkElective==false) ? (this.state.faculty_name.length>0): true
  changeElective(event){
    if(event.target.value=='Общеобразовательный'){
      var temp = this.state.subject;
      temp.teacher_id='';
      this.getTeachers();
      this.setState({
        checkElective: true,
        optional:false,
        checkTeacher:false,
        subject:temp,
        faculty_name:'',
        typeValue:event.target.value,
        optionalValue:'Факультативный'
      })
    }else if(event.target.value=='Специализированный'){
      var temp = this.state.subject;
      temp.teacher_id='';
      this.setState({
        checkElective: false,
        optional:true,
        checkTeacher:true,
        subject:temp,
        faculty_name:'',
        typeValue:event.target.value,
        optionalValue:'Факультативный'
      })
    }
  }

  changeOptional(event){
    if(event.target.value=='Обязательный'){
      this.setState({
        optional:false,
        optionalValue:event.target.value
      })
    } else if(event.target.value=='Факультативный'){
      this.setState({
        optional:true,
        optionalValue:event.target.value
      })
    }
  }

  deleteSubject(){
    const formData = `subject_id=${this.props.subject._id}`;
    axios.post('/subject/deletesubject', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        window.location.reload();
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
      paddingLeft: '20%',
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
          <div>
            <button className="btn btn-info waves-effect waves-light m-r-10" style={{float:"right"}} onClick={this.props.onClose}>
              X
            </button>
            <form action="/subjects" onSubmit={this.editSubjectFunc}>
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
                  <label>Тип</label>
                  <select className="form-control" value={this.state.typeValue} onChange={this.changeElective} style={{cursor: 'pointer'}}>
                    <option value='Общеобразовательный'>Общеобразовательный</option>
                    <option value='Специализированный'>Специализированный</option>
                  </select>
                  <span className="bar"></span>
                </div>
                <div className="col-md-6">
                  <label>Элективный</label>
                  <select className="form-control" name="optional" disabled={this.state.checkElective} value={this.state.optionalValue} onChange={this.changeOptional} style={{cursor: 'pointer'}}>
                    <option value='Факультативный'>Факультативный</option>
                    <option value='Обязательный'>Обязательный</option>
                  </select>
                  <span className="bar"></span>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-6">
                  <label>Факультет</label>
                  <select className="form-control" name="faculty_id" disabled={this.state.checkElective} onChange={this.changeFaculty}>
                    <option value=''>Выберите факультета</option>
                    <option value=' '>Без факультета</option>
                    {this.state.faculties.map((faculty, f) =>
                      <option key={f} value={faculty._id}>{faculty.faculty_name}</option>
                    )}
                  </select>
                  <span className="bar"></span>
                </div>
                <div className="col-md-6">
                  <label>Преподаватель</label>
                  <select className="form-control" name="teacher_id" value={this.state.subject.teacher_id} onChange={this.changeSubject} disabled={this.state.checkTeacher}>
                    <option value=''>Выберите преподавателя</option>
                    {this.state.teachers.map((teacher, t) =>
                      <option key={t} value={teacher.teacher_id}>{teacher.lastname} {teacher.name}</option>
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
                         name="max_students"
                         value={this.state.subject.max_students}
                         onChange={this.changeSubject}
                         disabled={!this.state.optional} />
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
                <label>Описание</label><br/>
                <textarea type="text"
                         className="form-control"
                         value={this.state.subject.description}
                         name="description"
                         onChange={this.changeSubject}
                         placeholder="Введите описание предмета"
                         rows="5">
                </textarea>
                <span className="bar"></span>
              </div>
              <button type="submit" className="btn btn-info waves-effect waves-light m-r-10">
                Сохранить изменения
              </button>
              <button type="button" className="btn btn-info waves-effect waves-light m-r-10" onClick={this.deleteSubject}>
                Удалить предмет
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminEditSubjectModal;
