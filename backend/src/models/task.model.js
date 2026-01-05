import mongoose, { Schema } from "mongoose";

const taskSchema=new Schema(
    {
        title:{
            type:String            
        },
        description:{
            type:String
        },
        status:{
            type:Boolean,
            default:false
        },
        priority:{
            type:Number
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"user"
        }
    },

    {
        timestamps:true
    }
)



export const Task=mongoose.model("Task",taskSchema)