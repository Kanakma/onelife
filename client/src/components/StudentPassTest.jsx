import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';

class StudentPassTest extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      test_id:  this.props.location.state.test_id,
      tests: [],
      already: false,
      message: '',
      myAnswer: [],
      checkAnswer: false,
      quiz_answer: {}
    };
    this.getTest = this.getTest.bind(this);
    this.changeAnswer = this.changeAnswer.bind(this);
    this.sendAnswer = this.sendAnswer.bind(this);
  }
  componentDidMount() {
    this.getTest()
  }
  componentWillReceiveProps(){
    this.getTest()
  }
  getTest(){
    axios.get('/api/getonetest?test_id='+this.state.test_id,  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        this.setState({
          tests: res.data.tests,
          already: res.data.already,
          quiz_answer: res.data.quiz_answer,
          message: res.data.message
        });
      });
  }
  changeAnswer(event){
    const myAnswer = this.state.myAnswer;
    myAnswer[event.target.name] = event.target.value;
    var temp = 0;
    if(this.state.myAnswer.length == this.state.tests.length){
      myAnswer.forEach(function(m){
        if(m.length > 0){
          temp++
        }
      })
      if(temp == this.state.tests.length){
        this.setState({
          myAnswer,
          checkAnswer: true
        });
      } else {
        this.setState({
          myAnswer,
          checkAnswer: false
        });
      }
    } else {
      this.setState({
        myAnswer,
        checkAnswer: false
      });
    }
  }
  sendAnswer(){
    const formData = `data=${JSON.stringify(this.state.myAnswer)}&test_id=${this.state.test_id}`;
    axios.post('/api/sendanswer', formData, {
      responseType: 'json',
      headers: {

        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        this.setState({
          quiz_answer: res.data.quiz_answer,
          already: res.data.already,
          message: res.data.message,
          tests: []
        });
      });
  }
  render() {
    return (
      <div className="container clearfix">
        <div className="col-md-10 col-md-offset-2 bg-title">
          <h4>Тест</h4>
        </div>
        <div className="col-md-9 my-content add-content" style={{background: 'white'}}>
        {this.state.already ?(
          <div className="col-md-12">
          <h4>{this.state.message}</h4>
          <p>{this.state.quiz_answer.q_number-this.state.quiz_answer.wrong_answers}/{this.state.quiz_answer.q_number}</p>
          <p>Ваша оценка: {this.state.quiz_answer.points}%</p>
          </div>
        ):(
          <div></div>
        )}
        {this.state.tests.map((myTest, t) =>
          <div className="col-md-12" key={t}>
            <p>{t+1}. {myTest.question}</p>
            <p><input type="radio" name={t} value={myTest.answerOne} onChange={this.changeAnswer} />{myTest.answerOne}</p>
            <p><input type="radio" name={t} value={myTest.answerTwo} onChange={this.changeAnswer} />{myTest.answerTwo}</p>
            <p><input type="radio" name={t} value={myTest.answerThree} onChange={this.changeAnswer} />{myTest.answerThree}</p>
            <p><input type="radio" name={t} value={myTest.answerFour} onChange={this.changeAnswer} />{myTest.answerFour}</p>
          </div>
        )}
        {this.state.already ?(
          <div></div>
        ):(
          <div className="form-group text-right">
            <button className="btn btn-primary"
                    disabled={!this.state.checkAnswer}
                    style={{paddingLeft: '5.4%', paddingRight: '5.5%'}}
                    onClick={this.sendAnswer}>Отправить</button>
          </div>
        )}
        </div>
      </div>);
  }
}
export default StudentPassTest;
