import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { PublicationEntity } from '@publication/entity/publication.entity';
import * as argon2 from 'argon2';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  public email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  public password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @Column({
    type: 'boolean',
    nullable: true,
    default: false,
  })
  public hasPaid: boolean;

  @Column({
    type: 'boolean',
    nullable: true,
    default: false,
  })
  public isEmailVerified: boolean;

  @OneToMany(() => PublicationEntity, (publication) => publication.owner)
  public publications: PublicationEntity[];

  @Column({
    type: 'date',
    nullable: true,
  })
  public lastUpdate: Date;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public refreshToken: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public tokenVerication: string;

  @Column({
    type: 'integer',
    nullable: true,
  })
  public nbPublication: number;
}