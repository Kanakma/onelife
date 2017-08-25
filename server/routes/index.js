var express = require('express');
var router = express.Router();
var Major = require('../models/major');
var Faculty = require('../models/faculty');
var User = require('../models/user');
var Teacher = require('../models/teacher');
var Student = require('../models/student');
var Subject = require('../models/subject');
var Quiz = require('../models/quiz');
var QuizPoint = require('../models/quiz_point');
var Department = require('../models/department');
var Parrent = require('../models/parrent');
var Mark=require('../models/mark')
var Attendance = require('../models/attendance')
var Homework = require('../models/homework')
var Group = require('../models/group')
const bcrypt = require('bcryptjs');
var jwtDecode = require('jwt-decode');
var mongoose = require('mongoose');
var DeepPopulate = require('mongoose-deep-populate')(mongoose);
let multiparty = require('multiparty');
let fs = require('fs');
var async = require('async');

//This route will add new major
router.post('/addmajor', (req, res) => {
	var majorData = {
		major_name: req.body.major_name.trim(),
		major_code: req.body.major_code.trim(),
		major_group: req.body.major_group.trim(),
		major_department:req.body.major_department.trim()
	}
	Major.findOne({major_code: majorData.major_code}, (err, major) => {
		if(err) {console.log(err) }
		else if (major){
			res.status(409).send({
				message: 'Эта специальность уже есть в списке'
			})
		} else {
			const newMajor = new Major(majorData);
		  newMajor.save(function(err, savedMajor){
		    if(err) console.log(err);
				if(savedMajor) {
					Department.findOne({_id:majorData.major_department}, function(err, department){
						if(err) console.log(err);
						if(department){
							department.majors.push(savedMajor._id)
							department.save(function(err, savedDepartment){
								if(err) console.log(err);
								if(savedDepartment){
									res.send({
										message: 'Специальность удачно добавлена'
									})
								}
							})
						}
					})
				}
		  });
		}
	})
});
//This route will change major's info
router.post('/editmajor', (req, res) => {
	var editedMajor = JSON.parse(req.body.editedMajor);
	console.log(editedMajor)
	Major.findOne({_id:req.body.major_id}, function(err, major){
		if(err) console.log(err);
		if(major){
			major.major_name = (editedMajor.major_name!='')?editedMajor.major_name:major.major_name;
			major.major_code = (editedMajor.major_code!='')?editedMajor.major_code:major.major_code;
			major.major_group = (editedMajor.major_group!='')?editedMajor.major_group:major.major_group;
			major.major_department = (editedMajor.major_department!='')?editedMajor.major_department:major.major_department;
			major.save(function(err, savedMajor){
				if(err) console.log(err);
				if(savedMajor){
					if(editedMajor.major_department!=req.body.old_depId && editedMajor.major_department!=''){
						Department.findOne({_id:editedMajor.major_department}, function(err, department){
							department.majors.push(req.body.major_id);
							department.save(function(err, savedDep){
								if(err) console.log(err);
								if(savedDep){
									Department.findOne({_id:req.body.old_depId}, function(err, oldDep){
										if(err) console.log(err);
										if(oldDep){
											oldDep.majors.splice(oldDep.majors.indexOf(req.body.major_id), 1);
											oldDep.save(function(err, result){
												if(err) console.log(err);
											})
										}
									})
								}
							})
						})
					}
				}
			})
		}
	})
})
//This route will delete major
router.post('/deletemajor', (req, res) =>{
	Major.findOneAndRemove({_id:req.body.major_id}, function(err, result){
		if(err) console.log(err);
	})
})
//This route will add new faculty
router.post('/addfaculty', (req, res) => {
	var faculty = JSON.parse(req.body.faculty);
	var facultyData = {
		faculty_code: faculty.faculty_code,
		faculty_name: faculty.faculty_name,
		faculty_dean: faculty.faculty_dean,
		faculty_email: faculty.faculty_email,
		faculty_phone: faculty.faculty_phone,
		departments: JSON.parse(req.body.departments)
	}

	Faculty.findOne({faculty_code: facultyData.faculty_code}, (err, faculty) => {
		if(err) {console.log(err) }
		else if (faculty){
			res.status(409).send({
				message: 'Этот факультет уже есть в списке'
			})
		} else {
			const newFaculty = new Faculty(facultyData);
		  newFaculty.save((err) => {
		    if (err) { console.log(err); }
				else {
					res.send({
						message: 'Факультет удачно добавлен'
					})
				}
		  });
		}
	})
});
//This route will change the faculty info
router.post('/editfaculty', (req, res) => {
	var editedFaculty = JSON.parse(req.body.editedFaculty);
		Faculty.findOne({_id: req.body.faculty_id}, function(err, faculty){
			if(err)console.log(err);
			if(faculty){
				faculty.faculty_code = (editedFaculty.faculty_code!='')?editedFaculty.faculty_code:faculty.faculty_code;
        faculty.faculty_name = (editedFaculty.faculty_name!='')?editedFaculty.faculty_name:faculty.faculty_name;
        faculty.faculty_dean = (editedFaculty.faculty_dean!='')?editedFaculty.faculty_dean:faculty.faculty_dean;
        faculty.faculty_phone = (editedFaculty.faculty_phone!='')?editedFaculty.faculty_phone:faculty.faculty_phone;
        faculty.faculty_email = (editedFaculty.faculty_email!='')?editedFaculty.faculty_email:faculty.faculty_email;
				faculty.save(function(err, result){
					if(err) console.log(err);
				})
			}
		})
});
//This route will delete faculty from DBs
router.post('/deletefaculty', (req, res) =>{
	var newData = JSON.parse(req.body.faculty_id);
	Faculty.findOneAndRemove({_id:newData}, function(err, result){
		if(err)console.log(err);
		if(result){
			Department.findOne({department_faculty:newData}, function(err, department){
				if(err) console.log(err)
				if(department){
					console.log(department)
				}
			})
		}
	})
})

