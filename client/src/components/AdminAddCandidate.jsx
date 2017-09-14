import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';
import InputElement from 'react-input-mask';
import DamFunc from '../modules/DamFunc';

class AdminAddCandidate extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        errors: {},
        message: '',
        candidate:{
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
          attestat:'',
          attestat_type:''
        },
        documents:[],
        date_of_id:'',
        birthday:'',
        nationality:'',
        anotherCheck:true,
        checkContent:true
      }
      this.changeCandidate=this.changeCandidate.bind(this);
      this.birthdayChange=this.birthdayChange.bind(this);
      this.changeNationality=this.changeNationality.bind(this);
      this.writeNation=this.writeNation.bind(this);
      this.clearNation=this.clearNation.bind(this);
      this.IdDateChange=this.IdDateChange.bind(this);
      this.addCandidate=this.addCandidate.bind(this);
      this.clearContent=this.clearContent.bind(this);
      this.checkContent=this.checkContent.bind(this);
      this.addDocumentToList=this.addDocumentToList.bind(this);
    }

    addCandidate(event){
      event.preventDefault()
      const formData = `documents=${JSON.stringify(this.state.documents)}&data=${JSON.stringify(this.state.candidate)}&birthday=${this.state.birthday}&date_of_id=${this.state.date_of_id}&nationality=${this.state.nationality}`;
      axios.post('/api/addcandidate', formData, {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'}
      })
        .then(res => {
          this.setState({
            message:res.data.message,
            errors: {}
          })
          this.clearContent()
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
        candidate:{
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
          attestat:'',
          attestat_type:''
        },
        date_of_id:'',
        birthday:'',
        nationality:'',
        anotherCheck:true,
        documents:[]
      })
      this.checkContent()
    }
    changeCandidate(event){
      var candidate = this.state.candidate;
      var field = event.target.name;
      candidate[field] = event.target.value;
      this.setState({
        candidate:candidate
      })
      this.checkContent()
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
      this.checkContent()
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
    checkContent(){
      if(this.state.candidate.lastname.length>0 && this.state.candidate.name.length>0
        && this.state.candidate.gender.length>0 && this.state.candidate.address_de_jure.length>0
        && this.state.candidate.address_de_facto.length>0 && this.state.candidate.email.length>0 
        && this.state.candidate.passport_id.length>0
        && this.state.candidate.id_number.length>0 && this.state.candidate.gave_by.length>0
        && this.state.candidate.attestat_type.length>0 && this.state.candidate.attestat.length>0
        && this.state.documents.length>0
      ){
        this.setState({
          checkContent: false
        })
      }else {
        this.setState({
          checkContent: true
        })
      }
    }
    addDocumentToList(event){
      var documents = this.state.documents
      var temp = DamFunc.IndInObjArr(documents,  event.target.value, 'document');
      if(temp){
       documents.splice(temp[0], 1);
       if(documents.length!=0){
         this.setState({
           documents: documents
         })
       }else{
         this.setState({
           documents: documents
         })
       }
      }
      else{
       documents.push({
         document: event.target.value
       });
       if(documents.length!=0){
         this.setState({
           documents: documents
         })
       }else{
         this.setState({
           documents: documents
         })
       }
      }
    }
  render() {
    return (
      <div className="container clearfix">
        <div className="bg-title">
          <h4>Добавить абитуриента</h4>
        </div>
        <div className="my-content " >
          <div className= "table-responsive">
            <h5 style={{marginBottom: '3%'}} className="text-uppercase">Основная информация</h5>
            {this.state.message && <h5 style={{ fontSize: '14px', color: 'green' }}>{this.state.message}</h5>}
            {this.state.errors.summary && <h5 style={{ fontSize: '14px', color: 'red' }}>{this.state.errors.summary}</h5>}
            <form action="/"  onSubmit={this.addCandidate}>
              <div className="form-group">
                <label>Фамилия</label>
                <input type="text" className="form-control" placeholder="Фамилия"
                      name="lastname"
                      onChange={this.changeCandidate}
                      value={this.state.candidate.lastname} />
                <span className="bar"></span>
              </div>
              <div className="form-group">
                <label>Имя</label>
                <input type="text" className="form-control" placeholder="Имя"
                      name="name"
                      onChange={this.changeCandidate}
                      value={this.state.candidate.name} />
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
                  <select className="form-control" name="gender" value={this.state.candidate.gender}
                   onChange={this.changeCandidate} style={{cursor: 'pointer'}}>
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
                  <input type="text" className="form-control" placeholder="Национальность"
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
                <input type="text" className="form-control" placeholder="Адресс прописки"
                      name="address_de_jure"
                      onChange={this.changeCandidate}
                      value={this.state.candidate.address_de_jure} />
                <span className="bar"></span>
              </div>
              <div className="form-group">
                <label>Адресс проживания</label>
                <input type="text" className="form-control" placeholder="Адресс проживания"
                      name="address_de_facto"
                      onChange={this.changeCandidate}
                      value={this.state.candidate.address_de_facto} />
                <span className="bar"></span>
              </div>
              <div className="form-group row">
                <div className="col-md-6">
                  <label>Телефон</label>
                  <InputElement mask="+7 (999) 999-99-99" className="form-control" placeholder="Введите номер телефона"
                        name="phone"
                        onChange={this.changeCandidate}
                        value={this.state.candidate.phone} />
                  <span className="bar"></span>
                </div>
                <div className="col-md-6">
                  <label>E-mail</label>
                  <input type="email" className="form-control" placeholder="Введите E-mail"
                        name="email"
                        onChange={this.changeCandidate}
                        value={this.state.candidate.email} />
                  <span className="bar"></span>
                </div>
              </div>
              <div className="form-group">
                <label>ИИН</label>
                  <input type="number" className="form-control" placeholder="ИИН"
                        name="passport_id"
                        onChange={this.changeCandidate}
                        value={this.state.candidate.passport_id} />
                  <span className="bar"></span>
              </div>
              <div className="form-group row">
                <div className="col-md-4">
                  <label>Номер удостоверения</label>
                    <input type="number" className="form-control" placeholder="Номер удостоверения"
                          name="id_number"
                          onChange={this.changeCandidate}
                          value={this.state.candidate.id_number} />
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
                  <input type="text" className="form-control" placeholder="Гос.орган"
                        name="gave_by"
                        onChange={this.changeCandidate}
                        value={this.state.candidate.gave_by} />
                  <span className="bar"></span>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-6">
                  <label>Тип аттестата</label>
                  <select className="form-control" name="attestat_type" value={this.state.candidate.attestat_type}
                      onChange={this.changeCandidate} style={{cursor: 'pointer'}}>
                      <option value="">Выберите тип</option>
                      <option value="Среднее">Среднее</option>
                      <option value="Средне-специальное">Средне-специальное</option>
                    </select>
                  <span className="bar"></span>
                </div>
                <div className="col-md-6">
                  <label>Аттестат</label>
                  <input type="text" className="form-control" placeholder="Аттестат"
                        name="attestat"
                        onChange={this.changeCandidate}
                        value={this.state.candidate.attestat} />
                  <span className="bar"></span>
                </div>
              </div>
              <div className="form-group">
                <label>Принятые документы</label><br/>
                  <label><input type="checkbox" name="documents" value="УДЛ" onChange={this.addDocumentToList}/> Копия УДЛ (2 шт.) </label><br/>
                  <label><input type="checkbox" name="documents" value="Фото" onChange={this.addDocumentToList}/> Фото(6 штук) </label><br/>
                  <label><input type="checkbox" name="documents" value="086-У" onChange={this.addDocumentToList}/> Медицинская справка по форме № 086-У (с копией прививочного паспорта) </label><br/>
                  <label><input type="checkbox" name="documents" value="ЕНТ" onChange={this.addDocumentToList}/> Сертификат об участии в ЕНТ (подлинник) </label><br/>
                  <label><input type="checkbox" name="documents" value="Приписное" onChange={this.addDocumentToList}/> Копия приписного свидетельства (для юношей) </label><br/>
                  <span className="bar"></span>
              </div>             
              <div>
                <button type="submit" disabled={this.state.checkContent} className="btn btn-info waves-effect waves-light m-r-10" style={{paddingLeft: '5%', paddingRight: '5%'}}>Добавить</button>
                <button type="button" onClick={this.clearContent} className="btn btn-inverse waves-effect waves-light m-r-10" style={{paddingLeft: '5%', paddingRight: '5%'}}>Отмена</button>
              </div>
            </form>
          </div>
        </div>
      </div>);
  }
}

export default AdminAddCandidate;