import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './orders.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async createOrder(itemName: string, address: string, status: string, photoUrl?: string): Promise<Order> {
    const order = this.orderRepository.create({ itemName, address, status, photoUrl });
    return this.orderRepository.save(order);
  }
}
