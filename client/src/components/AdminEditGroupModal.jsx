import React from 'react';
import Auth from '../modules/Auth';
import axios from 'axios';
import InputElement from 'react-input-mask';


class AdminEditGroupModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      editedGroup:{
        group_name:'',
        curator:'',
        course_number: 0,
        major:''
      },
      teachers: [],
      majors: []
    };
    this.editGroupFunc=this.editGroupFunc.bind(this);
    this.changeGroup=this.changeGroup.bind(this);
    this.deleteGroup=this.deleteGroup.bind(this);
  };

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
  }

  editGroupFunc(){
    event.preventDefault();
    const group_id = this.props.group.group_id;
    const formData = `editedGroup=${JSON.stringify(this.state.editedGroup)}&group_id=${group_id}`;
    axios.post('/api/editgroup', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
  }

  deleteGroup(){
    const formData = `group_id=${JSON.stringify(this.props.group.group_id)}`;
    axios.post('/api/deletegroup', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
  }

  changeGroup(event){
    const field = event.target.name;
    const editedGroup = this.state.editedGroup;
    editedGroup[field] = event.target.value;
    this.setState({
      editedGroup
    })
  }

  render(){
    // console.log(this.props.group.group_id)
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
            <form action="/groups" onSubmit={this.editGroupFunc}>
              <div className="form-group">
                <label>Название факультета</label>
                <input type="text" className="form-control" placeholder={this.props.group.group_name}
                name="group_name"
                onChange={this.changeGroup}
                value={this.state.editedGroup.group_name} />
                <span className="bar"></span>
              </div>
              <div className="form-group">
                <label>Специальность</label>
                <select className="form-control" name="major" value={this.state.editedGroup.major} onChange={this.changeGroup}>
                  <option value=''>Выберите специальность</option>
                  {this.state.majors.map((major, m) =>
                    <option key={m} value={major.major_id}>{major.major_name}</option>
                  )}
                </select>
                <span className="bar"></span>
              </div>
              <div className="form-group">
                <div className="col-md-6">
                  <label>Курс</label>
                  <input type="number" className="form-control" placeholder="Курс"
                         name="course_number" value={this.state.editedGroup.course_number} onChange={this.changeGroup} />
                  <span className="bar"></span>
                </div>
                {
                  this.state.teachers ? (
                    <div className="col-md-6">
                      <label>Куратор группы</label>
                      <select className="form-control" name="curator" value={this.state.editedGroup.curator} onChange={this.changeGroup}>
                        <option value=''>Выберите куратора группы</option>
                        {this.state.teachers.map((teacher, t) =>
                            <option key={t} value={teacher.teacher_id}>{teacher.name} {teacher.lastname}</option>
                        )}
                      </select>
                      <span className="bar"></span>
                    </div>
                    ):(
                    <div className="form-group">
                      <label>Куратор группы</label>
                      <select className="form-control" name="curator" value={this.state.editedGroup.curator} onChange={this.changeGroup}>
                        <option value=''>Добавьте преподавателей</option>
                      </select>
                      <span className="bar"></span>
                    </div>
                  )
                }
              </div>
              <button type="submit" className="btn btn-info waves-effect waves-light m-r-10" style={{marginTop: '15px'}}>
                Сохранить изменения
              </button>
              <button className="btn btn-info waves-effect waves-light m-r-10" style={{marginTop: '15px'}} onClick={this.deleteGroup}>
                Удалить группу
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminEditGroupModal;
