import { Router } from "express"
import { getUserDetails, getUserTasks, loginUser, logoutUser, refreshAccessToken, registerUser, updateUsername } from "../controllers/user.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"

const user_router=Router()

user_router.route('/register').post(registerUser)
user_router.route('/login').post(loginUser)
user_router.route('/logout').post(verifyJwt,logoutUser)
user_router.route('/change-username').patch(verifyJwt,updateUsername)
user_router.route('/refresh-token').post(refreshAccessToken)
user_router.route('/get-user-details').get(verifyJwt,getUserDetails)
user_router.route('/get-user-task').get(verifyJwt,getUserTasks)
export { user_router }