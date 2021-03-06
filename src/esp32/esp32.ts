import { IsDate, IsDefined, IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'data_esp32' })
export class Esp32Entity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsDefined({ always: true })
  @IsNumber()
  user_id: number;

  @Column()
  @IsDefined({ always: true })
  data_esp32: number;

  @Column()
  @IsDefined({ always: true })
  @IsDate()
  date_esp32: Date;
}
