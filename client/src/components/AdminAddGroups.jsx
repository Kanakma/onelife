import React from 'react';
import axios from 'axios';
import Auth from '../modules/Auth';
import InputElement from 'react-input-mask';

class AdminAddGroups extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      group:{
        group_name: '',
        curator: '',
        major: '',
        course_number: 0
      },
      majors: [],
      teachers: [],
      message: '',
      errors: {}
    };
    this.changeGroup = this.changeGroup.bind(this);
    this.changeCheckbox = this.changeCheckbox.bind(this);
    this.addGroup = this.addGroup.bind(this);
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
            majors: res.data.allMjrs
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

  changeGroup(event){
    const field = event.target.name;
    const group = this.state.group;
    group[field] = event.target.value;
    if((this.state.group.curator.length > 0) && (this.state.group.group_name.length > 0) && (this.state.group.course_number>0) && (this.state.group.major.length>0)){
      this.setState({
        group: group,
        checkContent: true,
        message: '',
        errors: {}
      })
    } else {
      this.setState({
        group: group,
        checkContent: false,
        message: '',
        errors: {}
      })
    }
  }

  changeCheckbox(event){
    if((this.state.group.group_name.length > 0)
     && (this.state.group.major.length > 0)
        && (this.state.group.curator.length > 0)
      ){
          this.setState({
            checkContent: true })
        } else {
          this.setState({
            checkContent: false })
        }

  }

  addGroup(event){
    event.preventDefault();
    const formData = `group=${JSON.stringify(this.state.group)}`;
    axios.post('/api/addgroup', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'}
    })
      .then(res => {
          this.setState({
            message: res.data.message,
            errors: {},
            checkContent: false
          });
      })
      this.clearContent()
  }
  clearContent(){
    this.setState({
      group:{
        group_name: '',
        curator: '',
        major: '',
        course_number: 0
      },
      errors: {}
    })
  }
  render() {
    return (
      <div>{
        this.state.majors ?(
      <div className="container clearfix">
      <div className="bg-title">
        <h4>Добавить группу</h4>
      </div>
      <div className=" my-content" >
      <div className= "table-responsive">
      <h5 style={{marginBottom: '3%'}} className="text-uppercase">Описание группы</h5>
      {this.state.message && <h5 style={{ fontSize: '14px', color: 'green' }}>{this.state.message}</h5>}
      {this.state.errors.summary && <h5 style={{ fontSize: '14px', color: 'red' }}>{this.state.errors.summary}</h5>}
      <form action="/" onSubmit={this.addGroup}>
        <div className="form-group">
          <label>Название группы</label>
          <input type="text" className="form-control" placeholder="Название группы"
          name="group_name"
          onChange={this.changeGroup}
          value={this.state.group.group_name} />
          <span className="bar"></span>
        </div>
        <div className="form-group">
          <label>Специальность</label>
          <select className="form-control" name="major" value={this.state.group.major} onChange={this.changeGroup}>
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
                   name="course_number" value={this.state.group.course_number} onChange={this.changeGroup} />
            <span className="bar"></span>
          </div>
          {
            this.state.teachers ? (
              <div className="col-md-6">
                <label>Куратор группы</label>
                <select className="form-control" name="curator" value={this.state.group.curator} onChange={this.changeGroup}>
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
                <select className="form-control" name="curator" value={this.state.group.curator} onChange={this.changeGroup}>
                  <option value=''>Добавьте преподавателей</option>
                </select>
                <span className="bar"></span>
              </div>
            )
          }
        </div>
        <div>
          <button type="submit" className="btn btn-info waves-effect waves-light m-r-10" disabled={!this.state.checkContent} style={{paddingLeft: '5%', paddingRight: '5%', marginTop: '25px'}}>Добавить</button>
          <button type="button" onClick={this.clearContent} className="btn btn-inverse waves-effect waves-light m-r-10" style={{paddingLeft: '5%', paddingRight: '5%', marginTop: '25px'}}>Отмена</button>
        </div>
      </form>
      </div>
      </div>
      </div>
    ) : (
     <div className="container clearfix">
        <div className="bg-title">
          <h4>Добавить группу</h4>
        </div>
        <div className=" my-content">
          <div className = "table-responsive">
            <h4>Нет специальностей. Добавьте специальности</h4>
          </div>
        </div>
      </div>
    )
  }
  </div>
    );
  }
}

export default AdminAddGroups;
