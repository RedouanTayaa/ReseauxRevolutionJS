import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from '@user/entity/user.entity';

@Entity('publications')
export class PublicationEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @ManyToOne(() => UserEntity, (owner: UserEntity) => owner.publications)
  public owner: UserEntity;

  @Column({
    type: 'text',
    nullable: true,
  })
  public topic: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  public writingTechnique: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  public openAiResponse: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  public createdAt: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  public updatedAt: Date;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public platform: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public mode: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  public targetAudience: string;

  @Column({
    type: 'integer',
    nullable: true,
  })
  public tokenPrompt: number;

  @Column({
    type: 'integer',
    nullable: true,
  })
  public tokenCompletion: number;
}