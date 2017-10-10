var express = require('express')
var router = express.Router()
var Quiz = require('../models/quiz')
var jwtDecode = require('jwt-decode')
let fs = require('fs')



router.post('/sendanswer', (req, res) => {
	var answers = JSON.parse(req.body.data);
	var test_id = req.body.test_id.trim();
	var token = req.headers.authorization.split(' ')[1];
	var decoded = jwtDecode(token);
	Quiz.findOne({_id: test_id}, (err, quiz) => {
		if(err) { console.log(err) }
		else {
			var filename = 'public/tests/'+quiz.quiz_name+'.txt';
			fs.readFile(filename, 'utf8', function (err,data) {
				if (err) {
					return console.log(err);
				}
				else {
						var allQuestions = data.split("\n");
						allQuestions.pop();
						var temp = [];
						var tempAnswer = [];
						var good = 0;
						allQuestions.forEach(function(a, i){
							temp = a.split('||');
							temp.forEach(function(t, j){
								if(t.indexOf('answer=') !== -1){
									tempAnswer = t.split('=');
									if(answers[i] == tempAnswer[1]){
										good++;
									}
								}
							})
						})

						var quizData = {
							quiz_id: test_id,
							student_id: decoded.sub,
							q_number: answers.length,
							wrong_answers: answers.length - good,
							points: Math.round((good*100)/answers.length)
						}
						const newQuiz = new QuizPoint(quizData);
						newQuiz.save((err, quiz_answer) => {
							if (err) { return done(err); }
							else {
								res.send({
									message: 'Тест сдан',
									already: true,
									quiz_answer: quiz_answer
								})
							}
						})
				}
			})
		}
	})
});


module.exports = router;
