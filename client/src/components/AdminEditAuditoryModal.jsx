import React from 'react';
import axios from 'axios';


class AdminEditAuditoryModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      auditory:{
        auditory_name:'',
        auditory_corp:'',
        auditory_level:'',
        auditory_places:''
      },
      message:''
    };
    this.editAuditoryFunc=this.editAuditoryFunc.bind(this);
    this.changeAuditory=this.changeAuditory.bind(this);
    this.deleteAuditory=this.deleteAuditory.bind(this);
  };

  editAuditoryFunc(){
    event.preventDefault();
    const auditory_id = this.props.auditory._id;
    const formData = `auditory=${JSON.stringify(this.state.auditory)}&auditory_id=${auditory_id}`;
    axios.post('/auditory/editauditory', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res =>{
        if(res.data.err){
          alert("Аудитория с таким наименованием уже существует!")
        }
      })
  }

  deleteAuditory(){
    const formData = `auditory_id=${JSON.stringify(this.props.auditory._id)}`;
    axios.post('/auditory/deleteauditory', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res =>{
        window.location.reload()
      })
  }

  changeAuditory(event){
    const field = event.target.name;
    const auditory = this.state.auditory;
    auditory[field] = event.target.value;
    this.setState({
      auditory:auditory
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
              <button className="btn btn-info waves-effect waves-light m-r-10" style={{float:"right"}} onClick={this.props.onClose}>
                X
              </button>
          <div>
            <form action="/auditories" onSubmit={this.editAuditoryFunc}>
              <div className="form-group">
                  <label>Наименование аудитории</label>
                  <input type="text" className="form-control" placeholder={this.props.auditory.auditory_name}
                  name="auditory_name"
                  onChange={this.changeAuditory}
                  value={this.state.auditory.auditory_name}/>
                  <span className="bar"></span>
                </div>
                <div className="form-group">
                  <label>Корпус</label>
                  <input type="text" className="form-control" placeholder={this.props.auditory.auditory_corp}
                  name="auditory_corp"
                  onChange={this.changeAuditory}
                  value={this.state.auditory.auditory_corp}/>
                  <span className="bar"></span>
                </div>
                <div className="form-group">
                  <label>Этаж</label>
                  <input type="number" className="form-control" placeholder={this.props.auditory.auditory_level}
                  name="auditory_level"
                  onChange={this.changeAuditory}
                  value={this.state.auditory.auditory_level}/>
                  <span className="bar"></span>
                </div>
                <div className="form-group">
                  <label>Возможных мест</label>
                  <input type="number" className="form-control" placeholder={this.props.auditory.auditory_places}
                  name="auditory_places"
                  onChange={this.changeAuditory}
                  value={this.state.auditory.auditory_places}/>
                  <span className="bar"></span>
                </div>
              <button type="submit" className="btn btn-info waves-effect waves-light m-r-10" style={{marginTop: '15px'}}>
                Сохранить изменения
              </button>
              <button type="button" className="btn btn-info waves-effect waves-light m-r-10" style={{marginTop: '15px'}} onClick={this.deleteAuditory}>
                Удалить группу
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminEditAuditoryModal;
