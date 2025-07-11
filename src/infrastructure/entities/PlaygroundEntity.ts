import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    Generated,
} from 'typeorm'
import { PlaygroundEndpointEntity } from './PlaygroundEndpointEntity'

@Entity('playgroundProject')
export class PlaygroundProjectEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    @Generated('uuid')
    uuid: string

    @Column()
    nameEn: string

    @Column()
    description: string

    @Column()
    descriptionEn: string

    @Column()
    baseUrl: string

    @Column({ default: 'v1.0' })
    version: string

    @Column({ default: 'bg-blue-500' })
    color: string

    @Column({ default: 'Zap' })
    icon: string

    @Column({ default: true })
    active: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => PlaygroundEndpointEntity, (endpoint) => endpoint.project, {
        cascade: true,
    })
    endpoints: PlaygroundEndpointEntity[]
}
