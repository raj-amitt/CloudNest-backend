const jwt = require('jsonwebtoken')//this is required because we are doing the authentication here with cookies which were stored with json web token

//this is a middleware below which authenticates if the user is logged in or not
function auth(req,res,next){
    const token = req.cookies.token;//reading the token that is sent in the cookie to check if the user is logged in or not
    if(!token){//if token does not exist that means that the user is not logged in
      return res.status(401).json({
        message: 'Unauthorized Access'
      })
            }
     try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET);//jwt.verify method takes two parameters here which is a token and jwt secret from env file to detect if the token has been tampered or not, in case of tampering it returns an error
      req.user = decoded;//incase of authorized access decoded get the object value we defined in the token, username id email etc, that is assigned to user here
      return next();
     } catch(err){
        return res.status(401).json({
          message: 'Unauthorized Access'
        })
     }      

}
module.exports = auth;