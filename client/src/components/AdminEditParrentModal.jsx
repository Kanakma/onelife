import React from 'react';
import axios from 'axios';
import Auth from '../modules/Auth'
import DatePicker from 'react-bootstrap-date-picker';
import InputElement from 'react-input-mask';
import Select from 'react-select';

class AdminEditParrentModal extends React.Component {

  constructor(props){
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
      checkPass: true,
      value: []
    };
    this.changeParrent = this.changeParrent.bind(this);
    this.editParrentFunc = this.editParrentFunc.bind(this);
    this.deleteParrent = this.deleteParrent.bind(this);
    this.birthdayChange = this.birthdayChange.bind(this);
    this.clearContent = this.clearContent.bind(this);
    this.changeAccount = this.changeAccount.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  };

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

  editParrentFunc(){
    event.preventDefault();
    var parrent_id=this.props.parrent._id;
    const birthday = encodeURIComponent(this.state.birthday);
    const formData = `parrent=${JSON.stringify(this.state.parrent)}&birthday=${birthday}&account=${JSON.stringify(this.state.account)}&students=${JSON.stringify(this.state.value)}&parrent_id=${parrent_id}`;
    axios.post('/api/editparrent', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
  }

  deleteParrent(){
    var parrent_id=this.props.parrent._id;
    const formData = `parrent_id=${parrent_id}`;
    axios.post('/api/deleteparrent', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        window.location.reload();
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
        faculty_id: '',
        passport_id: '',
        gender: '',
        degree: ''
      },
      account: {
        name: '',
        lastname: '',
        email: '',
        phone: '',
        password:'',
        checkpassword:''
      },
      file: '',
      filename: '',
      birthday: '',
      value:[],
      checkContent: false
    })
  }

  changeAccount(event){
    const field = event.target.name;
    const account = this.state.account;
    account[field] = event.target.value;
    if((this.state.account.password.length>0) || (this.state.account.checkpassword.length>0)){
      if((this.state.account.password!=this.state.account.checkpassword)){
        this.setState({
          checkPass: false
        })
        document.getElementById('wrongpass').style.display = "block"
      }
      else if(this.state.account.password===this.state.account.checkpassword){
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
        account: account
      })
  }

  handleSelectChange (value) {
    this.setState({ value });

  }

  render() {
    console.log(this.props.parrent)
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

    function valueProp(student){
      return { value:student._id, label:student.user_id.name + ' ' + student.user_id.lastname}
    }

    var options = this.state.students.map(valueProp)
    return (
      <div style={backdropStyle}>
        <div style={modalStyle}>
              <button className="btn btn-info waves-effect waves-light m-r-10" style={{float:"right"}} onClick={this.props.onClose}>
                X
              </button>
          <div>
            <form action="/parrents"  onSubmit={this.editParrentFunc}>
              <div className="form-group">
              <label>Имя родителя</label>
                <input type="text" className="form-control" placeholder={this.props.parrent.user_id.name}
                      name="name"
                      onChange={this.changeAccount}
                      value={this.state.parrent.name} />
                <span className="bar"></span>
              </div>
              <div className="form-group">
              <label>Фамилия родителя</label>
                <input type="text" className="form-control" placeholder={this.props.parrent.user_id.lastname}
                      name="lastname"
                      onChange={this.changeAccount}
                      value={this.state.parrent.lastname} />
                <span className="bar"></span>
              </div>
              <div className="form-group row">
                <div className="col-md-6">
                  <label>День рождения</label>
                  <DatePicker value={this.state.birthday}
                  placeholder={this.props.parrent.user_id.birthday}
                  onChange={this.birthdayChange}
                  className="form-control mydatepicker"/>
                </div>
              </div>
              <div className="form-group">
                <label>Телефон</label>
                <InputElement mask="+7 (999) 999-99-99"
                      className="form-control"
                      placeholder={this.props.parrent.phone}
                      name="phone"
                      onChange={this.changeAccount}
                      value={this.state.account.phone} />
                <span className="bar"></span>
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <input type="email"
                      className="form-control"
                      placeholder={this.props.parrent.email}
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
                <input type="text" className="form-control"
                      placeholder={this.props.parrent.address}
                      name="address"
                      onChange={this.changeParrent}
                      value={this.state.parrent.address} />
                <span className="bar"></span>
              </div>
              <div className="form-group">
                <label>ИИН</label>
                <input type="text" className="form-control"
                      placeholder={this.props.parrent.user_id.passport_id}
                      name="passport_id"
                      onChange={this.changeParrent}
                      value={this.state.parrent.passport_id} />
                <span className="bar"></span>
              </div>
              <div className="form-group row">
                <div className="col-md-6">
                  <label>Пол</label>
                  <select className="form-control" name="gender" value={this.state.parrent.gender} onChange={this.changeParrent} style={{cursor: 'pointer'}}>
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
              <div className="form-group text-center"  id="wrongpass" style={{display: 'none'}}>
                <p style={{color: 'red'}}>Пароли не совпадают</p>
              </div>
              <button type="submit" className="btn btn-info waves-effect waves-light m-r-10" disabled={!this.state.checkPass}>
                Сохранить изменения
              </button>
              <button type="button" className="btn btn-info waves-effect waves-light m-r-10" onClick={this.deleteParrent}>
                Удалить родителя
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default AdminEditParrentModal;
