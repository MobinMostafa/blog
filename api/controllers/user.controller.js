import { handleError } from "../helpers/handleError"
import User from "../models/user.models"

export const getUser = async (req,res,next) => {
   try {
      const { userid } = req.params
      const user = await User.findOne({_id: userid}).lean().exec()
      if(!user){
        return next(handleError(400, "user not found"))
      }
      res.status(200).json({
         success: true,
         message: 'user data found',
         user,
      })
   } catch (error) {
      return next(handleError(500, error.message))
   }
}