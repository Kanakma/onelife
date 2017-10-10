var express = require('express')
var router = express.Router()
var Faculty = require('../models/faculty')
var Department = require('../models/department')



router.get('/getfaculties', (req, res) => {
	Faculty.find().populate('departments').populate({path: 'faculty_dean', populate: {path: 'user_id'}}).exec(function(err, faculties){
		if(err) {console.log(err) }
		else {
				  res.send({
						faculties: faculties
					})
		}
	})
});
// This route will load all faculties
// router.get('/getfaculties', (req, res) => {
// 	getFaculties()
// 		.then(function(faculties){
// 			var arrayOfFaculties = facFunction(faculties)
// 				async.waterfall(arrayOfFaculties, function(err, allFclts){
// 				if(err) console.log("error");
// 				res.status(200).send({allFclts})
// 			})
// 		})
// });
// //This func for collecting all faculties from DBs
// var getFaculties = function(){
// 	return new Promise(function(resolve, reject){
// 		return Faculty.find(function(err, faculties){
// 			if (err) reject(err);
// 			else if(faculties){
// 				resolve(faculties);
// 			}
// 		})
// 	})
// }
// // This func for iterating each element in faculties array
// var facFunction = function(faculties){
// 	return faculties.map(function(faculty){
// 		var oneFclty = constructFclty(faculty);
// 		return oneFclty;
// 	})
// }
// // This func for defining each faculty's fields
// var constructFclty = function(faculty){
// 	return function(allFclts, callback){
// 		var myFaculty = {};
// 		var callBack = (typeof allFclts === 'function') ? allFclts : callback;
// 		var allFclts = (typeof allFclts === 'function') ? [] : allFclts;
// 		if(faculty.faculty_dean !=''){
// 			Teacher.findOne({_id:faculty.faculty_dean}, function(err, teacher){
// 				if(err) console.log(err);
// 				if(teacher){
// 					User.findOne({_id:teacher.user_id}, function(err, user){
// 						if(err) console.log(err);
// 						if(user){
// 								myFaculty = {
// 								_id: faculty._id,
// 								faculty_code: faculty.faculty_code,
// 								faculty_name: faculty.faculty_name,
// 								faculty_dean: user.lastname + ' ' + user.name,
// 								faculty_email: faculty.faculty_email,
// 								faculty_phone: faculty.faculty_phone,
// 								departments: faculty.departments
// 							}
// 							allFclts.push(myFaculty)
// 						}
// 						callBack(null, allFclts)
// 					})
// 				}
// 			})
// 		}
// 		else{
// 			myFaculty = {
// 					_id: faculty._id,
// 					faculty_code: faculty.faculty_code,
// 					faculty_name: faculty.faculty_name,
// 					faculty_dean: 'Декан еще не назначен!!!',
// 					faculty_email: faculty.faculty_email,
// 					faculty_phone: faculty.faculty_phone,
// 					departments: faculty.departments
// 				}
// 			allFclts.push(myFaculty)
//
// 			callBack(null, allFclts)
// 		}
// 	}
// }

//This route will add new faculty
router.post('/addfaculty', (req, res) => {
	var faculty = JSON.parse(req.body.faculty);
	var facultyData = {
		faculty_code: faculty.faculty_code,
		faculty_name: faculty.faculty_name,
		faculty_email: faculty.faculty_email,
		faculty_phone: faculty.faculty_phone,
		departments: JSON.parse(req.body.departments)
	}
  if(faculty.faculty_dean.length>0){
    facultyData.faculty_dean = faculty.faculty_dean
  }
	Faculty.findOne({faculty_code: facultyData.faculty_code}, (err, dfaculty) => {
		if(err) {console.log(err) }
		else if (dfaculty){
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


module.exports = router;
