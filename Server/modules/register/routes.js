import { Router } from 'express';
import routeInsert from '../register/controller.js'

const route = Router()

route.post('/', routeInsert)

export default route