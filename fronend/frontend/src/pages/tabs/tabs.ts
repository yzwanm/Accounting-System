import { Component } from '@angular/core';

import { ChartPage } from '../chart/chart';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ItemPage } from '../item/item';
import {CategoryPage} from "../category/category";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {NavController, LoadingController} from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ChartPage;
  tab3Root = CategoryPage;
  tab4Root = ContactPage;

  constructor(public navlCtrl: NavController) {
  }


}
