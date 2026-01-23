import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validator } from "../utils/validateFields.js"
import mongoose, { Mongoose } from "mongoose";
import jwt from "jsonwebtoken"

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
        secure:true,
        sameSite:"none",
    }
    console.log(options)
    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,loggedInUser,'User is successfully logged in')
    )
})

const logoutUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:null
            }            
        },
        {
            new:true
        }
    )
    
    const options={
        httpOnly:true,
        secure:true,
        sameSite:"none",
    }

    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(200,{},"User logged out successfully")
    )
})

const updateUsername=asyncHandler(async(req,res)=>{
    const {username}=req.body
    const user=req.user

    if(username===user.username)
        throw new ApiError(400,"Username is already used")


    const changedUser=await User.findByIdAndUpdate(user._id,
        {
            $set:{
                username:username
            }
        },
        {
            new:true
        }
    ).select("-password -refreshToken")

    return res.status(200).json(
        new ApiResponse(200,changedUser,"The username is changed successfully")
    )
})


const refreshAccessToken=asyncHandler(async(req,res)=>{     
    
    const token=req.cookies.refreshToken||req.body.refreshToken
    if(!token)
    {
        throw new ApiError(401,"Unauthorized request")
    }

   let decodedToken;
    try {
        decodedToken = jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET
        );
    } catch {
        throw new ApiError(401, "Invalid or expired refresh token");
    }

    const user=await User.findById(decodedToken?._id)
    if(!user)
        throw new ApiError(401,"Unauthorised request")

    if(token !==user?.refreshToken)
        throw new ApiError(401,"Unauthorised access")

    const options={
        httpOnly:true,
        secure:true,
        sameSite:"none"
    }

    const {accessToken,refreshToken}=await generateAccessRefreshToken(user._id)
    return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",newRefreshToken,options).json(
        new ApiResponse(200,
            {
                accessToken,
                "refreshToken":newRefreshToken,
            },
            "Access token refreshed"
        )
    )
})

const getUserDetails=asyncHandler(async(req,res)=>{
    user=await User.findById(req?.user._id).select("-password -refreshToken")
    if(!user)
        throw ApiError(400,"User does not exist")

    return res.status(200).json(
        new ApiResponse(200,user,"Sending user data")
    )
})

const getUserTasks=asyncHandler(async(req,res)=>{
        
    const user=await User.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(req.user?._id)
            }
        },
        {
            $lookup:{
                from:"tasks",
                localField:"tasks",
                foreignField:"_id",
                as:"tasks"
            }
        },
        {
            $addFields:{
                taskCount:{
                    $size:"$tasks"
                }
            }
        },
        {
            $project:{
                tasks:1,
                taskCount:1
            }
        }
    ])  

    return res.status(200).json(
        new ApiResponse(200,user[0],"User task fetched succesfully")
    )
})

export {
    registerUser,
    loginUser,
    logoutUser,
    updateUsername,
    refreshAccessToken,
    getUserDetails,
    getUserTasks
}