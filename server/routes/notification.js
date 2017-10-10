var express = require('express')
var router = express.Router()
var Notifications = require ('../models/notifications')
var DamFunc = require('../../client/src/modules/AllDamFunc')
var Student = require('../models/student')

router.post('/addeventnotification', (req, res)=>{
	var notification = JSON.parse(req.body.notification)
	var data = {
		type:notification.type,
		date:req.body.date,
		text:notification.text,
		from:notification.from,
		forAll:true
	}
	var newNote = new Notifications(data)
	newNote.save((err, saved)=>{
		if(err) console.log(err)
		if(saved){
			res.send({
				message:"Yes!"
			})
		}
	})
})

router.post('/getnotifications', (req, res)=>{
	Notifications.find({forAll:true}, (err, notes) =>{
		if(err) console.log(err)
		if(notes){
			var temp = notes.filter(function(note){
				return note.readed.indexOf(req.body.user) > -1
			})
			var trueNotes = []
			notes.map(function(note){
				if(!DamFunc.IndInObjArr(temp, note._id, '_id')){
					trueNotes.push(note)
				}
			})
			res.send({
				notifications:trueNotes
			})
		}
	})
})
router.post('/getnotesforstudents', (req, res)=>{
	Student.findOne({user_id:req.body.user}, (err, student)=>{
		if(err) console.log(err)
		if(student){
			Notifications.find({student:student._id}, (err, notifications)=>{
				if(err) console.log(err)
				if(notifications){
					Notifications.find({forAll:true}, (err, notes)=>{
						if(err) console.log(err)
						if(notes){
							var trueNotes = []
							var temp = notes.filter(function(note){
								return note.readed.indexOf(req.body.user) > -1
							})
							notes.map(function(note){
								if(!DamFunc.IndInObjArr(temp, note._id, '_id')){
									trueNotes.push(note)
								}
							})
							var temp2 = notifications.filter(function(note){
								return note.readed.indexOf(req.body.user) > -1
							})
							notifications.map(function(note){
								if(!DamFunc.IndInObjArr(temp2, note._id, '_id')){
									trueNotes.push(note)
								}
							})
							res.send({
								notifications:trueNotes
							})
						}
					})
				}
			})
		}
	})
})

router.post('/readnotes', (req, res)=>{
	var notes = JSON.parse(req.body.notes)
	console.log(notes)
	notes.map(function(id){
		Notifications.findOne({_id:id}, (err, note) =>{
			if(err) console.log(note)
			if(note){
				note.readed.push(req.body.user)
				note.save((err, saved)=>{
					if(err) console.log(err)
				})
			}
		})
	})
	res.send({
		message:"Saved!"
	})
})

router.post('/getallnotes', (req, res)=>{
	Notifications.find({forAll:true}, (err, trueNotes)=>{
		if(err) console.log(err)
		if(trueNotes){
			res.send({
				notifications:trueNotes
			})
		}
	})
})
router.post('/getallnotesforstudent', (req, res)=>{
	Notifications.find({forAll:true}, (err, trueNotes)=>{
		if(err) console.log(err)
		if(trueNotes){
			Student.findOne({user_id:req.body.user}, (err, student)=>{
				if(err) console.log(err)
				if(student){
					Notifications.find({student:student._id}, (err, notifications)=>{
						if(err) console.log(err)
						if(notifications){
							res.send({
								notifications:trueNotes.concat(notifications)
							})
						}
					})
				}
			})
		}
	})
})




module.exports = router;
