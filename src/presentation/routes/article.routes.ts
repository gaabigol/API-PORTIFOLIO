import { Router } from 'express'
import { container } from '../../container/inversify.config'
import TYPES from '../../container/types'
import { ArticleController } from '../controllers/articleController'

const router = Router()
const controller = container.get<ArticleController>(TYPES.ArticleController)

router.get('/', controller.findAll.bind(controller))

router.get('/:slug', controller.findById.bind(controller))

export default router
