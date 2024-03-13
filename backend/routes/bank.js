const express=require('express')
const router=express.Router()
const zodcheck=require('../authentication/zodcheck')
const {User,Account}=require('../db/db')
const jwt_secret=require('../config')
const checktoken=require('../authentication/auth')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
router.get('/balance',checktoken,async (req,res)=>{
    const id=req._id
    console.log(`YE H WAHI WALA CONOSLoe ${id}`)
    const find=await User.findById(id).populate('Account')
    console.log(find)
        res.json({
            balance:find.Account.balance
        })
})
router.post('/transfer',checktoken,async(req,res)=>{ 
    const session=await mongoose.startSession();
    session.startTransaction();
    const{to,ammount}=req.body;
    const id=req._id;
    const find=await User.findById(id).populate('Account')
    console.log(find.Account)
    console.log("")
    console.log("YE FOUND ACCOUNT KE BAAD WAALA H")
    if(!find.Account || find.Account.balance<ammount )
    {
        await session.abortTransaction();
        return res.status(400).json({
            Message:'balance nhi h '
        })
    }
    const findto=await User.findById(to).populate('Account')
    console.log(findto.Account.balance)
    if(!findto){
        await session.abortTransaction();
        return res.status(400).json(
        {error:"invalid account"})
    }
    // transfer
    const from= await Account.findById(find.Account._id)
    console.log("")
    console.log("jaane waale ka accouunt")
    console.log(from)
    const destination=await Account.findById(findto.Account._id)
    console.log("")
    console.log("")
    console.log("")
    console.log(destination)
    await Account.updateOne(from,{ $inc:{balance:-ammount}}).session(session)
    await Account.updateOne(destination,{$inc:{balance:ammount}}).session(session)
    await session.commitTransaction();

    res.json({
        message: "Transfer successful"
    });
})
module.exports=router