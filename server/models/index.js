const mongoose = require('mongoose');

module.exports.connect = (uri) => {
  mongoose.connect(uri);
  // plug in the promise library:
  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

  require('./user');
  require('./student');
  require('./teacher');
  require('./faculty');
  require('./major');
  require('./subject');
  require('./quiz');
  require('./homework');
};
