import {Component, OnInit} from '@angular/core';
import {AlertController, Events, List, NavController, ToastController} from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Certificate } from 'crypto';
import { CalendarComponentOptions } from 'ion2-calendar';
import { ModalController } from 'ionic-angular';
import { CalendarModal, CalendarModalOptions, DayConfig, CalendarResult } from "ion2-calendar";
import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit{

    date:string;
    note:string;
    expenses:string;
    category:string;

    constructor(public navCtrl: NavController,public http:HttpClient,public toastCtrl:ToastController, public modalCtrl: ModalController) {
    }

    /* choose date -> Sprint 3
  
    dateRange: {
      from: Date;
      to: Date
    } = {
      from: new Date(),
      to: new Date(Date.now() + 24 * 60 * 60 * 1000 * 5)
    };

    openCalendar() {
      const options: CalendarModalOptions = {
      pickMode: 'range',
      title: 'Calendar',
      defaultDateRange: this.dateRange,
      canBackwardsSelected: true,
    
      };

      let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
      });

    myCalendar.present();

    myCalendar.onDidDismiss((date, type) => {
      if (type === 'done') {
        this.dateRange = Object.assign({}, {
          from: date.from.dateObj,
          to: date.to.dateObj,
        })
      }
      console.log(date);
      console.log('type', type);
    });
  }
  */


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
            
        this.http.get("http://localhost:3000/home").subscribe((data:any[])=>{
         
          //extract value for html header
          //('user_name', 'expenses', 'category', 'date')
          var col = [];
          
          for (var i=0; i<1; i ++){
            for(var key in data[i]){
              if (col.indexOf(key)== -1){
                col.push(key);
              }
            }
          }
          
          //1. create dynamic table
          var table = document.createElement("table");

          //2. create html table header row using the extracted headers above
          var tr = table.insertRow(-1); //-> table row

          for(var j=1;j<col.length; j++) //-> table header
          {
            var th = document.createElement("th");
            th.innerHTML = col[j];
            tr.appendChild(th);
          }

          //3. add JSON data to the table as rows
          for(var k = 0; k < data.length; k++){
            tr = table.insertRow(-1);

            for(var h = 1; h <col.length; h++){
              var tabCell = tr.insertCell(-1);
              tabCell.innerHTML = data[k][col[h]];
            }
          }

          //4. finally add the newly created table with json data to a container
          var divContainer = document.getElementById("showData");
          divContainer.innerHTML = "";
          divContainer.appendChild(table);

        });
      }

  ngOnInit(){
        this.getdata();
  }
}

