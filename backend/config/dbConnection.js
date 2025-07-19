const mongoose= require("mongoose");
const dotenv= require('dotenv').config();

async function connectdb(){
    try{
        const connect= await mongoose.connect(process.env.MONGO_URL)
        console.log("Data Base Connected",connect.connection.host,connect.connection.name)
    }catch(error){
        console.log(error)
        
    }

}

module.exports= connectdb