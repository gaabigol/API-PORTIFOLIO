import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Generated,
} from 'typeorm'

@Entity('experience')
export class ExperienceEntity {
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
    company: string

    @Column({ nullable: true })
    companyEn: string

    @Column({ nullable: true })
    location: string

    @Column({ nullable: true })
    locationEn: string

    @Column()
    period: string

    @Column({ nullable: true })
    periodEn: string

    @Column({ nullable: true })
    website: string

    @Column()
    type: string

    @Column({ nullable: true })
    description: string

    @Column({ nullable: true })
    descriptionEn: string

    @Column('json', { default: [] })
    achievements: string[]

    @Column('json', { default: [] })
    achievementsEn: string[]

    @Column('json', { default: [] })
    technologies: string[]

    @Column('json', { default: [] })
    technologiesEn: string[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
