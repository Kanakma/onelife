var express = require('express')
var router = express.Router()
var Major = require('../models/major')
var User = require('../models/user')
var Student = require('../models/student')
var Group = require('../models/group')
const bcrypt = require('bcryptjs')
let multiparty = require('multiparty')
let fs = require('fs')

router.get('/getstudentprofileinfo', (req, res) => {
  var userId = req.query.studentId;
  //	console.log(userId)
  Student.findOne({user_id: userId}).populate('user_id').populate('major_id faculty_id group_id').exec(function(err, student){
  if(err) { console.log(err) }
  else {
    var gpa=0;
    FinalMark.findOne({student: student._id},(err,fm) => {
      if(err) console.log(err)
        if(fm){
          if(fm.current_gpa.stud_gpa>93 && fm.current_gpa.stud_gpa<100){
            var gpa='4.0'
            var st=fm.current_gpa.stud_gpa
            sendData(gpa,st)
          }
          if(fm.current_gpa.stud_gpa>90 && fm.current_gpa.stud_gpa<92){
            var gpa='3.7'
            var st=fm.current_gpa.stud_gpa
            sendData(gpa,st)
          }
          if(fm.current_gpa.stud_gpa>87 && fm.current_gpa.stud_gpa<89){
            var gpa='3.3'
            var st=fm.current_gpa.stud_gpa
            sendData(gpa,st)
          }
          if(fm.current_gpa.stud_gpa>83 && fm.current_gpa.stud_gpa<86){
            var gpa='3.0'
            var st=fm.current_gpa.stud_gpa
            sendData(gpa,st)
          }
          if(fm.current_gpa.stud_gpa>80 && fm.current_gpa.stud_gpa<82){
            var gpa='2.7'
            var st=fm.current_gpa.stud_gpa
            sendData(gpa,st)
          }
          if(fm.current_gpa.stud_gpa>77 && fm.current_gpa.stud_gpa<79){
            var gpa='2.3'
            var st=fm.current_gpa.stud_gpa
            sendData(gpa,st)
          }
          if(fm.current_gpa.stud_gpa>73 && fm.current_gpa.stud_gpa<76){
            var gpa='2.0'
            var st=fm.current_gpa.stud_gpa
            sendData(gpa,st)
          }
          if(fm.current_gpa.stud_gpa>70 && fm.current_gpa.stud_gpa<72){
            var gpa='1.7'
            var st=fm.current_gpa.stud_gpa
            sendData(gpa,st)
          }
          if(fm.current_gpa.stud_gpa>67 && fm.current_gpa.stud_gpa<69){
            var gpa='1.3'
            var st=fm.current_gpa.stud_gpa
            sendData(gpa,st)
          }
          if(fm.current_gpa.stud_gpa>65 && fm.current_gpa.stud_gpa<66){
            var gpa='1.0'
            var st=fm.current_gpa.stud_gpa
            sendData(gpa,st)
          }
          if(fm.current_gpa.stud_gpa<65){
            var gpa='0.0'
            var st=fm.current_gpa.stud_gpa
            sendData(gpa,st)
          }
        }

    })
      var sendData= function (i,a) {
        res.send({
              student: student,
              gpa: i,
              procent_gpa: a
            })
    }
  }
})

})

