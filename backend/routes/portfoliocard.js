const express= require("express")
const router = express.Router();
const Url= require("../models/Url")
const Portfolio= require("../models/Portfolio");




router.put('/portfoliocard/delete/:id',async(req,res)=>{
    try{
        if(!req.user){
            res.status(401).json({error:true,message:"Not Authorized"});
        }
        
        const url= req.params.id;
        console.log(url)

        const deleted= await Portfolio.deleteOne({url:url});
        console.log(deleted)
        if(deleted.deletedCount>0){
            const urlCheck= await Url.findOneAndDelete({url:url})
            
            res.status(200).json({error:false,message:"Deleted Successfully"})
        }else {
            res.status(404).json({error:true,message:"Delete Failed"})
        }

    }catch(error){
        console.log(error)
    }
})


router.post('/portfoliocard/update/:url',async(req,res)=>{
    try{
        const url= req.params.url;
        const data= req.body;
        const userId=req.user._id
        const portfolioCheck= await Portfolio.findOne({url:url})
        console.log(portfolioCheck)
        const {username,tag,description,profileimg,skills,social,projects}=data;
        console.log(url,userId)
        if(portfolioCheck && portfolioCheck.userId.toString()===userId){
            const update= await Portfolio.findOneAndUpdate({url:url,userId:userId},
                {
                    $set:{
                        username,
                        tag,
                        description,
                        profileimg,
                        skills,
                        social,
                        projects
                    },
                    
                },
                {new:true}
                
            );
             console.log("Updated Portfolio", update)

              if(!update){
            res.status(404).json({error:true,message:"Update Failed"})
        }else{
            res.status(200).json({error:false,message:"Successfully Updated"})
        } 
        }

       

       


    }catch(error){
        console.log(error)
    }
})

router.get('/portfoliocard/formdetail/:url',async(req,res)=>{
    try{
        const url= req.params.url;
        const data=await Portfolio.findOne({url:url})
        if(data){
            res.status(200).json({error:false,message:"Found Portfolio",data:data})
        }else{
            res.status(404).json({error:true,message:"Portfolio Not Found"});
        }
    }catch(error){
        console.log(error)
    }
})





module.exports= router