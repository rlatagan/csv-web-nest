import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sales } from './sales.model';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel('Sales') private readonly salesModel: Model<Sales>,
  ) {}

  async insertSales(
    userName: string,
    age: number,
    height: string,
    gender: string,
    sales: string,
    lastPurchaseDate: Date,
  ) {
    const newSales = new this.salesModel({
      userName,
      age,
      height,
      gender,
      sales,
      lastPurchaseDate,
    });
    const result = await newSales.save();
    return result;
  }

  async findSalesByDate(startDate: string, endDate: string) {
    //Finds the objects that are within date range.
    const salesDB = await this.salesModel
      .find({
        lastPurchaseDate: { $gte: startDate, $lte: endDate },
      })
      .sort('rating');
    console.log(salesDB);
    const final = salesDB.map((sales) => ({
      userName: sales.userName,
      age: sales.age,
      height: sales.height,
      gender: sales.gender,
      sales: sales.sales,
      lastPurchaseDate: sales.lastPurchaseDate,
    }));
    console.log(final);
    return final;
  }
}
