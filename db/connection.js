//define node app & mongodb database connectivity


//import mongoose inconnection.js file
const mongoose= require('mongoose')
//to get connection string from .env file use: process.env
const connectionstring= process.env.DATABASE

//
mongoose.connect(connectionstring,{

useUnifiedTopology:true,
useNewUrlParser:true
}).then(()=>{
    
    console.log("mongodb atlas connected successfully");
}).catch(()=>{

    console.log("mongodb connection error:");
})