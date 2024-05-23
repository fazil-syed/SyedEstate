import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"

export const updateUserInfo = async (req,res,next)=>{
 if(req.user.id != req.params.id )return next(errorHandler(403,"You can only update your own account."))
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,11)
        }
        const updateduser = await User.findByIdAndUpdate(req.params.id,{
            $set: {
                username : req.body.username,
                email : req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
            
        },{
            new: true
        });
        const {password,...rest} = updateduser._doc;
        // console.log(rest);
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}