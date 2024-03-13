const express=require('express')
const router=express.Router()
const zodcheck=require('../authentication/zodcheck')
const {User,Account}=require('../db/db')
const {jwt_secret,saltRounds}=require('../config')
const checktoken=require('../authentication/auth')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const checkzod=(req,res,next)=>{
    const result=zodcheck.safeParse(req.body)
    console.log(result)
    if(result.success){
        console.log("zod verified")
        next()
    }
    else
    console.log("error")
}
router.post('/signup',async (req,res)=>{
    try{
    const{username,firstName,lastName,password,Email}=req.body;
    const hash=await bcrypt.hash(password,saltRounds)
    const exist=await User.findOne({
        username:username
    })
    if(exist){
        return res.json({
            error:'username already taken'
        })
    }
    const newaccount=await Account.create({
        balance:Math.floor((Math.random()*10000) +1)
    })
    const newuser=await User.create({
        username:username,
        firstName:firstName,
        lastName:lastName,
        password:hash,
        Email:Email,
        Account:newaccount._id
    })
    const token=jwt.sign({'userId':newuser._id,'password':password},`${jwt_secret}`)
    await newuser.save();
    await newaccount.save()
    res.json({
        success:'user registered',
        token:token
    })
    }
    catch(e){
        res.json({Error:'dikkat h '})
    }
})
router.get('/signin',async (req,res)=>{
    try{
    const enteredEmail=req.body.Email
    const enteredPassword=req.body.password
    const find= await User.findOne(
       {
        Email:enteredEmail,
        password:enteredPassword
       }
    )
    const hashedPasswordFromDatabase=find.password;
    const verify=await bcrypt.compare(enteredPassword, hashedPasswordFromDatabase)
    const token=jwt.sign({'userId':naya._id,'password':password},`${jwt_secret}`)
    if(find)
    {
        if(verify==true)
        {
        res.json({
        Success:'Signed in',
        token:token})
    }
    else
    res.json({message:"incorrect password"})
    }
    else
    res.json({Error:'Incorrect'})
}catch(e){
    res.json({ErRRor:'dikkatt h bro'})
}
}
)
router.put('/update',checktoken,async (req,res)=>{
    try{
    const{username,firstName,password}=req.body;
    const {token}=req.headers
    const find= await User.findOne({
        username:username,
        password:password
    })
    if(find)
    {
        if(find.token===token)
        {
            const newuser=await User.updateOne({username:username,firstName:firstName})
            res.json({success:'updated successfully'})
    }
    else
    res.json({Error:'Incorrect'})}
}catch(e){
    console.log("error"+e)
}
})
router.get('/filter',async (req,res)=>{
    const param=req.query.filter;
    const find= await User.find({
        $or:[
            {
                'firstName':{
                    "$regex":param
                }
            },
            {
                'lastName':{
                    "$regex":param
                }
            }
        ]
    })
    res.json({user:find.map(f=>({
        username:f.username,
        firstName:f.firstName,
        lastName:f.lastName,
        userId:f._id
    }))})
})
module.exports=router
