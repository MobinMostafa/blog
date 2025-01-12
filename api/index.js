import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import mongoose from "mongoose"
import AuthRoute from "./routes/auth.route.js"


dotenv.config()

const port = process.env.PORT 
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}))

// route 

app.use('/api/auth', AuthRoute)




mongoose.connect(process.env.MONGODB_CONN,{dbName:"first-mern-blog"})
.then(() => console.log("database connection successfully"))
.catch(err => console.log("database connection failed", err))


app.listen(port, () => {
    console.log("Server is running on port:", port);
})

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})