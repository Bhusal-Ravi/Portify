const express= require("express");
const cors= require("cors");
const dotenv= require("dotenv").config();
const passport= require('passport');
const MongoStore= require("connect-mongo")
const session= require('express-session')
const connectdb= require('./config/dbConnection')
const authRoute= require('./auth/oauth')
require('./passport'); 
const usernameRoute=require('./routes/setUsername')

const app= express();


app.use(
    session({
        secret:process.env.SECRET_KEY,
        resave:false,
         saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL,
            ttl: 60*60*24
        }),
        cookie:{
            secure:false,
            sameSite:'lax',
            maxAge: 60*60*24*1000,
            httpOnly: true
        }
    })
)

app.use(
    cors({
        origin:[`http://localhost:5173`],
        methods:"GET,POST,PUT,DELETE",
        credentials:true,
         allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['set-cookie']

    })
)

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth',authRoute);
app.use('/api',usernameRoute);
connectdb();

const PORT= process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})