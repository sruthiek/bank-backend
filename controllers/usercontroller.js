//import model in usercontroller.js
const users = require('../models/userschema')
//import json web token
const jwt = require('jsonwebtoken')

//define logic
//register
exports.register = async (req, res) => {
    //register logic
    console.log(req.body);
    //get data send by front-end
    const { username, acno, password } = req.body
    if (!username || !acno || !password) {
        res.status(403).json("all input is required!!!")
    }

    //check if user is existing or not
    try {
        const preuser = await users.findOne({ acno })
        if (preuser) {
            res.status(406).json("user already exist!!")
        }
        else {
            //add user to database
            const newuser = new users({
                username,
                password,
                acno,
                balance: 5000,
                transactions: []
            })
            //to save new user in mongodb
            await newuser.save()
            res.status(200).json(newuser)
        }
    }
    catch (error) {
        res.status(401).json(error)
    }

}

//login
exports.login = async (req, res) => {
    //get request body
    const { acno, password } = req.body

    try {
        //check acno, pasaswprd is in database
        const preuser = await users.findOne({ acno, password })
        //check preuser or not
        if (preuser) {
            //generate token using jwt
            const token = jwt.sign({
                loginAcno: acno

            }, "supersecretkey12345")
            //send to client
            res.status(200).json({ preuser, token })
        }
        else {
            res.status(404).json("invalid acc number / password")
        }
    }
    catch (error) {
        res.status(401).json(error)
    }
}

//getbalance
exports.getbalance = async (req, res) => {
    //get acno from path parameter
    let acno = req.params.acno
    //get data of given acno
    try {
        //find acno from users collecttion
        const preuser = await users.findOne({ acno })
        if (preuser) {
            res.status(200).json(preuser.balance)
        }
        else {
            res.status(404).json("invalid acc number")
        }
    }
    catch (error) {
        res.status(401).json(error)
    }
}

//transfer
exports.transfer = async (req, res) => {
    console.log("inside transfer logic");
    //logic:
    //1.get body from req, ie creditacno,amt, pswd
    const { creditAcno, creditAmount, pswd } = req.body

    const { debitAcno } = req
    console.log(debitAcno);
    try {
        //2.check debit acno, pswd is available in mongodb
        const debitUserDetails = await users.findOne({ acno: debitAcno, password: pswd })
        console.log(debitUserDetails);

        //3. get credit acno details from database(momgodb)
        const creditUserDetails = await users.findOne({ acno: creditAcno })
        console.log(creditUserDetails);

        if (debitAcno != creditAcno) {
            if (debitUserDetails && creditUserDetails) {
                //check sufficient balance is available for debitUserDetails
                if (debitUserDetails.balance >= creditAmount) {
                    //perform transfer

                    //debit creditamount from debituserdetails
                    debitUserDetails.balance -= creditAmount
                    //add debit transaction to debituserdetails
                    debitUserDetails.transactions.push({
                        transaction_type: "DEBIT", amount: creditAmount, fromAcno: debitAcno, toAcno: creditAcno
                    })
                    //save  debituserdetails in mongodb
                    await debitUserDetails.save()
                    //credit creditamount to credituserdetails
                    creditUserDetails.balance += creditAmount
                    //add credit transaction to creditUserDetails
                    creditUserDetails.transactions.push({
                        transaction_type: "CREDIT", amount: creditAmount, fromAcno: debitAcno, toAcno: creditAcno
                    })
                    //save  creditUserDetailss in mongodb
                    await creditUserDetails.save()

                    res.status(200).json("fund transfer successfully")
                }
                else {
                    //insufficient
                    res.status(406).json("insufficient balance!!!")
                }




            }
            else {
                res.status(406).json("invalid credit or debit details!!!")
            }
        }
        else {
            res.status(406).json("operation denied..self transaction are not allowed!!")
        }

    }
    catch (error) {
        res.status(401).json(error)
    }

    // res.send("transfer request received")

}

//getTransactions
exports.getTransactions = async (req, res) => {
    //1.get acno from req.debitAcno
    let acno = req.debitAcno

    try {
        //2.check acno is in mongodb
        const preuser = await users.findOne({ acno })
        res.status(200).json(preuser.transactions)

    }
    catch (error) {
        res.status(401).json("invalid account number")
    }
}

//delemyaccount
exports.deleteMyAcno = async(req,res)=>{
    //get acno from req
    let acno=req.debitAcno
    //remove acno from db

    try{
        await users.deleteOne({acno})
        res.status(200).json("removed successfully")
    }
    catch(error){
        res.status(401).json(error)
    }
}