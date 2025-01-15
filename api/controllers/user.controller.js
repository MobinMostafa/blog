import { handleError } from "../helpers/handleError.js";
import User from "../models/user.models.js";

export const getUser = async (req, res, next) => {
   try {
      const { userid } = req.params;
      const user = await User.findOne({ _id: userid }).lean().exec();
      if (!user) {
         return res.status(400).json({
            success: false,
            message: "User not found",
         });
      }
      res.status(200).json({
         success: true,
         message: "User data found",
         user,
      });
   } catch (error) {
      return next(handleError(500, error.message));
   }
};
