// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
//
// /*
//   Generated class for the AubergineProvider provider.
//
//   See https://angular.io/guide/dependency-injection for more info on providers
//   and Angular DI.
// */
// @Injectable()
// export class Expense {
//   id: string;
//   createdAt: Date;
//   updatedAt: Date;
//   weekRangeTag: string;
//   rev: string;}
// export interface Category {
//   id: number;
//   name: string;
//   description: string;
//   color: string;
//   rev: string;
// }
// export class AppSettings {
//   id: number = 1;
//   rev: string = null;
//   weeklyBudget: number = 2000;
//   dailyReminder: boolean = false;
//   automaticBackup: boolean = false;
//   category: Category = {
//     id: 7,
//     name: 'Food & Dining',
//     rev: null,
//     color: '#c6bb1b',
//     description: `
//       Groceries
//       Coffee shops
//       Fast Food
//       Restaurants
//       Alchohol & Bars
//     `
//   }
// }
// export class AubergineProvider {
//   private _db;
//   settings: AppSettings;
//   expenses: Expense[] = [];
//   currencySymbols: any[];
//   categories: Category[];
//   constructor(public http: HttpClient) {
//     console.log('Hello AubergineProvider Provider');
//   }
// }
//
