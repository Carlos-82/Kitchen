const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  userName: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  userImage: {
    type: String,
    default: "/images/bit-face.png"
  },
  aboutMe: {
    type: String,
  },
  recipesId: [{
    type: Schema.Types.ObjectId,
    ref: 'recipe'
  }],
});

userSchema.set('timestamps', true);

const User = mongoose.model('user', userSchema);
module.exports = User;