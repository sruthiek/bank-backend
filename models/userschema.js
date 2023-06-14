//import mongoose in userschema.js
const mongoose=require('mongoose')
//using mongose, define schema for users
const userschema= new  mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    acno:{
        type:Number,
        required:true,
        unique:true
    },
    balance:{
        type:Number,
        required:true
    },
    transactions:{
        type:Array,
        required:true
    }
})
//create a model or collection to store documents
const users= mongoose.model("users",userschema)
//export model
module.exports=users