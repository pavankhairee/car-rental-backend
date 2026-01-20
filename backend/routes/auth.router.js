import { Router } from "express";
const AuthRouter = Router()
import { AuthMiddlware } from "../middleware/auth.middleware.js"
import { register, login, getMe } from "../controller/auth.controller.js"

AuthRouter.post('/signup', register)

AuthRouter.post('/signin', login)

AuthRouter.get('/me', AuthMiddlware, getMe)


export { AuthRouter }