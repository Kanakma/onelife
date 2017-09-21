var express = require('express')
var router = express.Router()
var User = require('../models/user')
var Subject = require('../models/subject')
var Parrent = require('../models/parrent')
var Student = require('../models/student')
const bcrypt = require('bcryptjs')
var DamFunc = require('../../client/src/modules/AllDamFunc')


router.get('/mychildgroup', (req,res)=> {
     var userId=req.query.parentId;
     Parrent.findOne({ user_id : userId
     }).populate( {path: 'childs', populate: {path:  'group_id user_id ' }}).populate('user_id').exec(function(err,parent){
		 	if(err) console.log('не найдено')
		 	if(parent){
		 		var arr =[]
		 		parent.childs.map((baby) =>{
					Subject.find({groups:{"$in" :[baby.group_id._id]}}).populate({path: 'teacher_id', populate: {path: 'user_id'}}).exec(function(err, subjects){
					    if(err) console.log(err)
					    if(subjects){
                           subjects.forEach(function(value){
                           	arr.push(value)
                           })
                           res.send({
                           	childs: arr
                           })
					    }
					  })
				 	})

		 	}
		 })
})

//This route will add the parrent
router.post('/addparent',(req, res) =>{
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
router.post('/editparent', (req, res)=>{
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
router.post('/deleteparent', (req, res)=>{
	Parrent.findOneAndRemove({_id: req.body.parrent_id}, function(err, parrent){
		if(err) console.log(err);
		if(parrent){
			User.findOneAndRemove({_id: parrent.user_id}, function(err, user){
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



module.exports = router;
