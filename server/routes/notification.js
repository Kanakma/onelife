var express = require('express')
var router = express.Router()
var Notifications = require ('../models/notifications')
var DamFunc = require('../../client/src/modules/AllDamFunc')
var Student = require('../models/student')
var multiparty = require('multiparty')
var fs = require('fs')
var xlsx = require('node-xlsx').default
var User = require('../models/user')
var Teacher = require('../models/teacher')
const bcrypt = require('bcryptjs')

router.post('/addeventnotification', (req, res)=>{
	var notification = JSON.parse(req.body.notification)
	var data = {
		type:notification.type,
		date:req.body.date,
		text:notification.text,
		from:notification.from,
		forAll:true
	}
	var newNote = new Notifications(data)
	newNote.save((err, saved)=>{
		if(err) console.log(err)
		if(saved){
			res.send({
				message:"Yes!"
			})
		}
	})
})

router.post('/getnotifications', (req, res)=>{
	Notifications.find({forAll:true}, (err, notes) =>{
		if(err) console.log(err)
		if(notes){
			var temp = notes.filter(function(note){
				return note.readed.indexOf(req.body.user) > -1
			})
			var trueNotes = []
			notes.map(function(note){
				if(!DamFunc.IndInObjArr(temp, note._id, '_id')){
					trueNotes.push(note)
				}
			})
			res.send({
				notifications:trueNotes
			})
		}
	})
})
router.post('/getnotesforstudents', (req, res)=>{
	Student.findOne({user_id:req.body.user}, (err, student)=>{
		if(err) console.log(err)
		if(student){
			Notifications.find({student:student._id}, (err, notifications)=>{
				if(err) console.log(err)
				if(notifications){
					Notifications.find({forAll:true}, (err, notes)=>{
						if(err) console.log(err)
						if(notes){
							var trueNotes = []
							var temp = notes.filter(function(note){
								return note.readed.indexOf(req.body.user) > -1
							})
							notes.map(function(note){
								if(!DamFunc.IndInObjArr(temp, note._id, '_id')){
									trueNotes.push(note)
								}
							})
							var temp2 = notifications.filter(function(note){
								return note.readed.indexOf(req.body.user) > -1
							})
							notifications.map(function(note){
								if(!DamFunc.IndInObjArr(temp2, note._id, '_id')){
									trueNotes.push(note)
								}
							})
							res.send({
								notifications:trueNotes
							})
						}
					})
				}
			})
		}
	})
})

router.post('/readnotes', (req, res)=>{
	var notes = JSON.parse(req.body.notes)
	console.log(notes)
	notes.map(function(id){
		Notifications.findOne({_id:id}, (err, note) =>{
			if(err) console.log(note)
			if(note){
				note.readed.push(req.body.user)
				note.save((err, saved)=>{
					if(err) console.log(err)
				})
			}
		})
	})
	res.send({
		message:"Saved!"
	})
})

router.post('/getallnotes', (req, res)=>{
	Notifications.find({forAll:true}, (err, trueNotes)=>{
		if(err) console.log(err)
		if(trueNotes){
			res.send({
				notifications:trueNotes
			})
		}
	})
})
router.post('/getallnotesforstudent', (req, res)=>{
	Notifications.find({forAll:true}, (err, trueNotes)=>{
		if(err) console.log(err)
		if(trueNotes){
			Student.findOne({user_id:req.body.user}, (err, student)=>{
				if(err) console.log(err)
				if(student){
					Notifications.find({student:student._id}, (err, notifications)=>{
						if(err) console.log(err)
						if(notifications){
							res.send({
								notifications:trueNotes.concat(notifications)
							})
						}
					})
				}
			})
		}
	})
})

router.post('/teachparser', (req, res)=>{
	var form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      var tempPath = files.file[0].path
			var workSheetsFromBuffer = xlsx.parse(fs.readFileSync(tempPath))
			var arrayOfTeachers = workSheetsFromBuffer[0].data
			arrayOfTeachers.map(function(teacher, index){
				if(index==0){
				} else{
					User.findOne({passport_id: teacher[3]}, (err, user)=>{
						if(err){
							console.log(err)
						}	else if(user){
							index++
						} else{
							// console.log(typeof teacher[6])
							Teacher.find((err, teachers) => {
								if(err) console.log(err)
								else {
									// console.log('159')
									var userData = {
										username: 20000+teachers.length,
										password: bcrypt.hashSync('123456789', 10),
										passport_id: teacher[3],
										name: teacher[1],
										lastname: teacher[0],
										fathername:teacher[2],
										birthday: new Date(teacher[4]),
										status: 'teacher',
										gender: teacher[5]
									}
									const newUser = new User(userData)
								  	newUser.save((err, savedUser) => {
									  if (err) console.log(err)
										else {
											var teacherData = {
												user_id: savedUser._id,
												university_code: '195',
												entry_year: new Date(teacher[6]),
												degree: teacher[7],
												email:teacher[8],
												phone:teacher[9]
											}
											const newTeacher = new Teacher(teacherData);
										  	newTeacher.save((err, savedTeacher) => {
												if (err) console.log(err)
												else {
													// console.log('187')
													fs.unlink(tempPath, function(err){
														if(!err){
															res.send({
																message:'Преподаватели успешно добавлены!'
															})
														}
													})
												}
											})
										}
								  })
								}
							})
						}
					})
				}
			})
    })
})

router.post('/studparser', (req, res)=>{
	console.log('209')
	var form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      var tempPath = files.file[0].path
			var workSheetsFromBuffer = xlsx.parse(fs.readFileSync(tempPath))
			var arrayOfStudents = workSheetsFromBuffer[0].data
			arrayOfStudents.map(function(student, index){
				if(index==0){
				} else{
					User.findOne({passport_id: student[3]}, (err, user)=>{
						if(err){
							console.log(err)
						}	else if(user){
							index++
						} else{
							console.log('224')
							Student.find((err, students) => {
								if(err) console.log(err)
								else{
									var userData = {
										username: 100001+students.length,
										password: bcrypt.hashSync('123456789', 10),
										passport_id: student[3],
										name: student[1],
										lastname: student[0],
										fathername:student[2],
										birthday: new Date(student[4]),
										status: 'student',
										gender: student[5]
									}
									const newUser = new User(userData)
									newUser.save((err, savedUser) => {
										if(err) console.log(err)
										else {
											var studentData = {
												user_id: savedUser._id,
												university_code: '195',
												admission_year: new Date(student[6]),
												email:student[7],
												phone:student[8]
											}
											const newStudent = new Student(studentData)
											newStudent.save((err, savedStudent) => {
												if (err) console.log(err)
												else {
													// console.log('187')
													fs.unlink(tempPath, function(err){
														if(!err){
															res.send({
																message:'Студенты успешно добавлены!'
															})
														}
													})
												}
											})
										}
									})
								}	
							})
						}
					})
				}
			})
    })
})

module.exports = router;
