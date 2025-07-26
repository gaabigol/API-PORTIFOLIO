import { DataSource } from 'typeorm'
import { UserEntity } from '../../entities/UserEntity'
import { ArticleEntity } from '../../entities/ArticleEntity'
import { ExperienceEntity } from '../../entities/ExperienceEntity'
import { PlaygroundEndpointEntity } from '../../entities/PlaygroundEndpointEntity'
import { PlaygroundProjectEntity } from '../../entities/PlaygroundEntity'
import { ProjectEntity } from '../../entities/ProjectEntity'
import { SkillEntity } from '../../entities/SkillEntity'

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'db.sqlite',
    synchronize: true,
    logging: false,
    entities: [
        UserEntity,
        ArticleEntity,
        // ExperienceEntity,
        // PlaygroundEndpointEntity,
        // PlaygroundProjectEntity,
        // ProjectEntity,
        // SkillEntity
    ],
})