router.post('/adddepartment', (req, res) => {
	var dprtmnt = JSON.parse(req.body.department);
	var departmentData = {
		department_code: dprtmnt.department_code,
	  department_name: dprtmnt.department_name,
	  department_director: dprtmnt.department_director,
	  department_email: dprtmnt.department_email,
	  department_phone: dprtmnt.department_phone,
	  department_faculty:dprtmnt.department_faculty,
	  majors: JSON.parse(req.body.majors)
	}
	Department.findOne({department_code: departmentData.department_code}, (err, department) => {
		if(err) { console.log(err) }
		else if (department){
			res.status(409).send({
				message: 'Эта кафедра уже есть в списке'
			})
		} else {
			const newDepartment = new Department(departmentData);
		  newDepartment.save((err, result) => {
		    if (err) console.log(err);
				if(result) {

					Faculty.findOne({_id:dprtmnt.department_faculty}, function(err, faculty){
						if(err) console.log(err);
						if(faculty){
							faculty.departments.push(result._id)
							faculty.save(function(err, savedFaculty){
								if(err) console.log(err);
								if(savedFaculty){
									res.send({
										message: 'Кафедра удачно добавлена'
									})
								}
							})
						}
					})
				}
		  });
		}
	})
})

router.post('/addsubject', (req, res) => {
	var s = JSON.parse(req.body.data);
	var subjectData = {
		subject_code: s.subject_code,
		subject_name: s.subject_name,
		teacher_id: s.teacher_id,
		major_id: s.major_id,
		period: s.period,
		course_number: s.course_number,
		credit_number: s.credit_number,
		max_students: s.max_students,
		description: s.description,
		optional:s.optional
	}
	Subject.findOne({subject_code: subjectData.subject_code}, (err, subject) => {
		if(err) {console.log(err) }
		else if (subject){
			res.status(409).send({
				message: 'Этот предмет уже есть в списке'
			})
		} else {
			const newSubject = new Subject(subjectData);
		  newSubject.save((err, subject) => {
		    if (err) { return done(err); }
				else {
					res.send({
						subject: subject
					})
				}
		  });
		}
	})
});

router.post('/addsubjectimg', (req, res) => {
	let form = new multiparty.Form();
	var subject_id = req.query.subject_id;
	form.parse(req, (err, fields, files) => {
	  var tempPath = files.imageFile[0].path;
		var fileName = files.imageFile[0].originalFilename;
		let copyToPath = "public/subject-img/" + subject_id +'-'+ fileName;
		fs.readFile(tempPath, (err, data) => {
			// make copy of image to new location
			fs.writeFile(copyToPath, data, (err) => {
				// delete temp image
				fs.unlink(tempPath, () => {
						if(err) {return res.status(401).end();}
						else {
							Subject.findOneAndUpdate({_id: subject_id}, { $set: {img: subject_id +'-'+ fileName}}, { new: true }, (err) => {
								if(err) { console.log(err) }
	              else {
									res.send({
										message: 'Предмет удачно добавлен'
									})
								}
							})
						}
				});
			});
		});
	})
})

