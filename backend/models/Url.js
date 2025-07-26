const express= require('express');
const mongoose= require('mongoose');


const Urlschema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    url:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model('Url',Urlschema);
