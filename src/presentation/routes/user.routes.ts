import { Router } from 'express'
import { UserController } from '../controllers/userController'
import { container } from '../../container/inversify.config'
import TYPES from '../../container/types'

const router = Router()
const controller = container.get<UserController>(TYPES.UserController)

router.post('/', controller.create.bind(controller))

export default router
