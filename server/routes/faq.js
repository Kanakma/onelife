var express = require('express')
var router = express.Router()
var Faq = require('../models/faq')
let fs = require('fs')

router.get('/getfaqs', (req, res)=>{
	Faq.find({}, (err, faqs)=>{
		if(err) console.log(err)
		if(faqs){
			res.send({
				faqs: faqs
			})
		}
	})
})
router.post('/addfaq', (req, res) => {
  if(req.query.filename){
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
		  	var tempPath = files.file[0].path;
				var fileName = files.file[0].originalFilename;
				let copyToPath = "public/faq-files/" + fileName;
				fs.readFile(tempPath, (err, data) => {
					// make copy of image to new location
					fs.writeFile(copyToPath, data, (err) => {
						// delete temp image
						fs.unlink(tempPath, () => {
							if(err) console.log(err);
							else {
              var faqData = {
                question: fields.question,
                answer: fields.answer,
                file: fileName
              }
              const newFaq = new Faq(faqData);
            newFaq.save((err, savedfaq) => {
            if (err) console.log(err);
            else {
              res.send({
                mеssage: 'Ответ добавлен'
              })
            }
            })

						}
					})
				})
			})
		})
	} else {
    var faqData = {
      question: req.body.question,
      answer: req.body.answer
    }
    const newFaq = new Faq(faqData);
                newFaq.save((err, savedfaq) => {
                  if (err) console.log(err);
                  else {
                    res.send({
                      message:'ответ удачно добавлен'
                    })
                  }
                })
	}

});
router.post('/editfaq', (req, res) => {
  if(req.query.filename){
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
		  	var tempPath = files.file[0].path;
				var fileName = files.file[0].originalFilename;
				let copyToPath = "public/faq-files/" + fileName;
				fs.readFile(tempPath, (err, data) => {
					// make copy of image to new location
					fs.writeFile(copyToPath, data, (err) => {
						// delete temp image
						fs.unlink(tempPath, () => {
							if(err) console.log(err);
							else {
              Faq.findOne({_id: fields.faq_id}, function(err, faq){
                if(err) console.log(err);
                if(faq){
                  faq.question = (fields.question!='')?fields.question:faq.question;
            			faq.answer = (fields.answer!='')?fields.answer:faq.answer;
                  faq.file = fileName;
            			faq.save(function(err, savedfaq){
            				if(err) console.log(err);
            				if(savedfaq){
                      res.send({
                        message: 'изменения сохранены'
                      })
                }
              })
						}
					})
        }
				})
			})
		})
  })
	} else {
        Faq.findOne({_id: req.body.faq_id}, function(err, faq){
          if(err) console.log(err);
          if(faq){
            faq.question = (req.body.question!='')?req.body.question:faq.question;
            faq.answer = (req.body.answer!='')?req.body.answer:faq.answer;
            faq.save(function(err, savedfaq){
              if(err) console.log(err);
              if(savedfaq){
                res.send({
                  message: 'изменения сохранены'
                })
          }
        })

      }
    })
	}
});
router.get('/deletefaq', (req, res)=>{
	Faq.findOneAndRemove({_id:req.query.faq_id}, (err, deleted) =>{
		if(err) console.log(err)
		if(deleted){
			res.send({
				message:  "Удалено!"
			})
		}
	})
})

module.exports = router;
