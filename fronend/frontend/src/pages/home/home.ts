// import { CalendarComponentOptions } from 'ion2-calendar';
// -> install 'npm i ion2-calendar'

import {Component, OnInit} from '@angular/core';
import {LoadingController,Keyboard,NavParams,IonicPage,AlertController, Events, List, NavController, ToastController} from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Certificate } from 'crypto';
import { CalendarComponentOptions } from 'ion2-calendar';
import { ModalController } from 'ionic-angular';
import { CalendarModal, CalendarModalOptions, DayConfig, CalendarResult } from "ion2-calendar";
import * as moment from 'moment';
import { Button } from 'selenium-webdriver';
import {DatePickerProvider} from 'ionic2-date-picker';
import { AngularFireAuth } from 'angularfire2/auth';
import {ItemPage} from "../item/item";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit{


  
    date1:string;
    note:string;
    expenses:string;
    category:string;

    constructor(public navCtrl: NavController,public http:HttpClient,public toastCtrl:ToastController, public modalCtrl: ModalController,private alertCtrl: AlertController) {
    }
ionViewWillEnter(){

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

  
	let  myheaders = new HttpHeaders({});
  let formData=new FormData();

        this.http.get("http://localhost:3000/home", {headers: myheaders, withCredentials: true}).subscribe((data:any[])=>{


          var col = [];

          col.push("FDATE");
          col.push("CATEGORY");
          col.push("EXPENSES");
          col.push("COMMENT");



          //1. create dynamic table
          var table = document.createElement("table");


          
          //2. create html table header row using the extracted headers above
          //The value of -1 is, used, this results in a new row being inserted at the last position.
          var tr = table.insertRow(-1); //-> table row

          /*
           // title cell
            var th = document.createElement("th"); 
            th.innerHTML = "DATE";
	          //th.setAttribute("width", "90");
            //th.setAttribute("valign","center");
            th.setAttribute("cellspacing","15");
            tr.appendChild(th); //tr에 th를 넣어라
            
            //console.log(th);

            var th1 = document.createElement("th");
            th1.innerHTML = "CATEGORY";
	         // th1.setAttribute("width","90");
            th1.setAttribute("align","center");
            //th1.setAttribute("cellspacing","2");
            tr.appendChild(th1);
            
            
            var th2 = document.createElement("th");
            th2.innerHTML = "EXPENSES"; 
            th2.setAttribute("align","center");      
            tr.appendChild(th2);
          
            var th3 = document.createElement("th");
            th3.innerHTML = "DETAILS";      
            //th3.setAttribute("width","90");
	          th3.setAttribute("align","center");     
            tr.appendChild(th3);

          //}

          */
          //3. add JSON data to the table as rows
          for(var k = 0; k < data.length; k++){
            tr = table.insertRow(-1); //second row 맨 아래부터 시작(그것을 뒤집음)
            var tabCell;
            var button1 = document.createElement('button');
            var button2 = document.createElement('button');
            button1.innerHTML = "VIEW";
            button2.innerHTML = "DELETE";
            let recordId = data[k]['RECORD_ID'];
            
            for(var h = 0; h <col.length; h++){
              tabCell = tr.insertCell(-1);  //insert new cells(<td> elements)
              //맨 오른쪽 세로부터 시작(그것을 뒤집음)
	            //var stuff = data[k][col[3]];
              if(h<3){
                tabCell.innerHTML = data[k][col[h]];
                tabCell.setAttribute("align","center");
		
              }else{
                tabCell.appendChild(button1);
                tabCell.appendChild(button2)
               // tabCell.setAttribute("align","center");
                let comment = data[k][col[3]];
                
                //button1 -> view notes
                if(comment==""){		
                  button1.addEventListener("click", function() {
                    alert("No notes");
                  }); 
                }else{
                  button1.addEventListener("click", function() {
                    alert(comment);
                  }); 
                }
                
                //button2 -> delete
                if(button2){
                  button2.addEventListener("click", function() {
                    
                    //request.post('http://localhost:3000/home', {json:json2}, function (err, res, body){
                      var xhr = new XMLHttpRequest();
                      xhr.open("POST", 'http://localhost:3000/home', true);
                    
                  }); 
                }
              }
            }
          
            
            
           
          }



        console.log(data[1]);        
        console.log(data[0]);

          //4. finally add the newly created table with json data to a container
          //document.getElementById("showData") 메서드는 요소의 id 속성이 주어진 문자열과 일치하는 요소를 나타내는 element 객체를 반환한다. 
          var divContainer = document.getElementById("showData");
          divContainer.innerHTML = ""; //혹시 모를 쓰레기 값 제거
          divContainer.appendChild(table); //container에 위에서 만든 table 삽입

        });
      }


  ngOnInit(){
        this.getdata();
  }

  /*
  //sample code for retrieving records by type category and date.  
pickDate() {
  let type = "all";  //may be 'income' 'cost' or 'all'
  let category = "all";  //any category or 'all' for all categories within a type
  let date = "all";  //date to retrieve records or 'all' to retrieve all dates
  if(date==this.date1){
  this.http.get("http://localhost:3000/viewByDate/" + type + "/" + category + "/" + date, {withCredentials: true}).subscribe((data:any[]) => {
    for (var k in data) {
        alert(k + "   " + data[k]['RECORD_ID'] + "   " + data[k]['CATEGORY'] + "   " + data[k]['MONEY']);
    } 						 
  });  
   
}
*/ 
  /*
  pickDate(){
    let formData=new FormData();
      let  myheaders = new HttpHeaders({});
      this.http.get("http://localhost:3000/home", {headers: myheaders, withCredentials: true}).subscribe((data:any[])=>{
            if(this.date1==formData.get("date")){
              //formData.get("date");
            }
    
      });
  }
*/

}



