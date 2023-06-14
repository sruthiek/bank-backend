//import express
const express=require('express')
//import middleware
const middleware= require('../middleware/routerspecific')
//crete routes,using express.Router()
const router= new express.Router()
//import controller

const usercontroller = require('../controllers/usercontroller')


//define routes to resolve http request

//register request
router.post('/employee/register',usercontroller.register)

//login request
router.post('/employee/login',usercontroller.login)
//getbalance request
router.get('/user/balance/:acno',middleware.logMiddleware,usercontroller.getbalance)

//fund transfer
router.post('/user/transfer',middleware.logMiddleware,usercontroller.transfer)
//ministatement
router.get('/user/ministatement',middleware.logMiddleware,usercontroller.getTransactions)
//delete account
router.delete('/user/delete',middleware.logMiddleware,usercontroller.deleteMyAcno)

//export router
module.exports= router

