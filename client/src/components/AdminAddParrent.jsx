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
        lastname:'',
        name:'',
        childs:[],
        address:'',
        passport_id:'',
        gender:''
      },
      account: {
        email: '',
        phone: '',
        password:'',
        checkpassword:''
      },
      checkAcc:false,
      birthday: '',
      checkContent: false
    };
    this.changeParrent = this.changeParrent.bind(this);
    this.addParrent = this.addParrent.bind(this);
    this.birthdayChange = this.birthdayChange.bind(this);
    this.entry_yearChange = this.entry_yearChange.bind(this);
    this.clearContent = this.clearContent.bind(this);
    this.changeAccount = this.changeAccount.bind(this);
    this.logChange = this.logChange.bind(this);
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
        parrent: parrent,
        checkContent: true,
        message: '',
        errors: {}
      })
      this.checkContent();
  }
  addParrent(event){
    event.preventDefault();
    const birthday = encodeURIComponent(this.state.birthday);
    const formData = `parrent=${JSON.stringify(this.state.parrent)}&birthday=${birthday}&account=${JSON.stringify(this.state.account)}`;
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
      this.checkContent();
  }

  logChange(value) {
      console.log(value);
  }
  
  entry_yearChange(value){
      this.setState({
        entry_year: value
      });
      this.checkContent();
  }
  clearContent(){
    this.setState({
      parrent: {
        name: '',
        lastname: '',
        faculty_id: '',
        passport_id: '',
        gender: '',
        degree: ''
      },
      account: {
        email: '',
        phone: '',
        password:'',
        checkpassword:''
      },
      file: '',
      filename: '',
      birthday: '',
      entry_year: '',
      checkContent: false
    })
  }
  checkContent(){
    if((this.state.parrent.passport_id.length > 0) && (this.state.parrent.name.length > 0) && (this.state.parrent.lastname.length > 0)
        && (this.state.birthday.length > 0) && (this.state.entry_year.length > 0) && (this.state.parrent.gender.length > 0)
        && (this.state.parrent.degree.length > 0) && (this.state.account.email.length > 0) && (this.state.account.phone.length > 0) && (this.state.account.password.length >0) && (this.state.account.checkpassword.length >0) ){
          if(this.state.account.password === this.state.account.checkpassword){
            document.getElementById('wrongpass').style.display = "none"
            this.setState({
              checkContent: true
            })
          }
          else if(this.state.account.password != this.state.account.checkpassword){
              document.getElementById('wrongpass').style.display = "block"
              this.setState({
                checkContent: false
              })

          }

        }else {
          this.setState({
            checkContent: false
          })
        }
  }
  changeAccount(event){
    const field = event.target.name;
    const account = this.state.account;
    account[field] = event.target.value;
      this.setState({
        account: account,
        checkAcc: true,
        accMessage: '',
        errors: {}
      })
    this.checkContent();
  }

  render() {    
    function valueProp(student){
      return { value:student._id, label:student.user_id.name + ' ' + student.user_id.lastname, className:'optionSelect'}
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
          <label>Имя преподавателя</label>
            <input type="text" className="form-control" placeholder="Введите имя преподавателя"
                  name="name"
                  onChange={this.changeParrent}
                  value={this.state.parrent.name} />
            <span className="bar"></span>
          </div>
          <div className="form-group">
          <label>Фамилия преподавателя</label>
            <input type="text" className="form-control" placeholder="Введите фамилию преподавателя"
                  name="lastname"
                  onChange={this.changeParrent}
                  value={this.state.parrent.lastname} />
            <span className="bar"></span>
          </div>
          <div className="form-group row">
            <div className="col-md-6">
              <label>День рождения</label>
              <DatePicker value={this.state.birthday} onChange={this.birthdayChange} className="form-control mydatepicker"/>
            </div>
          </div>
              <Select
                options={options}
                onChange={this.logChange}
                multi={true}
              />
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
        </form>
      </div>
      </div>
    </div>);
  }
}

export default AdminAddParrent;
// {this.state.students ? (
//             <div className="form-group">
//               <label>Студент</label>
//               <select className="form-control" multiple name="childs" value={this.state.parrent.childs} onChange={this.changeParrent}>
//                 {this.state.students.map((student, f) =>
//                   <option key={f} value={student._id}>{student._id}</option>
//                 )}
//               </select>
//               <span className="bar"></span>
//             </div>
//             ) : (
//             <div className="form-group">
//               <label>Студент</label>
//               <select className="form-control" name="faculty_id" value={this.state.parrent.childs} onChange={this.changeParrent}>
//                 <option value=''>Студенты не добавлены</option>
//               </select>
//               <span className="bar"></span>
//             </div>
//           )}