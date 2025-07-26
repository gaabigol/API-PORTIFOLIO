import { Router } from 'express'
import { container } from '../../container/inversify.config'
import TYPES from '../../container/types'
import { ArticleController } from '../controllers/articleController'

const router = Router()
const articleController = container.get<ArticleController>(
    TYPES.ArticleController
)

router.post('/articles', articleController.create.bind(articleController))

export default router
