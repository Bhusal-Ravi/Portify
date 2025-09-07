const express= require("express");
const mongooe= require("mongoose");
const User= require('../models/User')
const Url= require('../models/Url')
const Portfolio= require('../models/Portfolio')
const router= express.Router();

router.post('/setportfolio/:url',async(req,res)=>{
    try{
        const {url}= req.params;
        const portfolio= req.body;
        const userId=req.user._id;
        const checkUrl=await Url.findOne({userId:userId})
        let urlId=""
        if(checkUrl){
            urlId =  checkUrl._id 
        }

        const {username,tag,description,profileimg,skills,social,projects,experience}=portfolio;
        
        let newPortFolio="";

        const prevPortFolio= await Portfolio.findOne({url:url})
        if(prevPortFolio){
            await Portfolio.deleteOne({url:url})
            newPortFolio= await Portfolio.create({userId,urlId,url,profileimg,username,tag,description,skills,social,projects,experience})
        }else{
            newPortFolio= await Portfolio.create({userId,urlId,url,profileimg,username,tag,description,skills,social,projects,experience})
        }
        res.status(200).json({error:false,message:"PortFolio Created"})
    }catch(error){
        console.log(error)
        res.status(400).json({error:true,message:"Failed To Create PortFolio"})
    }
})


module.exports= router

