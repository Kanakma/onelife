import React from 'react';
import Auth from '../modules/Auth';
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';
import InputElement from 'react-input-mask';

class TeacherAddHomeworkModal extends React.Component {

  constructor(props){
    super(props);
    this.state={
      userId: this.props.userId,
      marktype:'',
      description: ''
     

    }
      this.clearContent = this.clearContent.bind(this);
      this.changeMarkType=this.changeMarkType.bind(this);
      this.sendTelegram = this.sendTelegram.bind(this);
      this.handleChange = this.handleChange.bind(this);
   
  };
    componentDidMount() {
    }
      handleChange(event){

      this.setState({
         description: event.target.value
      })
    }
    sendTelegram(event){

  const description =this.state.description
  const marktype=this.state.marktype
  const parent_id=this.props.userId

  const formData=`marktype=${this.state.marktype}&description=${this.state.description}&parent_id=${parent_id}`
      axios.post('/api/parenttelegram',formData,  {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
      .then(res => {
          this.setState({
          message:res.data.message
          });
        })
}


 changeMarkType(event){
      this.setState({
      marktype:event.target.value
    })

  }
  
      clearContent(){
        this.setState({
          file: '',
          filename: '',
          description: '',
          lessonDate: '',
          deadline: ''
        })
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
        <div className="row">
         <div className="bg-title col-md-6" style={{marginLeft: '0px' }}>
        <h4>Оставьте вашу заявку нам </h4>
        <h4>{this.state.message}</h4>
      </div>

              <button className="btn btn-info waves-effect waves-light m-r-10" style={{float:"right"}} onClick={this.props.onClose}>
                X
              </button>
            </div>
          <div>
       
          
      
             <div  style={{textAlign: 'center'}}>
              <label className="col-md-12 ">Выберите тип заявки</label>
              <div className="col-md-12 moi_offset">
              <div className="col-md-3"><input type="radio" name="marktype" value="Задать Вопрос" onChange={this.changeMarkType} />Задать Вопрос</div>
              <div className="col-md-3"><input type="radio" name="marktype" value="Узнать Контакты" onChange={this.changeMarkType}/>Узнать Контакты</div>
              <div className="col-md-3"><input type="radio" name="marktype" value="Жалоба" onChange={this.changeMarkType}/>Жалоба</div>
              </div>
            </div>

            <div className="row" style={{textAlign: 'center', marginBottom: '20px'}}>
              <textarea maxLength="500" type="text" value={this.state.description} placeholder="Опишите задание" rows="6" className="homework-message" onChange={this.handleChange}></textarea>
            </div>
           

              <button type="submit" className="btn btn-info waves-effect waves-light m-r-10" onClick={this.sendTelegram}>
              Оставить Заявку
              </button>
              <button className="btn btn-info waves-effect waves-light m-r-10" onClick={this.clearContent}>
              Отмена
              </button>
            
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherAddHomeworkModal;
