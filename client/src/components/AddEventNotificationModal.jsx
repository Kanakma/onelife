import React from 'react';
import axios from 'axios';
import InputElement from 'react-input-mask';
import DatePicker from 'react-bootstrap-date-picker';


class AddEventNotificationModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      date:'',
      message:{
        type:'',
        text:'',
        from:''
      },
      checkContent:true
    }
    this.addNotification=this.addNotification.bind(this);
    this.dateChange=this.dateChange.bind(this);
    this.changeNotification=this.changeNotification.bind(this);
    this.checkContent=this.checkContent.bind(this);
  };

  componentDidMount() {
  }

  addNotification(){
    var formData = `notification=${JSON.stringify(this.state.message)}&date=${this.state.date}`
    axios.post('/api/addeventnotification', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'}
    })
  }

  dateChange(value){
    this.setState({
      date: value
    })
    this.checkContent()
  }
  changeNotification(event){
    event.preventDefault();
    const field = event.target.name;
    const message = this.state.message;
    message[field] = event.target.value;
    this.setState({
      message:message
    })
    this.checkContent()
  }
  checkContent(){
    if(this.state.date.length>0 && this.state.message.text.length>0
      && this.state.message.from.length>0 && this.state.message.type.length>0){
      this.setState({
        checkContent:false
      })
    } else{
      this.setState({
        checkContent:true
      })
    }
  }
  render(){
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
          <h3>Мероприятие</h3>
          <button className="btn btn-info waves-effect waves-light m-r-10" style={{float:"right"}} onClick={this.props.onClose}>
            X
          </button>
          <div>
            <form action="/notifications" onSubmit={this.addNotification}>
              <div className="form-group">
                <textarea
                  maxLength="500" 
                  type="text" 
                  value={this.state.message.text} 
                  placeholder="Описание" 
                  rows="6"
                  name="text"
                  className="homework-message" 
                  style={{marginLeft:'13px'}}
                  onChange={this.changeNotification}></textarea>
                <span className="bar"></span>
              </div>
              <div className="form-group">
                <label>Тип</label>
                <select className="form-control" name="type" value={this.state.message.type} onChange={this.changeNotification} style={{cursor: 'pointer'}}>
                  <option value="">Выберите тип</option>
                  <option value="info">Для информации</option>
                  <option value="success">Поздравляем!</option>
                  <option value="warning">Внимание!</option>
                  <option value="error">Срочно!</option>
                </select>
                <span className="bar"></span>
              </div>
              <div className="form-group row">
                <div className="col-md-6">
                  <label>Дата проведения</label>
                  <DatePicker
                    value={this.state.date}
                    onChange={this.dateChange}
                    className="form-control mydatepicker"/>
                </div>
                <div className="col-md-6">
                  <label>ФИО отправителя</label>
                  <input type="text" className="form-control" placeholder="Введите ФИО"
                        name="from"
                        onChange={this.changeNotification}
                        value={this.state.message.from} />
                  <span className="bar"></span>
                </div>
              </div>
              <button type="submit" className="btn btn-info" disabled={this.state.checkContent}>
                Сохранить
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddEventNotificationModal;