var express = require('express')
var router = express.Router()
var Department = require('../models/department')
var Faculty = require('../models/faculty')

router.get('/getdepartments', (req, res) => {
  Department.find().populate({path: 'department_director', populate: {path: 'user_id'}}).populate('department_faculty majors').exec(function(err, departments){
    if(err) {console.log(err) }
    else {
          res.send({
            departments: departments
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


module.exports = router;
