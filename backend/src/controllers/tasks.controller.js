import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const addTask=asyncHandler(async(req,res)=>{
    console.log("The next is invoked!!!")
    const {title,description,priority}=req.body
    const task=await Task.create({
        title:title.toLowerCase(),
        description,
        priority,
        owner:req.user?._id
    })
    
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $push:{tasks:task._id}
        },
        {
            new:true
        }
    )

    return res.status(201).json(
        new ApiResponse(201, task, "Task created successfully")
    )
})

const deleteTask=asyncHandler(async(req,res)=>{
    const {taskId}=req.params

    const deletedTask=await Task.findByIdAndDelete(taskId)
    if(!deletedTask)
    {
        throw new ApiError(400,"Id could not be found!!")
    }

    const deletedFromUser=await User.findByIdAndUpdate(req.user?._id,{
        $pull:{
            tasks:taskId
        }
    })

    if(!deletedFromUser)
        throw new ApiError(400,"User could not be found!!")

    return res.status(200).json(
        new ApiResponse(200,{},"User deleted successfully")
    )
})

const toggleTask=asyncHandler(async(req,res)=>{
    const {taskId}=req.params
    const task=await Task.findById(taskId)
    task.status=!task.status
    await task.save()

    return res.status(200).json(
       new ApiResponse(200, task, "Task toggled successfully")

    )
})

const updateDetails=asyncHandler(async(req,res)=>{
    const {title,description,priority,taskId}=req.body
    
    const task=await Task.findOneAndUpdate(
        {
            owner:req.user?._id,
            _id:taskId
        },
        {
            $set:{
                title,
                description,
                priority
            }
        }
    )

    return res.status(200).json(
        new ApiResponse(200,task,"Details updated succesfully")
    )
})

const getTasks=asyncHandler(async(req,res)=>{
    const {taskId}=req.params
    const task=await Task.findOne({
        owner:req.user?._id,
        _id:taskId
    })

    if(!task)
        throw new ApiError(400,"Task with id does not exist")

    return res.status(200).json(
        new ApiResponse(200,task,"Individual task sent successfully")
    )
})
export {
    addTask,
    deleteTask,
    toggleTask,
    updateDetails,
    getTasks
}