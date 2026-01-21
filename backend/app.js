import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app=express()
app.use(cors({
    origin:process.env.CORS_ORIGIN
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


import { user_router } from "./src/routes/user.router.js"
import { task_router } from "./src/routes/task.router.js"


//-----------------------------// 
app.use('/api/users',user_router)
app.use('/api/tasks',task_router)

export {app}