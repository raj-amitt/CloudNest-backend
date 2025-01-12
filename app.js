const express = require('express')

const app = express();
const userRouter = require('./routes/user.routes')

const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');//this is to keep the secrets of the DB in the env file

const indexRouter = require('./routes/index.routes')

dotenv.config(); //this call makes mongo_uri file accessible across all the application

const connectToDB = require('./config/db')
connectToDB();

app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs');
//we dont use app.get in the app.js file genrally in production code so we make those routes in the user routes folder and export them there and require them here to use them
app.use('/', indexRouter);//meaning that i dont have to use /index/home , i can directly access /home
app.use('/user', userRouter);
//now to use this above route we go to the localhost and hit this route /user/test ,remember that the test route exists in the user.routes file

app.listen(3000);