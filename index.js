const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require("cookie-parser")
const dbConnection = require('./connection/dbConnection')
const routes = require("./routes/routes")

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))

app.use('/youtube',routes)
 
dotenv.config()
app.use((err,req,res,next)=>{
    const status = err.status ||500;
    const massage = err.massage ||"Something wrong";
    return res.status(status).json({
        sucess:false,
        status,
        massage
    })
})
app.listen(process.env.Port,()=>{
    dbConnection()
    console.log(`Server is runinig ${process.env.Port}!`)
})
















