import React from 'react';
import axios from 'axios';
import Auth from '../modules/Auth';
import AdminAddFaqModal from './AdminAddFaqModal.jsx'
import AdminEditFaqModal from './AdminEditFaqModal.jsx'

class AdminFAQ extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      faqs: [],
      allfaqs: [],
      isOpen:false,
      open: false,
      faq: {}
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
    this.editToggleModal = this.editToggleModal.bind(this);
    this.editToggleModalClose = this.editToggleModalClose.bind(this);
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
  toggleModal() {
      this.setState({
        isOpen: !this.state.isOpen
    });
  }

  toggleModalClose() {
      this.setState({
        isOpen: !this.state.isOpen
      });
  }
  editToggleModal(faq) {
      this.setState({
        open: !this.state.open,
        faq: faq
    });
  }

  editToggleModalClose() {
      this.setState({
        open: !open
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
                <button onClick={this.editToggleModal.bind(this, faq)} className="btn btn-default btn-circle edit-btn-moreinfo" style={{background: 'none', float: 'right'}}>
                    <i className="fa fa-pencil"></i>
                </button>
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
                  }
                </h5>
                <br/>
                <hr/>
              </div>
            )
          }
          <div className="row" style={{textAlign: 'center'}}>
            <button className="btn btn-success" style={{paddingLeft: '1%', paddingRight: '1%'}} onClick={this.toggleModal}>Добавить</button>
          </div>
        </div>
      </div>
      <AdminAddFaqModal
        show={this.state.isOpen}
        onClose={this.toggleModalClose}
      />
      <AdminEditFaqModal
        show={this.state.open}
        onClose={this.editToggleModalClose}
        faq={this.state.faq}
      />
      </div>);
  }
}

export default AdminFAQ;
