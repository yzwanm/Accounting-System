import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryPage } from './category';
import {ItemPage} from "../item/item";

@NgModule({
  declarations: [
    CategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryPage),

  ],
  exports: [
    CategoryPage,
  ]
})
export class CategoryPageModule {}
