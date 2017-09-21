var express = require('express')
var router = express.Router()
var Candidate = require ('../models/candidate')
var DamFunc = require('../../client/src/modules/AllDamFunc')

router.post('/addcandidate', (req, res) =>{
	var documents = JSON.parse(req.body.documents)
	var candidate = JSON.parse(req.body.data)
	var data = {
		      lastname:'',
          name:'',
          gender:'',
          address_de_jure:'',
          address_de_facto:'',
          phone:'',
          email:'',
          passport_id:'',
          id_number:'',
          gave_by:'',
          attestat:'',
          attestat_type:'',
          date_of_id:'',
	        birthday:'',
	        nationality:'',
	        documents:[]
	}
	Candidate.findOne({passport_id:candidate.passport_id}, function(err, fCandidate){
		if(err) console.log(err)
		else if(fCandidate){
			res.status(409).send({
				message: 'Этот абитуриент уже есть в базе'
			})
		} else{
			var data = {
				lastname:candidate.lastname,
        name:candidate.name,
        gender:candidate.gender,
        address_de_jure:candidate.address_de_jure,
        address_de_facto:candidate.address_de_facto,
        phone:candidate.phone,
        email:candidate.email,
        passport_id:candidate.passport_id,
        id_number:candidate.id_number,
        gave_by:candidate.gave_by,
        attestat:candidate.attestat,
        attestat_type:candidate.attestat_type,
        date_of_id:req.body.date_of_id,
        birthday:req.body.birthday,
        nationality:req.body.nationality,
        documents:documents
			}
			var newCandidate = new Candidate(data)
			newCandidate.save(function(err, saved){
				if(err) console.log(err);
				if(saved){
					res.send({
						message: 'Абитуриент удачно добавлен'
					})
				}
			})
		}
	})
})
router.get('/getcandidates', (req, res)=>{
	Candidate.find({}, (err, candidates)=>{
		if(err) console.log(err)
		if(candidates){
			res.send({
				candidates
			})
		}
	})
})
router.post('/deletecandidate', (req, res)=>{
	Candidate.findOneAndRemove({_id:req.body.candidate_id}, (err, deleted) =>{
		if(err) console.log(err)
		if(deleted){
			res.send({
				message:"Удалено!"
			})
		}
	})
})
router.post('/editcandidate', (req, res)=>{
	var editedCandidate = JSON.parse(req.body.data)
	var documents = JSON.parse(req.body.documents)
	Candidate.findOne({_id:req.body.candidate_id}, (err, candidate) =>{
		if(err) console.log(err)
		if(candidate){
			candidate.lastname=(editedCandidate.lastname!='')?editedCandidate.lastname:candidate.lastname,
      candidate.name=(editedCandidate.name!='')?editedCandidate.name:candidate.name,
      candidate.gender=(editedCandidate.gender!='')?editedCandidate.gender:candidate.gender,
      candidate.address_de_jure=(editedCandidate.address_de_jure!='')?editedCandidate.address_de_jure:candidate.address_de_jure,
      candidate.address_de_facto=(editedCandidate.address_de_facto!='')?editedCandidate.address_de_facto:candidate.address_de_facto,
      candidate.phone=(editedCandidate.phone!='')?editedCandidate.phone:candidate.phone,
      candidate.email=(editedCandidate.email!='')?editedCandidate.email:candidate.email,
      candidate.passport_id=(editedCandidate.passport_id!='')?editedCandidate.passport_id:candidate.passport_id,
      candidate.id_number=(editedCandidate.id_number!='')?editedCandidate.id_number:candidate.id_number,
      candidate.gave_by=(editedCandidate.gave_by!='')?editedCandidate.gave_by:candidate.gave_by,
      candidate.attestat=(editedCandidate.attestat!='')?editedCandidate.attestat:candidate.attestat,
      candidate.attestat_type=(editedCandidate.attestat_type!='')?editedCandidate.attestat_type:candidate.attestat_type,
      candidate.date_of_id=(req.body.date_of_id!='')?req.body.date_of_id:candidate.date_of_id,
      candidate.birthday=(req.body.birthday!='')?req.body.birthday:candidate.birthday,
      candidate.nationality=(req.body.nationality!='')?req.body.nationality:candidate.nationality
      candidate.documents=(documents!='')?documents:candidate.nationality
			candidate.save((err, saved)=>{
				if(err) console.log(err)
				if(saved){
					res.send({message:"Абитуриент изменен!"})
				}
			})
		}
	})
})
module.exports = router;
