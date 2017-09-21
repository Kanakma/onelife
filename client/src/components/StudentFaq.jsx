import React from 'react';
import axios from 'axios';

class StudentFaq extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      faqs: [],
      allfaqs: []
    };
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    axios.get('/faq/getfaqs',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        this.setState({
          faqs: res.data.faqs,
          allfaqs: res.data.faqs
        });
      });
  }
  handleSearch(event){
    var searchQuery = event.target.value.toLowerCase();
    if(searchQuery){
    var faqs = this.state.allfaqs.filter(function(el){
      var searchValue = el.answer.toLowerCase() + ' ' + el.question.toLowerCase();
      return searchValue.indexOf(searchQuery)!== -1;
    });
    this.setState({
      faqs: faqs
    });
  } else {
    this.setState({
      faqs: this.state.allfaqs
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
          <div className="table-responsive">
          {
              this.state.faqs.map((faq, f)=>
                <div key={f}>
                  <h4>{faq.question}</h4>
                  <h5>{faq.answer}  {
                    faq.file?(
                      <span>
                        <a target="_blank" style={{ textDecoration: 'none'}} href={'/download/downloadfaq/'+faq.file+'?id='+faq._id}>
                          <i className="fa fa-download" aria-hidden="true" style={{color: 'black'}}></i> {faq.file}
                        </a>
                      </span>
                    ):(
                      <span></span>
                    )
                  }</h5>
                  <br/>
                  <hr/>
                </div>
              )
            }
          </div>
        </div>
      </div>);
  }
}

export default StudentFaq;
