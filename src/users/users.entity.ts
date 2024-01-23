import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  name: string

  @Column()
  password: string

  @Column()
  city: string

  @Column()
  company: string

  @Column({ type: 'enum', default: '1', enum: ['0', '1'] })
  status: string

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: string

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT TIMESTAMP',
  })
  updated_at: string
}
