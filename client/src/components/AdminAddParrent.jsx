import React from 'react';
import axios from 'axios';
import Auth from '../modules/Auth'
import DatePicker from 'react-bootstrap-date-picker';
import InputElement from 'react-input-mask';
import Select from 'react-select';

class AdminAddParrent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      message: '',
      errors: {},
      students:[],
      parrent:{
        address:'',
        passport_id:'',
        gender:''
      },
      account: {
        lastname:'',
        name:'',
        email: '',
        phone: '',
        password:'',
        checkpassword:''
      },
      birthday: '',
      value: []
    };
    this.changeParrent = this.changeParrent.bind(this);
    this.addParrent = this.addParrent.bind(this);
    this.birthdayChange = this.birthdayChange.bind(this);
    this.clearContent = this.clearContent.bind(this);
    this.changeAccount = this.changeAccount.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  componentDidMount() {
    axios.get('/api/getstudents',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          students: res.data.students
        });
      });
  }
  changeParrent(event){
    const field = event.target.name;
    const parrent = this.state.parrent;
    parrent[field] = event.target.value;
      this.setState({
        parrent: parrent
      })
  }
  addParrent(event){
    event.preventDefault();
    const birthday = encodeURIComponent(this.state.birthday);
    const formData = `parrent=${JSON.stringify(this.state.parrent)}&birthday=${birthday}&account=${JSON.stringify(this.state.account)}&students=${JSON.stringify(this.state.value)}`;
    axios.post('/api/addparrent', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'}
    })
      .then(res => {
        this.setState({
          message: res.data.message,
          errors: {}
        });
        this.clearContent();
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
      this.setState({
        birthday: value
      });
  }
  
  clearContent(){
    this.setState({ 
      parrent: {
        address:'',
        passport_id:'',
        gender:''
      },
      account: {
        lastname:'',
        name:'',
        email: '',
        phone: '',
        password:'',
        checkpassword:''
      },
      birthday: '',
      value:[]
    })
  }

  changeAccount(event){
    const field = event.target.name;
    const account = this.state.account;
    account[field] = event.target.value;
      this.setState({
        account: account
      })
  }

  handleSelectChange (value) {
    this.setState({ value });

  }

  render() {
    function valueProp(student){
      return { value:student._id, label:student.user_id.name + ' ' + student.user_id.lastname}
    }
    
    var options = this.state.students.map(valueProp)

    return (
      <div className="container clearfix">
      <div className="bg-title">
        <h4>Добавить родителя</h4>
      </div>
      <div className="my-content " >
      <div className = "table-responsive">
      <h5 style={{marginBottom: '3%'}} className="text-uppercase">Основная информация</h5>
        {this.state.message && <h5 style={{ fontSize: '14px', color: 'green' }}>{this.state.message}</h5>}
        {this.state.errors.summary && <h5 style={{ fontSize: '14px', color: 'red' }}>{this.state.errors.summary}</h5>}
        <form action="/"  onSubmit={this.addParrent}>
          <div className="form-group">
          <label>Имя родителя</label>
            <input type="text" className="form-control" placeholder="Введите имя преподавателя"
                  name="name"
                  onChange={this.changeAccount}
                  value={this.state.account.name} />
            <span className="bar"></span>
          </div>
          <div className="form-group">
          <label>Фамилия родителя</label>
            <input type="text" className="form-control" placeholder="Введите фамилию преподавателя"
                  name="lastname"
                  onChange={this.changeAccount}
                  value={this.state.account.lastname} />
            <span className="bar"></span>
          </div>
          <div className="form-group row">
            <div className="col-md-6">
              <label>День рождения</label>
              <DatePicker value={this.state.birthday} onChange={this.birthdayChange} className="form-control mydatepicker"/>
            </div>
          </div>
          <div className="form-group">
            <label>Телефон</label>
            <InputElement mask="+7 (999) 999-99-99" className="form-control" placeholder="Введите номер телефона"
                  name="phone"
                  onChange={this.changeAccount}
                  value={this.state.account.phone} />
            <span className="bar"></span>
          </div>
          <div className="form-group">
            <label>E-mail</label>
            <input type="email" className="form-control" placeholder="Введите E-mail"
                  name="email"
                  onChange={this.changeAccount}
                  value={this.state.account.email} />
            <span className="bar"></span>
          </div>
          <div className="form-group row">
            <div className="col-md-6">
                <label>Студенты</label>
                <Select
                  options={options}
                  onChange={this.handleSelectChange}
                  multi={true}
                  multiSelectAll={true}
                  value={this.state.value}
                  placeholder=""
                />
            </div>
          </div>
          <div className="form-group">
            <label>Адрес</label>
            <input type="text" className="form-control" placeholder="Введите имя преподавателя"
                  name="address"
                  onChange={this.changeParrent}
                  value={this.state.parrent.address} />
            <span className="bar"></span>
          </div>
          <div className="form-group">
            <label>ИИН</label>
            <input type="text" className="form-control" placeholder="Введите ИИН"
                  name="passport_id"
                  onChange={this.changeParrent}
                  value={this.state.parrent.passport_id} />
            <span className="bar"></span>
          </div>
          <div className="form-group row">
            <div className="col-md-6">
              <label>Пол</label>
              <select className="form-control" name="gender" value={this.state.parrent.gender} onChange={this.changeParrent}>
                <option value="">Выберите пол</option>
                <option value="Мужчина">Мужчина</option>
                <option value="Женщина">Женщина</option>
              </select>
              <span className="bar"></span>
            </div>
          </div>
          <div className="form-group">
            <label>Пароль</label>
            <input type="password" className="form-control" placeholder="Введите пароль"
                  name="password"
                  onChange={this.changeAccount}
                  value={this.state.account.password} />
            <span className="bar"></span>
          </div>
          <div className="form-group">
            <label>Подтверждение пароля</label>
            <input type="password" className="form-control" placeholder="Повторите пароль"
                  name="checkpassword"
                  onChange={this.changeAccount}
                  value={this.state.account.checkpassword} />
            <span className="bar"></span>
          </div>
          <div>
            <button type="submit" className="btn btn-info waves-effect waves-light m-r-10" style={{paddingLeft: '5%', paddingRight: '5%'}}>Добавить</button>
            <button type="button" onClick={this.clearContent} className="btn btn-inverse waves-effect waves-light m-r-10" style={{paddingLeft: '5%', paddingRight: '5%'}}>Отмена</button>
          </div>
        </form>
      </div>
      </div>
    </div>);
  }
}

export default AdminAddParrent;
