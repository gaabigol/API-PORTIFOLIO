import userRoutes from './presentation/routes/user.routes'
import authRoutes from './presentation/routes/auth.routes'
import articleRoutes from './presentation/routes/article.routes'
import adminRoutes from './presentation/routes/admin.routes'
import express from 'express'
import { ErrorHandlerMiddleware } from './shared/middleware/errorHandlerMiddleware'
import { AuthMiddleware } from './shared/middleware/authMiddleware'
import { container } from './container/inversify.config'
import TYPES from './container/types'
import { CorsMiddleware } from './shared/middleware/corsMiddleware'

const app = express()

const customCorsMiddleware = CorsMiddleware.create()
app.use(customCorsMiddleware.handle.bind(customCorsMiddleware))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/auth', authRoutes)

const authMiddleware = container.get<AuthMiddleware>(TYPES.AuthMiddleware)
app.use(authMiddleware.authenticate.bind(authMiddleware))


app.use('/api/v1/articles', articleRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/admin', adminRoutes)

app.use(ErrorHandlerMiddleware.handle.bind(ErrorHandlerMiddleware))

export default app
