var express = require('express')
var router = express.Router()
// var Major = require('../models/major')
// var Faculty = require('../models/faculty')
// var Faq = require('../models/faq')
var User = require('../models/user')
var Teacher = require('../models/teacher')
// var Student = require('../models/student')
var Subject = require('../models/subject')
// var Quiz = require('../models/quiz')
// var QuizPoint = require('../models/quiz_point')
// var Department = require('../models/department')
// var Parrent = require('../models/parrent')
// var Mark=require('../models/mark')
// var FinalMark=require('../models/finalmark')
// var Attendance = require('../models/attendance')
// var Homework = require('../models/homework')
// var Group = require('../models/group')
// var Auditory = require ('../models/auditory')
// var Employee = require ('../models/employee')
// var Candidate = require ('../models/candidate')
// var Notifications = require ('../models/notifications')
// const bcrypt = require('bcryptjs')
// var jwtDecode = require('jwt-decode')
// var mongoose = require('mongoose')
// let multiparty = require('multiparty')
// let fs = require('fs')
// var async = require('async')
// var xl = require('excel4node')
// var path= require('path')
// var DamFunc = require('../../client/src/modules/AllDamFunc')


router.get('/getmaxstudents', (req, res) => {
	Teacher.findOne({user_id: req.query.user_id}).populate('').exec(function(err, teacher){
		if(err) {console.log(err) }
		else {
      var subStudents = [];
      var pieData=[];
      var s= new Promise(function(resolve, reject){
        Subject.find({teacher_id: teacher._id}).populate({path: 'groups', populate: {path: 'students', populate: {path: 'user_id'}}}).exec(function(err, subjects){
          if(err) console.log(err);
          if(subjects){
            subjects.map((sub, s)=>{
              var length = 0;
              sub.groups.map((gr, g)=>{
                length+=gr.students.length;
              })
              subStudents.push({
                name: sub.subject_name,
                value: length
              })
              resolve('Success')
            })
          }
        })
      })
      s.then(function(){
        var end = new Promise(function(resolve, reject){
          for(var i=0; i<3; i++){
            var max = 0;
            var index=0;
            var f = new Promise (function(resolve, reject){
              subStudents.map((len, l)=>{
                if(len.value>max){
                  max=len.value;
                  index=l-1;
                }
              })
              resolve('success')
            })
            f.then(function(){
              pieData.push(subStudents.splice(index,1)[0]);
            })
            resolve('success')
          }
        })
        end.then(function(){
          res.send({
            piedata: pieData
          })
        })
      })
		}
	})
});



router.get('/gender_girl',(req,res)=>{
	User.count({
		gender: 'Женщина',
		status: 'student'
	}).exec(function(err,girls){
		if(err){
			res.status(500).send({err: err});
		} else {
			res.status(200).send({girls: girls});
		}
	})
})

router.get('/gender_all',(req,res)=>{
	User.count({
		status: 'student'
	}).exec(function(err,all){
	    if(err){
			res.status(500).send({err: err});
		} else {
			res.status(200).send({all: all});
		}
	})
})

module.exports = router;
