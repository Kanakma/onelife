var express = require('express')
var router = express.Router()
var Auditory = require ('../models/auditory')

router.post('/addauditory', (req, res) =>{
	var auditory = JSON.parse(req.body.auditory)
	Auditory.findOne({auditory_name:auditory.auditory_name.toLowerCase()}, function(err, fAuditory){
		if(err) console.log(err)
		if(fAuditory){
			res.status(409).send({
				message: 'Эта аудитория уже есть в списке'
			})
		}else{
			var data = {
				auditory_name:auditory.auditory_name,
				auditory_corp:auditory.auditory_corp,
				auditory_level:auditory.auditory_level,
				auditory_places:auditory.auditory_places
			}
			var newAuditory = new Auditory(data)
			newAuditory.save((err, savedAuditory) =>{
				if(err){
					res.status(409).send({
						message: err
					})
				}else if(savedAuditory){
					res.status(200).send({message: "Аудитория добавлена"});
				}
			})
		}
	})
})

router.get('/getauditories', (req, res) =>{
	Auditory.find({}, (err, auditories) =>{
		if(err) console.log(err)
		if(auditories){
			res.send({
				auditories
			})
		}
	})
})

router.post('/deleteauditory', (req, res) =>{
	var auditory_id = JSON.parse(req.body.auditory_id)
	Auditory.findOneAndRemove({_id:auditory_id}, (err, deletedAuditory) =>{
		if(err) console.log(err)
		if(deletedAuditory){
			res.send({
				message:"Аудитория удалена успешно!"
			})
		}
	})
})

router.post('/editauditory', (req, res) =>{
	var newAuditory = JSON.parse(req.body.auditory)
	Auditory.findOne({_id:req.body.auditory_id}, (err, auditory) =>{
		if(err) console.log(err)
		if(auditory){
			if(newAuditory.auditory_name){
				Auditory.findOne({auditory_name:newAuditory.auditory_name.toLowerCase()}, (err, sameAuditory) =>{
					if(err) console.log(err)
					else if(sameAuditory){
						res.send({
							err:"Аудитория с таким наименованием уже существует!"
						})
					} else{
						auditory.auditory_name=(newAuditory.auditory_name!='')?newAuditory.auditory_name:auditory.auditory_name;
						auditory.auditory_corp=(newAuditory.auditory_corp!='')?newAuditory.auditory_corp:auditory.auditory_corp;
						auditory.auditory_level=(newAuditory.auditory_level!='')?newAuditory.auditory_level:auditory.auditory_level;
						auditory.auditory_places=(newAuditory.auditory_places!='')?newAuditory.auditory_places:auditory.auditory_places;
						auditory.save((err, saved) =>{
							if(err) console.log(err)
							if(saved){
								res.send({
									massage:"Аудитория изменена успешно!"
								})
							}
						})
					}
				})
			} else{
				auditory.auditory_corp=(newAuditory.auditory_corp!='')?newAuditory.auditory_corp:auditory.auditory_corp;
				auditory.auditory_level=(newAuditory.auditory_level!='')?newAuditory.auditory_level:auditory.auditory_level;
				auditory.auditory_places=(newAuditory.auditory_places!='')?newAuditory.auditory_places:auditory.auditory_places;
				auditory.save((err, saved) =>{
					if(err) console.log(err)
					if(saved){
						res.send({
							massage:"Аудитория изменена успешно!"
						})
					}
				})
			}
		}
	})
})

module.exports = router;
