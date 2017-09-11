import React from 'react';
import Auth from '../modules/Auth';
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';
import InputElement from 'react-input-mask';
import DamFunc from '../modules/DamFunc'

class AdminEditCandidateModal extends React.Component {

  constructor(props){
    super(props);
    this.state={
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
    }
    this.changeCandidate=this.changeCandidate.bind(this);
    this.birthdayChange=this.birthdayChange.bind(this);
    this.changeNationality=this.changeNationality.bind(this);
    this.writeNation=this.writeNation.bind(this);
    this.clearNation=this.clearNation.bind(this);
    this.IdDateChange=this.IdDateChange.bind(this);
    this.editCandidateFunc=this.editCandidateFunc.bind(this);
    this.deleteCandidate=this.deleteCandidate.bind(this);
    this.addDocumentToList=this.addDocumentToList.bind(this);
  }

  editCandidateFunc(event){
    event.preventDefault();
    const formData = `documents=${JSON.stringify(this.state.documents)}&data=${JSON.stringify(this.state.candidate)}&birthday=${this.state.birthday}&date_of_id=${this.state.date_of_id}&nationality=${this.state.nationality}&candidate_id=${this.props.candidate._id}`;
    axios.post('/api/editcandidate', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'}
    })
      .then(res => {
        window.location.reload();
      })
  }

  deleteCandidate(){
    var candidate_id = this.props.candidate._id;
    const formData = `candidate_id=${candidate_id}`;
    axios.post('/api/deletecandidate', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
    .then(res =>{
      window.location.reload();
    })
  }

  changeCandidate(event){
    var candidate = this.state.candidate;
    var field = event.target.name;
    candidate[field] = event.target.value;
    this.setState({
      candidate:candidate
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
    render(){
      console.log(this.state.candidate)
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
            <form action="/candidates" onSubmit={this.editCandidateFunc}>
              <div className="form-group">
                <label>Фамилия</label>
                <input type="text" className="form-control" placeholder={this.props.candidate.lastname}
                      name="lastname"
                      onChange={this.changeCandidate}
                      value={this.state.candidate.lastname} />
                <span className="bar"></span>
              </div>
              <div className="form-group">
                <label>Имя</label>
                <input type="text" className="form-control" placeholder={this.props.candidate.name}
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
                  <input type="text" className="form-control" placeholder={this.props.candidate.nationality}
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
                <input type="text" className="form-control" placeholder={this.props.candidate.address_de_jure}
                      name="address_de_jure"
                      onChange={this.changeCandidate}
                      value={this.state.candidate.address_de_jure} />
                <span className="bar"></span>
              </div>
              <div className="form-group">
                <label>Адресс проживания</label>
                <input type="text" className="form-control" placeholder={this.props.candidate.address_de_facto}
                      name="address_de_facto"
                      onChange={this.changeCandidate}
                      value={this.state.candidate.address_de_facto} />
                <span className="bar"></span>
              </div>
              <div className="form-group row">
                <div className="col-md-6">
                  <label>Телефон</label>
                  <InputElement mask="+7 (999) 999-99-99" className="form-control" placeholder={this.props.candidate.phone}
                        name="phone"
                        onChange={this.changeCandidate}
                        value={this.state.candidate.phone} />
                  <span className="bar"></span>
                </div>
                <div className="col-md-6">
                  <label>E-mail</label>
                  <input type="email" className="form-control" placeholder={this.props.candidate.email}
                        name="email"
                        onChange={this.changeCandidate}
                        value={this.state.candidate.email} />
                  <span className="bar"></span>
                </div>
              </div>
              <div className="form-group">
                <label>ИИН</label>
                  <input type="number" className="form-control" placeholder={this.props.candidate.passport_id}
                        name="passport_id"
                        onChange={this.changeCandidate}
                        value={this.state.candidate.passport_id} />
                  <span className="bar"></span>
              </div>
              <div className="form-group row">
                <div className="col-md-4">
                  <label>Номер удостоверения</label>
                    <input type="number" className="form-control" placeholder={this.props.candidate.id_number}
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
                  <input type="text" className="form-control" placeholder={this.props.candidate.gave_by}
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
              <button type="submit" className="btn btn-info waves-effect waves-light m-r-10">
                Сохранить изменения
              </button>
              <button type="button" className="btn btn-info waves-effect waves-light m-r-10" onClick={this.deleteCandidate}>
                Удалить сотрудника
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminEditCandidateModal;
