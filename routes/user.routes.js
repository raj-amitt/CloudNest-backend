const express =require('express');
const router = express.Router();
const { body, validationResult} = require('express-validator');//for data validation
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');//pass encryption

const jwt = require('jsonwebtoken');//to use jwt


  router.get('/test',(req,res)=>{
    res.send('Test route');
  })
  // to use above route we have to export above route with the below statement

  router.get('/register', (req, res) =>{
    res.render('register');
  })
  router.post('/register',
    body('email').trim().isEmail().isLength({min: 13}),
    body('password').trim().isLength({min: 5}),
    body('username').trim().isLength({min:3}),
    async (req,res)=>{
      const errors = validationResult(req);

     console.log(errors)
      if(!errors.isEmpty()){
       return res.status(400).json({
        errors: errors.array(),
        message : 'Invalid Data'
       })
      }

     const{email,username,password} = req.body;

     const hashPassword = await bcrypt.hash(password, 10)

     const newUser = await userModel.create({
      email,
      username,
      password : hashPassword
     })
     res.json(newUser)
  })
  router.get('/login', (req,res)=>{
    res.render('login')
  })
  router.post('/login',
    body('username').trim().isLength({min: 3}), //validation express validator
    body('password').trim().isLength({min: 5}),
    async (req,res)=>{
      const errors = validationResult(req); //storing errors in variable
      if(!errors.isEmpty()){ //incase of an error
        return res.status(400).json({
          error : errors.array(),
          message: 'Invalid Credentials'
        })
      }
      const {username,password}=req.body; //extracting username and pass using req.body
      const user = await userModel.findOne({
        username: username
        //findOne is used to check if username exists under the username field in the userModel
      })
      if(!user){//if user does not exist
        return res.status(400).json({
          message: 'username or password is incorrect'// for security reasons to avoid bruteforce cracking 
        })
      }
      const isMatch = await bcrypt.compare(password, user.password)//bcrypt.compare method can compare given password with the stored hash password and return a BOOLEAN VALUE
      if(!isMatch){
        //checking the boolean value of isMatch
        return res.status(400).json({
          message: 'username or pass is incorrect'
      })
      }
      const token = jwt.sign({
        //(authorization)for storing the data of user being logged in for cookies
        userId : user._id,
        email : user.email,
        username : user.username
      },
      process.env.JWT_SECRET, //stored in the .env file since sensitive information
    )
    // res.json({
    // not recommended method, basically sends a response token to the front end token
    // })
    res.cookie('token',token)//first parameter is the name and second is the value passed to it
    res.send('Logged in')
    //cookie can be found under the inspect section of the browser and it is sent to the server with every request by the browser
  }
)

  module.exports = router;