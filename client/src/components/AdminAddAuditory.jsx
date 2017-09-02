import React from 'react';
import axios from 'axios';

class AdminAddAuditory extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      auditory:{
        auditory_name:'',
        auditory_corp:'',
        auditory_level:'',
        auditory_places:''
      },
      checkContent: true,
      message:'',
      errors:{}
    };
    this.addAuditory=this.addAuditory.bind(this)
    this.changeAuditory=this.changeAuditory.bind(this)
    this.checkContent=this.checkContent.bind(this)
    this.clearContent=this.clearContent.bind(this)
  }

  checkContent(){
    if((this.state.auditory.auditory_name.length>0) && (this.state.auditory.auditory_corp.length>0)
    && (this.state.auditory.auditory_places.length>1) && (this.state.auditory.auditory_level.length>0)){
      this.setState({
        checkContent:false
      })
    }else{
      this.setState({
        checkContent:true
      })
    }
  }

  addAuditory(event){
    event.preventDefault()
    const formData = `auditory=${JSON.stringify(this.state.auditory)}`;
    axios.post('/api/addauditory', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'}
    })
      .then(res => {
          this.setState({
            message: res.data.message,
            errors: {},
            checkContent: true
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
    this.clearContent()
  }

  clearContent(){
    this.setState({
      auditory:{
        auditory_name:'',
        auditory_corp:'',
        auditory_level:'',
        auditory_places:''
      },
      checkContent:true
    })
  }

  changeAuditory(event){
    const field = event.target.name;
    const auditory = this.state.auditory;
    auditory[field] = event.target.value;
    this.setState({
      auditory:auditory,
      message:'',
      errors:{}
    })
    this.checkContent();
  }
  render() {

    return (
      <div>
        <div className="container clearfix">
          <div className="bg-title">
            <h4>Добавить аудиторию</h4>
          </div>
          <div className=" my-content" >
            <div className= "table-responsive">
              <h5 style={{marginBottom: '3%'}} className="text-uppercase">Описание аудитории</h5>
              {this.state.message && <h5 style={{ fontSize: '14px', color: 'green' }}>{this.state.message}</h5>}
              {this.state.errors.summary && <h5 style={{ fontSize: '14px', color: 'red' }}>{this.state.errors.summary}</h5>}
              <form action="/" onSubmit={this.addAuditory}>
                <div className="form-group">
                  <label>Наименование аудитории</label>
                  <input type="text" className="form-control" placeholder="Наименование аудитории"
                  name="auditory_name"
                  onChange={this.changeAuditory}
                  value={this.state.auditory.auditory_name}/>
                  <span className="bar"></span>
                </div>
                <div className="form-group">
                  <label>Корпус</label>
                  <input type="text" className="form-control" placeholder="Корпус"
                  name="auditory_corp"
                  onChange={this.changeAuditory}
                  value={this.state.auditory.auditory_corp}/>
                  <span className="bar"></span>
                </div>
                <div className="form-group">
                  <label>Этаж</label>
                  <input type="number" className="form-control" placeholder="Этаж"
                  name="auditory_level"
                  onChange={this.changeAuditory}
                  value={this.state.auditory.auditory_level}/>
                  <span className="bar"></span>
                </div>
                <div className="form-group">
                  <label>Возможных мест</label>
                  <input type="number" className="form-control" placeholder="Возможных мест"
                  name="auditory_places"
                  onChange={this.changeAuditory}
                  value={this.state.auditory.auditory_places}/>
                  <span className="bar"></span>
                </div>
                <div>
                  <button type="submit" className="btn btn-info waves-effect waves-light m-r-10" disabled={this.state.checkContent} style={{paddingLeft: '5%', paddingRight: '5%'}}>Добавить</button>
                  <button type="button" onClick={this.clearContent} className="btn btn-inverse waves-effect waves-light m-r-10" style={{paddingLeft: '5%', paddingRight: '5%'}}>Отмена</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminAddAuditory;
