var express = require('express')
var router = express.Router()
var Parrent = require('../models/parrent')
var Mark=require('../models/mark')
var Teacher = require('../models/teacher')
var Homework = require('../models/homework')


router.post('/addmarksforhomework', (req, res)=>{
  var marks =  JSON.parse(req.body.marks);
  Teacher.findOne({user_id: req.body.userId}, function(err, teacher){
    if(err) console.log(err);
    if(teacher){
      Homework.findOne({_id: req.body.homework_id}, function(err, homework){
        if(err) console.log(err);
        if(homework){
            marks.forEach(function(item, index){
              homework.answer.forEach(function(ans, ind){
                if(ans._id.toString() === item.id.toString()){
                  homework.answer[ind].checked = true;
                  Student.findOne({_id: ans.student_id}, function(err, student){
                    if(err) console.log(err);
                    if(student){
                        var newMark=  new Mark({
                          student: ans.student_id,
                          teacher: teacher._id,
                          stud_mark: item.mark,
                          subject_name: homework.subject_id,
                          group_id: student.group_id
                        })
                        newMark.save(function(err,saved){
                          if(err)console.log (err);
                        })
                    }
                  })
                }
              })
              homework.save((err, newHomework) => {
                if(err) console.log(err)
              })
            })
            res.send({
              message: 'Оценки выставлены'
            })

        }
      })
    }
  })
})
router.post('/addmark',(req,res) =>{
	var marks=JSON.parse(req.body.data);
	var group_name=req.body.group_name;
	var att_date=req.body.att_date;
	var subject_id =req.body.subject_id;
	marks.map(function(mark){
		var newMark=  new Mark({
			student: mark.name,
			date: att_date,
			stud_mark: mark.stud_mark,
			subject_name: subject_id,
			group_id: group_name
		})
		newMark.save(function(err,saved){
			if(err)console.log (err);
			if(saved){
				console.log(saved)
			}
		})
	})
	res.status(200).send({
		message: "Вы выставили успеваемость"
	})
})
router.post('/updatemymark',(req,res)=> {
    var userId=req.body.userId;
		var subjectId=req.body.subjectId
		Mark.find({
		 	subject_name: subjectId,
		 	student: userId
		 }).populate({
		 	path: 'student ',
		 	populate: {
				path: 'user_id'
			}
		 }).exec(function(err,mark){
		 	if(err){
		 		console.log('не найдено')
		 	}
		 	if(mark)
		 	{

		 		res.send({
		 			mark:mark
		 		})
		 	}
		 })
})
router.post('/updatestudentsformark_easy',(req,res)=> {
	 var subject_id=req.body.subject_id;
	 var group_name=req.body.group_name
	 Mark.find({
	 	subject_name:subject_id,
	 	group_id: group_name
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
router.post('/updatestudentsformark',(req,res)=> {
	 var subject_id=req.body.subject_id;
	 var att_date=req.body.att_date;


	 Mark.find({
	 	subject_name:subject_id,
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
router.post('/updatestudentsallmarks',(req,res) =>{
	var group_name=req.body.group_name;
     var subject_id=req.body.subject_id;
     Mark.aggregate(
     {
     	$group: { _id: '$mark_type', count : {$sum : 1 }}
     }).exec(function(err, mark_count){
     	if(err){
    		res.status(500).send({err:err});
    	} else {

    		res.send({
    			mark_count:mark_count
    		})
    	}
     })
  })
	router.post('/updatemychildmark', (req,res)=>{

			 var userId=req.body.userId;
			 var subjectId=req.body.subjectId

			 Parrent.findOne({ user_id : userId
	     }).populate( {path: 'childs',
	     populate: {path:  'group_id user_id ' }}).populate('user_id').exec(function(err,parent){
	if(err) console.log('не найдено')
	 if(parent){
	 	//console.log(parent.childs._id,'sdfsd')

	 	parent.childs.forEach( function(p){
	Mark.find({student: p._id, subject_name: subjectId}).populate({
		path: 'student subject_name',
			 	populate: {
					path: 'user_id'
				}
	}).exec(function(err,attendance){
		if (err) console.log(err)
			else  console.log(attendance)
					res.send({attendance:attendance})
	})

	 	})

	  }

	})
	 })
	 router.post('/calculateSemesterMark', (req,res) => {
	 	var markvalues=JSON.parse(req.body.data)
	 	var group_name=req.body.group_name;
	 	var subject_id= req.body.subject_id;
	 	var array=[]
	 	var semesterMarks=[]

	 	markvalues.map(function(markvalue, index){
	  //console.log(markvalue.name + ' ' + markvalue.stud_mark)
	  Mark.find({mark_type:markvalue.name,group_id: group_name,subject_name: subject_id}, (err, marks)=>{


	  	if(marks){
	  		var promises=marks.map((mark)=>{
	  		     //console.log(mark,'maaark')
	  		     var studentSemesterMark ={
	                        student: mark.student,
	                        stud_mark: mark.stud_mark,
	                        subject_name: mark.subject_name,
	                        group_id: mark.group_id,
	                        mark_type: mark.mark_type,
	                        semester: mark.stud_mark*markvalue.stud_mark/100
	  		     }
	  		     semesterMarks.push(studentSemesterMark)

	  		})

	 Promise.all(promises).then(function(results) {
	     console.log(results)
	      		 			console.log(semesterMarks,'fullArray')

	 })

	  		 		//	console.log(semesterMarks,'fullArray')

	  	}

	  })

	 })


	 })


module.exports = router;
