import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChartPage } from './chart';
import { CalendarModule } from "ion2-calendar";


@NgModule({
  declarations: [
    ChartPage,
  ],
  imports: [
    IonicPageModule.forChild(ChartPage),
    CalendarModule,
  ],
})
export class ChartPageModule {}
