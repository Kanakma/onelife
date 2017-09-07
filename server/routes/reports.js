var express = require('express');
var router = express.Router();
var Major = require('../models/major');
var Faculty = require('../models/faculty');
var User = require('../models/user');
var Teacher = require('../models/teacher');
var Student = require('../models/student');
var Subject = require('../models/subject');
var Quiz = require('../models/quiz');
var QuizPoint = require('../models/quiz_point');
var Department = require('../models/department');
var Parrent = require('../models/parrent');
var Mark=require('../models/mark')
var Attendance = require('../models/attendance')
var Homework = require('../models/homework')
var Group = require('../models/group')
var Auditory = require ('../models/auditory')
const bcrypt = require('bcryptjs');
var jwtDecode = require('jwt-decode');
var mongoose = require('mongoose');
let multiparty = require('multiparty');
let fs = require('fs');
var xl = require('excel4node');
var url = require('url');
var http = require('http');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
const path = require('path');

//this route will create a excel file 3HK report

router.post('/report3nk/:name', (req, res) =>{

function dateFormat(date){
	var fDate = new Date(date)
	return fDate.getFullYear()
}

var wb = new xl.Workbook(); // Creating the WorkBook
var ws = wb.addWorksheet('1и2'); // Creating the sheets
var cellBorders = wb.createStyle({ // Creating reusable styles for borders filling
	border: {
		left:{
			style: 'thin', 
			color: '000000'
		},
		right:{
			style: 'thin', 
			color: '000000'
		},
		top:{
			style: 'thin', 
			color: '000000'
		},
		bottom:{
			style: 'thin', 
			color: '000000'
		}
	}
});

function formText_n(String1, String2, number1, number2){
	return [{ bold:true, size: number1, name:'Arial'}, String1 + '\n', { bold:false, size:number2, name:'Arial'}, String2]
}

// Set value of cell A1 to 100 as a number type styled with paramaters of style 
ws.cell(3, 1, 4, 7, true).string('Қазақстан Республикасы Статистика агенттігі                             Жалпы мемлекеттік                               3-НК нысаны. Жылдық. Тапсыру мерзімі                       Қазазстан Республикасы Статистика агенттігінің 2009 ж.\nқұпиялылық сақтауға кепілдік береді                                          статистикалық есептілік                         5-ші қазан.                                                                         20 шілдедегі № 108 бұйрығымен бекітілген').style({ font: {name: 'Arial', size: 7} });
ws.cell(5, 1, 6, 7, true).string('Конфиденциальность гарантируется Агентством                       Общегосударственная                          Форма 3-НК. Годовая.                                                      Утверждена приказом Агентства Республики Казахстан\nРеспублики Казахстан по статистике                                            статистическая отчетность                  Срок представления 6 октября.                                      по статистике № 108 от 20 июля 2009 г.').style({ font: {name: 'Arial', size: 7} })
ws.cell(8, 1, 9, 2, true).string(formText_n('Жоғары оқу орнының есебі', 'Отчет высшего учебного заведения', 6, 6))
ws.cell(11, 1).string(formText_n('ҚҰЖС коды', 'Код ОКПО', 6, 6))
ws.cell(11, 2).string('30725143').style({ font: {name: 'Arial', size: 7} })
ws.cell(11, 3).string(formText_n('Есептік кезең:', 'Отчетный период:', 6, 6))
ws.cell(11, 4, 11, 5, true).string((dateFormat(new Date())-1)+'-'+dateFormat(new Date())+' уч.год').style({ font: {name: 'Arial', size: 7, bold:true} })
ws.cell(13, 1, 13, 3, true).string(formText_n('1. Ұйымның түрін белгіленіз/', 'Отметьте вид организации', 8, 8)).style(cellBorders)
ws.cell(13, 5, 13, 7, true).string(formText_n('2. Оқыту нысанын белгіленіз/', 'Отметьте форму обучения', 8, 8)).style(cellBorders)
ws.cell(15, 1).string(formText_n('Жол коды', 'Код строки', 7, 7)).style(cellBorders)
ws.cell(15, 2).string(formText_n('Көрсеткіш атауы', 'Наименование показателя', 7, 7)).style(cellBorders)
ws.cell(15, 3).string(formText_n('', '', 7, 7)).style(cellBorders)
ws.cell(15, 5).string(formText_n('Жол коды', 'Код строки', 7, 7)).style(cellBorders)
ws.cell(15, 6).string(formText_n('Көрсеткіш атауы', 'Наименование показателя', 7, 7)).style(cellBorders)
ws.cell(15, 7).string(formText_n('', '', 7, 7)).style(cellBorders)
ws.cell(16, 1).string(formText_n('', '', 7, 7)).style(cellBorders)
ws.cell(16, 2).string(formText_n('', '', 7, 7)).style(cellBorders)
ws.cell(16, 3).string(formText_n('', '1', 7, 7)).style(cellBorders)
ws.cell(16, 5).string(formText_n('', '', 7, 7)).style(cellBorders)
ws.cell(16, 6).string(formText_n('', '', 7, 7)).style(cellBorders)
ws.cell(16, 7).string(formText_n('', '1', 7, 7)).style(cellBorders)
ws.cell(17, 1).string(formText_n('', '1', 7, 7)).style(cellBorders)
ws.cell(17, 2).string(formText_n('Сулейман Демирел атындағы университеті', '', 7, 7)).style(cellBorders)
ws.cell(17, 3).string(formText_n('', 'v', 7, 7)).style(cellBorders)
ws.cell(17, 5).string(formText_n('', '1', 7, 7)).style(cellBorders)
ws.cell(17, 6).string(formText_n('Күндізгі/', 'Дневная', 7, 7)).style(cellBorders)
ws.cell(17, 7).string(formText_n('', 'v', 7, 7)).style(cellBorders)
ws.cell(18, 1).string(formText_n('2', '', 7, 7)).style(cellBorders)
ws.cell(18, 2).string(formText_n('Академия/', 'Академия', 7, 7)).style(cellBorders)
ws.cell(18, 3).string(formText_n('', '', 7, 7)).style(cellBorders)
ws.cell(18, 5).string(formText_n('', '2', 7, 7)).style(cellBorders)
ws.cell(18, 6).string(formText_n('Кешкі/', 'Вечерняя', 7, 7)).style(cellBorders)
ws.cell(18, 7).string(formText_n('', '', 7, 7)).style(cellBorders)
ws.cell(19, 1).string(formText_n('', '3', 7, 7)).style(cellBorders)
ws.cell(19, 2).string(formText_n('Институт және оларға теңестірілген консерватория, жоғары мектеп, жоғары училище/', '/институт и приравненные к ним консерватория, высшая школа, высшее училище', 7, 7)).style(cellBorders)
ws.cell(19, 3).string(formText_n('', '', 7, 7)).style(cellBorders)
ws.cell(19, 5).string(formText_n('', '3', 7, 7)).style(cellBorders)
ws.cell(19, 6).string(formText_n('Сырттай', 'Заочная', 7, 7)).style(cellBorders)
ws.cell(19, 7).string(formText_n('', '', 7, 7)).style(cellBorders)

//write file to disk
var filename = '3HK' + new Date().getFullYear() + '.xlsx'

wb.write('./public/reports/' + filename);

var file = '../../public/reports/'+filename
res.sendFile(path.join(__dirname, file))

})
module.exports = router;