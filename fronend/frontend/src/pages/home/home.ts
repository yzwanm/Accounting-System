import { Component } from '@angular/core';
import {AlertController, Events, List, NavController, ToastController} from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    expenses="1222223";

    constructor(public navCtrl: NavController,public http:HttpClient,public toastCtrl:ToastController,public alertCtrl:AlertController) {
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
        return this.http.get("http://localhost:3000/home");
  }
  showdata(){
        this.getdata().subscribe((data=>this.expenses=JSON.stringify(data)));
        let alert = this.alertCtrl.create({
            title:'Username',
            message:this.expenses,
            buttons:[
                {
                    text:'Ok',
                }
            ]
        });
        alert.present();

  }


}

