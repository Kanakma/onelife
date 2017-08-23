import React from 'react';
import Auth from '../modules/Auth';
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';

class AdminEditSubjectModal extends React.Component {

  constructor(props){
    super(props);
    this.state={
      main_majors: [],
      faculties: [],
      main_teachers: [],
      editedSubject:{
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
      faculties: [],
      main_teachers: [],
      teachers: [],
      checkMajor: false,
      checkContent: false,
      checkFaculty: false

    }
    this.changeMajorGroup = this.changeMajorGroup.bind(this);
    this.changeFaculty = this.changeFaculty.bind(this);
    this.changeImg = this.changeImg.bind(this);
    this.changeSubject = this.changeSubject.bind(this);
    this.editSubjectFunc = this.editSubjectFunc.bind(this);
    this.deleteSubject = this.deleteSubject.bind(this);
  };

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

  }
  
  editSubjectFunc(){
    if(this.state.filename.length>0){
      var subject_id = this.props.subject._id
      return new Promise((resolve, reject) => {
        let imageFormData = new FormData();
        imageFormData.append('imageFile', this.state.file);
        imageFormData.append('data', JSON.stringify(this.state.editedSubject));
        axios.post('/api/editsubject?subject_id='+subject_id, imageFormData, {
          responseType: 'json',
          headers: {
          'Content-type': 'application/x-www-form-urlencoded'
          }
        })
          .then(response => {
            window.location.reload();
          });
      });
    }
    else{
      const formData = `data=${JSON.stringify(this.state.editedSubject)}&subject_id=${this.props.subject._id}`;
      axios.post('/api/editsubject', formData, {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'}
      })
      .then(response => {
        window.location.reload();
      });
    }
  }

  deleteSubject(){
    event.preventDefault();
    const formData = `subject_id=${JSON.stringify(this.props.subject._id)}`;
    axios.post('/api/deletesubject', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
  }
  changeSubject(event){
    const field = event.target.name;
    const editedSubject = this.state.editedSubject;
    editedSubject[field] = event.target.value;
      this.setState({
        editedSubject: editedSubject
      })
      console.log(this.state.editedSubject)
  }

  changeMajorGroup(event){
    if(event.target.value.length > 0){
      this.setState({
        major_group: event.target.value,
        checkMajor: true,
        majors: this.state.main_majors.filter(function(major) {
                            return major.major_group.indexOf(event.target.value) > -1;
                        })
      })
    } else {
      this.setState({
        major_group: event.target.value,
        checkMajor: false
      })
    }
  }
  changeFaculty(event){
    if(event.target.value.length > 0){
      this.setState({
        faculty_name: event.target.value,
        checkFaculty: true,
        teachers: this.state.main_teachers.filter(function(teacher) {
                            return teacher.faculty_id.indexOf(event.target.value) > -1;
                        })
      })
    } else {
      this.setState({
        faculty_name: event.target.value,
        checkFaculty: false
      })
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
  render(){
    // console.log(this.props.subject._id)
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
          <div>
              <button className="btn btn-info waves-effect waves-light m-r-10" style={{float:"right"}} onClick={this.props.onClose}>
                X
              </button>
            <form action="/subjects" onSubmit={this.editSubjectFunc}>
              <div className="form-group">
                <label>Код предмета</label>
                <input type="text" className="form-control" placeholder={this.props.subject.subject_code}
                     name="subject_code" value={this.state.editedSubject.subject_code} onChange={this.changeSubject} />
                <span className="bar"></span>
              </div>
              <div className="form-group">
                <label>Название предмета</label>
                <input type="text" className="form-control" placeholder={this.props.subject.subject_name}
                     name="subject_name" value={this.state.editedSubject.subject_name} onChange={this.changeSubject} />
                <span className="bar"></span>
              </div>
            <div className="form-group">
              <label>Тип</label>
              <select className="form-control" name="optional" value={this.state.editedSubject.optional} onChange={this.changeSubject} style={{cursor: 'pointer'}}>
                <option value="">Выберите тип</option>
                <option value={false}>Обязательный</option>
                <option value={true}>Не обязательный</option>
              </select>
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
                  <select className="form-control" name="major_id" value={this.state.editedSubject.major_id} onChange={this.changeSubject} disabled={!this.state.checkMajor}>
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
                  <select className="form-control" name="faculty_id" value={this.state.editedSubject.faculty_name} onChange={this.changeFaculty}>
                    <option value=''>Выберите факультет</option>
                    {this.state.faculties.map((faculty, f) =>
                      <option key={f} value={faculty._id}>{faculty.faculty_name}</option>
                    )}
                  </select>
                  <span className="bar"></span>
                </div>
                <div className="col-md-6">
                  <select className="form-control" name="teacher_id" value={this.state.editedSubject.teacher_id} onChange={this.changeSubject} disabled={!this.state.checkFaculty}>
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
                  <input type="number" className="form-control" placeholder={this.props.subject.period}
                         name="period" value={this.state.editedSubject.period} onChange={this.changeSubject} />
                  <span className="bar"></span>
                </div>
                <div className="col-md-3">
                  <label>Курс</label>
                  <input type="number" className="form-control" placeholder={this.props.subject.course_number}
                         name="course_number" value={this.state.editedSubject.course_number} onChange={this.changeSubject} />
                  <span className="bar"></span>
                </div>
                <div className="col-md-3">
                  <label>Кредиты</label>
                  <input type="number" className="form-control" placeholder={this.props.subject.credit_number}
                         name="credit_number" value={this.state.editedSubject.credit_number} onChange={this.changeSubject} />
                  <span className="bar"></span>
                </div>
                <div className="col-md-3">
                  <label>Количество студентов</label>
                  <input type="number" className="form-control" placeholder={this.props.subject.max_students}
                         name="max_students" value={this.state.editedSubject.max_students} onChange={this.changeSubject} />
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
                               value={this.state.editedSubject.description}
                               name="description"
                               onChange={this.changeSubject}
                               placeholder={this.props.subject.description}
                               rows="5"></textarea>
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
