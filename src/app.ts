import userRoutes from './presentation/routes/user.routes'
import express from 'express'
import { ErrorHandlerMiddleware } from './shared/middleware/errorHandlerMiddleware'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', userRoutes)

app.use(ErrorHandlerMiddleware.handle)

export default app
