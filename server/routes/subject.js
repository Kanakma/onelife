var express = require('express')
var router = express.Router()
let multiparty = require('multiparty')
var Subject = require('../models/subject')
let fs = require('fs')
var Group = require('../models/group')
var Teacher = require('../models/teacher')
var Student = require('../models/student')
var Major = require('../models/major')
var User = require('../models/user')
var Homework = require('../models/homework')
var Faculty = require('../models/faculty')

var jwtDecode = require('jwt-decode')


router.get('/getforsubject', (req, res) => {
	Faculty.find((err, faculties) => {
		if(err) {console.log(err) }
		else {
			Major.find((err, majors) => {
				if(err) {console.log(err) }
				else {
					Teacher.find((err, teachers) => {
						if(err) {console.log(err) }
						else {
							User.find((err, users) => {
								if(err) {console.log(err) }
								else {
									var myTeachers = [];
									var myTeacher = {};
									teachers.forEach(function(teacher){
											users.forEach(function(user){
												if(teacher.user_id.toString() == user._id.toString()){
													myTeacher = {
														teacher_id: teacher._id,
														name: user.name,
														lastname: user.lastname,
														faculty_id: teacher.faculty_id
													}
													myTeachers.push(myTeacher);
												}
											})
									})
									res.send({
										faculties: faculties,
										majors: majors,
										teachers: myTeachers
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

router.post('/addsubject', (req, res) => {
	if(req.query.image){
		let form = new multiparty.Form();
		form.parse(req, (err, fields, files) => {
		  var tempPath = files.imageFile[0].path;
			var fileName = files.imageFile[0].originalFilename;
			let copyToPath = "public/subject-img/" + fileName;
			fs.readFile(tempPath, (err, data) => {
				fs.writeFile(copyToPath, data, (err) => {
					fs.unlink(tempPath, () => {
						if(err) {return res.status(401).end();}
						else {
							var info = JSON.parse(fields.data)
							var optional = JSON.parse(fields.optional)
							var faculty_id = JSON.parse(fields.faculty_id)
							var subjectData = {
								subject_code: info.subject_code,
								subject_name: info.subject_name,
								teacher_id: info.teacher_id,
								period: info.period,
								course_number: info.course_number,
								credit_number: info.credit_number,
								description: info.description,
								optional: fields.optional,
								img: fileName,
								groups:[]
							}
							if(faculty_id.length>0){
								subjectData.faculty_id = faculty_id
							}
							if(info.max_students){
								subjectData.max_students = info.max_students
							}
							Subject.findOne({subject_code: subjectData.subject_code}, (err, subject) => {
								if(err) console.log(err);
								else if (subject){
									res.status(409).send({
										message: 'Этот предмет уже есть в списке'
									})
								} else {
									if(subjectData.optional=='false'){
										Group.find({course_number:Number(subjectData.course_number)}).populate({path: 'major', populate: {path: 'major_department', populate: {path:'department_faculty'}}}).exec(function(err, groups){
											if(err) console.log(err);
											if(groups){
												if(subjectData.faculty_id){
													var faculty_groups = groups.filter(function(group){
														return group.major.major_department.department_faculty._id==subjectData.faculty_id
													})
													faculty_groups.map(function(thisGroup){
														subjectData.groups.push(thisGroup._id)
													})
													const newSubject = new Subject(subjectData);
												  newSubject.save((err, savedSubject) => {
												    if (err) console.log(err);
														else {
															res.send({
																subject: savedSubject,
																message:'Предмет удачно добавлен'
															})
														}
													})
												} else{
													groups.map(function(group){
														subjectData.groups.push(group._id)
													})
													const newSubject = new Subject(subjectData);
												  newSubject.save((err, savedSubject) => {
												    if (err) console.log(err);
														else {
															res.send({
																subject: savedSubject,
																message:'Предмет удачно добавлен'
															})
														}
													})
												}
											}
										})
									} else {
										const newSubject = new Subject(subjectData);
									  newSubject.save((err, savedSubject) => {
									    if (err) console.log(err);
											else {
												res.send({
													subject: savedSubject,
													message:'Предмет удачно добавлен'
												})
											}
										})
									}
								}
							})
						}
					})
				})
			})
		})
	} else {
		var s = JSON.parse(req.body.data);
		var subjectData = {
			subject_code: s.subject_code,
			subject_name: s.subject_name,
			teacher_id: s.teacher_id,
			period: s.period,
			course_number: s.course_number,
			credit_number: s.credit_number,
			description: s.description,
			optional:req.body.optional,
			groups:[]
		}
		if(req.body.faculty_id){
			subjectData.faculty_id = req.body.faculty_id
		}
		if(s.max_students){
			subjectData.max_students = s.max_students
		}
		Subject.findOne({subject_code: subjectData.subject_code}, (err, subject) => {
			if(err) {console.log(err) }
			else if (subject){
				res.status(409).send({
					message: 'Этот предмет уже есть в списке'
				})
			} else {
				if(subjectData.optional=='false'){
					Group.find({course_number:Number(subjectData.course_number)}).populate({path: 'major', populate: {path: 'major_department', populate: {path:'department_faculty'}}}).exec(function(err, groups){
						if(err) console.log(err);
						if(groups){
							if(subjectData.faculty_id){
								var faculty_groups = groups.filter(function(group){
									return group.major.major_department.department_faculty._id==subjectData.faculty_id
								})
								faculty_groups.map(function(thisGroup){
									subjectData.groups.push(thisGroup._id)
								})
								const newSubject = new Subject(subjectData);
							  newSubject.save((err, savedSubject) => {
							    if (err) console.log(err);
									else {
										res.send({
											subject: savedSubject,
											message:'Предмет удачно добавлен'
										})
									}
								});
							}else{
								groups.map(function(group){
									subjectData.groups.push(group._id)
								})
								const newSubject = new Subject(subjectData);
							  newSubject.save((err, savedSubject) => {
							    if (err) console.log(err);
									else {
										res.send({
											subject: savedSubject,
											message:'Предмет удачно добавлен'
										})
									}
								})
							}
						}
					})
				} else{
					const newSubject = new Subject(subjectData);
				  newSubject.save((err, savedSubject) => {
				    if (err) console.log(err);
						else {
							res.send({
								subject: savedSubject,
								message:'Предмет удачно добавлен'
							})
						}
					})
				}
			}
		})
	}
});

router.post('/editsubject', (req, res) =>{
	var subject_id = req.query.subject_id
	if(subject_id){
		let form = new multiparty.Form();
		form.parse(req, (err, fields, files) => {
			var dataD = JSON.parse(fields.data);
			var optional = JSON.parse(fields.optional);
			var faculty_id = JSON.parse(fields.faculty_id);
		  var tempPath = files.imageFile[0].path;
			var fileName = files.imageFile[0].originalFilename;
			let copyToPath = "public/subject-img/" + fileName;
			fs.readFile(tempPath, (err, data) => {
				fs.writeFile(copyToPath, data, (err) => {
					fs.unlink(tempPath, () => {
						if(err) {
							return res.status(401).end()
						}
						else {
							Subject.findOne({_id: subject_id}, function(err, subject){
								if(err) console.log(err);
								if(subject){
									subject.subject_code = (dataD.subject_code!='')?dataD.subject_code:subject.subject_code;
									subject.subject_name =(dataD.subject_name!='')?dataD.subject_name:subject.subject_name;
									subject.faculty_id =(faculty_id === ' ') ? null : (faculty_id === '') ? subject.faculty_id : faculty_id;
									subject.teacher_id =(dataD.teacher_id!='')?dataD.teacher_id:subject.teacher_id;
									subject.period =(dataD.period!='')?dataD.period:subject.period;
									subject.course_number =(dataD.course_number!='')?dataD.course_number:subject.course_number;
									subject.credit_number =(dataD.credit_number!='')?dataD.credit_number:subject.credit_number;
									subject.max_students =(dataD.max_students!='')?dataD.max_students:subject.max_students;
									subject.description =(dataD.description!='')?dataD.description:subject.description;
									subject.optional = optional;
									subject.img = fileName;
									subject.save(function(err, savedSubject){
										if(err) console.log(err)
										else{
											res.send({
												saved:savedSubject
											})
										}
									})
								}
							})
						}
					});
				});
			});
		})
	} else{
		var dataD = JSON.parse(req.body.data)
		var faculty_id = req.body.faculty_id;
		var optional = req.body.optional;
		Subject.findOne({_id: req.body.subject_id}, function(err, subject){
			if(err) console.log(err);
			if(subject){
				subject.subject_code = (dataD.subject_code!='')?dataD.subject_code:subject.subject_code;
				subject.subject_name =(dataD.subject_name!='')?dataD.subject_name:subject.subject_name;
				subject.faculty_id =(faculty_id === ' ') ? null : (faculty_id === '') ? subject.faculty_id : faculty_id;
				subject.teacher_id =(dataD.teacher_id!='')?dataD.teacher_id:subject.teacher_id;
				subject.period =(dataD.period!='')?dataD.period:subject.period;
				subject.course_number =(dataD.course_number!='')?dataD.course_number:subject.course_number;
				subject.credit_number =(dataD.credit_number!='')?dataD.credit_number:subject.credit_number;
				subject.max_students =(dataD.max_students!='')?dataD.max_students:subject.max_students;
				subject.description =(dataD.description!='')?dataD.description:subject.description;
				subject.optional = optional;
				subject.img = subject.img;
				subject.save(function(err, saved){
					if(err) console.log(err)
					else{
						res.send({
							saved:saved
						})
					}
				})
			}
		})
	}
})


router.post('/deletesubject', (req, res)=>{
	Subject.findOneAndRemove({_id:req.body.subject_id}, function(err, subject){
		if(err) console.log(err);
		if(subject){
			res.send({
				message:"Удалено"
			})
		}
	})
})

router.get('/getsubjects', (req, res) => {
	Subject.find().populate({path: 'teacher_id', populate: {path: 'user_id'}}).populate('faculty_id').exec(function(err, subjects){
		if(err) console.log(err)
		else {
				  res.send({
						subjects: subjects
					})
		}
	})
});

router.get('/getsubject', (req, res) => {
	var subjectId = req.query.subjectId;
	var mySubject = {};
	var already = false;
	Subject.findOne({_id: subjectId}).populate({path: 'teacher_id', populate: {path: 'user_id'}}).exec(function(err, subject){
		if(err) { console.log(err) }
		else {
			res.send({
				subject: subject,
				teacher: subject.teacher_id,
				user: subject.teacher_id.user_id,
				img: subject.img
			})

		}
	})
})

router.get('/getonesubject', (req, res) => {
	var subjectId = req.query.subjectId;
	var mySubject = {};
	var token = req.headers.authorization.split(' ')[1];
	var decoded = jwtDecode(token);
	var already = false;
	Subject.findOne({_id: subjectId}).populate({path: 'teacher_id', populate: {path: 'user_id'}}).populate('major_id').exec(function(err, subjects){
		if(err) { console.log(err) }
		else {
					res.send({
						subject: subjects
					})
		}
	})
})
router.get('/getsubjectswithhw', (req, res)=>{
  var allSubjects = [];
  Student.findOne({user_id: req.query.user_id}, (err, student)=>{
    if(err) console.log(err);
    if(student){
      Subject.find({groups: student.group_id, optional:true}).populate({path: 'teacher_id', populate: {path: 'user_id'}}).populate('faculty_id').exec(function(err, subjects){
        if(err) console.log(err);
           if(subjects){
             subjects.map((subject, index)=>{
               Homework.find({subject_id: subject._id}, (err, homeworks)=>{
                 homeworks.map((homework, i)=>{
                   homework.answer.forEach((item, key)=>{
                     if(item.student_id.toString() === student._id.toString() && allSubjects.indexOf(subject)==-1){
                       allSubjects.push(subject);
                     }
                   })
                 })
               })
             })
             Subject.find({optional: false, groups: student.group_id}).populate({path: 'teacher_id', populate: {path: 'user_id'}}).populate('faculty_id').exec(function(err, subjectss){
               if(err) console.log(err);
               if(subjectss){
                 subjectss.map((subject, index)=>{
                   Homework.find({subject_id: subject._id}, (err, homeworks)=>{
                     homeworks.map((homework, i)=>{
                       homework.answer.forEach((item, key)=>{
                         if(item.student_id.toString() === student._id.toString() && allSubjects.indexOf(subject)==-1){
                           allSubjects.push(subject);
                         }
                       })
                     })

                   })

                 })
                   res.send({
                     subjects: allSubjects
                   })
               }
             })




           }
      })
    }
  })

})

router.get('/getsubjectsofstudent', (req, res)=>{
  Student.findOne({user_id: req.query.user_id}, (err, student)=>{
    if(err) console.log(err);
    if(student){
      Subject.find({groups: student.group_id, students:student._id}).populate({path: 'teacher_id', populate: {path: 'user_id'}}).populate('faculty_id').exec(function(err, subjects){
        if(err) console.log(err);
        if(subjects){
          if(subjects = []){
                Subject.find({groups: student.group_id}).populate({path: 'teacher_id', populate: {path: 'user_id'}}).populate('faculty_id').exec(function(err, subjectss){
                  if(err) console.log(err);
                  else{
                    Subject.find({students: student._id}).populate({path: 'teacher_id', populate: {path: 'user_id'}}).populate('faculty_id').exec(function(err, subjectsS){
                              if(err) console.log(err);
                              if(subjectsS){
                                var newSubjects = subjectss.concat(subjectsS);
                                res.send({
                                  subjects: newSubjects
                                })
                              }
                            })
                  }
                })
          }else {
            res.send({
              subjects: subjects
            })
          }
        }
    })
    }
  })

})
router.get('/getsubjforschedule', (req, res) =>{
	Subject.find({period:Number(req.query.period)}).populate('faculty_id teacher_id groups').exec(function(err, subjects){
		if(err) console.log(err)
		if(subjects){
			res.send({
				subjects:subjects
			})
		}
	})
})
router.get('/getsubjectteacher', (req, res) => {
	var token = req.headers.authorization.split(' ')[1];
	var decoded = jwtDecode(token);
	Teacher.findOne({user_id: decoded.sub}, (err, teacher) => {
		if(err) { console.log(err) }
		else {
			Subject.find({teacher_id: teacher._id}, (err, subjects) => {
				if(err) { console.log(err) }
				else {
					res.send({
						subjects: subjects
					})
				}
			})
		}
	})
});
router.get('/getteachersubjects', (req, res) => {
	var userId = req.query.teacherId;
			Teacher.findOne({user_id: userId}, (err, teacher) => {
				if(err) { console.log(err) }
				else {
					Subject.find({teacher_id: teacher._id}).populate({path: 'teacher_id', populate: {path: 'user_id'}}).populate('major_id').exec(function(err, subjects){
						if (err){console.log(err)}
						else{
								res.send({
									subjects: subjects
								})
							}
					})
				}
			})
		})
		router.post('/choosesubject', (req, res) => {
			var subjectId = req.body.subjectId.trim();
			var token = req.headers.authorization.split(' ')[1];
			var decoded = jwtDecode(token);
			Student.findOne({user_id:decoded.sub}, function(err, student){
				if(err) console.log(err);
				if(student){
					Subject.findOne({_id: subjectId},function(err,subj) {
						if(err) console.log(err);
						if(subj){
							subj.students.push(student._id)
							subj.markModified("students");
							subj.save(function(err, saved){
								if(err) console.log(err);
								if(saved){
									res.send({message:'Добавлено'})
								}
							});
						}
					})
				}
			})
		});

module.exports = router;
