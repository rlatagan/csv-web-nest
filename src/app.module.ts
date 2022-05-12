import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalesModule } from './sales/sales.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    SalesModule,
    MongooseModule.forRoot(
      'mongodb+srv://rlatagan:GhYBmU0iwq99gSyR@cluster0.upvpg.mongodb.net/fashionapp-sales?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
