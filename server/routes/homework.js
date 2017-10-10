var express = require('express')
var router = express.Router()
var Student = require('../models/student')
var Subject = require('../models/subject')
var Homework = require('../models/homework')
var Notifications = require ('../models/notifications')
let multiparty = require('multiparty')
let fs = require('fs')


router.post('/addhomework', (req, res) => {
  if(req.query.filename){
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
		  	var tempPath = files.file[0].path;
				var fileName = files.file[0].originalFilename;
				let copyToPath = "public/teacher-homeworks/" + fileName;
				fs.readFile(tempPath, (err, data) => {
					// make copy of image to new location
					fs.writeFile(copyToPath, data, (err) => {
						// delete temp image
						fs.unlink(tempPath, () => {
							if(err) console.log(err);
							else {
         var students =  JSON.parse(fields.students)
              var homeworkData = {
                message: fields.description,
                deadline: fields.deadline,
                subject_id: fields.subject_id,
                lessonDate: fields.lessonDate,
                answer: students,
                group_id: fields.group_id,
                file: fileName
              }
              var dateFormat = function(date){
			          var fDate = new Date(date);
			          var m = ((fDate.getMonth() * 1 + 1) < 10) ? ("0" + (fDate.getMonth() * 1 + 1)) : (fDate.getMonth() * 1 + 1);
			          var d = ((fDate.getDate() * 1) < 10) ? ("0" + (fDate.getDate() * 1)) : (fDate.getDate() * 1);
			          return m + "." + d + "." + fDate.getFullYear()
			        }
              Subject.findOne({_id:fields.subject_id}, (err, subj)=>{
              	if(err) console.log(err)
              	if(subj){
              		var students_ids = students.map((student)=>{
              			return student.student_id
              		})
		             	var noteData = {
		              	type:'info',
		              	date:fields.deadline,
		              	from:subj.subject_name,
		              	text:"У Вас новое домашнее задание! Просим выполнить его до " + dateFormat(fields.deadline),
		              	student:students_ids
		              }
		              var newNote = new Notifications(noteData)
		              newNote.save((err, savedNote)=>{
		              	if(err) console.log(err)
		              })
              	}
              })
		            const newHomework = new Homework(homeworkData);
		            newHomework.save((err, savedhomework) => {
		            if (err) console.log(err);
		            else {
		              res.send({
		                mеssage: 'Домашнее задание отправлено'
		              })
		            }
	            })
						}
					})
				})
			})
		})
	} else {
    var students = JSON.parse(req.body.students);
    var homeworkData = {
      message: req.body.description,
      deadline: req.body.deadline,
      subject_id: req.body.subject_id,
      lessonDate: req.body.lessonDate,
      answer: students,
      group_id: req.body.group_id
    }
    var dateFormat = function(date){
			          var fDate = new Date(date);
			          var m = ((fDate.getMonth() * 1 + 1) < 10) ? ("0" + (fDate.getMonth() * 1 + 1)) : (fDate.getMonth() * 1 + 1);
			          var d = ((fDate.getDate() * 1) < 10) ? ("0" + (fDate.getDate() * 1)) : (fDate.getDate() * 1);
			          return m + "." + d + "." + fDate.getFullYear()
			        }
    Subject.findOne({_id:req.body.subject_id}, (err, subj)=>{
              	if(err) console.log(err)
              	if(subj){
              		var students_ids = students.map((student)=>{
              			return student.student_id
              		})
		             	var noteData = {
		              	type:'info',
		              	date:req.body.deadline,
		              	from:subj.subject_name,
		              	text:"У Вас новое домашнее задание! Просим выполнить его до " + dateFormat(req.body.deadline),
		              	student:students_ids
		              }
		              var newNote = new Notifications(noteData)
		              newNote.save((err, savedNote)=>{
		              	if(err) console.log(err)
		              })
              	}
              })
    const newHomework = new Homework(homeworkData);
                newHomework.save((err, savedhomework) => {
                  if (err) console.log(err);
                  else {
                    res.send({
                      message:'дз удачно добавлено'
                    })
                  }
                })
	}

});

router.post('/edithomework', (req, res) => {
  if(req.query.filename){
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
		  	var tempPath = files.file[0].path;
				var fileName = files.file[0].originalFilename;
				let copyToPath = "public/teacher-homeworks/" + fileName;
				fs.readFile(tempPath, (err, data) => {
					// make copy of image to new location
					fs.writeFile(copyToPath, data, (err) => {
						// delete temp image
						fs.unlink(tempPath, () => {
							if(err) console.log(err);
							else {
              Homework.findOne({subject_id: fields.subject_id, group_id: fields.group_id}, function(err, homework){
                if(err) console.log(err);
                if(homework){
                  homework.message = (fields.description!='')?fields.description:homework.message;
            			homework.deadline = (fields.deadline!='')?fields.deadline:homework.deadline;
            			homework.lessonDate = (fields.lessonDate!='')?fields.lessonDate:homework.lessonDate;
            			homework.subject_id = (fields.subject_id!='')?fields.subject_id:homework.subject_id;
            			homework.group_id = (fields.group_id!='')?fields.group_id:homework.group_id;
                  homework.file = fileName;
            			homework.save(function(err, savedhomework){
            				if(err) console.log(err);
            				if(savedhomework){
                      res.send({
                        message: 'ДЗ сохранено'
                      })
                }
              })
						}
					})
        }
				})
			})
		})
  })
	} else {
        Homework.findOne({subject_id: req.body.subject_id, group_id: req.body.group_id}, function(err, homework){
          if(err) console.log(err);
          if(homework){
            homework.message = (req.body.description!='')?req.body.description:homework.message;
            homework.deadline = (req.body.deadline!='')?req.body.deadline:homework.deadline;
            homework.lessonDate = (req.body.lessonDate!='')?req.body.lessonDate:homework.lessonDate;
            homework.subject_id = (req.body.subject_id!='')?req.body.subject_id:homework.subject_id;
            homework.group_id = (req.body.group_id!='')?req.body.group_id:homework.group_id;
            homework.save(function(err, savedhomework){
              if(err) console.log(err);
              if(savedhomework){
                res.send({
                  message: 'ДЗ сохранено'
                })
          }
        })

      }
    })
	}
});

