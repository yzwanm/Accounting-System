import { Component } from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  expenditure: string;

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
    let myheaders = new HttpHeaders({});
    this.http.get("http://localhost:3000/home", {headers: myheaders, responseType: 'text'}).
    subscribe((data)=>{
      this.expenditure = data['EXPENDITURE'];
    })
  }
  get = new this.getdata();
}

