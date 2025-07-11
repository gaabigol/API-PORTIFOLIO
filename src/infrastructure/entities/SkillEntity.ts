import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Generated,
} from 'typeorm'

@Entity('skill')
export class SkillEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Generated('uuid')
    uuid: string

    @Column()
    name: string

    @Column()
    category: string

    @Column({ nullable: true })
    icon: string

    @Column({ nullable: true })
    color: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date
}
