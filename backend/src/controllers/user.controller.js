import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validator } from "../utils/validateFields.js"

const registerUser=asyncHandler(async(req,res)=>{
    const{ username,email,password }=req.body
    const validatefields=validator(username,email,password)
    if(!validatefields)
        throw new ApiError(400,"Entered information is not valid")
    
    const user=await User.create({
        username:username.toLowerCase(),
        email,
        password
    })
    
    const createdUser=await User.findById(user?._id).select("-password -refreshToken")
    if(!createdUser)
        throw new ApiError(500,"User could not be created")

    return res.status(200).json(
        new ApiResponse(200,createdUser,"The user is created succesfully")
    )
})

const generateAccessRefreshToken=async function(id){
    try {
        const user=await User.findById(id)
        const accessToken=await user.generateAccessToken()
        const refreshToken=await user.generateRefreshToken()
        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,error?.message||"Tokens could not be generated")
    }
}

const loginUser=asyncHandler(async(req,res)=>{
    const { email,password }=req.body
    const user=await User.findOne({email:email})
    if(!user)
        throw new ApiError(400,"User is invalid")

    const correct_password=user.validatePassword(password)
    if(!correct_password)
        throw new ApiError(400,"Password is incorrect")

    const { accessToken,refreshToken }=await generateAccessRefreshToken(user._id)
    const loggedInUser=await User.findById(user._id).select("-password -refreshToken")
    if(!loggedInUser)
        throw new ApiError(500,"User could not be logged in")
    
    const options={
        httpOnly:true,
        secure:true
    }
    console.log(options)
    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,loggedInUser,'User is successfully logged in')
    )
})

export {
    registerUser,
    loginUser
}