const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true 
  },
  dateOfBirth: {
    type: Date,
  },
  username:{
    type:String,
    required: true
  },
  password:{
    type:String,
    required: true
  },
  email:{
    type:String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema);
