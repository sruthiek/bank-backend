//import .env
//config=load .env file contents into process .env
require('dotenv').config();
//import express
const express=require('express')
//import cors
const cors=require('cors')
//import db
require('./db/connection')
//import router
const router=require('./routes/router')
//import middleware
const middleware= require('./middleware/appmiddleware')


//create express server
const server=express()
//set up port number
const PORT=3000 || process.env.PORT
//use cors,json parserin server app
//to use cors
server.use(cors())
//to use json parser
server.use(express.json())

//use middleware
server.use(middleware.appmiddleware)



//use router in server app
server.use(router)



//to resolve http request using express server
server.get('/',(req,res)=>{
    res.send("bank server started!!!!")
})

//run the server app in specified port
server.listen(PORT,()=>{
    console.log(`bank server started at port number ${PORT}`);
})
