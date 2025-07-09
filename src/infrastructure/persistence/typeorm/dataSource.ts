import { DataSource } from 'typeorm'
import { UserEntity } from '../../entities/UserEntity'

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'db.sqlite',
    synchronize: true,
    logging: false,
    entities: [UserEntity],
})
