const mongoose= require("mongoose")

const PortfolioSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
   
    urlId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Url',
        required:true
    },
    url:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
     profileimg:{
        type:String,
        required:true
    },
    tag:{
        type:String
    },
    description:{
        type:String,
        required:true
    },
    projects:[
        {
            title:{type:String,required:true},
             description: { type: String },
      link: { type: String },
      img:{type:String}
        }
    ],

    skills:[{
        title:{
            type:String
        }
    }],
    social:[{
        title:{
            type:String
        },
        link:{
            type:String
        }

    }]


    
})


module.exports=mongoose.model('Portfolio',PortfolioSchema)