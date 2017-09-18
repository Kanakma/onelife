import React from 'react';
import axios from 'axios';
import Auth from '../modules/Auth';


class AdminFAQ extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      allquestions: []
    };
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    axios.get('/api/getgroups',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          questions: res.data.groups,
          allquestions: res.data.groups
        });
      });
  }
  handleSearch(event){
    var searchQuery = event.target.value.toLowerCase();
    if(searchQuery){
    var groups = this.state.allquestions.filter(function(el){
      var searchValue = el.group_name.toLowerCase() + ' ' + el.major.major_name.toLowerCase() + ' ' + el.major.major_department.department_name.toLowerCase();
      return searchValue.indexOf(searchQuery)!== -1;
    });
    this.setState({
      questions: questions
    });
  } else {
    this.setState({
      questions: this.state.allquestions
    });
  }

  }

  render() {
    return (
      <div className="container clearfix">
      <div className="bg-title" style={{display: 'flex'}}>
        <h4 style={{width: '70%'}}>Вопросы/Ответы</h4>
        <div style={{width: '30%', display: 'flex'}}><h4>Поиск</h4><input onChange={this.handleSearch} className="adminsearch" type="search" placeholder=""/></div>
      </div>
      <div className=" my-content" >


        </div>

      </div>);
  }
}

export default AdminFAQ;
