const express = require('express')
const authMiddleware = require('../middlewares/authe')
const router = express.Router();
const upload = require('../config/multer.config')//require multer so that it can be used 
const fileModel = require('../models/files.models')
const firebase = require('../config/firebase.config')


router.get('/home', authMiddleware,async (req,res)=>{
   //below method will get the userId since auth middleware is in the parameter of the root function, now it will search all the files that are uploaded by that particular user
   const userFiles = await fileModel.find({
    user: req.user.userId
  })
  console.log(userFiles)
  res.render('home',{
    files: userFiles 
    //sending userFiles from backend to front end using ejs
  });
})//authmiddleware will not allow un logged in users to access this page

router.post('/upload', authMiddleware, upload.single('file'), async (req,res)=>{
  const newFile = await fileModel.create({
    path: req.file.path,
    originalName: req.file.originalname,
    //to get the user id here we need to head to authentication which is done by middleware we created. decoded variable there has our needed userId, since it has the data from the token assigned to it
    user:req.user.userId
  })
  res.json(newFile)
})
//upload keyword used here is what we required above from multer.config
//this name "file" is given here as that the exact name was given while making the input field to accept the form in the file in home.ejs
router.get('/download/:path', authMiddleware, async(req,res)=>{
  const loggedInUserId = req.user.userId;
  const path = req.params.path;
  //below we run a query to check if the user id of the person asking for access matches with the person who uploaded the file and also not just the filename but the path aslo matches with the path of the uploaded file
  const file = await fileModel.findOne({
    user: loggedInUserId,
    path: path
})
//below code runs in  case the file details do not match
if(!file){
  return res.status(401).json({
    message: 'Unauthorized Access'  
  })
}
//firebase by default does not allow the files to be accessed once uploaded but we do have a method called the signed url method as shown below to access the files via a temporary url given to us by firebase, path is used as a parameter as it is the only unique parameter there
const signedUrl = await firebase.storage().bucket().file(path).getSignedUrl({
  action: 'read',
  expires: Date.now() + 60*100
  //expires checks in miliseconds hence we multiply by 1000 to get it to expire after 1 min
})
res.redirect(signedUrl[0])
//signedUrl by default returns an array and we need only the first element here so we use the index 0
})



module.exports = router;