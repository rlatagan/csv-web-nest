import * as mongoose from 'mongoose';

export const SalesSchema = new mongoose.Schema({
  userName: String,
  age: Number,
  height: String,
  gender: String,
  sales: String,
  lastPurchaseDate: String,
});

export interface Sales {
  userName: string;
  age: number;
  height: string;
  gender: string;
  sales: string;
  lastPurchaseDate: string;
}
