import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity()
export class Session {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	userId: string

	@Column()
	ipAddress: string

	@Column()
	device: string

	@CreateDateColumn()
	createdAt: Date

	@Column({ type: 'timestamp' })
	expiresAt: Date
}
