var express = require('express')
var router = express.Router()
var User = require('../models/user')
var Teacher = require('../models/teacher')
var TeacherCounters = require('../models/teacherCounters')
const bcrypt = require('bcryptjs')
let multiparty = require('multiparty')
let fs = require('fs')
var Faculty = require('../models/faculty')
var async = require('async')


router.get('/getteacherprofileinfo', (req, res) => {
	var userId = req.query.teacherId;
			Teacher.findOne({user_id: userId}).populate('user_id').exec(function(err, teacher){
				if(err) { console.log(err) }
				else {
					res.send({
						teacher: teacher
					})
				}
			})
		})

router.post('/editteacher', (req, res) =>{
	// console.log(req.body)
	const editedTeacher = JSON.parse(req.body.editedTeacher);
	Teacher.findOne({_id:req.body.teacher_id}, function(err, teacher){
		if(err) console.log(err);
		if(teacher){
			teacher.degree = (editedTeacher.degree!='')?editedTeacher.degree:teacher.degree;
			teacher.email = (editedTeacher.email!='')?editedTeacher.email:teacher.email;
			teacher.phone = (editedTeacher.phone!='')?editedTeacher.phone:teacher.phone;
			teacher.entry_year = (req.body.entry_year!='')?req.body.entry_year:teacher.entry_year;
			teacher.faculty_id = (editedTeacher.faculty_id!='')?editedTeacher.faculty_id:teacher.faculty_id;
			teacher.save(function(err, savedTeacher){
				if(err) console.log(err);
				if(savedTeacher){
					User.findOne({_id:savedTeacher.user_id}, function(err, user){
						if(err) console.log(err);
						if(user){
							user.name = (editedTeacher.name!='')?editedTeacher.name:user.name;
							user.lastname = (editedTeacher.lastname!='')?editedTeacher.lastname:user.lastname;
							user.birthday = (req.body.birthday!='')?req.body.birthday:user.birthday;
							user.gender = (editedTeacher.gender!='')?editedTeacher.gender:user.gender;
							user.passport_id = (editedTeacher.passport_id!='')?editedTeacher.passport_id:user.passport_id;
							user.password=(editedTeacher.password!='')?bcrypt.hashSync(editedTeacher.password, 10):user.password;
							user.save(function(err, savedUser){
								if(err) console.log(err);
								if(savedUser){
									res.status(200).send({sms:'Yes!!!!!!!'})
								}
							})
						}
					})
				}
			})
		}
	})
})

router.post('/deleteteacher', (req, res) =>{
	var newData = JSON.parse(req.body.teacher_id);
	Teacher.findOneAndRemove({_id:newData}, function(err, result){
		if(err)console.log(err);
		if(result){
			User.findOneAndRemove({_id:result.user_id}, function(err, removed){
				if(err) console.log(err);
			})
		}
	})
})


//This route will load all teachers info
router.get('/getteachers', (req, res) => {
	Teacher.find().populate('user_id faculty_id').exec(function(err, teachers){
		if(err) console.log(err)
		else {
			res.send({
				teachers: teachers
			})
		}
	})
})

// // Func for collecting all teachers from DBs
// var getTeachers = function(){
// 	return new Promise(function(resolve, reject){
// 		return Teacher.find({}, function(err, teachers){
// 			if (err) reject(err);
// 			else if(teachers){
// 				resolve(teachers);
// 			}
// 		})
// 	})
// }
// // This func for iterating each element in teachers array
// var teachFunction = function(teachers){
// 	return teachers.map(function(teacher){
// 		var oneTchr = constructTeach(teacher);
// 		return oneTchr;
// 	})
// }
// // This func for defining each teachers' fields
// var constructTeach = function(teacher){
// 	return function(allTchrs, callback){
// 		var callBack = (typeof allTchrs === 'function') ? allTchrs : callback;
// 		var allTchrs = (typeof allTchrs === 'function') ? [] : allTchrs;
// 		var myTeacher = {
// 			teacher_id:'',
// 			username: '',
// 			name: '',
// 			lastname: '',
// 			passport_id: '',
// 			faculty_id: '',
// 			faculty_name:'',
// 			entry_year: '',
// 			birthday:'',
// 			email:'',
// 			phone:'',
// 			social:'',
// 			gender:'',
// 			img:'',
// 			degree:''
// 		}
// 		User.findOne({_id:teacher.user_id}, function(err, user){
// 			if(err) console.log(err);
// 			if(user){
// 				if(teacher.faculty_id!=''){
// 					Faculty.findOne({_id:teacher.faculty_id}, function(err, faculty){
// 						if(err) console.log(err);
// 						if(faculty){
// 							myTeacher = {
// 								teacher_id:teacher._id,
// 								username:user.username,
// 								name: user.name,
// 								lastname: user.lastname,
// 								passport_id: user.passport_id,
// 								faculty_id: teacher.faculty_id,
// 								faculty_name:faculty.faculty_name,
// 								entry_year: teacher.entry_year,
// 								birthday: user.birthday,
// 								email: teacher.email,
// 								phone: teacher.phone,
// 								social: teacher.social,
// 								gender: user.gender,
// 								img: teacher.img,
// 								degree:teacher.degree
// 							}
// 							allTchrs.push(myTeacher);
// 							callBack(null, allTchrs);
// 						}
// 					})
// 				}
// 				else{
// 							myTeacher = {
// 								teacher_id:teacher._id,
// 								username:user.username,
// 								name: user.name,
// 								lastname: user.lastname,
// 								passport_id: user.passport_id,
// 								faculty_id: teacher.faculty_id,
// 								faculty_name:'',
// 								entry_year: teacher.entry_year,
// 								birthday: user.birthday,
// 								email: teacher.email,
// 								phone: teacher.phone,
// 								social: teacher.social,
// 								gender: user.gender,
// 								img: teacher.img,
// 								degree:teacher.degree
// 							}
// 							allTchrs.push(myTeacher);
// 							callBack(null, allTchrs);
// 				}
// 			}
// 		})
// 	}
// }