router.post('/deletehomework', (req, res)=>{
	Homework.findOneAndRemove({subject_id:req.body.subject_id, group_id: req.body.group_id}, function(err, homework){
		if(err) console.log(err);
		if(homework){
			res.send({
				message:"Удалено"
			})
		}
	})
})

router.get('/gethomework', (req, res) => {
	Homework.findOne({_id: req.query.homework_id}).populate({path: 'answer', populate: {path:'student_id', populate: {path:'user_id'}}}).exec(function(err, homework){
		if(err) {console.log(err) }
		if(homework){
      var students_name = [];
      var students_lastname = [];
      var s  = new Promise(function(resolve, reject){
      		   homework.answer.map((ans, a)=>{
              Student.findOne({_id: ans.student_id}).populate('user_id').exec(function(err, student){
                if(err) reject(err);
                if(student){
                  students_name.push(student.user_id.name);
                  students_lastname.push(student.user_id.lastname);
                  resolve('Success')
                }
              })
            })
      	})
        s.then(function(){
          res.send({
            homework: homework,
            answer: homework.answer,
            students_name: students_name,
            students_lastname: students_lastname
          })
        })
      }
	})
});

router.post('/gethomeworksofsubject', (req, res)=>{
  Student.findOne({user_id: req.body.user_id}, (err, student)=>{
    Homework.find({group_id: student.group_id, subject_id: req.body.subject_id, students: student._id}).populate('group_id answers').exec(function(err, homeworks){
      if(err) console.log(err);
      else{
        if(homeworks=[]){
          Homework.find({group_id: student.group_id, subject_id: req.body.subject_id}).populate('group_id answers').exec(function(err, homeworkss){
            if(err) console.log(err);
            else{
              Homework.find({students: student.group_id, subject_id: req.body.subject_id}).populate('group_id answers').exec(function(err, homeworksS){
                if(err) console.log(err);
                else{
                  var newHomeworks= homeworkss.concat(homeworksS);
                  res.send({
                    homeworks: newHomeworks,
                    student_id: student._id
                  })
                }

              })
            }
        })
      }else {
        res.send({
          homeworks: homeworks
        })
      }
      }
    })
  })
})
router.post('/gethomeworksofsubjectwithstatus', (req, res)=>{
  var allHomeworks = [];
  Student.findOne({user_id: req.body.user_id}, (err, student)=>{
      Homework.find({group_id: student.group_id, subject_id: req.body.subject_id}).populate('group_id answers').exec(function(err, homeworkss){
        if(err) console.log(err);
        if(homeworkss){
          homeworkss.map((homework, h)=>{
            homework.answer.map((ans, a)=>{
              if(ans.student_id.toString()===student._id.toString() && ans.status == false){
                allHomeworks.push(homework);
              }
            })
          })
          res.send({
            homeworks: allHomeworks,
            student_id: student._id
          })
        }
    })
  })
})
router.post('/addanswer', (req, res) => {
  if(req.query.filename){
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
		  	var tempPath = files.file[0].path;
				var fileName = files.file[0].originalFilename;
				let copyToPath = "public/student-homeworks/" + fileName;
				fs.readFile(tempPath, (err, data) => {
					// make copy of image to new location
					fs.writeFile(copyToPath, data, (err) => {
						// delete temp image
						fs.unlink(tempPath, () => {
							if(err) console.log(err);
							else {
              Homework.findOne({_id: fields.homework_id}).populate('answer').exec(function(err, homework){
                if(err) console.log(err);
                if(homework){
                  homework.answer.forEach((item, index) => {
                    if(item.student_id.toString() === fields.student_id.toString()) {
                      homework.answer[index].answer_message = (fields.answer_message!='') ? fields.answer_message : item.answer_message;
                      homework.answer[index].answer_file = fileName;
                      homework.answer[index].status = true;
                    }
                  })
                  homework.save((err, newHomework) => {
                    if(err)
                      console.log(err)
                    res.status(200).send({
                      message: 'ДЗ сохранено'})
                  })
						}
					})
        }
				})
			})
		})
  })
	} else {
        Homework.findOne({_id: req.body.homework_id}).populate('answer').exec(function(err, homework){
          if(err) console.log(err);
          if(homework){
              homework.answer.forEach((item, index) => {
                if(item.student_id.toString() === req.body.student_id) {
                  homework.answer[index].answer_message = (req.body.answer_message!='') ? req.body.answer_message : item.answer_message;
                  homework.answer[index].status = true;
                }
              })
              homework.save((err, newHomework) => {
                if(err)
                  console.log(err)
                res.status(200).send({
                  message: 'ДЗ сохранено'})
              })
      }
    })
	}
});
router.post('/getsubjectandgrouphomeworks', (req, res)=>{
  Homework.find({group_id: req.body.group_id, subject_id: req.body.subject_id}).populate('group_id answers').exec(function(err, homeworks){
    if(err) console.log(err);
    else{
      res.send({
        homeworks: homeworks
      })
    }
  })
})

module.exports = router;
