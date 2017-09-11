import React from 'react';
import Auth from '../modules/Auth';
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';
import InputElement from 'react-input-mask';

class AdminEditEmployeeModal extends React.Component {

  constructor(props){
    super(props);
    this.state={
      employee:{
        lastname:'',
        name:'',
        gender:'',
        address_de_jure:'',
        address_de_facto:'',
        phone:'',
        email:'',
        passport_id:'',
        id_number:'',
        gave_by:'',
        employee_type:'',
        employement_type:''
      },
      date_of_id:'',
      birthday:'',
      nationality:'',
      anotherCheck:true
    }
    this.changeEmployee=this.changeEmployee.bind(this);
    this.birthdayChange=this.birthdayChange.bind(this);
    this.changeNationality=this.changeNationality.bind(this);
    this.writeNation=this.writeNation.bind(this);
    this.clearNation=this.clearNation.bind(this);
    this.IdDateChange=this.IdDateChange.bind(this);
    this.editEmployeeFunc=this.editEmployeeFunc.bind(this);
    this.deleteEmployee=this.deleteEmployee.bind(this);
  }

  editEmployeeFunc(event){
    event.preventDefault();
    const formData = `data=${JSON.stringify(this.state.employee)}&birthday=${this.state.birthday}&date_of_id=${this.state.date_of_id}&nationality=${this.state.nationality}&employee_id=${this.props.employee._id}`;
    axios.post('/api/editemployee', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'}
    })
      .then(res => {
        window.location.reload();
      })
  }

  deleteEmployee(){
    var employee_id = this.props.employee._id;
    const formData = `employee_id=${employee_id}`;
    axios.post('/api/deleteemployee', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
    .then(res =>{
      window.location.reload();
    })
  }

  changeEmployee(event){
    var employee = this.state.employee;
    var field = event.target.name;
    employee[field] = event.target.value;
    this.setState({
      employee:employee
    })
  }

  birthdayChange(value){
    this.setState({
      birthday: value
    });
  }

  changeNationality(event){
    if(event.target.value=="Другое"){
      this.setState({
        nationality:'Другое',
        anotherCheck:false
      })
    } else{
      this.setState({
        nationality:event.target.value,
        anotherCheck:true
      })
    }
  }
  writeNation(event){
    this.setState({
      nationality:event.target.value
    })
  }
  clearNation(event){
    this.setState({
      nationality:''
    })
  }
  IdDateChange(value){
    this.setState({
      date_of_id: value
    })
  }
  render(){
    console.log(this.state.employee)
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
          <button className="btn btn-info waves-effect waves-light m-r-10" style={{float:"right"}} onClick={this.props.onClose}>
            X
          </button>
          <div>
            <form action="/employees" onSubmit={this.editEmployeeFunc}>
              <div className="form-group">
                <label>Фамилия</label>
                <input type="text" className="form-control" placeholder={this.props.employee.lastname}
                      name="lastname"
                      onChange={this.changeEmployee}
                      value={this.state.employee.lastname} />
                <span className="bar"></span>
              </div>
              <div className="form-group">
                <label>Имя</label>
                <input type="text" className="form-control" placeholder={this.props.employee.name}
                      name="name"
                      onChange={this.changeEmployee}
                      value={this.state.employee.name} />
                <span className="bar"></span>
              </div>
              <div className="form-group row">
                <div className="col-md-6">
                  <label>День рождения</label>
                  <DatePicker value={this.state.birthday}
                   onChange={this.birthdayChange}
                   className="form-control mydatepicker" />
                </div>
                <div className="col-md-6">
                  <label>Пол</label>
                  <select className="form-control" name="gender" value={this.state.employee.gender}
                   onChange={this.changeEmployee} style={{cursor: 'pointer'}}>
                    <option value="">Выберите пол</option>
                    <option value="Мужчина">Мужчина</option>
                    <option value="Женщина">Женщина</option>
                  </select>
                  <span className="bar"></span>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-6">
                  <label>Национальность</label>
                  <select className="form-control" name="nationality" value={this.state.nationality}
                    onChange={this.changeNationality} style={{cursor: 'pointer'}}>
                    <option value="">Выберите национальность</option>
                    <option value="Казах">Казах</option>
                    <option value="Русский">Русский</option>
                    <option value="Уйгур">Уйгур</option>
                    <option value="Кореец">Кореец</option>
                    <option value="Украинец">Украинец</option>
                    <option value="Еврей">Еврей</option>
                    <option value="Киргиз">Киргиз</option>
                    <option value="Татар">Татар</option>
                    <option value="Другое">Другое</option>
                  </select>
                  <span className="bar"></span>
                </div>
                <div className="col-md-6">
                  <label>Введите другое</label>
                  <input type="text" className="form-control" placeholder={this.props.employee.nationality}
                  disabled={this.state.anotherCheck}
                  name="nationality"
                  onChange={this.writeNation}
                  onClick={this.clearNation}
                  value={this.state.nationality}/>
                  <span className="bar"></span>
                </div>
              </div>
              <div className="form-group">
                <label>Адресс прописки</label>
                <input type="text" className="form-control" placeholder={this.props.employee.address_de_jure}
                      name="address_de_jure"
                      onChange={this.changeEmployee}
                      value={this.state.employee.address_de_jure} />
                <span className="bar"></span>
              </div>
              <div className="form-group">
                <label>Адресс проживания</label>
                <input type="text" className="form-control" placeholder={this.props.employee.address_de_facto}
                      name="address_de_facto"
                      onChange={this.changeEmployee}
                      value={this.state.employee.address_de_facto} />
                <span className="bar"></span>
              </div>
              <div className="form-group row">
                <div className="col-md-6">
                  <label>Телефон</label>
                  <InputElement mask="+7 (999) 999-99-99" className="form-control" placeholder={this.props.employee.phone}
                        name="phone"
                        onChange={this.changeEmployee}
                        value={this.state.employee.phone} />
                  <span className="bar"></span>
                </div>
                <div className="col-md-6">
                  <label>E-mail</label>
                  <input type="email" className="form-control" placeholder={this.props.employee.email}
                        name="email"
                        onChange={this.changeEmployee}
                        value={this.state.employee.email} />
                  <span className="bar"></span>
                </div>
              </div>
              <div className="form-group">
                <label>ИИН</label>
                  <input type="number" className="form-control" placeholder={this.props.employee.passport_id}
                        name="passport_id"
                        onChange={this.changeEmployee}
                        value={this.state.employee.passport_id} />
                  <span className="bar"></span>
              </div>
              <div className="form-group row">
                <div className="col-md-4">
                  <label>Номер удостоверения</label>
                    <input type="number" className="form-control" placeholder={this.props.employee.id_number}
                          name="id_number"
                          onChange={this.changeEmployee}
                          value={this.state.employee.id_number} />
                    <span className="bar"></span>
                </div>
                <div className="col-md-4">
                  <label>Дата выдачи</label>
                  <DatePicker value={this.state.date_of_id}
                   onChange={this.IdDateChange}
                   className="form-control mydatepicker" />
                </div>
                <div className="col-md-4">
                  <label>Каким гос.органом выдан</label>
                  <input type="text" className="form-control" placeholder={this.props.employee.gave_by}
                        name="gave_by"
                        onChange={this.changeEmployee}
                        value={this.state.employee.gave_by} />
                  <span className="bar"></span>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-6">
                  <label>Тип</label>
                  <select className="form-control" name="employee_type" value={this.state.employee.employee_type}
                      onChange={this.changeEmployee} style={{cursor: 'pointer'}}>
                      <option value="">Выберите тип</option>
                      <option value="В штате">В штате</option>
                      <option value="За штатом">За штатом</option>
                    </select>
                  <span className="bar"></span>
                </div>
                <div className="col-md-6">
                  <label>Тип занятости</label>
                  <select className="form-control" name="employement_type" value={this.state.employee.employement_type}
                      onChange={this.changeEmployee} style={{cursor: 'pointer'}}>
                      <option value="">Выберите тип занятости</option>
                      <option value="Полная ставка">Полная ставка</option>
                      <option value="Пол ставки">Пол ставки</option>
                      <option value="Совмещает">Совмещает</option>
                    </select>
                  <span className="bar"></span>
                </div>
              </div>
              <button type="submit" className="btn btn-info waves-effect waves-light m-r-10">
                Сохранить изменения
              </button>
              <button type="button" className="btn btn-info waves-effect waves-light m-r-10" onClick={this.deleteEmployee}>
                Удалить сотрудника
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminEditEmployeeModal;
