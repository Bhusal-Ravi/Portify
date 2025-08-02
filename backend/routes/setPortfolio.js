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
        if(!checkUrl){
            console.log("No such Url")
        }else{
            urlId =  checkUrl._id 
        }
        const {username,tag,description,profileimg,skills,social,projects}=portfolio;
        console.log(portfolio,urlId,userId,url)
        
        let newPortFolio="";

       const prevPortFolio= await Portfolio.findOne({url:url})
       if(prevPortFolio){
        Portfolio.deleteOne({url:url})
       newPortFolio= Portfolio.create({userId,urlId,url,profileimg,username,tag,description,skills,social,projects})
       }else{
         newPortFolio= Portfolio.create({userId,urlId,url,profileimg,username,tag,description,skills,social,projects})
       }
       res.status(200).json({error:false,message:"PortFolio Created"})

    }catch(error){
        console.log(error)
            res.status(400).json({error:true,message:"Faile To Create PortFolio "})
    }
})

module.exports= router

