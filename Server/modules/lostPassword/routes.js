import { Router } from 'express'
import { lostPassword, verifyTokenToShow, updatePassword } from '../../modules/lostPassword/controller.js'
import verifyToken from '../../middlewares/verifyToken.js'

const route = Router()

route.post("/", lostPassword)
route.get("/:token", verifyToken, verifyTokenToShow)
route.put("/:token", verifyToken, updatePassword)

export default route