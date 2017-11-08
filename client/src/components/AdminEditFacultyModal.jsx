import React from 'react';
import Auth from '../modules/Auth';
import axios from 'axios';
import InputElement from 'react-input-mask';


class AdminEditFacultyModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      editedFaculty:{
        faculty_code:'',
        faculty_name:'',
        faculty_dean:'',
        faculty_phone:'',
        faculty_email:''
      },
      teachers: []
    };
    this.editFacultyFunc=this.editFacultyFunc.bind(this);
    this.changeFaculty=this.changeFaculty.bind(this);
    this.deleteFaculty=this.deleteFaculty.bind(this);
  };

  componentDidMount() {
    axios.get('/teacher/getteachers',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          teachers: res.data.teachers
        });
      });
  }

  editFacultyFunc(){
    event.preventDefault();
    const faculty_id = this.props.faculty._id;
    const formData = `editedFaculty=${JSON.stringify(this.state.editedFaculty)}&faculty_id=${faculty_id}`;
    axios.post('/faculty/editfaculty', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
  }

  deleteFaculty(){
    if(this.props.faculty.departments.length>0){
      alert("Вы не можете удалить факультет пока не удалите или не переопределите все кафедры факультета!")
    } else{
      const formData = `faculty_id=${JSON.stringify(this.props.faculty._id)}`;
      axios.post('/faculty/deletefaculty', formData, {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          'Authorization': `bearer ${Auth.getToken()}`
        }
      })
    }
  }

  changeFaculty(event){
    const field = event.target.name;
    const editedFaculty = this.state.editedFaculty;
    editedFaculty[field] = event.target.value;
    this.setState({
      editedFaculty
    })
  }

  render(){
    console.log(this.props.faculty)
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
      minHeight: 500,
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
            <form action="/faculties" onSubmit={this.editFacultyFunc}>
              <div className="form-group">
                <label>Код факультета</label>
                <input type="text" className="form-control" placeholder={this.props.faculty.faculty_code}
                name="faculty_code"
                onChange={this.changeFaculty}
                value={this.state.editedFaculty.faculty_code} />
                <span className="bar"></span>
              </div>
              <div className="form-group">
                <label>Название факультета</label>
                <input type="text" className="form-control" placeholder={this.props.faculty.faculty_name}
                name="faculty_name"
                onChange={this.changeFaculty}
                value={this.state.editedFaculty.faculty_name} />
                <span className="bar"></span>
              </div>
              <div className="form-group">
                <label>Декан факультета</label>
                <select className="form-control" name="faculty_dean" value={this.state.editedFaculty.faculty_dean} onChange={this.changeFaculty}>
                  <option value=''>Выберите декана факультета</option>
                  {this.state.teachers.map((teacher, t) =>
                      <option key={t} value={teacher._id}>{teacher.user_id.name} {teacher.user_id.lastname}</option>
                  )}
                </select>
                <span className="bar"></span>
              </div>
              <div className="form-group">
                <label>Телефон</label>
                <InputElement mask="+7 (999) 999-99-99" className="form-control" placeholder={this.props.faculty.faculty_phone}
                name="faculty_phone"
                onChange={this.changeFaculty}
                value={this.state.editedFaculty.faculty_phone} />
                <span className="bar"></span>
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <input type="text" className="form-control" placeholder={this.props.faculty.faculty_email}
                name="faculty_email"
                onChange={this.changeFaculty}
                value={this.state.editedFaculty.faculty_email} />
                <span className="bar"></span>
              </div>
              <button type="submit" className="btn btn-info waves-effect waves-light m-r-10">
                Сохранить изменения
              </button>
              <button className="btn btn-info waves-effect waves-light m-r-10" onClick={this.deleteFaculty}>
                Удалить факультет
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminEditFacultyModal;
