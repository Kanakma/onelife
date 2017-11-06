var express = require('express')
var router = express.Router()
var Major = require('../models/major')
var Department = require('../models/department')
var Student = require('../models/student')
var DamFunc = require('../../client/src/modules/AllDamFunc')

router.get('/getmajors', (req, res) => {
	Major.find().populate('major_department groups').exec(function(err, majors){
		if(err) {console.log(err) }
		else {
				  res.send({
						majors: majors
					})
		}
	})
});

//This route will load all majors
// router.get('/getmajors', (req, res) => {
// 	getMajors()
// 		.then(function(majors){
// 				var arrayOfMajors = majFunction(majors)
// 				async.waterfall(arrayOfMajors, function(err, allMjrs){
// 				if(err) console.log("error");
// 				res.status(200).send({allMjrs})
// 			})
// 		})
// });
// //This func for collecting all majors from DBs
// var getMajors = function(){
// 	return new Promise(function(resolve, reject){
// 		return Major.find(function(err, majors){
// 			if (err) reject(err);
// 			else if(majors){
// 				resolve(majors);
// 			}
// 		})
// 	})
// }
// // This func for iterating each element in majors array
// var majFunction = function(majors){
// 	return majors.map(function(major){
// 		var oneMjr = constructMjr(major);
// 		return oneMjr;
// 	})
// }
// // This func for defining each major's fields
// var constructMjr = function(major){
// 	return function(allMjrs, callback){
// 		var myMajor = {};
// 		var callBack = (typeof allMjrs === 'function') ? allMjrs : callback;
// 		var allMjrs = (typeof allMjrs === 'function') ? [] : allMjrs;
// 		if(major.major_department!=''){
// 			Department.findOne({_id:major.major_department}, function(err, department){
// 				if(err) console.log(err);
// 				if(department){
// 					myMajor = {
// 						major_id:major._id,
// 						major_name:major.major_name,
// 						major_code:major.major_code,
// 						major_group:major.major_group,
// 						major_departmentId:major.major_department,
// 						major_departmentName:department.department_name
// 					}
// 				allMjrs.push(myMajor);
// 				}
// 				callBack(null, allMjrs)
// 			})
// 		}
// 		else{
// 			myMajor = {
// 						major_id:major._id,
// 						major_name:major.major_name,
// 						major_code:major.major_code,
// 						major_group:major.major_group,
// 						major_departmentId:'Нет Департамента',
// 						major_departmentName:'Нет Департамента'
// 			}
// 			allMjrs.push(myMajor);
// 			callBack(null, allMjrs)
// 		}
// 	}
// }



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
				message: 'Эта специальность уже есть в базе'
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

router.get('/count_majors',(req,res) =>{
	var majNames = []
  Major.find({}).populate('groups').exec(function(err, majors){
  	if(err) console.log(err)
  	if(majors){
  		majors.map(function(major, ind){
  			major.groups.map(function(group, index){
					majNames.push({name: major.major_name, value: group.students.length})
  			})
  		})
 			res.status(200).send({majNames:majNames})
  	} else{
			majNames.push({name: "Нет", value: 0})
  		res.status(200).send({majNames:majNames})
  	}
  })
})

module.exports = router;
