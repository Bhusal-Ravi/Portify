const express=require("express");
const router= express.Router();
const Portfolio=require('../models/Portfolio');

router.get('/portfoliolist/:id',async(req,res)=>{
    try{
    const {id}=req.params;

    const portfolio= await Portfolio.find({userId:id}).lean().sort({_id:-1})

    if(portfolio.length===1){
        res.status(404).json({error:true,message:"No PreviousPortfolio Found"})
    }else{
        res.status(200).json({error:false,message:"Found Portfolio",list:portfolio})
    }
}catch(error){
    res.status(500).json({error:true,message:"Could not get the listof portfolio"})
}
    

})


module.exports= router