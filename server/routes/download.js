var express = require('express')
var router = express.Router()
var Faq = require('../models/faq')
var Homework = require('../models/homework')
let fs = require('fs')
var path= require('path')

router.get('/downloadfaq/:faq', (req, res) =>{
  Faq.findOne({_id: req.query.id}, (err, faq)=>{
    if(err) console.log(err);
    if(faq){
      res.sendFile(path.join(__dirname,'../../public/faq-files/'+faq.file))
    } else {
      res.send('Не найдено')
    }
  })
})
router.get('/downloadhw/:homework', (req, res) =>{
  Homework.findOne({_id: req.query.id}, (err, homework)=>{
    if(err) console.log(err);
    if(homework){
      res.sendFile(path.join(__dirname,'../../public/teacher-homeworks/'+homework.file))
    } else {
      res.send('Не найдено')
    }
  })
})
router.get('/downloadanswer/:answer', (req, res) =>{
  Homework.findOne({_id: req.query.homework_id}, (err, homework)=>{
    if(err) console.log(err);
    if(homework){
      homework.answer.forEach((item, index)=>{
        if(item._id.toString()===req.query.id.toString()){
          res.sendFile(path.join(__dirname,'../../public/student-homeworks/'+item.answer_file))
        }
      })
    } else {
      res.send('Не найдено')
    }
  })
})

module.exports = router;
