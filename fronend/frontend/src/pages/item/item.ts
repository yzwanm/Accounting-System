import { Component } from '@angular/core';
import {IonicPage, Keyboard, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {DatePickerProvider} from "ionic2-date-picker";
import {AngularFireAuth} from "angularfire2/auth";
import {HttpClient, HttpHeaders} from "@angular/common/http";

export interface Item {
  entry_time: String;
  category: String;
  note: String;
  amount: String;
  type: String;
  created_by: any;
}

/**
 * Generated class for the ItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {

  item: Item = {
    entry_time: (new Date().toLocaleDateString()).toString(),
    category: '',
    note: '',
    amount: '',
    type: '',
    created_by:'',
  };
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private datePickerProvider: DatePickerProvider,
              //public cate: CategoryProvider,
              //private trans: TransactionProvider,
              public modalCtrl: ModalController,
              private keyboard: Keyboard,
              private toastCtrl: ToastController,
              private afAuth: AngularFireAuth,
              public  http:HttpClient) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ItemPage');
  // }
  // chooseCategory() {
  //     this.navCtrl.push('CategoryPage', {item : this.item})
  //
  // }
  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
    return toast;
  }
  click(category: String) {
    this.item.category = category;
    //this.item.type = "expense";
  }
  showCalendar() {
    const dateSelected =
      this.datePickerProvider.showCalendar(this.modalCtrl);

    dateSelected.subscribe(date =>
      this.item.entry_time = (date.toLocaleDateString()).toString()
    );
  }
  handleEnter() {
    this.keyboard.close();
  }

  Save(type:String) {
    if (this.item.amount.length <= 0) {
      this.presentToast("Please input your expense");
    }
    else if (this.item.category.length <= 0) {
      this.presentToast("Please choose one category");
    }
    else {
      this.item.type = type;

      var jsonData = {
        'type': this.item.type,  //type can be cost or income
        'category': this.item.category,  //category is any subcategory under type
        'date':this.item.entry_time,
        'money':this.item.amount,
        'comment':this.item.note
      };

      let myheaders = new HttpHeaders({ });
      this.navCtrl.push('ItemPage');
      this.http.post("http://localhost:3000/addRecord", jsonData, {headers: myheaders, withCredentials: true , responseType:'text'})
        .subscribe((data) => {
          if (data == "SUCCESS") {
            console.log("data was added");
            //stuff


          } else if (data == "NOT_LOGGED_IN") {
            console.log("user not logged in");
            //stuff


          } else if (data == "NO_CATEGORY") {
            console.log("no category was entered");
            //stuff


          } else if (data == "NO_TYPE") {
            console.log("no type (income or cost) was entered");
            //stuff

          } else if (data == "NO_DATE") {
            console.log("no date present");
            //stuff

          } else {
            console.log(data);
            //stuff

          }
        }, error => {
          console.log("Error connecting to backend server");
        });

    }
    console.log(jsonData)
  }
  presentNewExpense() {

    // let profileModal = this.modalCtrl.create('ItemPage', { type: type });
    // profileModal.present();
    this.navCtrl.push('CategoryPage')

  }
  // presentNewExpense() {
  //
  //   // let profileModal = this.modalCtrl.create('ItemPage', { type: type });
  //   // profileModal.present();
  //   this.navCtrl.push('ItemPage')
  //
  // }
}
