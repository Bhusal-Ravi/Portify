const { v2: cloudinary } = require("cloudinary");
const fs= require('fs')
const express= require('express');
const router= express.Router();
const Portfolio= require("../models/Portfolio");
const dotenv= require('dotenv').config();
const upload= require('../middlewares/multer.middleware')




cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});





router.post('/imageupload',upload.single('profileimage'),async (req,res)=>{
    try{
        const response= await cloudinary.uploader.upload(req.file.path,{
            folder:'profilePicture'
        })

        

        const result= response
        fs.unlinkSync(req.file.path);


    if (result.secure_url) {
      res.status(200).json({ error: false, url: result.secure_url });
    } else {
      res.status(500).json({ error: true, message: "Cloudinary did not return a URL" });
    }
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    res.status(500).json({ error: true, message: err.message || "Upload failed" });
  }
});

router.post('/projectimage',upload.single('projectimage'),async (req,res)=>{
    try{
        const response= await cloudinary.uploader.upload(req.file.path,{
            folder:'projectPicture'
        })

        

        const result= response
        fs.unlinkSync(req.file.path);


    if (result.secure_url) {
      res.status(200).json({ error: false, url: result.secure_url });
    } else {
      res.status(500).json({ error: true, message: "Cloudinary did not return a URL" });
    }
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    res.status(500).json({ error: true, message: err.message || "Upload failed" });
  }
});




module.exports= router;