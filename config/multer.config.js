const multer = require('multer');//to handle any file coming from front end to baclend multer is required
const firebasestorage = require('multer-firebase-storage');

const firebase = require('./firebase.config')//this is required to use credentials that we will pass as an argument to storage variable

const serviceAccount= require('../drive-618ab-firebase-adminsdk-cqla5-b0b9ac9122.json');//we use those double dots in the require function to access files that exist outside the current folder but in the root folder
const { credential } = require('firebase-admin');

const storage = firebasestorage({
  credentials: firebase.credential.cert(serviceAccount),
  bucketName : 'drive-618ab.firebasestorage.app',//same as in the firebase config file
  // destination: (req, file, cb) => { 
    unique :true,//so that if a file is uploaded with the same name then it will not replace original file but create a new file with new name,original name stays the same but the path is given a different name to differentiate the two files
})

const upload = multer({
  storage: storage,
})//using multer function here

module.exports = upload;