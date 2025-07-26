const express= require('express');
const User= require('../models/User')
const Url= require('../models/Url')

const router=express.Router();

router.post('/urlcheck',async(req,res)=>{
        const url=req.body.url.toLowerCase();
        const userId=req.user._id;
    try{
        const urlCheck= await Url.findOne({url:url})

        if(!urlCheck){
            const insertUrl= await Url.create(
                {url:url,
                 userId:userId   
                }
            )
            if(!insertUrl){
            res.status(400).json({error:true,message:"Could not create username"})
            }else{
                res.status(200).json({error:false,message:"Username Successfully Set"})
            }
        }

        if(urlCheck){
            res.status(409).json({error:true,message:`${url} Already Exists`})
        }
        

    }catch(error){
        res.status(500).json({error:true,message:"something went wrong"});
        console.log(error)
    }
})

module.exports=router;