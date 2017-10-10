var express = require('express')
var router = express.Router()
var Group = require('../models/group')
var Major = require('../models/major')
var Subject = require('../models/subject')
var Teacher = require('../models/teacher')
var DamFunc = require('../../client/src/modules/AllDamFunc')

router.get('/getgroups', (req, res) =>{
	Group.find().populate({path: 'curator', populate: {path: 'user_id'}}).populate({path: 'major', populate: {path: 'major_department'}}).exec(function(err, groups){
		if(err) console.log(err);
		if(groups){
			res.send({
				groups: groups
			})
		}
	})
})

router.get('/getgroupsforstudents',(req, res)=>{
		var subject_id=req.query.subject_id;
		Subject.findOne({
			_id:subject_id
		}).populate({
			path:'groups'
		}).exec(function(err,subject_groups){
			if(err){
				res.status(500).send({err: err});
			} else {
				res.status(200).send({subject_groups: subject_groups});
			}
		})
})


router.post('/addgroup', (req, res) => {
  var group = JSON.parse(req.body.group);
	Group.findOne({group_name: group.group_name}, function(err, dgroup){
		if(err) {console.log(err) }
		else if (dgroup){
			res.status(409).send({
				message: 'Эта группа уже есть в списке'
			})
		} else {
			const newGroup = new Group(group);
		  newGroup.save(function(err, savedGroup){
		    if(err) console.log(err);
				if(savedGroup) {
					Major.findOne({_id:group.major}).populate({path: 'major_department', populate: {path:'department_faculty'}}).exec(function(err, major){
						if(err) console.log(err);
						if(major){
							major.groups.push(savedGroup._id)
							major.save(function(err, savedMajor){
								if(err) console.log(err)
								if(savedMajor){
									Subject.find({course_number:savedGroup.course_number, optional:false}, function(err, subjects){
										if(err) console.log(err)
										if(subjects){
											subjects.map(function(subject){
												if(subject.faculty_id && major.major_department.department_faculty._id.toString() == subject.faculty_id.toString()){
													subject.groups.push(savedGroup._id)
													subject.save(function(err){
														if(err) console.log(err)
													})
												} else if(!subject.faculty_id){
													subject.groups.push(savedGroup._id)
													subject.save(function(err){
														if(err) console.log(err)
													})
												}
											})
											res.send({
												massage:"Группа создана!"
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
})

router.post('/deletegroup', (req, res) =>{
	var newData = JSON.parse(req.body.group_id);
		Subject.find({},function(err, subjects){
		if(err) console.log(err)
		if(subjects){
			subjects.map(function(subject){
				subject.groups.splice(subject.groups.indexOf(newData), 1)
				subject.save(function(err, saved){
					if(err) console.log(err)
				})
			})
			Group.findOneAndRemove({_id:newData}, function(err, group){
				if(err) console.log(err)
				if(group){
					Major.findOne({_id: group.major}, function(err, major){
						if(err) console.log(err)
						if(major){
							major.groups.splice(major.groups.indexOf(newData), 1)
							major.save(function(err, savedMajor){
								if(err) console.log(err)
							})
						}
					})
					res.send({
						massage:"Группа удалена!"
					})
				}
			})
		}
	})
})
router.get('/getmajorgroups', (req, res)=>{
  Major.findOne({_id: req.query.major_id}).populate('groups').exec(function(err, major){
    if(err) console.log(err);
    else{
      res.send({
        groups: major.groups
      })
    }
  })
})
router.get('/getsubjectgroups', (req, res)=>{
  Subject.findOne({_id: req.query.subjectId}).populate('groups').exec(function(err, subject){
    if(err) console.log(err);
    else{
      res.send({
        groups: subject.groups
      })
    }
  })
})
router.get('/getgroupteacher', (req, res) => {
	var token = req.headers.authorization.split(' ')[1];
	var decoded = jwtDecode(token);
	Teacher.findOne({user_id: decoded.sub}, (err, teacher) => {
		if(err) { console.log(err) }
		else {
			Group.find({curator: teacher._id}, (err, groups) => {
				if(err) { console.log(err) }
				else {
					res.send({
						groups: groups
					})
				}
			})
		}
	})
});
router.get('/getstudentsgroupsforstudents',(req,res) => {
		var group_name=req.query.group_name;
		Group.findOne({
			_id:group_name
		}).populate({
			path:'students',
			populate: {
				path: 'user_id'
			}
		}).exec(function(err,att_students){
		if(err) {
			res.status(500).send({err: err});
		} else {
			console.log(att_students)
			res.status(200).send({att_students: att_students});

		}
	})
})
module.exports = router;
