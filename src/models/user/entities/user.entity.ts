import { Entity, Column, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CustomBaseEntity } from '../../base/base.entity';

// import { Task } from 'src/models/tasks/task.entity';

@Entity()
@Unique(['username', 'email'])
export class User extends CustomBaseEntity {
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  email: string;

  @Column({ default: false })
  email_confirmed: boolean;

  // @Column()
  // preferences: string;

  // @Column({default: ''})
  // image: string;

  // @Column()
  // last_seen_at: Date;

  // Relationships
  // @OneToMany(type => Task, task => task.user, {eager: true})
  // tasks: Task[]

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
