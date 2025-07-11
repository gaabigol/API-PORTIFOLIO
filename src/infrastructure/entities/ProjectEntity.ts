import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Generated,
} from 'typeorm'

@Entity('project')
export class ProjectEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Generated('uuid')
    uuid: string

    @Column()
    title: string

    @Column({ nullable: true })
    titleEn: string

    @Column()
    description: string

    @Column({ nullable: true })
    descriptionEn: string

    @Column({ nullable: true })
    image: string

    @Column('json', { default: [] })
    technologies: string[]

    @Column('json', { default: [] })
    technologiesEn: string[]

    @Column()
    category: string

    @Column({ nullable: true })
    categoryEn: string

    @Column({ nullable: true })
    repository: string

    @Column({ nullable: true })
    demo: string

    @Column({ default: false })
    featured: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