router.post('/addstudent', (req, res) => {
  if(req.query.image){
    Student.find((err, students) => {
      if(err) { console.log(err) }
      else {
      let form = new multiparty.Form();
      form.parse(req, (err, fields, files) => {
        var tempPath = files.imageFile[0].path;
        var fileName = files.imageFile[0].originalFilename;
        const number = 100001+students.length;
        let copyToPath = "public/student-img/" + number + '-' + fileName;
        fs.readFile(tempPath, (err, data) => {
          fs.writeFile(copyToPath, data, (err) => {
            fs.unlink(tempPath, () => {
              if(err) {return res.status(401).end();}
              else {
              var info = JSON.parse(fields.data)
              var birthday = JSON.parse(fields.birthday)
                User.findOne({passport_id: info.passport_id.trim()}, (err, user) => {
              		if(err) { console.log(err) }
              		else if (user){
              			res.status(409).send({
              				message: 'Этот пользователь уже есть в списке'
              			})
              		} else {
                  Major.findOne({_id:info.major_id}).populate('major_department').exec(function(err, major){
                  	if(err) console.log(err);
                    if(major){
                    									 Group.findOne({_id:info.group_id}, function(err, group){
                    										if(err) console.log(err);
                    										if(group){
                    											var userData = {
                    												username: 100001+students.length,
                    												password: bcrypt.hashSync(info.password, 10),
                    												passport_id: info.passport_id.trim(),
                    												name: info.name.trim(),
                    												gender:info.gender.trim(),
                    												lastname: info.lastname.trim(),
                      											birthday: birthday.trim(),
                      											status: 'student'
                      										}
                        									const newUser = new User(userData);
                        								  newUser.save((err, savedUser) => {
                        								    if (err) console.log(err);
                        										else {
                      												var studentData = {
                      													user_id: savedUser._id,
                      													university_code: '195',
                      													faculty_id: major.major_department.department_faculty,
                      													department_id: major.major_department,
                        												major_id: info.major_id.trim(),
                      													group_id: info.group_id.trim(),
                        												admission_year: info.admission_year.trim(),
                      													graduation_year: info.graduation_year.trim(),
                                                img: number+ '-' + fileName
                      												}
                      												const newStudent = new Student(studentData);
                        										  	newStudent.save((err, savedStudent) => {
                        												if (err) console.log(err)
                        												else {
                                                    group.students.push(savedStudent._id)
                                                    group.save(function(err, savedGroup){
                                                      if(err) console.log(err);
                                                      else{
                                                        res.send({
                                                          newStudent:newStudent,
                                                          message: 'Студент удачно добавлен'
                                                        })
                                                      }
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
          })
        })
      })
  }
  })
  } else {
    var info = JSON.parse(req.body.data);
    console.log(req.body.data.passport_id)
      User.findOne({passport_id: info.passport_id.trim()}, (err, user) => {
        if(err) { console.log(err) }
        else if (user){
          res.status(409).send({
            message: 'Этот пользователь уже есть в списке'
          })
        } else {
        Major.findOne({_id:info.major_id}).populate('major_department').exec(function(err, major){
          if(err) console.log(err);
          if(major){
            Student.find(function(err, students){
              if(err) console.log(err);
              else{
                             Group.findOne({_id:info.group_id}, function(err, group){
                              if(err) console.log(err);
                              if(group){
                                var userData = {
                                  username: 100001+students.length,
                                  password: bcrypt.hashSync(info.password, 10),
                                  passport_id: info.passport_id.trim(),
                                  name: info.name.trim(),
                                  gender:info.gender.trim(),
                                  lastname: info.lastname.trim(),
                                  birthday: req.body.birthday.trim(),
                                  status: 'student'
                                }
                                const newUser = new User(userData);
                                newUser.save((err, savedUser) => {
                                  if (err) console.log(err);
                                  else {
                                    var studentData = {
                                      user_id: savedUser._id,
                                      university_code: '195',
                                      faculty_id: major.major_department.department_faculty,
                                      department_id: major.major_department,
                                      major_id: info.major_id.trim(),
                                      group_id: info.group_id.trim(),
                                      admission_year: info.admission_year.trim(),
                                      graduation_year: info.graduation_year.trim()
                                    }
                                    const newStudent = new Student(studentData);
                                      newStudent.save((err, savedStudent) => {
                                      if (err) console.log(err)
                                      else {
                                          group.students.push(savedStudent._id)
                                          group.save(function(err, savedGroup){
                                            if(err) console.log(err);
                                            else{
                                                console.log(savedGroup)
                                              res.send({
                                                newStudent:newStudent,
                                                message: 'Студент удачно добавлен'
                                              })
                                            }
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

//this route will delete all student info
router.post('/deletestudent', (req, res) =>{
	Student.findOneAndRemove({_id:req.body.student_id}, function(err, removedStudent){
		if(err)console.log(err);
		if(removedStudent){
			User.findOneAndRemove({_id:removedStudent.user_id}, function(err, removedUser){
				if(err) console.log(err);
				if(removedUser){
					Group.findOne({_id:removedStudent.group_id}, function(err, group){
						if(err) console.log(err)
						if(group){
							group.students.splice(group.students.indexOf(req.body.student_id), 1)
							group.save(function(err, saved){
								if(err) console.log(err)
								if(saved){
									res.send({
										message:"Студент удален!"
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
//this route will edit the student info
router.post('/editstudent', (req, res) =>{
  var student_id = req.query.student_id
	if(student_id){
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      var editedStudent = JSON.parse(fields.data);
      var birthday = JSON.parse(fields.birthday);
      var tempPath = files.imageFile[0].path;
      var fileName = files.imageFile[0].originalFilename;
			let copyToPath = "public/student-img/"  + fileName;
			fs.readFile(tempPath, (err, data) => {
				fs.writeFile(copyToPath, data, (err) => {
					fs.unlink(tempPath, () => {
						if(err) {
							return res.status(401).end()
						}
						else {

            Student.findOne({_id:student_id}).populate({path: 'major_id', populate: {path: 'major_department', populate: {path: 'department_faculty'}}}).populate('group_id').exec(function(err, student){
              if(err) console.log(err);
              else{
            User.findOne({_id:student.user_id}, function(err, user){
              if(err) console.log(err);
              else{
                if(editedStudent.major_id!=''){
                  Major.findOne({_id: editedStudent.major_id}).populate({path: 'major_department', populate: {path: 'department_faculty'}}).exec(function(err, major){
                    if(err) console.log(err);
                    else{
                      Group.findOne({_id: editedStudent.group_id}, function(err, group){
                        if(err) console.log(err);
                        else{
                          Group.findOne({_id: student.group_id}).populate('students').exec(function(err, oldGroup){
                            if(err) console.log(err);
                            else{
                              student.faculty_id = major.major_department.department_faculty;
                              student.department_id = major.major_department;
                              student.major_id = editedStudent.major_id;
                              student.group_id = editedStudent.group_id;
                              student.admission_year = (editedStudent.admission_year!='')?editedStudent.admission_year:student.admission_year;
                              student.graduation_year = (editedStudent.graduation_year!='')?editedStudent.graduation_year:student.graduation_year;
                              student.img = fileName;
                              student.save(function(err, savedStudent){
                                if(err) console.log(err);
                                else{
                                  group.students.push(savedStudent._id);
                                  group.save(function(err, savedGroup){
                                    if(err) console.log(err);
                                    else{

                                      oldGroup.students.splice(oldGroup.students.indexOf(savedStudent._id), 1);
                                      oldGroup.save(function(err, changedGroup){
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
                                              res.status(200).send({})
                                            }
                                          })
                                        }
                                      })
                                      // }
                                      // })
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
                // })
                // }
                else{

                      student.faculty_id = student.major_id.major_department.department_faculty;
                      student.department_id = student.major_id.major_department;
                      student.major_id =student.major_id;
                      student.group_id = student.group_id;
                      student.admission_year = (editedStudent.admission_year!='')?editedStudent.admission_year:student.admission_year;
                      student.graduation_year = (editedStudent.graduation_year!='')?editedStudent.graduation_year:student.graduation_year;
                      student.img = fileName;
                      student.save(function(err, savedStudent){
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
                                      res.status(200).send({})
                                    }
                                  })

                        }
                      })

                }
              }
              })
              }
              })
        }
				});
			});
		})

// }
// })
// }
// })
})
	} else{
		var editedStudent = JSON.parse(req.body.data)
		var birthday = req.body.birthday;
		Student.findOne({_id: req.body.student_id}).populate({path: 'major_id', populate: {path: 'major_department', populate: {path: 'department_faculty'}}}).populate('group_id').exec(function(err, student){
			if(err) console.log(err);
			if(student){
        if(editedStudent.major_id!=''){
          Major.findOne({_id: editedStudent.major_id}).populate({path: 'major_department', populate: {path: 'department_faculty'}}).exec(function(err, major){
            if(err) console.log(err);
            else{
              Group.findOne({_id: editedStudent.group_id}, function(err, group){
                if(err) console.log(err);
                else{
                  Group.findOne({_id: student.group_id}).populate('students').exec(function(err, oldGroup){
                    if(err) console.log(err);
                    else{
                      student.faculty_id = major.major_department.department_faculty;
                      student.department_id = major.major_department;
                      student.major_id = editedStudent.major_id;
                      student.group_id = editedStudent.group_id;
                      student.admission_year = (editedStudent.admission_year!='')?editedStudent.admission_year:student.admission_year;
                      student.graduation_year = (editedStudent.graduation_year!='')?editedStudent.graduation_year:student.graduation_year;
                      student.img = student.img;
                      student.save(function(err, savedStudent){
                        if(err) console.log(err)
                        else{
                          group.students.push(savedStudent._id);
                          group.save(function(err, savedGroup){
                            if(err) console.log(err);
                            else{
                              oldGroup.students.splice(oldGroup.students.indexOf(savedStudent._id), 1);
                              oldGroup.save(function(err, changedGroup){
                                if(err) console.log(err);
                                else{

                                  User.findOne({_id:student.user_id}, function(err, user){
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
                                          res.send({
                                          	message: 'Отредактировано'
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
                }
              })
            }
          })

        }else{
          student.faculty_id = student.major_id.major_department.department_faculty;
          student.department_id = student.major_id.major_department;
          student.major_id =student.major_id;
          student.group_id =student.group_id;
          student.admission_year = (editedStudent.admission_year!='')?editedStudent.admission_year:student.admission_year;
          student.graduation_year = (editedStudent.graduation_year!='')?editedStudent.graduation_year:student.graduation_year;
          student.img = student.img;
          student.save(function(err, savedStudent){
  					if(err) console.log(err)
  					else{
              User.findOne({_id:student.user_id}, function(err, user){
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
                      res.send({
          							message: 'Отредактировано'
          						})
                    }
                  })

                }
              })


  					}
  				})
        }

			}
		})
	}
})
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
router.get('/getstudentsofgroup', (req, res)=>{
  Student.find({group_id: req.query.groupId}).populate('user_id').exec(function(err, students){
    if(err) console.log(err);
    else{
      res.send({
        students: students
      })
    }
  })
})
router.get('/mygroup1', (req,res) => {
	var userId = req.query.studentId;

		Student.findOne({
			user_id:userId
		}).populate({
			path:'group_id',

		}).exec(function(err,student){
		if(err) {
			res.status(500).send({err: err});
		} else {
			Subject.find({
                   groups: student.group_id
			}).exec(function(err,subject){
				if(err) {
					res.status(500).send({err: err});
				} if(subject) {
					res.status(200).send({
						subject: subject,
						student: student.group_id,
						onestudent: student
					})
				}
				else {
					 res.status(200).send({student: student});

				}



		})
	}
	})
})


module.exports = router;
