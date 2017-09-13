const mongoose = require('mongoose');

module.exports.connect = (uri) => {
  mongoose.connect(uri);
  // plug in the promise library:
  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });
  require('./attendance');
  require('./department');
  require('./faculty');
  require('./group');
  require('./homework');
  require('./major');
  require('./mark');
  require('./parrent');
  require('./quiz');
  require('./quiz_point');
  require('./schedule');
  require('./student');
  require('./subject');
  require('./teacher');
  require('./user');
  require('./auditory')
  require('./employee')
  require('./candidate')
  require('./notifications')
};
