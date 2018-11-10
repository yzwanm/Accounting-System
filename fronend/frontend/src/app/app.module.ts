import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { LoginPage } from '../pages/login/login';
import { ChartPage } from '../pages/chart/chart';
import { ContactPage } from '../pages/contact/contact';
//import { ItemPage } from '../pages/item/item';
//import {ItemPageModule} from "../pages/item/item.module";
import {CategoryPageModule} from "../pages/category/category.module";
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SignupPage } from '../pages/signup/signup';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpProvider } from '../providers/http/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import { DatePickerModule } from 'ionic2-date-picker';

const firebaseConfig = {
  firebase: {
    apiKey: "AIzaSyCile1Arb1ipCD0WM8cDkmYL-dhgR6XBK8",
    authDomain: "gps-tracker-3c2a1.firebaseapp.com",
    databaseURL: "https://gps-tracker-3c2a1.firebaseio.com",
    projectId: "gps-tracker-3c2a1",
    storageBucket: "gps-tracker-3c2a1.appspot.com",
    messagingSenderId: "893074004983"
  }
};

@NgModule({
  declarations: [
    MyApp,
    ChartPage,
    //ItemPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp),
    DatePickerModule,
    //ItemPageModule,
    CategoryPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChartPage,
    //ItemPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider,

  ]
})
export class AppModule {}
