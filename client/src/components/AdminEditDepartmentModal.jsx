import React from 'react';
import Auth from '../modules/Auth';
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';
import InputElement from 'react-input-mask';

class AdminEditDepartmentModal extends React.Component {

  constructor(props){
    super(props);
    this.state={
      department: {
        department_code: '',
        department_name: '',
        department_director: '',
        department_email: '',
        department_phone: '',
        department_faculty:''
      },
      faculties:[],
      teachers:[]
    }
    this.editDepartmentFunc=this.editDepartmentFunc.bind(this);
    this.changeDepartment=this.changeDepartment.bind(this);
    this.dateFormat=this.dateFormat.bind(this);
    this.deleteDepartment=this.deleteDepartment.bind(this);
  };

  componentDidMount() {
    axios.get('/faculty/getfaculties',  {
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
    axios.get('/teacher/getteachers',  {
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

  dateFormat(date){
    var fDate = new Date(date);
    var m = ((fDate.getMonth() * 1 + 1) < 10) ? ("0" + (fDate.getMonth() * 1 + 1)) : (fDate.getMonth() * 1 + 1);
    var d = ((fDate.getDate() * 1) < 10) ? ("0" + (fDate.getDate() * 1)) : (fDate.getDate() * 1);
    return m + "/" + d + "/" + fDate.getFullYear()
  }

  editDepartmentFunc(){
    event.preventDefault();
    const department_id = this.props.department._id;
    const dep_odlFaculty = this.props.department.department_faculty;
    const formData = `department=${JSON.stringify(this.state.department)}&department_id=${department_id}&dep_odlFaculty=${dep_odlFaculty}`;
    axios.post('/department/editdepartment', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
  }

  deleteDepartment(){
    if(this.props.department.majors.length>0){
      alert("Вы не можете удалить кафедру пока не удалите или не переопределите все специальности департамента!")
    }else{
      const formData = `department_id=${JSON.stringify(this.props.department._id)}&faculty_id=${JSON.stringify(this.props.department.department_faculty)}`;
      axios.post('/department/deletedepartment', formData, {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          'Authorization': `bearer ${Auth.getToken()}`
        }
      })
    }
  }

  changeDepartment(event){
    const field = event.target.name;
    const department = this.state.department;
    department[field] = event.target.value;
      this.setState({
        department: department
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
      minHeight: 600,
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
            <form action="/departments" onSubmit={this.editDepartmentFunc}>
              <div className="form-group">
                <label>Название кафедры</label>
                <input type="text" className="form-control" placeholder={this.props.department.department_name}
                name="department_name"
                onChange={this.changeDepartment}
                value={this.state.department.department_name} />
                <span className="bar"></span>
              </div>
              <div className="form-group">
                <label>Код кафедры</label>
                <input type="text" className="form-control" placeholder={this.props.department.department_code}
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
                <input type="email" className="form-control" placeholder={this.props.department.department_email}
                name="department_email"
                onChange={this.changeDepartment}
                value={this.state.department.department_email} />
                <span className="bar"></span>
              </div>
              <div className="form-group">
                <label>Телефон</label>
                <InputElement  mask="+7 (999) 999-99-99" className="form-control" placeholder={this.props.department.department_phone}
                name="department_phone"
                onChange={this.changeDepartment}
                value={this.state.department.department_phone} />
                <span className="bar"></span>
              </div>
              <div className="form-group">
                <label>Заведующий кафедры</label>
                <select className="form-control" name="department_director" value={this.props.department.department_director}
                 onChange={this.changeDepartment}>
                  <option value=''>Выберите заведующего кафедры</option>
                  {this.state.teachers.map((teacher, t) =>
                      <option key={t} value={teacher.teacher_id}>{teacher.name} {teacher.lastname}</option>
                  )}
                </select>
                <span className="bar"></span>
              </div>
              <button type="submit" className="btn btn-info waves-effect waves-light m-r-10">
                Сохранить изменения
              </button>
              <button className="btn btn-info waves-effect waves-light m-r-10" onClick={this.deleteDepartment}>
                Удалить Департамент
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminEditDepartmentModal;
