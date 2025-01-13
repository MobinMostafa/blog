import jwt from "jsonwebtoken"
import { handleError } from "../helpers/handleError.js"
import User from "../models/user.models.js"
import bcryptjs from 'bcrypt'

export const register = async (req, res, next) => {
    try {
        const {name, email, password} = req.body 
        const checkUser = await User.findOne({email})

        if(checkUser){
            // user already registered 
           next(handleError(409, 'user already registered'))
        }

        const saltRounds = 8;
        const hashPassword = bcryptjs.hashSync(password, saltRounds);

        //  new user register 
       const user = new User({
        name, email, password: hashPassword,
       })

       await user.save()
       res.status(200).json({
         success: true,
         message: "Registration successfully completed"
       })

    } catch (error) {
        next(handleError(500, error.message))
    }
}


export const login = async (req,res,next) => {
      try {
        const {email, password} = req.body 
        const user = await User.findOne({email})
        if(!user){
          return next(handleError(404, 'Invalid login credentials'))
        }

        const hashPassword = user.password 
        const comparePassword = await bcryptjs.compare(password, hashPassword)
        if(!comparePassword) {
           return next(handleError(404, 'Invalid login credentials'))
        }
        
        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        }, process.env.JWT_SECRET)

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/'
        })


        const newUser = user.toObject({getters: true})
        delete newUser.password

        res.status(200).json({
            success: true,
            newUser,
            message: "Login successfully"
        })
      } catch (error) {
        return next( handleError(500, error.message))
      }
}