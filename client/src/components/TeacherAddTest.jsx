import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth'
import axios from 'axios';

class TeacherAddTest extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      message: '',
      errors: {},
      subjects: [],
      testQuestions: [],
      testQuestion: {
        question: '',
        answerOne: '',
        answerTwo: '',
        answerThree: '',
        answerFour: ''
      },
      subject_id: '',
      checkSubject: false,
      checkQuestion: false
    };
    this.changeQuestion = this.changeQuestion.bind(this);
    this.changeSubject = this.changeSubject.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.sendTest = this.sendTest.bind(this);
  }

  componentDidMount() {
    axios.get('/api/getsubjectteacher',  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        this.setState({
          subjects: res.data.subjects
        });
      });
  }
  changeSubject(event){
    if(event.target.value.length > 0){
      this.setState({
        subject_id: event.target.value,
        checkSubject: true,
        message: ''
      })
    } else {
      this.setState({
        subject_id: event.target.value,
        checkSubject: false,
        message: ''
      })
    }
  }
  changeQuestion(event){
    const field = event.target.name;
    const testQuestion = this.state.testQuestion;
    testQuestion[field] = event.target.value;
    if((this.state.testQuestion.question.length > 0) && (this.state.testQuestion.answerOne.length > 0)
          && (this.state.testQuestion.answerTwo.length > 0) && (this.state.testQuestion.answerFour.length > 0)){
        this.setState({
          testQuestion: testQuestion,
          checkQuestion: true,
          message: ''
        })
    } else {
        this.setState({
          testQuestion: testQuestion,
          checkQuestion: false,
          message: ''
        })
    }
  }
  addQuestion(e){
    var temp = this.state.testQuestion;
    this.setState({
      testQuestions: this.state.testQuestions.concat(temp),
      testQuestion: {
        question: '',
        answerOne: '',
        answerTwo: '',
        answerThree: '',
        answerFour: ''
      },
      checkQuestion: false
    })
  }
  sendTest(e){
    const formData = `data=${JSON.stringify(this.state.testQuestions)}&subject_id=${this.state.subject_id}`;
    axios.post('/api/addtest', formData,  {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': `bearer ${Auth.getToken()}`
      }
    })
      .then(res => {
        this.setState({
          message: res.data.message,
          subjects: [],
          testQuestions: [],
          testQuestion: {
            question: '',
            answerOne: '',
            answerTwo: '',
            answerThree: '',
            answerFour: ''
          },
          subject_id: '',
          checkSubject: false,
          checkQuestion: false
        });
      });
  }
  render() {
    return (
      <div className="container clearfix">
      <div className=" bg-title">
        <h4>Добавить тест</h4>
        <br/>
        <p>Перед правильным ответом напишите <strong>answer=</strong></p>
        <p>Тест должен содержать минимум 10 вопросов</p>
      </div>

      <div className="my-content ">
      <div className="table-responsive">
      {this.state.message && <h5 style={{ fontSize: '14px', color: 'green' }}>{this.state.message}</h5>}
        <div className="form-group">
          <select className="form-control" name="subject_id" value={this.state.subject_id} onChange={this.changeSubject}>
          <option value=''>Выберите предмет</option>
          {this.state.subjects.map((subject, s) =>
            <option key={s} value={subject._id}>{subject.subject_name}</option>
          )}
          </select>
        </div>
        <div className="form-group">
          <input type="text" className="form-control"
                 placeholder="Вопрос" name="question"
                 value={this.state.testQuestion.question} onChange={this.changeQuestion}
                disabled={!this.state.checkSubject} />
        </div>
        <div className="form-group row" >
          <div className="col-md-3">
            <input type="text" className="form-control"
                   placeholder="Вариант 1" name="answerOne"
                   value={this.state.testQuestion.answerOne} onChange={this.changeQuestion}
                   disabled={!this.state.checkSubject} />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control"
                   placeholder="Вариант 2" name="answerTwo"
                   value={this.state.testQuestion.answerTwo} onChange={this.changeQuestion}
                   disabled={!this.state.checkSubject} />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control"
                   placeholder="Вариант 3" name="answerThree"
                   value={this.state.testQuestion.answerThree} onChange={this.changeQuestion}
                   disabled={!this.state.checkSubject} />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control"
                   placeholder="Вариант 4" name="answerFour"
                   value={this.state.testQuestion.answerFour} onChange={this.changeQuestion}
                   disabled={!this.state.checkSubject} />
          </div>
        </div>
        <div className="form-group text-right">
          <button className="btn btn-primary"
                  disabled={!(this.state.checkQuestion && this.state.checkSubject)}
                  style={{paddingLeft: '5.4%', paddingRight: '5.5%'}}
                  onClick={this.addQuestion}>Добавить вопрос</button>
        </div>
        <div className="form-group text-right">
        {this.state.testQuestions.length > 9 ?(
          <button className="btn btn-success"
                  disabled={false}
                  style={{paddingLeft: '6%', paddingRight: '6%'}} onClick={this.sendTest}>Отпарвить тест</button>
        ):(
          <button className="btn btn-success"
                  disabled={true}
                  style={{paddingLeft: '6%', paddingRight: '6%'}} onClick={this.sendTest}>Отпарвить тест</button>
        )}
        </div>
        <div>
          <h4>Вопросы:</h4>
          {this.state.testQuestions.length == 0 ?(
            <p>Вы еще не добавили вопросы</p>
          ):(
            <p></p>
          )}
          {this.state.testQuestions.map((question, q) =>
            <div key={q}>
              <h5>{q+1}. {question.question}</h5>
              <ol>
                <li type="a"> {question.answerOne} </li>
                <li type="a"> {question.answerTwo} </li>
                <li type="a"> {question.answerThree} </li>
                <li type="a"> {question.answerFour} </li>
              </ol>
            </div>
          )}
        </div>
      </div>
      </div>
      </div>);
  }
}

export default TeacherAddTest;
