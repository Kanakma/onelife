var express = require('express')
var router = express.Router()
var Quiz = require('../models/quiz')
var QuizPoint = require('../models/quiz_point')
var jwtDecode = require('jwt-decode')
var User = require('../models/user')
var Teacher = require('../models/teacher')
var Student = require('../models/student')
var Subject = require('../models/subject')


router.get('/getonetest', (req, res) => {
	var token = req.headers.authorization.split(' ')[1];
	var decoded = jwtDecode(token);
	Quiz.findOne({_id: req.query.test_id}, (err, quiz) => {
		if(err) { console.log(err) }
		else {
			QuizPoint.findOne({quiz_id: req.query.test_id, student_id: decoded.sub}, (err, quiz_point) => {
				if(err) {console.log(err)}
				else if (quiz_point){
					res.send({
						tests: [],
	          already: true,
	          quiz_answer: quiz_point,
	          message: 'Тест сдан'
					})
				}
				else {
					var filename = 'public/tests/'+quiz.quiz_name+'.txt';
					fs.readFile(filename, 'utf8', function (err,data) {
						if (err) {
							return console.log(err);
						}
						var allQuestions = data.split("\n");
						var eachQuestion = {};
						var myTest = [];
						var temp = [];
						allQuestions.pop();
						allQuestions.forEach(function(a){
							temp = a.split('||');
							var myAnswer = '';
							var myAnswerArr = [];
							var ii = 0;
							var tempIndex = 0;
							temp.forEach(function(t){
								if(t.indexOf('answer=') !== -1){
									myAnswerArr = t.split('=');
									myAnswer = myAnswerArr[1];
									tempIndex = ii;
								}
								ii++;
							})
							switch (tempIndex) {
								case 1: eachQuestion = {
													question: temp[0],
													answerOne: myAnswer,
													answerTwo: temp[2],
													answerThree: temp[3],
													answerFour: temp[4]
												}
									break;
								case 2: eachQuestion = {
													question: temp[0],
													answerOne: temp[1],
													answerTwo: myAnswer,
													answerThree: temp[3],
													answerFour: temp[4]
												}
									break;
								case 3: eachQuestion = {
													question: temp[0],
													answerOne: temp[1],
													answerTwo: temp[2],
													answerThree: myAnswer,
													answerFour: temp[4]
												}
									break;
								case 4: eachQuestion = {
														question: temp[0],
														answerOne: temp[1],
														answerTwo: temp[2],
														answerThree: temp[3],
														answerFour: myAnswer
													}
									break;
							}
							myTest.push(eachQuestion);
						})
						res.send({
							tests: myTest,
							already: false,
		          quiz_answer: {},
		          message: ''
						})
					});
				}
			})

		}
	})

});
// router.get('/gettests', (req, res) => {
//   Quiz.find().populate({path: 'teacher_id', populate: {path: 'user_id'}}).populate('subject_id').exec(function(err, quizes){
// 		if(err) {console.log(err) }
// 		else {
// 				  res.send({
// 						quizes: quizes
// 					})
// 		}
// 	})
// });
router.get('/gettests', (req, res) => {
	var myTest = {};
	var myTests = [];
	Quiz.find((err, tests) => {
		if(err)  { console.log(err) }
		else {
			Subject.find((err, subjects) => {
				if(err)  { console.log(err) }
				else {
					Teacher.find((err, teachers) => {
						if(err)  { console.log(err) }
						else {
							User.find((err, users) => {
								if(err)  { console.log(err) }
								else {
									tests.forEach(function(t){
										subjects.forEach(function(s){
											if(t.subject_id.toString() == s._id.toString()){
												teachers.forEach(function(tt){
													if(t.teacher_id.toString() == tt._id.toString()){
														users.forEach(function(u){
															if(tt.user_id.toString() == u._id.toString()){
																myTest = {
																	_id: t._id,
																	subject_name: s.subject_name,
																	q_number: t.q_number,
																	teacher_name: u.lastname + ' ' + u.name,
																	status: t.status
																}
																myTests.push(myTest);
															}
														})
													}
												})
											}
										})
									})
									res.send({
										tests: myTests
									})
								}
							})
						}
					})
				}
			})
		}
	})
});
router.post('/addtest', (req, res) => {
	var token = req.headers.authorization.split(' ')[1];
	var decoded = jwtDecode(token);
	var questions = JSON.parse(req.body.data);
	var subject_id = req.body.subject_id.trim();
	Teacher.findOne({user_id: decoded.sub}, (err, teacher) => {
		if(err) {console.log(err)}
		else {
			Subject.findOne({_id: subject_id}, (err, subject) => {
				if(err) {console.log(err)}
				else {
					Quiz.find({subject_id: subject_id}, (err, quizes) => {
						if(err) {console.log(err)}
						else {
							var quizData = {
								quiz_name: subject.subject_code+'-'+(quizes.length+1),
								subject_id: subject_id,
								teacher_id: teacher._id,
								q_number: questions.length,
								status: "active"
							}
							var dir = 'public/tests/';
							var filename = dir+quizData.quiz_name + '.txt'
							var stream = fs.createWriteStream(filename);
								stream.once('open', function(fd) {
									questions.forEach(function(ques){
										stream.write(ques.question+'||'+ques.answerOne+'||'+ques.answerTwo+'||'+ques.answerThree+'||'+ques.answerFour+'\n');
									})
								  stream.end();
							});
							const newQuiz = new Quiz(quizData);
						  newQuiz.save((err) => {
								if (err) { return done(err); }
								else {
									res.send({
										message: 'Тест добавлен'
									})
								}
							})
						}
					})
				}
			})

		}
	})
});


module.exports = router;
