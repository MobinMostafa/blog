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


export const login = () => {

}