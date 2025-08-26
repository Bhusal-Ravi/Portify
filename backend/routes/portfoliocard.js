const express= require("express")
const router = express.Router();

const Portfolio= require("../models/Portfolio");




router.put('/portfoliocard/delete/:id',async(req,res)=>{
    try{
        if(!req.user){
            res.status(401).json({error:true,message:"Not Authorized"});
        }
        
        const id= req.params.id;
        console.log(id)

        const deleted= await Portfolio.deleteOne({_id:id});
        console.log(deleted)
        if(deleted.deletedCount>0){
            res.status(200).json({error:false,message:"Deleted Successfully"})
        }else {
            res.status(404).json({error:true,message:"Delete Failed"})
        }

    }catch(error){
        console.log(error)
    }
})


module.exports= router