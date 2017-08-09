import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Auth from '../modules/Auth';

class LoginPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      errors: {},
      user: {
        username: '',
        password: ''
      },
      checkContent: false
    };
    this.changeUser = this.changeUser.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  changeUser(event){
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    if((this.state.user.username.length > 0) && (this.state.user.password.length > 0)){
      this.setState({
        user: user,
        checkContent: true
      })
    }else {
      this.setState({
        user: user,
        checkContent: false
      })
    }
  }
  submitForm(event) {
  event.preventDefault();

  const username = encodeURIComponent(this.state.user.username);
  const password = encodeURIComponent(this.state.user.password);
  const formData = `username=${username}&password=${password}`;
  axios.post('/auth/login', formData, {
    responseType: 'json',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${Auth.getToken()}`
    }
  })
    .then(res => {
      //console.log(res.data.token)
        this.setState({
          errors: {}
        });
        Auth.authenticateUser(res.data.token);
        this.context.router.history.push('/')

        //<Redirect to="/app"/>
      //  browserHistory.push('/app')
    })
      .catch(error => {
      if (error.response) {
        const errors = error.response ? error.response : {};
        errors.summary = error.response.data.message;
        this.setState({
          errors
        });
        console.log(errors.summary);
      }
      });
}
  render() {
    return (
      <div className="container clearfix">
        <div className="row text-center">
        <div className="col-md-5 center-block" style={{marginTop: '10%'}}>
          <div className="notAuthForm">
            <form action="/" onSubmit={this.submitForm}>
              <h3 className="headerText">Авторизация</h3>
              {this.state.errors.summary && <p style={{ fontSize: '14px', color: 'red' }}>{this.state.errors.summary}</p>}
              <div className="form-group">
                <input type="text" className="form-control" placeholder="ID аккаунта"
                name="username"
                onChange={this.changeUser}
                value={this.state.user.username} />
                <span className="bar"></span>
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder="Пароль"
                name="password"
                onChange={this.changeUser}
                value={this.state.user.password} />
                <span className="bar"></span>
              </div>
              <div>
                <button type="submit" className="btn btn-login btn-block" disabled={!this.state.checkContent}>Войти</button>
              </div>
            </form>
          </div>
          </div>
        </div>
        </div>);
  }
}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginPage;
