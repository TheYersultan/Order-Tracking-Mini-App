import { Controller, Get, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { OrdersService } from './orders.service';
import { Order } from './orders.entity';
import * as path from 'path';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.ordersService.getAllOrders();
  }

  @Post()
  @UseInterceptors(FileInterceptor('photo', {
    storage: diskStorage({
      destination: './uploads',  
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileExt = path.extname(file.originalname);
        cb(null, `photo-${uniqueSuffix}${fileExt}`); 
      },
    }),
  }))
  async createOrder(
    @Body() createOrderDto: { itemName: string; address: string; status: string },
    @UploadedFile() photo?: Express.Multer.File,
  ): Promise<Order> {
    const photoUrl: string | undefined = photo ? `/uploads/${photo.filename}` : undefined; 
    return this.ordersService.createOrder(createOrderDto.itemName, createOrderDto.address, createOrderDto.status, photoUrl);
  }
  
}
