const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username:{
    type : String,
    required : true,
    unique : true,
    trim : true,
    lowercase : true,
    unique: true,
    minlength : [3,'Username must be at least 3 characters long']
  },
  
  email :{
    type:String,
    required:true,
    trim:true,
    unique:true,
    lowercase:true,
    minlength: [13,'Email Invalid']
  },
  password:{
    type:String,
    required:true,
    trim:true,
    minlength: [5,'password must be at least 5 characters long']
  }

})
const user = mongoose.model('user', userSchema);
module.exports = user;