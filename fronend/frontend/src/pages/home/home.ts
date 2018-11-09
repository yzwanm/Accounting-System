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
    erro:string;
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
        let myheader=new HttpHeaders();
        this.http.get("http://localhost:3000/home",{headers:myheader,withCredentials:true}).subscribe(data=>{
            if(JSON.stringify(data)== "[]"){
                this.erro = "No data!";
            }
            else {
                // let jsond = JSON.parse(JSON.stringify(data[0]));
                this.expenses = (data[0])['EXPENSES'];
                this.date = (data[0])['DATE'];
                this.category = (data[0])['CATEGORY'];
                // this.note = (data[0])['NOTE'];
            }
        });

  }

  ngOnInit(){
        this.getdata();
  }
}