router.post('/addteacher', (req, res) => {
	var t = JSON.parse(req.body.teacher);
	var tU = JSON.parse(req.body.account);
	User.findOne({passport_id: t.passport_id}, (err, user) => {
		if(err) { console.log(err) }
		else if (user){
			res.status(409).send({
				message: 'Этот пользователь уже есть в списке'
			})
		} else {
			TeacherCounters.find((err, teachers) => {
				if(err) console.log(err)
				else {
					var userData = {
						username: 20000+teachers.length,
						password: bcrypt.hashSync(tU.password, 10),
						passport_id: t.passport_id,
						name: t.name,
						lastname: t.lastname,
						birthday: req.body.birthday,
						status: 'teacher',
						gender: t.gender
					}
					const newUser = new User(userData)
				  	newUser.save((err, savedUser) => {
					  if (err) console.log(err)
						else {
							var teacherData = {
								user_id: savedUser._id,
								university_code: '195',
								faculty_id: t.faculty_id,
								entry_year: req.body.entry_year.trim(),
								degree: t.degree,
								email:tU.email,
								phone:tU.phone
							}
							const newTeacher = new Teacher(teacherData);
						  	newTeacher.save((err, teacher) => {
								if (err) console.log(err)
								else {
									var newCounter = new TeacherCounters();
									newCounter.save()
									console.log("Пользователь добавлен");
									res.send({
										teacher: teacher,
										message:'Пользователь добавлен!'
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

router.post('/addteacherimg', (req, res) => {
		let form = new multiparty.Form();
		var teacher_id = req.query.teacher_id;
	form.parse(req, (err, fields, files) => {
	  var tempPath = files.imageFile[0].path;
		var fileName = files.imageFile[0].originalFilename;
		let copyToPath = "public/teacher-img/" + teacher_id +'-'+ fileName;
		fs.readFile(tempPath, (err, data) => {
			// make copy of image to new location
			fs.writeFile(copyToPath, data, (err) => {
				// delete temp image
				fs.unlink(tempPath, () => {
					if(err) {return res.status(401).end();}
					else {
						Teacher.findOneAndUpdate({_id: teacher_id}, { $set: {img: teacher_id +'-'+ fileName}}, { new: true }, (err) => {
							if(err) { console.log(err) }
      				else {
        					res.status(200).send({
									message: 'Пользователь добавлен!'
								})
							}
						})
					}
				});
			});
		});
	})
})

router.get('/getoneteacher', (req, res) => {
	var teacherId = req.query.teacherId;
	var myTeacher = {};
	Teacher.findOne({_id: teacherId}, (err, teacher) => {
		if(err) { console.log(err) }
		else {
			User.findOne({_id: teacher.user_id}, (err, user) => {
				if(err) { console.log(err) }
				else {
							myTeacher = {
								_id: teacher._id,
								teacher_username: user.username,
								teacher_name:  user.name,
								teacher_lastname: user.lastname,
								img: teacher.img,
								degree: teacher.degree,
								email: teacher.email,
								phone: teacher.phone,
								birthday: user.birthday,
								entry_year: teacher.entry_year,
								passport_id: user.passport_id

							}
					res.send({
						teacher: myTeacher
						})
					}
				})
			}
		})
	})



module.exports = router;
