import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  itemName: string;

  @Column()
  address: string;

  @Column()
  status: string;

  @Column({ nullable: true })  
  photoUrl: string;
}
