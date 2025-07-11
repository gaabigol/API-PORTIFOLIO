import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    Generated,
} from 'typeorm'
import { PlaygroundProjectEntity } from './PlaygroundEntity'

@Entity('playgroundEndpoints')
export class PlaygroundEndpointEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    projectId: number

    @Column()
    @Generated('uuid')
    uuid: string

    @Column()
    name: string

    @Column()
    nameEn: string

    @Column()
    description: string

    @Column()
    descriptionEn: string

    @Column()
    path: string

    @Column({ default: 'POST' })
    method: string

    @Column({ nullable: true })
    requestExample: string

    @Column({ nullable: true })
    responseExample: string

    @Column('json', { default: [] })
    parameters: any[]

    @Column({ default: true })
    active: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => PlaygroundProjectEntity, (project) => project.endpoints, {
        onDelete: 'CASCADE',
    })
    project: PlaygroundProjectEntity
}
