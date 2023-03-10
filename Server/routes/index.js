import { Router } from 'express'
import routerLogin from '../modules/login/routes.js'
import routerLostResetPassword from '../modules/lostPassword/routes.js'
import routerRegister from '../modules/register/routes.js'

const route = Router()

route.use("/login", routerLogin)
route.use("/lostResetPassword", routerLostResetPassword)
route.use("/register", routerRegister)

export default route