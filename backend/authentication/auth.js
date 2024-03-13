const jwt=require('jsonwebtoken')
const {jwt_secret}=require('../config')
const checktoken=(req,res,next)=>{
     try{
        const authHeader = req.headers.authorization;        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).json({});
        }
        const token = authHeader.split(' ')[1];
        const result=jwt.verify(token,`${jwt_secret}`)
    if(result)
    {
        req.password=result.password;
        req._id=result.userId
        req.token=token
        next();
    }
else
   res.json({error:"glt token"})
}
catch(e){
    res.json({error:"auth eror"})
}
}
module.exports=checktoken