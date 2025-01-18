//this is where the schema exists for the files that we are going to upload
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  path: {
    type:String,
     require: [true, 'Path is required'],
    },
    originalName:{
      type:String,
      required: [ true,'OriginalName is required']
    },
    user:{
      type:mongoose.Schema.Types.ObjectId,//defines that in this field there will be the id of some user
      ref:'User',//reference tells that above id belongs to which collection
      required:
      [true,'User is required']
    }

})

const file = mongoose.model('file', fileSchema)
module.exports = file;