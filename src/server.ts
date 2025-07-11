import 'reflect-metadata'
import app from './app'
import { AppDataSource } from './infrastructure/persistence/typeorm/dataSource'
import dotenv from 'dotenv'


dotenv.config()
AppDataSource.initialize()
    .then(() => {
        console.log('Database connected')
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000')
        })
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err)
    })