router.post('/editsubject', (req, res) =>{
	var subject_id = req.query.subject_id
	if(subject_id){
		let form = new multiparty.Form();
		form.parse(req, (err, fields, files) => {
			var dataD = JSON.parse(fields.data)
		  var tempPath = files.imageFile[0].path;
			var fileName = files.imageFile[0].originalFilename;
			let copyToPath = "public/subject-img/" + subject_id +'-'+ fileName;
			fs.readFile(tempPath, (err, data) => {
				// make copy of image to new location
				fs.writeFile(copyToPath, data, (err) => {
					// delete temp image
					fs.unlink(tempPath, () => {
						if(err) {return res.status(401).end();}
						else {
							Subject.findOne({_id: subject_id}, function(err, subject){
								if(err) console.log(err);
								if(subject){
									subject.subject_code = (dataD.subject_code!='')?dataD.subject_code:subject.subject_code;
									subject.subject_name =(dataD.subject_name!='')?dataD.subject_name:subject.subject_name;
									subject.major_id =(dataD.major_id!='')?dataD.major_id:subject.major_id;
									subject.teacher_id =(dataD.teacher_id!='')?dataD.teacher_id:subject.teacher_id;
									subject.period =(dataD.period!='')?dataD.period:subject.period;
									subject.course_number =(dataD.course_number!='')?dataD.course_number:subject.course_number;
									subject.credit_number =(dataD.credit_number!='')?dataD.credit_number:subject.credit_number;
									subject.max_students =(dataD.max_students!='')?dataD.max_students:subject.max_students;									
									subject.description =(dataD.description!='')?dataD.description:subject.description;
									subject.optional =(dataD.optional!='')?dataD.optional:subject.optional;
									subject.img = subject_id +'-'+ fileName;
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
					});
				});
			});
		})
	} else{
		var dataD = JSON.parse(req.body.data)
		Subject.findOne({_id: req.body.subject_id}, function(err, subject){
			if(err) console.log(err);
			if(subject){
				subject.subject_code = (dataD.subject_code!='')?dataD.subject_code:subject.subject_code;
				subject.subject_name =(dataD.subject_name!='')?dataD.subject_name:subject.subject_name;
				subject.major_id =(dataD.major_id!='')?dataD.major_id:subject.major_id;
				subject.teacher_id =(dataD.teacher_id!='')?dataD.teacher_id:subject.teacher_id;
				subject.period =(dataD.period!='')?dataD.period:subject.period;
				subject.course_number =(dataD.course_number!='')?dataD.course_number:subject.course_number;
				subject.credit_number =(dataD.credit_number!='')?dataD.credit_number:subject.credit_number;
				subject.max_students =(dataD.max_students!='')?dataD.max_students:subject.max_students;									
				subject.description =(dataD.description!='')?dataD.description:subject.description;
				subject.optional =(dataD.optional!='')?dataD.optional:subject.optional;
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

router.post('/deletesubject', (req, res) =>{
	Subject.findOneAndRemove({_id:req.body.subject_id}, function(err, subject){
		if(err) console.log(err)
		if(subject){
			res.send({
				message:"Удалено"
			})
		}
	})
})

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
			Teacher.find((err, teachers) => {
				if(err) { console.log(err) }
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
					const newUser = new User(userData);
				  	newUser.save((err, savedUser) => {
					    if (err) { console.log(err); }
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
								if (err) { console.log(err); }
								else {
									res.send({
										teacher: teacher
									})
								}
							})
						}
				  });
				}
			})
		}
	})
});

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

router.post('/addhomework', (req, res) => {
Teacher.findOne({user_id: req.body.user_id}, (err, teacher) => {
	if(err)console.log(err);
  if (teacher){
		Homework.find((err, homework) => {
			if(err) console.log(err);
			if(homework) {
				var newHomework = {
					message: req.body.description,
					deadline: req.body.deadline,
					lessonDate: req.body.lesson,
					subject_id: req.body.subject_id,
					teacher_id: teacher._id,
					group_id:req.body.group_id
				}
				const newWork = new Homework(newHomework);
		  	newWork.save((err, savedhomework) => {
			  	if (err) console.log(err);
					if (savedhomework){
							res.send({
								homework: savedhomework
							})
						}
					})
				}
		  })
		}
	})
});

router.post('/addhomeworkfile', (req, res) => {
		let form = new multiparty.Form();
				form.parse(req, (err, fields, files) => {
			  	var tempPath = files.file[0].path;
					var fileName = files.file[0].originalFilename;
					let copyToPath = "public/teacher-homeworks/" + fields.subjectId +'-'+ fileName;
					fs.readFile(tempPath, (err, data) => {
						// make copy of image to new location
						fs.writeFile(copyToPath, data, (err) => {
							// delete temp image
							fs.unlink(tempPath, () => {
								if(err) {
									console.log(err)
								}
								else {
									Teacher.findOne({user_id: fields.user_id}, (err, teacher) => {
										if(err) console.log(err) 
										if (teacher){
											Homework.find((err, homework) => {
												if(err) console.log(err) 
												if(homework) {
													var newHomework = {
														message: fields.description,
														deadline: fields.deadline,
														lessonDate: fields.lesson,
														subject_id: fields.subjectId,
														teacher_id: teacher._id,
														file: fields.subjectId +'-'+ fileName,
														group_id:fields.group_id
													}
													const newWork = new Homework(newHomework);
												  	newWork.save((err, savedhomework) => {
													    if (err) console.log(err);
															if(savedhomework){
																	res.send({
																		homework: savedhomework
																	})
																}
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
})


router.post('/editteacher', (req, res) =>{
	const editedTeacher = JSON.parse(req.body.editedTeacher);
	console.log()
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

router.post('/addstudent', (req, res) => {
	User.findOne({passport_id: req.body.passport_id.trim()}, (err, user) => {
		if(err) { console.log(err) }
		else if (user){
			res.status(409).send({
				message: 'Этот пользователь уже есть в списке'
			})
		} else {
			Student.find((err, students) => {
				if(err) { console.log(err) }
				else {
					Major.findOne({_id:req.body.major_id}, function(err, major){
						if(err) console.log(err);
						if(major){
							Department.findOne({_id:major.major_department}, function(err, department){
								if(err) console.log(err);
								if(department){
									Group.findOne({_id:req.body.group_id}, function(err, group){
										if(err) console.log(err);
										if(group){
											var userData = {
												username: 100001+students.length,
												password: bcrypt.hashSync(req.body.password, 10),
												passport_id: req.body.passport_id.trim(),
												name: req.body.name.trim(),
												gender:req.body.gender.trim(),
												lastname: req.body.lastname.trim(),
												birthday: req.body.birthday.trim(),
												status: 'student'
											}
											const newUser = new User(userData);
										  newUser.save((err, savedUser) => {
										    if (err) { console.log(err); }
												else {
													var studentData = {
														user_id: savedUser._id,
														university_code: '195',
														faculty_id: department.department_faculty,
														department_id: major.major_department,
														major_id: req.body.major_id.trim(),
														group_id: req.body.group_id.trim(),
														admission_year: req.body.admission_year.trim(),
														graduation_year: req.body.graduation_year.trim()
													}
													const newStudent = new Student(studentData);
												  	newStudent.save((err) => {
														if (err) { console.log(err) }
														else {
															res.send({
																newStudent:newStudent,
															})
														}
													})
												}
										  });
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

//This route will add the student img
router.post('/addstudentimg', (req, res) => {
		let form = new multiparty.Form();
		var student_id = req.query.student_id;
	form.parse(req, (err, fields, files) => {
	  var tempPath = files.imageFile[0].path;
		var fileName = files.imageFile[0].originalFilename;
		let copyToPath = "public/student-img/" + student_id + '-' + fileName;
		fs.readFile(tempPath, (err, data) => {
			// make copy of image to new location
			fs.writeFile(copyToPath, data, (err) => {
				// delete temp image
				fs.unlink(tempPath, () => {
					if(err) {return res.status(401).end();}
					else {
						Student.findOneAndUpdate({_id: student_id}, { $set: {img: student_id + '-' + fileName}}, { new: true }, (err) => {
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
//this route will delete all student info
router.post('/deletestudent', (req, res) =>{
	Student.findOneAndRemove({_id:req.body.student_id}, function(err, result){
		if(err)console.log(err);
		if(result){
			User.findOneAndRemove({_id:result.user_id}, function(err, removed){
				if(err) console.log(err);
				if(removed){
					console.log(removed)
				}
			})
		}
	})
})
//this route will edit the student info
router.post('/editstudent', (req, res) =>{
	const editedStudent = JSON.parse(req.body.student);
	Student.findOne({_id:req.body.student_id}, function(err, student){
		if(err) console.log(err);
		else{
				Major.findOne({_id:student.major_id}, function(err, major){
					if(err) console.log(err);
					else{
									Department.findOne({_id:major.major_department}, function(err, department){
										if(err) console.log(err);
										else{
											Faculty.findOne({_id:department.department_faculty},function(err, faculty){
												if(err) console.log(err);
												else{
													student.faculty_id = faculty._id;
													student.department_id = department._id;
													student.major_id = (editedStudent.major_id!='')?editedStudent.major_id:student.major_id;
													student.group_id = (editedStudent.group_id!='')?editedStudent.group_id:student.group_id;
													student.admission_year = (editedStudent.admission_year!='')?editedStudent.admission_year:student.admission_year;
													student.graduation_year = (editedStudent.graduation_year!='')?editedStudent.graduation_year:student.graduation_year;
													student.save(function(err, savedStudent){
														if(err) console.log(err);
														else{
															console.log(savedStudent)
															User.findOne({_id:savedStudent.user_id}, function(err, user){
																if(err) console.log(err);
																else{
																	user.name = (editedStudent.name!='')?editedStudent.name:user.name;
																	user.lastname = (editedStudent.lastname!='')?editedStudent.lastname:user.lastname;
																	user.birthday = (req.body.birthday!='')?req.body.birthday:user.birthday;
																	user.gender = (editedStudent.gender!='')?editedStudent.gender:user.gender;
																	user.passport_id = (editedStudent.passport_id!='')?editedStudent.passport_id:user.passport_id;
																	user.password = (editedStudent.password!='')?bcrypt.hashSync(editedStudent.password, 10):user.password;
																	user.save(function(err, savedUser){
																		if(err) console.log(err);
																		else{
																			res.status(200).send({sms:'Yes!!!!!!!'})
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

	//  else{
	// 			Student.findOne({_id:req.body.student_id}, function(err, student){
	// 				if(err) console.log(err);
	// 				else{
	// 					student.faculty_id = student.faculty_id;
	// 					student.department_id = student.department_id;
	// 					student.major_id = student.major_id;
	// 					student.group_id = student.group_id;
	// 					student.admission_year = (editedStudent.admission_year!='')?editedStudent.admission_year:student.admission_year;
	// 					student.graduation_year = (student.graduation_year!='')?student.graduation_year:student.graduation_year;
	// 					student.save(function(err, savedStudent){
	// 						if(err) console.log(err);
	// 						else{
	// 							User.findOne({_id:savedStudent.user_id}, function(err, user){
	// 								if(err) console.log(err);
	// 								else{
	// 									user.name = (student.name!='')?student.name:user.name;
	// 									user.lastname = (student.lastname!='')?student.lastname:user.lastname;
	// 									user.birthday = (req.body.birthday!='')?req.body.birthday:user.birthday;
	// 									user.gender = (student.gender!='')?student.gender:user.gender;
	// 									user.passport_id = (student.passport_id!='')?student.passport_id:user.passport_id;
	// 									user.password = (student.password!='')?student.password:user.password;
	// 									user.save(function(err, savedUser){
	// 										if(err) console.log(err);
	// 										if(savedUser){
	// 											res.status(200).send({sms:'Yes!!!!!!!'})
	// 										}
	// 									})
	// 								}
	// 							})
	// 						}
	// 					})
	// 				}
	// 			})
	// 		}
		}
	})
})



//This route will load all majors
router.get('/getmajors', (req, res) => {
	getMajors()
		.then(function(majors){
				var arrayOfMajors = majFunction(majors)
				async.waterfall(arrayOfMajors, function(err, allMjrs){
				if(err) console.log("error");
				res.status(200).send({allMjrs})
			})
		})
});
//This func for collecting all majors from DBs
var getMajors = function(){
	return new Promise(function(resolve, reject){
		return Major.find(function(err, majors){
			if (err) reject(err);
			else if(majors){
				resolve(majors);
			}
		})
	})
}
// This func for iterating each element in majors array
var majFunction = function(majors){
	return majors.map(function(major){
		var oneMjr = constructMjr(major);
		return oneMjr;
	})
}
// This func for defining each major's fields
var constructMjr = function(major){
	return function(allMjrs, callback){
		var myMajor = {};
		var callBack = (typeof allMjrs === 'function') ? allMjrs : callback;
		var allMjrs = (typeof allMjrs === 'function') ? [] : allMjrs;
		if(major.major_department!=''){
			Department.findOne({_id:major.major_department}, function(err, department){
				if(err) console.log(err);
				if(department){
					myMajor = {
						major_id:major._id,
						major_name:major.major_name,
						major_code:major.major_code,
						major_group:major.major_group,
						major_departmentId:major.major_department,
						major_departmentName:department.department_name
					}
				allMjrs.push(myMajor);
				}
				callBack(null, allMjrs)
			})
		}
		else{
			myMajor = {
						major_id:major._id,
						major_name:major.major_name,
						major_code:major.major_code,
						major_group:major.major_group,
						major_departmentId:'Нет Департамента',
						major_departmentName:'Нет Департамента'
			}
			allMjrs.push(myMajor);
			callBack(null, allMjrs)
		}
	}
}
//This route will load all faculties
router.get('/getfaculties', (req, res) => {
	getFaculties()
		.then(function(faculties){
			var arrayOfFaculties = facFunction(faculties)
				async.waterfall(arrayOfFaculties, function(err, allFclts){
				if(err) console.log("error");
				res.status(200).send({allFclts})
			})
		})
});
//This func for collecting all faculties from DBs
var getFaculties = function(){
	return new Promise(function(resolve, reject){
		return Faculty.find(function(err, faculties){
			if (err) reject(err);
			else if(faculties){
				resolve(faculties);
			}
		})
	})
}
// This func for iterating each element in faculties array
var facFunction = function(faculties){
	return faculties.map(function(faculty){
		var oneFclty = constructFclty(faculty);
		return oneFclty;
	})
}
// This func for defining each faculty's fields
var constructFclty = function(faculty){
	return function(allFclts, callback){
		var myFaculty = {};
		var callBack = (typeof allFclts === 'function') ? allFclts : callback;
		var allFclts = (typeof allFclts === 'function') ? [] : allFclts;
		if(faculty.faculty_dean !=''){
			Teacher.findOne({_id:faculty.faculty_dean}, function(err, teacher){
				if(err) console.log(err);
				if(teacher){
					User.findOne({_id:teacher.user_id}, function(err, user){
						if(err) console.log(err);
						if(user){
								myFaculty = {
								_id: faculty._id,
								faculty_code: faculty.faculty_code,
								faculty_name: faculty.faculty_name,
								faculty_dean: user.lastname + ' ' + user.name,
								faculty_email: faculty.faculty_email,
								faculty_phone: faculty.faculty_phone,
								departments: faculty.departments
							}
							allFclts.push(myFaculty)
						}
						callBack(null, allFclts)
					})
				}
			})
		}
		else{
			myFaculty = {
					_id: faculty._id,
					faculty_code: faculty.faculty_code,
					faculty_name: faculty.faculty_name,
					faculty_dean: 'Декан еще не назначен!!!',
					faculty_email: faculty.faculty_email,
					faculty_phone: faculty.faculty_phone,
					departments: faculty.departments
				}
			allFclts.push(myFaculty)

			callBack(null, allFclts)
		}
	}
}
//This route will load all departments info
router.get('/getdepartments', (req, res) => {
	getDepartments()
		.then(function(departments){
			var arrayOfDepartments = depFunction(departments);
			async.waterfall(arrayOfDepartments, function(err, allDprtmnts){
				if(err) console.log("error");
				res.status(200).send({allDprtmnts})
			})
		})
})
// Func for collecting all departments from DBs
var getDepartments = function(){
	return new Promise(function(resolve, reject){
		return Department.find({}, function(err, departments){
			if (err) reject(err);
			else if(departments){
				resolve(departments);
			}
		})
	})
}
// This func for iterating each element in departments array
var depFunction = function(departments){
	return departments.map(function(department){
		var oneDprtmnt = constructDeps(department);
		return oneDprtmnt;
	})
}
// This func for defining each department's fields
var constructDeps = function(department){
	return function(allDprtmnts, callback){
		var myDepartment = {};
		var callBack = (typeof allDprtmnts === 'function') ? allDprtmnts : callback;
		var allDprtmnts = (typeof allDprtmnts === 'function') ? [] : allDprtmnts;
		Faculty.findOne({_id:department.department_faculty}, function(err, faculty){
			if(err) console.log(err);
			if(faculty){
				Teacher.findOne({_id:department.department_director}, function(err, teacher){
					if(err) console.log(err);
					if(teacher){
						User.findOne({_id:teacher.user_id}, function(err, user){
							if(err) console.log(err);
							if(user){
								myDepartment = {
									_id: department._id,
									department_code: department.department_code,
									department_name: department.department_name,
								  department_director: user.lastname + ' ' + user.name,
								  department_email: department.department_email,
								  department_phone: department.department_phone,
								  department_faculty_name:faculty.faculty_name,
								  department_faculty:department.department_faculty,
								  majors: department.majors
								}
								allDprtmnts.push(myDepartment)
							}
								callBack(null, allDprtmnts)
						})
					}
				})
			}
		})
	}
}
router.get('/getfacultiesmajors', (req, res) => {
	Faculty.find((err, faculties) => {
		if(err) {console.log(err) }
		else {
			Major.find((err, majors) => {
				if(err) {console.log(err) }
				else {
					res.send({
						faculties: faculties,
						majors: majors
					})
				}
			})
		}
	})
});

router.post('/editdepartment', (req, res) =>{
	var editedDep = JSON.parse(req.body.department);
	console.log(req.body)
	Department.findOne({_id:req.body.department_id}, function(err, department){
		if(err) console.log(err);
		if(department){
			department.department_code = (editedDep.department_code!='')?editedDep.department_code:department.department_code;
			department.department_name = (editedDep.department_name!='')?editedDep.department_name:department.department_name;
			department.department_director = (editedDep.department_director!='')?editedDep.department_director:department.department_director;
			department.department_email = (editedDep.department_email!='')?editedDep.department_email:department.department_email;
			department.department_phone = (editedDep.department_phone!='')?editedDep.department_phone:department.department_phone;
			department.department_faculty = (editedDep.department_faculty!='')?editedDep.department_faculty:department.department_faculty;
			department.save(function(err, result){
				if(err) console.log(err);
				if(result){
					if(editedDep.department_faculty!=req.body.dep_odlFaculty && editedDep.department_faculty!=''){
						Faculty.findOne({_id:editedDep.department_faculty}, function(err, faculty){
							faculty.departments.push(req.body.department_id);
							faculty.save(function(err, savedFaculty){
								if(err) console.log(err);
								if(savedFaculty){
									Faculty.findOne({_id:req.body.dep_odlFaculty}, function(err, oldFaculty){
										if(err) console.log(err);
										if(oldFaculty){
											oldFaculty.departments.splice(oldFaculty.departments.indexOf(req.body.department_id), 1);
											oldFaculty.save(function(err, result){
												if(err) console.log(err);
											})
										}
									})
								}
							})
						})
					}
				}
			})
		}
	})
})
router.post('/deletedepartment', (req, res) =>{
	var faculty_id = JSON.parse(req.body.faculty_id);
	var department_id = JSON.parse(req.body.department_id);
	Department.findOneAndRemove({_id:department_id}, function(err, removedDep){
		if(err) console.log(err);
		if(removedDep){
			Faculty.findOne({_id:faculty_id}, function(err, faculty){
				if(err) console.log(err);
				if(faculty){
					faculty.departments.splice(faculty.departments.indexOf(department_id), 1);
					faculty.save(function(err, result){
						if(err) console.log(err);
					})
				}
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

router.post('/choosesubject', (req, res) => {
	var subjectId = req.body.subjectId.trim();
	var token = req.headers.authorization.split(' ')[1];
	var decoded = jwtDecode(token);
	Student.findOne({user_id:decoded.sub}, function(err, student){
		if(err) console.log(err);
		if(student){
			//console.log('	heeeeeeeeeeeeeree')
			Subject.findOne({_id: subjectId},function(err,subj) {
				if(err) console.log(err);
				if(subj){
					//console.log('thereS++++++++++++++++++++++')
					subj.students.push(student._id)
					subj.markModified("students");
					subj.save(function(err, saved){
						if(err) console.log(err);
						if(saved){
						//	console.log('yaaaaaaaaas')
							res.send({message:'Добавлено'})
						}
					});
				}
			})
		}
	})


});

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


router.get('/getsubjects', (req, res) => {
	var mySubjects = [];
	var mySubject = {};
	Subject.find((err, subjects) => {
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
									subjects.forEach(function(subject){
										majors.forEach(function(major){
											if(subject.major_id.toString() == major._id.toString()){
												teachers.forEach(function(teacher){
													if(subject.teacher_id.toString() == teacher._id.toString()){
														users.forEach(function(user){
															if(teacher.user_id.toString() == user._id.toString()){
																var temp = user.lastname + ' ' + user.name;
																var remained = subject.max_students - subject.students.length;
																mySubject = {
																	_id: subject._id,
																	user_id: teacher.user_id,
																	subject_name: subject.subject_name,
																	subject_code: subject.subject_code,
																	description: subject.description,
																	major_name: major.major_name,
																	teacher_name: temp,
																	teacher_id: subject.teacher_id,
																	period: subject.period,
																	course_number: subject.course_number,
																	credit_number: subject.credit_number,
																	max_students: subject.max_students,
																	remained: remained,
																	img: subject.img
																}
																mySubjects.push(mySubject);
															}
														})
													}
												})
											}
										})
									})
									res.send({
										subjects: mySubjects
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
	Subject.findOne({_id: subjectId}, (err, subject) => {
		if(err) { console.log(err) }
		else {
			Major.findOne({_id: subject.major_id}, (err, major) => {
				if(err) { console.log(err) }
				else {
					Teacher.findOne({_id: subject.teacher_id}, (err, teacher) => {
						if(err) { console.log(err) }
						else {
							User.findOne({_id: teacher.user_id}, (err, user) => {
								if(err) { console.log(err) }
								else {
									Student.findOne({user_id:decoded.sub}, function(err, studentSSS){
										if(err) console.log(err);
										else{
											mySubject = {
												_id: subject._id,
												subject_name: subject.subject_name,
												subject_code: subject.subject_code,
												description: subject.description,
												major_name: major.major_name,
												teacher_name: user.lastname + ' ' + user.name,
												period: subject.period,
												course_number: subject.course_number,
												credit_number: subject.credit_number,
												max_students: subject.max_students,
												remained: subject.max_students - subject.students.length,
												img: subject.img
											}
											if(subject.students.length < subject.max_students){
												subject.students.forEach(function(s){

													if(s.toString() == studentSSS._id.toString()){
														already = true;
													}
												})
												if(already){
													res.send({
														subject: mySubject,
														message: "Вы записаны на этот предмет",
														already: already
													})
												} else {
													res.send({
														subject: mySubject,
														message: "",
														already: already
													})
												}
											} else {
												res.send({
													subject: mySubject,
													message: "Достигнуто максимальное количество студентов",
													already: true
												})
											}
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
				router.get('/getstudentprofileinfo', (req, res) => {
					var userId = req.query.studentId;
							Student.findOne({user_id: userId}).populate('user_id').populate('major_id').exec(function(err, student){
								if(err) { console.log(err) }
								else {
										res.send({
											student: student
										})
								}
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

//This route will load all teachers info
router.get('/getteachers', (req, res) => {
		getTeachers()
		.then(function(teachers){
			var arrayOfTeachers = teachFunction(teachers);
			async.waterfall(arrayOfTeachers, function(err, allTchrs){
				if(err) console.log("error");
				res.status(200).send({allTchrs})
			})
		})
});

// Func for collecting all teachers from DBs
var getTeachers = function(){
	return new Promise(function(resolve, reject){
		return Teacher.find({}, function(err, teachers){
			if (err) reject(err);
			else if(teachers){
				resolve(teachers);
			}
		})
	})
}
// This func for iterating each element in teachers array
var teachFunction = function(teachers){
	return teachers.map(function(teacher){
		var oneTchr = constructTeach(teacher);
		return oneTchr;
	})
}
// This func for defining each teachers' fields
var constructTeach = function(teacher){
	return function(allTchrs, callback){
		var callBack = (typeof allTchrs === 'function') ? allTchrs : callback;
		var allTchrs = (typeof allTchrs === 'function') ? [] : allTchrs;
		var myTeacher = {
			teacher_id:'',
			username: '',
			name: '',
			lastname: '',
			passport_id: '',
			faculty_id: '',
			faculty_name:'',
			entry_year: '',
			birthday:'',
			email:'',
			phone:'',
			social:'',
			gender:'',
			img:'',
			degree:''
		}
		User.findOne({_id:teacher.user_id}, function(err, user){
			if(err) console.log(err);
			if(user){
				if(teacher.faculty_id!=''){
					Faculty.findOne({_id:teacher.faculty_id}, function(err, faculty){
						if(err) console.log(err);
						if(faculty){
							myTeacher = {
								teacher_id:teacher._id,
								username:user.username,
								name: user.name,
								lastname: user.lastname,
								passport_id: user.passport_id,
								faculty_id: teacher.faculty_id,
								faculty_name:faculty.faculty_name,
								entry_year: teacher.entry_year,
								birthday: user.birthday,
								email: teacher.email,
								phone: teacher.phone,
								social: teacher.social,
								gender: user.gender,
								img: teacher.img,
								degree:teacher.degree
							}
							allTchrs.push(myTeacher);
							callBack(null, allTchrs);
						}
					})
				}
				else{
							myTeacher = {
								teacher_id:teacher._id,
								username:user.username,
								name: user.name,
								lastname: user.lastname,
								passport_id: user.passport_id,
								faculty_id: teacher.faculty_id,
								faculty_name:'',
								entry_year: teacher.entry_year,
								birthday: user.birthday,
								email: teacher.email,
								phone: teacher.phone,
								social: teacher.social,
								gender: user.gender,
								img: teacher.img,
								degree:teacher.degree
							}
							allTchrs.push(myTeacher);
							callBack(null, allTchrs);
				}
			}
		})
	}
}
router.get('/getstudents', (req, res) =>{
	Student.find().populate('user_id faculty_id department_id major_id group_id').exec(function(err, students){
		if(err) console.log(err);
		if(students){
			res.send({
				students: students
			})
		}
	})
})

router.get('/getgroups', (req, res) => {
	getGroups()
		.then(function(groups){
				var arrayOfGroups = groupFunction(groups)
				async.waterfall(arrayOfGroups, function(err, allGroups){
				if(err) console.log("error");
				res.status(200).send({allGroups})
			})
		})
});

var getGroups = function(){
	return new Promise(function(resolve, reject){
		return Group.find(function(err, groups){
			if (err) reject(err);
			else if(groups){
				resolve(groups);
			}
		})
	})
}
// This func for iterating each element in majors array
var groupFunction = function(groups){
	return groups.map(function(group){
		var oneGroup = constructGroup(group);
		return oneGroup;
	})
}
// This func for defining each major's fields
var constructGroup = function(group){
	return function(allGroups, callback){
		var myGroup = {};
		var callBack = (typeof allGroups === 'function') ? allGroups : callback;
		var allGroups = (typeof allGroups === 'function') ? [] : allGroups;
		if(group.major!=''){
			Major.findOne({_id:group.major}).populate('major_department').exec(function(err, major){
				if(err) console.log(err);
				if(major){

					Teacher.findOne({_id:group.curator}).populate('user_id').exec(function(err, teacher){
						if(err) console.log(err);
						if(teacher){
					myGroup = {
						group_id:group._id,
						group_name:group.group_name,
						course_number:group.course_number,
						major:group.major,
						major_name: major.major_name,
						curator_name: teacher.user_id.name,
						curator_lastname: teacher.user_id.lastname,
						group_department: major.major_department.department_name,
						students: group.students
					}
				allGroups.push(myGroup);
			}
			callBack(null, allGroups)
		})
				}
			})
		}
	}
}
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
														_id: teacher._id,
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


router.get('/getsubjectsforstudents',(req, res)=>{
		var subjectId=req.query.subjectId;
		Subject.findOne({
			_id:subjectId
		}).populate({
			path:'students teacher_id ',
			populate: {
				path: 'user_id'
			}
		}).exec(function(err,subject){
		if(err) {
			res.status(500).send({err: err});
		} else {
			res.status(200).send({students: subject.students});
		}
	})
})

//This route will add the parrent
router.post('/addparrent',(req, res) =>{
	var parrent = JSON.parse(req.body.parrent);
	var students = JSON.parse(req.body.students).map(function(student){
		return student.value
	});
	var account = JSON.parse(req.body.account);
	var birthday = req.body.birthday;
	User.findOne({passport_id:parrent.passport_id}, function(err, user){
		if(err) {
			console.log(err);
		}
		else if(user){
			res.status(409).send({
				message: 'Этот пользователь уже есть в списке'
			})
		} else {
			Parrent.find((err, parents) =>{
				if(err) console.log(err);
				else{
					var userData = {
						username: 30000+parents.length,
						password:bcrypt.hashSync(account.password, 10),
						passport_id:parrent.passport_id,
						name:account.name,
						lastname:account.lastname,
						birthday:birthday,
						status: 'parent',
						gender:account.gender
					}
					const newUser = new User(userData);
					newUser.save((err, saved)=>{
						if(err) { console.log(err) }
						else{
							var parrentData={
								user_id:saved._id,
								email:account.email,
								phone:account.phone,
								address:parrent.address,
									childs:students
							}
							const newParent = new Parrent(parrentData);
							newParent.save(function(err, savedparrent){
								if(err) console.log(err);
								if(savedparrent){
									res.send({
										parent: savedparrent,
										message:"Родитель сохранен успешно!",
										errors:{}
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
//This route will edit the parent
router.post('/editparrent', (req, res)=>{
	var parrent = JSON.parse(req.body.parrent);
	var students = JSON.parse(req.body.students).map(function(student){
		return student.value
	});
	var account = JSON.parse(req.body.account);
	var birthday = req.body.birthday;
	Parrent.findOne({_id:req.body.parrent_id}, function(err, parrentF){
		if(err) console.log(err);
		if(parrent){
			parrentF.email = (account.email!='')?account.email:parrentF.email;
			parrentF.phone = (account.phone!='')?account.phone:parrentF.phone;
			parrentF.address = (parrent.address!='')?parrent.address:parrentF.address;
			parrentF.childs = (students.length!=0)?students:parrentF.childs;
			parrentF.save(function(err, savedParrent){
				if(err) console.log(err);
				if(savedParrent){
					User.findOne({_id:savedParrent.user_id}, function(err, user){
						if(err) console.log(err);
						if(user){
							user.password = (account.password!='')?bcrypt.hashSync(account.password, 10):user.password;
							user.passport_id = (parrent.passport_id!='')?parrent.password:user.password;
							user.name = (account.name!='')?account.name:user.name;
							user.lastname = (account.lastname!='')?account.lastname:user.lastname;
							user.birthday = (birthday!='')?birthday:user.birthday;
							user.gender = (parrent.gender!='')?parrent.gender:user.gender;
							user.save(function(err, savedUser){
								if(err) console.log(err);
							})
						}
					})
				}
			})
		}
	})
})
//This route will get parrents
router.get('/getparents', (req, res)=>{
	Parrent.find({}).populate('user_id').populate({path:'childs', populate:{path:'user_id faculty_id department_id major_id'}}).exec((err, parrents)=>{
		if(err) console.log(err);
		if(parrents){
			res.send({
				parrents:parrents
			})
		}
	})
})
//This route will delete parent
router.post('/deleteparrent', (req, res)=>{
	Parrent.findOneAndRemove({_id:req.body.parrent_id}, function(err, parrent){
		if(err) console.log(err);
		if(parrent){
			User.findOneAndRemove({_id:parrent.user_id}, function(err, user){
				if(err) console.log(err);
				if(user){
					res.send({
						message:"Удалено"
					})
				}
			})
		}
	})
})


router.post('/editsubject', (req, res)=>{
	console.log(req.body.editedSubject)
	var editedSubject = JSON.parse(req.body.editedSubject);
	Subject.findOne({_id:req.body.subject_id}, function(err, subject){
		if(err) console.log(err);
		if(subject){
			subject.subject_name = (editedSubject.name!='')?editedSubject.subject_name:subject.subject_name;
			subject.subject_code = (editedSubject.code!='')?editedSubject.subject_code:subject.subject_code;
			subject.course_number = (editedSubject.course_number!=0)?editedSubject.course_number:subject.course_number;
			subject.credits_number = (editedSubject.credits_number!=0)?editedSubject.credits_number:subject.credits_number;
			subject.description = (editedSubject.description!='')?editedSubject.description:subject.description;
			subject.save(function(err, savedSubject){
				if(err) console.log(err);
				if(savedSubject){
				}
			})
		}
	})
})


router.post('/deletesubject', (req, res)=>{
	console.log(req.body.subject_id)
	Subject.findOneAndRemove({_id:req.body.subject_id}, function(err, subject){
		if(err) console.log(err);
		if(subject){
			res.send({
				message:"Удалено"
			})
		}
	})
})

router.post('/addgroup',(req, res) =>{
	var group = JSON.parse(req.body.group);
	Group.findOne({group_name: group.group_name}, function(err, dgroup){
		if(err) {
			console.log(err);
		}
		else if(dgroup){
			res.status(409).send({
				message: 'Эта группа уже есть в списке'
			})
		} else {
			var groupData = {
				group_name: group.group_name,
				curator: group.curator,
				major: group.major,
				course_number: group.course_number
			}
					const newGroup = new Group(groupData);
					newGroup.save((err) => {
						if (err) { console.log(err); }
						else {
							res.send({
								message: 'Группа удачно добавлена'
							})
						}
					});
		}
	})
})
router.post('/editgroup', (req, res) => {
	var editedGroup = JSON.parse(req.body.editedGroup);
		Group.findOne({_id: req.body.group_id}, function(err, group){
			if(err)console.log(err);
			if(group){
        group.group_name = (editedGroup.group_name!='')?editedGroup.group_name:group.group_name;
        group.curator = (editedGroup.curator!='')?editedGroup.curator:group.curator;
        group.course_number = (editedGroup.course_number!='')?editedGroup.course_number:group.course_number;
        group.major = (editedGroup.major!='')?editedGroup.major:group.major;
				group.save(function(err, result){
					if(err) console.log(err);
				})
			}
		})
});
router.post('/deletegroup', (req, res) =>{
	var newData = JSON.parse(req.body.group_id);
	Group.findOneAndRemove({_id:newData}, function(err, result){
		if(err)console.log(err);
		if(result){
			Major.findOne({group_id:newData}, function(err, major){
				if(err) console.log(err);
				if(major){
					major.groups.splice(major.groups.indexOf(newData), 1);
					major.save(function(err, result){
						if(err) console.log(err);
					})
				}
			})
		}
	})
})


router.post('/addattendance',(req, res)=>{
 var attendances=JSON.parse(req.body.data);
 var subject_id=req.body.subject_id;
 var att_date=req.body.att_date;
 attendances.map(function(attendance){

  var newAtt= new Attendance({
   student:attendance.name,
   date: att_date,
   stud_attendance: attendance.att_status,
   subject_name:subject_id
  })

  newAtt.save(function(err, saved){
   if(err) console.log(err);
   if(saved){
    console.log(saved)
   }
  })

 })
 res.send({
   message: "Вы выставили посещаемость"
   })

})


router.get('/getsubjectsforstudents',(req, res)=>{
		var subjectId=req.query.subjectId;
		Subject.findOne({
			_id:subjectId
		}).populate({
			path:'students teacher_id ',
			populate: {
				path: 'user_id'
			}
		}).exec(function(err,subject){
		if(err) {
			res.status(500).send({err: err});
		} else {
			res.status(200).send({students: subject.students});
		}
	})
})

router.get('/getattendanceforall',(req,res)=>{
	var subjectId=req.query.subjectId;
	Attendance.find({
		subject_name:subjectId
	}).populate({
		path: 'student',
		populate:{
			path: 'user_id'
		}
	}).exec(function(err,attendances){
		if(err){
			res.status(500).send({err: err});
		} else {
			res.status(200).send({attendances: attendances});
		}
	})

})

router.post('/updatestudentsforattendance',(req,res)=> {
	//var attendances=JSON.parse(req.body.data);
	 var subject_id=req.body.subject_id;
	 var att_date=req.body.att_date

    Attendance.find({
    	subject_name:subject_id,
    	date:att_date

    }).populate({
    	path: 'student',
    	populate: {
    		path:'user_id'
    	}
    }).exec(function(err,attendances){
    	if(err){
    		res.status(500).send({err:err});
    		console.log('phuck u')
    	} else {
    		if(attendances.length!=0){
    			res.status(200).send({attendances:attendances})
    		    console.log(attendances,'ok')
    		} else{
    			res.send({
    				attendances: attendances,
    				message: 'Ничего не найдено'
    			})
    			console.log('тут ничего')
    		}
    	
    	}
    })

})

router.post('/addmark',(req,res) =>{
	 var marks=JSON.parse(req.body.data);
	 var subject_id=req.body.subject_id;
	 var att_date=req.body.att_date;
    // console.log(marks,'maaaaaaarks')
     marks.map(function(mark){
     	var newMark=  new Mark ({
     		student: mark.name,
	     	date: att_date,
	     	stud_mark: mark.stud_mark,
	     	stud_comment: mark.stud_comment,
	     	subject_name: subject_id
     	})
     	newMark.save(function(err,saved){
     		if(err)console.log (err);
     		if(saved){
     			//console.log(saved)
     		}
     	})
     })
   res.status(200).send({
   message: "Вы выставили посещаемость"
   })
})


router.post('/updatestudentsformark',(req,res)=> {
	 var subject_id=req.body.subject_id;
	 var att_date=req.body.att_date;

	 Mark.find({
	 	subject_name:subject_id,
    	date:att_date
	 }).populate({
    	path: 'student',
    	populate: {
    		path:'user_id'
    	}
    }).exec(function(err,attendances){
    	if(err){
    		res.status(500).send({err:err});
    	} else {

    		//console.log(attendances.length,'lnghthhhhh')
    		if(attendances.length!=0){
    			res.status(200).send({attendances:attendances})
    		//    console.log(attendances,'ok')
    		} else{
    			res.send({
    				attendances: attendances,
    				message: 'Ничего не найдено'
    			})
    		}
    	}
    })
})


module.exports = router;
