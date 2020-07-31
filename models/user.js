const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String,
  name: String,
  email: String,
  password: String,
  userImage: String,
  aboutMe: String,
  recipesId: {type: Schema.Types.ObjectId, ref:'Recipe'},
});

userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);

module.exports = User;
