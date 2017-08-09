const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
    
const UserSchema = new mongoose.Schema({
  username: {
    type: Number,
    unique: true
  },
  password: String,
  passport_id: String,
  name: String,
  lastname: String,
  birthday: Date,
  status: String,
  gender: String
});

UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};

module.exports = mongoose.model('User', UserSchema);
