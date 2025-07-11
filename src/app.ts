import userRoutes from './presentation/routes/user.routes'
import authRoutes from './presentation/routes/auth.routes'
import express from 'express'
import { ErrorHandlerMiddleware } from './shared/middleware/errorHandlerMiddleware'
import { AuthMiddleware } from './shared/middleware/authMiddleware'
import { container } from './container/inversify.config'
import TYPES from './container/types'


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', userRoutes)
app.use('/auth', authRoutes)



const authMiddleware = container.get<AuthMiddleware>(TYPES.AuthMiddleware)
app.use(authMiddleware.authenticate.bind(authMiddleware))
app.use(ErrorHandlerMiddleware.handle.bind(ErrorHandlerMiddleware))

export default app
