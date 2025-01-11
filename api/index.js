import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"


dotenv.config()

const port = process.env.PORT 
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    Credentials:  true
}))





app.listen(port, () => {
    console.log("Server is running on port: ", port);
})