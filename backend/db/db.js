if(process.env.NODE_ENV!='production'){
    require('dotenv').config();
}
const DB_url=process.env.DB_url
const mongoose=require('mongoose')
mongoose.connect(DB_url) .then(console.log("database connected"))
.catch(err => console.log(err));
const userSchema={
    username:String,
    password:String,
    firstName:String,
    lastName:String,
    Email:String,
    Account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Account'
    }
}
const User=mongoose.model('User',userSchema)
const bankSchema={
    userId:String,
    balance:Number
}
const Account=mongoose.model('Account',bankSchema)
module.exports={User,Account}