import { Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { SalesService } from './sales.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { parse } from 'papaparse';
import { readFileSync } from 'fs';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post('/record')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: function (req, file, cb) {
          cb(null, 'theFile.csv');
        },
      }),
    }),
  )
  async addSales() {
    const csvFile = readFileSync('./files/theFile.csv');
    const csvData = csvFile.toString();
    const toCamelCase = (str) => {
      return str.replace(/[_\-]([^_\-])/g, function ($0, $1) {
        return $1.toUpperCase();
      });
    };

    const parsedCsv = await parse(csvData, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => toCamelCase(header.toLowerCase()),
      complete: (results) => results.data,
    });
    console.log(parsedCsv.data);
    for (const element of parsedCsv.data) {
      await this.salesService.insertSales(
        element['userName'],
        parseInt(element['age']),
        element['height'],
        element['gender'],
        element['sales'],
        element['lastPurchaseDate'],
      );
    }
  }

  @Get('/report/:dateRange')
  async findSalesByDate(@Param('dateRange') dateRange: string) {
    console.log(dateRange);
    if (dateRange.length > 18) {
      return new Error('Date format is wrong.');
    }

    // Format YYYYMMDD to YYYY-MM-DD
    const dateFormat = (date) => {
      const year = date.substring(0, 4);
      const month = date.substring(4, 6);
      const day = date.substring(6, 8);
      // return new Date(`${year}-${month}-${day}`);
      return `${year}-${month}-${day}`;
    };

    // Turns dateRange to startDate and endDate.
    const startDate = dateFormat(dateRange.split('-')[0]);
    console.log(startDate);
    const endDate = dateFormat(dateRange.slice(9));
    console.log(endDate);

    return await this.salesService.findSalesByDate(startDate, endDate);
  }
}
