var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
// var logger = require('morgan');
var app = express();

require('./server/models').connect('mongodb://localhost:27017/onelife');
require('./server/routes/cron.js');

app.use(express.static('./public/static/'));
app.use(express.static('./client/build/'));
// app.use(logger('dev'));

app.use(bodyParser.urlencoded({extended:false}));

app.use(passport.initialize());

const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-login', localLoginStrategy);

app.use('/auth', require('./server/routes/auth'));
app.use('/api', require('./server/routes/index'));
app.use('/reports', require('./server/routes/reports'));
app.use('/teacher', require('./server/routes/teacher'));
app.use('/faculty', require('./server/routes/faculty'));
app.use('/notification', require('./server/routes/notification'));
app.use('/employee', require('./server/routes/employee'));
app.use('/candidate', require('./server/routes/candidate'));
app.use('/faq', require('./server/routes/faq'));
app.use('/major', require('./server/routes/major'));
app.use('/department', require('./server/routes/department'));
app.use('/subject', require('./server/routes/subject'));
app.use('/group', require('./server/routes/group'));
app.use('/student', require('./server/routes/student'));
app.use('/parent', require('./server/routes/parent'));
app.use('/homework', require('./server/routes/homework'));
app.use('/attendance', require('./server/routes/attendance'));
app.use('/mark', require('./server/routes/mark'));
app.use('/fmark', require('./server/routes/finalmark'));
app.use('/test', require('./server/routes/test'));
app.use('/auditory', require('./server/routes/auditory'));
app.use('/download', require('./server/routes/download'));
app.use('/dashboard', require('./server/routes/dashboard'));
app.use('/quiz', require('./server/routes/quiz'));


app.get("/*", function(req, res) {
	res.sendFile(__dirname + '/public/static/index.html')
})


app.listen(3009, () => {
  console.log('Magic is happening on port 3009');
});
