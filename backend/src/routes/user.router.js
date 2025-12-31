import { Router } from "express"
import { loginUser, registerUser } from "../controllers/user.controller.js"


const user_router=Router()

user_router.route('/register').post(registerUser)
user_router.route('/login').post(loginUser)
export { user_router }