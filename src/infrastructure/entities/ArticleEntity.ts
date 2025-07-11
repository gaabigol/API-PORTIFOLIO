import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Generated,
} from 'typeorm'

@Entity('article')
export class ArticleEntity {
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
    excerpt: string

    @Column({ nullable: true })
    excerptEn: string

    @Column()
    content: string

    @Column({ nullable: true })
    contentEn: string

    @Column('json', { default: [] })
    tags: string[]

    @Column('json', { default: [] })
    tagsEn: string[]

    @Column()
    category: string

    @Column({ nullable: true })
    categoryEn: string

    @Column({ nullable: true })
    readTime: string

    @Column({ default: true })
    published: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
