import { Router } from "express"
import { addTask, deleteTask, toggleTask, updateDetails } from "../controllers/tasks.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"


const task_router=Router()

task_router.route('/addTask').post(verifyJwt,addTask)
task_router.route('/deleteTask/:taskId').delete(verifyJwt,deleteTask)
task_router.route('/toggleTask/:taskId').patch(verifyJwt,toggleTask)
task_router.route('/updateDetails').patch(verifyJwt,updateDetails)
export {task_router}
