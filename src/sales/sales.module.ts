import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SalesSchema } from './sales.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Sales', schema: SalesSchema }]),
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
