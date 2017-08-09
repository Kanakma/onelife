import React from 'react';
import axios from 'axios';
import Auth from '../modules/Auth'

class AdminAddMajor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      message: '',
      errors: {},
      departments:[],
      major: {
        major_name: '',
        major_code: '',
        major_group: '',
        major_department:''
      },
      checkContent: false
    };
    this.changeMajor = this.changeMajor.bind(this);
    this.addMajor = this.addMajor.bind(this);
    this.clearContent = this.clearContent.bind(this);
  }

  changeMajor(event){
    const field = event.target.name;
    const major = this.state.major;
    major[field] = event.target.value;
    if((this.state.major.major_name.length > 0) && (this.state.major.major_code.length > 0) && (this.state.major.major_group.length > 0) && (this.state.major.major_department.length > 0)){
      this.setState({
        major: major,
        checkContent: true,
        message: '',
        errors: {}
      })
    }else {
      this.setState({
        major: major,
        checkContent: false,
        message: '',
        errors: {}
      })
    }
  }
  componentDidMount() {
    axios.get('/api/getdepartments',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          departments: res.data.allDprtmnts
        });
      });
  }

  addMajor(event){
    event.preventDefault();
    const major_name = encodeURIComponent(this.state.major.major_name);
    const major_code = encodeURIComponent(this.state.major.major_code);
    const major_group = encodeURIComponent(this.state.major.major_group);
    const major_department = encodeURIComponent(this.state.major.major_department);
    const formData = `major_name=${major_name}&major_code=${major_code}&major_group=${major_group}&major_department=${major_department}`;
    axios.post('/api/addmajor', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'}
    })
      .then(res => {
          this.setState({
            message: res.data.message,
            errors: {},
            major: {
              major_name: '',
              major_code: '',
              major_group: '',
              major_department:''
            },
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
      major: {
        major_name: '',
        major_code: '',
        major_group: '',
        major_department:''
      },
      checkContent: false
    })
  }
  render() {
    return (
      <div>
      {
        this.state.departments ? (
          <div className="container clearfix">
            <div className="bg-title">
              <h4>Добавить специальность</h4>
            </div>
            <div className="my-content">
              <div className = "table-responsive">
                <h5 style={{marginBottom: '3%'}} className="text-uppercase">Описание специальности</h5>
                {this.state.message && <h5 style={{ fontSize: '14px', color: 'green' }}>{this.state.message}</h5>}
                {this.state.errors.summary && <h5 style={{ fontSize: '14px', color: 'red' }}>{this.state.errors.summary}</h5>}
                <form action="/"  onSubmit={this.addMajor}>
                  <div className="form-group">
                    <label>Название специальности</label>
                      <input type="text" className="form-control mydatepicker" placeholder="Название специальности"
                      name="major_name"
                      onChange={this.changeMajor}
                      value={this.state.major.major_name}/>
                      <span className="bar"></span>
                  </div>
                  <div className="form-group">
                    <label>Код специальности</label>
                    <input type="text" className="form-control mydatepicker" placeholder="Код специальности"
                    name="major_code"
                    onChange={this.changeMajor}
                    value={this.state.major.major_code}/>
                    <span className="bar"></span>
                  </div>
                  <div className="form-group">
                    <label>Кафедра</label>
                    <select className="form-control mydatepicker" name="major_department" value={this.state.major.major_department} onChange={this.changeMajor}>
                      <option value=''>Выберите кафедру</option>
                        {this.state.departments.map((department, f) =>
                          <option key={f} value={department._id}>{department.department_name}</option>
                        )}
                    </select>
                    <span className="bar"></span>
                  </div>
                  <div className="form-group">
                    <select className="form-control mydatepicker" name="major_group" value={this.state.major.major_group} onChange={this.changeMajor}>
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
                  <div>
                    <button type="submit" className="btn btn-info waves-effect waves-light m-r-10" disabled={!this.state.checkContent} style={{paddingLeft: '5%', paddingRight: '5%'}}>Добавить</button>
                    <button type="button" onClick={this.clearContent} className="btn btn-inverse waves-effect waves-light m-r-10" style={{paddingLeft: '5%', paddingRight: '5%'}}>Отмена</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          ) : (
          <div className="container clearfix">
            <div className="col-md-10 col-md-offset-2 bg-title">
              <h4>Нет департаментов. Сначала добавьте департаменты</h4>
            </div>
          </div>
          )
        }
      </div>
    );
  }
}

export default AdminAddMajor;
