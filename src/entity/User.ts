import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { MinLength, IsEmail } from "class-validator";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Column()
  @MinLength(10, { message: "10글자 이상 입력하세요" })
  password!: string;

  @Column({ unique: true })
  token!: string;
}
