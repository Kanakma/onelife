import React from 'react';
import Auth from '../modules/Auth';
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';
import InputElement from 'react-input-mask';

class TeacherAddHomeworkModal extends React.Component {

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
      major_groups: [],
      groups: [],
      birthday:'',
      file: '',
      filename: '',
      checkPass: false,
      checkMajor: true
    }
      this.changeStudent = this.changeStudent.bind(this);
      this.birthdayChange = this.birthdayChange.bind(this);
      this.changeImg = this.changeImg.bind(this);
      this.deleteStudent = this.deleteStudent.bind(this);
      this.editStudentFunc = this.editStudentFunc.bind(this);
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
            majors: res.data.majors
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
              groups: res.data.groups
            });
          });
    }

  editStudentFunc(){
    event.preventDefault();
    if(this.state.filename.length>0){
      var student_id = this.props.student._id
      return new Promise((resolve, reject) => {
        let imageFormData = new FormData();
        imageFormData.append('imageFile', this.state.file);
        imageFormData.append('data', JSON.stringify(this.state.student));
        imageFormData.append('birthday', JSON.stringify(this.state.birthday));
        axios.post('/api/editstudent?student_id=' + student_id, imageFormData, {
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
      const formData = `data=${JSON.stringify(this.state.student)}&student_id=${this.props.student._id}&birthday=${this.state.birthday}`;
      axios.post('/api/editstudent', formData, {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'}
      })
      .then(response => {
        window.location.reload();
      });
    }
  }

  deleteStudent(){
    var student_id = this.props.student._id;
    const formData = `student_id=${student_id}`;
    axios.post('/api/deletestudent', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
  }

  changeStudent(event){
      const field = event.target.name;
      const student = this.state.student;
      student[field] = event.target.value;
      if(this.state.student.major_id.length>0){
        axios.get('/api/getmajorgroups?major_id='+this.state.student.major_id,  {
          responseType: 'json',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          }
        })
          .then(res => {
            this.setState({
              major_groups: res.data.groups,
              checkMajor: false
            });
          });
      }
      else{
        this.setState({
          checkMajor: true
        })
      }
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
      this.setState({
        checkPass: true
      })
    }

   birthdayChange(value){
        this.setState({
          birthday: value,
          checkPass: true
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
    console.log(this.state.checkPass);
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
        <div className="row">
              <button className="btn btn-info waves-effect waves-light m-r-10" style={{float:"right"}} onClick={this.props.onClose}>
                X
              </button>
            </div>
          <div>
          <form action="/"  >
            <div className="form-group col-md-6">
              <label>Дата проведения пары</label>
              <DatePicker value={this.state.lesson} onChange={this.lessonChange} className="form-control mydatepicker"/>
            </div>
            <div className="form-group row">
              <div className="col-md-6">
                <label>Дедлайн</label>
                <DatePicker value={this.state.deadline} onChange={this.deadlineChange}  className="form-control mydatepicker"/>
              </div>
            </div>
            <div className="row" style={{textAlign: 'center', marginBottom: '20px'}}>
              <textarea maxLength="500" type="text" value={this.state.description} placeholder="Опишите задание" rows="6" className="homework-message" onChange={this.handleChange}></textarea>
            </div>
            <div  style={{textAlign: 'center'}}>
              <label>Выберите файл</label>
            </div>
            <div className="fileinput input-group fileinput-new homework-file" data-provides="fileinput" style={{marginBottom: '25px'}}>
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
                  <input type="file" name="" onChange={this.changeFile} />
                </span>
            </div>
              <button type="submit" className="btn btn-info waves-effect waves-light m-r-10" >
              Отправить задание
              </button>
              <button className="btn btn-info waves-effect waves-light m-r-10" >
              Отмена
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherAddHomeworkModal;
