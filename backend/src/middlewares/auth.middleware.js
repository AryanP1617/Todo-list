import jwt from "jsonwebtoken"
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'


const verifyJwt=asyncHandler(async(req,res,next)=>{
   try {
     const token=req.cookies?.accessToken||req?.header("Authorization")?.replace("Bearer","")
     if(!token)
         throw new ApiError(400,"Unauthorised access!! ")
     
     const decodedToken=await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
     if(!decodedToken)
         throw new ApiError(400,"Token is expired")
 
     const user=await User.findById(decodedToken._id)
     if(!user)
         throw new ApiError(400,"User is not present")
 
     req.user=user
     next()
   } catch (error) {
        throw new ApiError(500,error?.message || "Token could not be verified")    
   }
})  

export { verifyJwt }