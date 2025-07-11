import { Router } from 'express'
import { container } from '../../container/inversify.config'
import TYPES from '../../container/types'
import { AuthController } from '../controllers/authController'

const router = Router()
const controller = container.get<AuthController>(TYPES.AuthController)

router.post('/', controller.auth.bind(controller))

export default router
