
const express = require("express");
const cors=require('cors')
const jwt=require('jsonwebtoken')
const app=express();
const userRoutes=require('./routes/user')
const bankRoutes=require('./routes/bank')
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/account',bankRoutes)
if(process.env.NODE_ENV==="production")
{
    const __dirname=path.resolve();

    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend',"dist", 'index.html'));
});
}
else
app.get('/',(req,res)=>{
    res.send("API IS GOOD")
})
app.listen('3000',()=>{
    console.log("The port 3000 is live")
})