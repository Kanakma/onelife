var express = require('express')
var router = express.Router()
var Student = require('../models/student')
var FinalMark=require('../models/finalmark')


router.post('/addfinalmark',(req,res) =>{
	 var marks=JSON.parse(req.body.data);
	 var group_name=req.body.group_name;
	 var att_date=req.body.att_date;
	 var subject_id =req.body.subject_id;
	 var mark_type = req.body.mark_type;
   var finalmark=0;
      marks.map(function(mark){
 var finalmark=0;
finalmark+=mark.stud_mark*0.3

      FinalMark.findOne({
     	student:  mark.name,
     	subject_name: subject_id,
	    group_id: group_name,
     }).exec(function(err,stud){
    	if(!stud || err){

    		if(mark_type==="Рубежный Контроль1"){
    		var newFinalMark= new FinalMark({
    			student: mark.name,
    		   	date: att_date,
	     		stud_mark: mark.stud_mark,
	     		subject_name: subject_id,
	  		 	group_id: group_name,
	     	 	final_mark: {rk1: mark.stud_mark },
	     	 	stud_final_mark: { stud_final: finalmark}
    	  	})
    	  	 newFinalMark.save(function(err,saved){
     		if(err)console.log (err);
     		if(saved){
     		}
     	})

    		}


    	} else {

if(mark_type==="Рубежный Контроль2"){
//	console.log(stud.stud_final_mark.stud_final,'maaark')
var rk2= stud.stud_final_mark.stud_final+mark.stud_mark*0.3
	       FinalMark.findOneAndUpdate({
              	 student:  mark.name,
              	 subject_name: subject_id,
	  		 	 group_id: group_name,
              } ,
          {
          	$set : {
          		"final_mark.rk2": mark.stud_mark,
          		"stud_final_mark.stud_final":rk2
          	}
          },
          {
          	upsert:true
          }).exec(function(err,s) {
          	if(err) console.log(err)
          		if(s) console.log(s)
          })


}


if(mark_type==="Сессия"){

var sess= stud.stud_final_mark.stud_final+mark.stud_mark*0.4
	              FinalMark.findOneAndUpdate({
              	 student:  mark.name,
              	 subject_name: subject_id,
	  		 	 group_id: group_name,
              } ,
          {
          	$set : {
          		"final_mark.final_m": mark.stud_mark,
          		"stud_final_mark.stud_final":sess
          	}
          },
          {
          	upsert:true
          }).exec( function(err,s) {
          	if(err) console.log(err)
          		else  console.log(s)
          })


}


      }
  })



  })
 			  res.status(200).send({
   message: "Вы выставили Рубежный Контроль"
   })

})
router.post('/updatestudentsforfinalmark', (req,res)=> {
	 var subject_id=req.body.subject_id;
	 var group_name=req.body.group_name;
	 	 FinalMark.find({
	 	subject_name:subject_id,
    	group_id:group_name
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
router.get('/myfinalmarks', (req,res)=> {
	var student_id=req.query.student_id
	//console.log(student_id,'adasd')
	var arr =[]
	Student.findOne({
		user_id:student_id
	}).exec(function(err, stud){
		if(err) console.log(err);
		else{

			FinalMark.find({student:stud._id}).populate('subject_name ').exec(function(err,fm){
				    if(err) console.log(err);
				    else{
				    	var arr=[]
				    	var final_gpa=0
				    	var promise = new Promise(function(resolve, reject) {
				    		fm.forEach(function(v,i){
				    		arr.push(v)
				    		i++
				    		final_gpa+=v.stud_final_mark.stud_final
				    		final_gpa=final_gpa/i

				    		resolve('Success!');

				    	})
                             })

				    	promise.then( function(){

				    		fm.forEach(function(i){
			    		FinalMark.findOne({
                			student:  i.student,
                			subject_name: i.subject_name._id,
        					group_id: i.group_id
         				}).exec( function(err,s) {
          					if(err) console.log(err)
           					if(s){
				            	s.current_gpa.stud_gpa=final_gpa;
				            	s.save (function(err, saved){
				            	if(err) console.log(err)
				            		})
           					}
         				 })

				    	})
				    		res.send({fm:arr, final_gpa:final_gpa})
				    	})  //end of then
				    }
			})
		}
	})
})




module.exports = router;
