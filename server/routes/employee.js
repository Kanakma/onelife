var express = require('express')
var router = express.Router()
var Employee = require ('../models/employee')


router.post('/addemployee', (req, res)=>{
	var employee = JSON.parse(req.body.data)
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
          employee_type:'',
          employement_type:'',
          date_of_id:'',
	        birthday:'',
	        nationality:''
	}
	Employee.findOne({passport_id:employee.passport_id}, function(err, fEmployee){
		if(err) console.log(err)
		else if(fEmployee){
			res.status(409).send({
				message: 'Этот сотрудник уже есть в базе'
			})
		} else{
			var data = {
				lastname:employee.lastname,
        name:employee.name,
        gender:employee.gender,
        address_de_jure:employee.address_de_jure,
        address_de_facto:employee.address_de_facto,
        phone:employee.phone,
        email:employee.email,
        passport_id:employee.passport_id,
        id_number:employee.id_number,
        gave_by:employee.gave_by,
        employee_type:employee.employee_type,
        employement_type:employee.employement_type,
        date_of_id:req.body.date_of_id,
        birthday:req.body.birthday,
        nationality:req.body.nationality
			}
			var newEmployee = new Employee(data)
			newEmployee.save(function(err, saved){
				if(err) console.log(err);
				if(saved){
					res.send({
						message: 'Сотрудник удачно добавлен'
					})
				}
			})
		}
	})
})
router.get('/getemployees', (req, res)=>{
	Employee.find({}, (err, employees)=>{
		if(err) console.log(err)
		if(employees){
			res.send({
				employees
			})
		}
	})
})
router.post('/deleteemployee', (req, res)=>{
	Employee.findOneAndRemove({_id:req.body.employee_id}, (err, deleted) =>{
		if(err) console.log(err)
		if(deleted){
			res.send({
				message:"Удалено!"
			})
		}
	})
})
router.post('/editemployee', (req, res)=>{
	var editedEmployee = JSON.parse(req.body.data)
	Employee.findOne({_id:req.body.employee_id}, (err, employee) =>{
		if(err) console.log(err)
		if(employee){
				employee.lastname=(editedEmployee.lastname!='')?editedEmployee.lastname:employee.lastname,
        employee.name=(editedEmployee.name!='')?editedEmployee.name:employee.name,
        employee.gender=(editedEmployee.gender!='')?editedEmployee.gender:employee.gender,
        employee.address_de_jure=(editedEmployee.address_de_jure!='')?editedEmployee.address_de_jure:employee.address_de_jure,
        employee.address_de_facto=(editedEmployee.address_de_facto!='')?editedEmployee.address_de_facto:employee.address_de_facto,
        employee.phone=(editedEmployee.phone!='')?editedEmployee.phone:employee.phone,
        employee.email=(editedEmployee.email!='')?editedEmployee.email:employee.email,
        employee.passport_id=(editedEmployee.passport_id!='')?editedEmployee.passport_id:employee.passport_id,
        employee.id_number=(editedEmployee.id_number!='')?editedEmployee.id_number:employee.id_number,
        employee.gave_by=(editedEmployee.gave_by!='')?editedEmployee.gave_by:employee.gave_by,
        employee.employee_type=(editedEmployee.employee_type!='')?editedEmployee.employee_type:employee.employee_type,
        employee.employement_type=(editedEmployee.employement_type!='')?editedEmployee.employement_type:employee.employement_type,
        employee.date_of_id=(req.body.date_of_id!='')?req.body.date_of_id:employee.date_of_id,
        employee.birthday=(req.body.birthday!='')?req.body.birthday:employee.birthday,
        employee.nationality=(req.body.nationality!='')?req.body.nationality:employee.nationality
				employee.save((err, saved)=>{
					if(err) console.log(err)
					if(saved){
						res.send({message:"Сотрудник изменен!"})
					}
				})
		}
	})
})

module.exports = router;
