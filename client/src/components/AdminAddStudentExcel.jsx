import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';
import DatePicker from 'react-bootstrap-date-picker';

class AdminAddStudent extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        message: '',
        errors: {},
        file: '',
        filename: '',
 
      };
     this.submitExcel = this.submitExcel.bind(this);
           this.changeFile = this.changeFile.bind(this);

    }
    componentDidMount() {

 
 
    }
        changeFile(e){
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      if(file.size>1000000){
        this.setState({
          file: '',
          filename: ''
        })
        alert("Размер файла не должен превышать 1 Мб!")
      } else{
        reader.onloadend = () => {
          this.setState({
            file: file,
            filename: file.name
          });
        }
        reader.readAsDataURL(file);
      }
    }
    submitExcel(event){
      let fileFormData = new FormData();
      console.log(this.state.filename,'adad');
           axios.post('/api/parseexcel?filename='+this.state.filename, fileFormData, {
            responseType: 'json',
            headers: {
            'Content-type': 'application/x-www-form-urlencoded'
            }
          })
    }
  render() {
    return (
      <div className="container clearfix">
      <div className="bg-title">
        <h4>Добавить студента</h4>
      </div>
      <div className="my-content " >
      <div className= "table-responsive">
      <h5 style={{marginBottom: '3%'}} className="text-uppercase">Основная информация</h5>
     <input type="file" name="file" onChange={this.changeFile} />Upload
    <button  className="btn btn-inverse waves-effect waves-light m-r-10" onClick={this.submitExcel} name="submit"></button>

      </div>
      </div>
      </div>);
  }
}

export default AdminAddStudent;
