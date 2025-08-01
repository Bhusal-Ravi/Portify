const express= require("express");
const Portfolio= require("../models/Portfolio");

const router=express.Router();


router.get('/getportfolio/:url',async(req,res)=>{
    try{
        const {url}= req.params;
        const checkUrl= await Portfolio.findOne({url:url}).lean()
         console.log(checkUrl)
        if(!checkUrl){
            res.status(404).json({error:true,message:"The given PortFolio not found"})
        }
        res.status(200).json({error:true,portfolio:checkUrl})
    }catch(error){
         console.log(error)
        res.status(400).json({error:true,message:"Could not get the required Portfolio"})
       
    }
})

module.exports=router