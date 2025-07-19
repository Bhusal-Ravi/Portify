const router= require('express').Router();
const passport= require('passport');
const User=require('../models/User')


router.get('/google',
    passport.authenticate('google',{
        scope:['profile','email']
    })
);

router.get('/google/callback',
    passport.authenticate('google',{
        successRedirect:process.env.CLIENT_URL,
        failureRedirect:'/auth/login/failed'
    }),
    (req,res)=>{
        console.log('OAuth callback completed');
        console.log('User in callback:', req.user);
        console.log('Session in callback:', req.session);
        console.log('Session ID in callback:', req.sessionID);
    }
)


router.get('/login/success',(req,res)=>{

 console.log('Login success route hit, user:', req.user);
    console.log('Session:', req.session);
    console.log('Session ID:', req.sessionID);
    if(req.user){
        res.status(200).json({
            error:false,
            message:"Successfully Logged In",
            user:req.user,
        })
    }else{
        res.status(403).json({error:true,message:"Not Authorized"});
    }
})


router.get('/login/failed',(req,res)=>{
    console.log('Failed to Login')
    res.status(401).json({error:true,message:"Log In Failed"})
})

router.post('/logout',(req,res)=>{
    req.logout((err)=>{
        if(err){
            return res.status(500).json({error:true,message:"Logout Failed"})
        }
        req.session.destroy((err)=>{
            if(err){
                return res.status(500).json({error:true,message:"Logout Failed"})
            }
            res.clearCookie('connect.sid');
            return res.status(200).json({error:false,message:"Logout Successful",logoutcode:1})
        })
    })
})


module.exports= router