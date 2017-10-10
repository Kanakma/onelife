var express = require('express')
var router = express.Router()
var Parrent = require('../models/parrent')
var Attendance = require('../models/attendance')



router.post('/addattendance',(req, res)=>{
 var attendances=JSON.parse(req.body.data);
 var group_name=req.body.group_name;
 var att_date=req.body.att_date;
 var subject_id=req.body.subject_id;
 Attendance.findOne({subject_id: subject_id, group_id: group_name, date: att_date}, function(err,found){
	if(err) {console.log(err)}

		else if(found){
			res.send({
				message: 'Вы не можете выставлять повторную посещаемость'
			})
		} else {
               attendances.map(function(attendance){
			   var newAtt= new Attendance({
			   student:attendance.name,
			   date: att_date,
			   stud_attendance: attendance.att_status,
			   subject_id:subject_id,
			   group_id:group_name
		})


			  newAtt.save(function(err, saved){
			   if(err) console.log(err);
			   if(saved){
			   // console.log(saved)
			   }
			  })
			})//end of map for checkin
            res.send({
			   message: "Вы выставили посещаемость"
			   })
		}
	})


})//end of router

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
router.post('/updatemyattendance', (req,res) =>{

		 var userId=req.body.userId;
		 var subjectId=req.body.subjectId
		 Attendance.find({
		 	subject_id: subjectId,
		 	student: userId
		 }).populate({
		 	path: 'student ',
		 	populate: {
				path: 'user_id'
			}
		 }).exec(function(err,attendance){
		 	if(err){
		 		console.log('не найдено')
		 	}
		 	if(attendance)
		 	{
		 		res.send({
		 			attendance:attendance
		 		})
		 	}
		 })


})

router.post('/updatestudentsforattendance_easy',(req,res)=> {
	 var group_name=req.body.group_name;
	 var subject_id=req.body.subject_id;
    Attendance.find({
    	group_id:group_name,
    	subject_id:subject_id

    }).populate({
    	path: 'student',
    	populate: {
    		path:'user_id'
    	}
    }).exec(function(err,attendances){
    	if(err){
    		res.status(500).send({err:err});

    	} else {
    		if(attendances.length!=0){
    			res.status(200).send({attendances:attendances})

    		} else{
    			res.send({
    				attendances: attendances,
    				message: 'Ничего не найдено'
    			})

    		}

    	}
    })

})
router.post('/updatestudentsforattendance',(req,res)=> {
 	var group_name=req.body.group_name;
 	var att_date=req.body.att_date;
  Attendance.find({
  	group_id:group_name,
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
  		if(attendances.length!=0){
  			res.status(200).send({attendances:attendances})
  		} else{
  			res.send({
  				attendances: attendances,
  				message: 'Ничего не найдено'
  			})
  		}
  	}
  })
})
router.post('/updatemychildattendance', (req,res)=>{

		 var userId=req.body.userId;
		 var subjectId=req.body.subjectId

		 Parrent.findOne({ user_id : userId
     }).populate( {path: 'childs',
     populate: {path:  'group_id user_id ' }}).populate('user_id').exec(function(err,parent){
if(err) console.log('не найдено')
 if(parent){
 	//console.log(parent.childs._id,'sdfsd')

 	parent.childs.forEach( function(p){
console.log(p._id, subjectId)

Attendance.find({student: p._id, subject_id: subjectId}).populate({
	path: 'student subject_id',
		 	populate: {
				path: 'user_id'
			}
}).exec(function(err,attendance){
	if (err) console.log(err)
		else
				res.send({attendance:attendance})
})

 	})

  }

})
 })

module.exports = router;
