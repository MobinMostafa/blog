import express from "express"
import { GoogleLogin, login, register } from "../controllers/auth.controller.js"

const AuthRoute = express.Router()

AuthRoute.post('/register', register)
AuthRoute.post('/login', login)
AuthRoute.post('/google-login', GoogleLogin) 


export default AuthRoute