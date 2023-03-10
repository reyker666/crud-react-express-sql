import { Router } from 'express'
import logging from './controller.js'

const routerLogin = Router()

routerLogin.post('/', logging)

export default routerLogin