import {Component, OnInit} from '@angular/core';
import {AlertController, Events, List, NavController, ToastController} from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit{

    date:string;
    note:string;
    expenses:string;
    category:string;

    constructor(public navCtrl: NavController,public http:HttpClient,public toastCtrl:ToastController) {

  }
  presentToast(message: string) {
    let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'bottom'
    });
    toast.present();
    return toast;
  }
  getdata() {
        this.http.get("http://localhost:3000/home").subscribe(data=>{
            let jsond = data[0];
            this.expenses = JSON.stringify(jsond['EXPENSES']);
            this.date = JSON.stringify(jsond['DATE']);
            this.category = JSON.stringify(jsond['CATEGORY']);
            // this.note = JSON.stringify(jsond['NOTE']);
        });

  }

  ngOnInit(){
        this.getdata();
  }
}



