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

app.get("/*", function(req, res) {
	res.sendFile(__dirname + '/public/static/index.html')
})


app.listen(3000, () => {
  console.log('Magic is happening on port 3000');
});