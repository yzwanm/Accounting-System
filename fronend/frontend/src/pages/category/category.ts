import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  ToastController,
  Keyboard,
  LoadingController
} from 'ionic-angular';
import { DatePickerProvider } from 'ionic2-date-picker';
import { AngularFireAuth } from 'angularfire2/auth';
import {ItemPage} from "../item/item";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HomePage} from "../home/home";

export interface Item {
  entry_time: String;
  category: String;
  note: String;
  amount: String;
  type: String;
  created_by: any;
}




/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {


  item: Item = {
    entry_time: (new Date().toLocaleDateString()).toString(),
    category: '',
    note: '',
    amount: '',
    type: '',
    created_by: ''
  };


  /**
   * swich between list category and add category
   *
   * @type {Boolean}
   * @memberof CategoryPage
   */
  isNewCategory: Boolean = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private datePickerProvider: DatePickerProvider,
              //public cate: CategoryProvider,
              //private trans: TransactionProvider,
              public modalCtrl: ModalController,
              private keyboard: Keyboard,
              private toastCtrl: ToastController,
              private afAuth: AngularFireAuth,
              public  http:HttpClient,
              public loadingCtrl: LoadingController
  ) {
    // if (navParams.get('item')) {
    //   this.item = navParams.get('item');
    // } else {
    //   console.log('type', navParams.get('type'));
    //   this.item.type = navParams.get('type');
    //   const authObserver = this.afAuth.authState.subscribe( user => {
    //     if (user) {
    //       this.item.created_by = {
    //         displayName: '',
    //         photoURL:'',
    //         email: '',
    //         uid: ''
    //       }
    //       authObserver.unsubscribe();
    //     }
    //   });
    // };
    // this.icons = ['pizza', 'beer', 'game-controller-a', 'pricetag', 'bus', 'home', 'phone-portrait', 'medical', 'globe'];
    // this.tips = ['Food', 'Drink', 'Entertainment', 'Shopping', 'Traffic', 'Home', 'Electronics', 'Medical', 'Other'];
    // this.items = [];


  //
  //   for (let i = 0; i < 9; i += 1) {
  //     this.items.push({
  //       icon: this.icons[i],
  //       tip: this.tips[i]
  //     });
  //   }
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

  /**
   * new category
   *
   * @memberof CategoryPage
   */

  showCalendar() {
    const dateSelected =
      this.datePickerProvider.showCalendar(this.modalCtrl);

    dateSelected.subscribe(date =>
      this.item.entry_time = (date.toLocaleDateString()).toString()
    );
  }


  presentNewIncome() {


    this.navCtrl.push('ItemPage')
  }
  click(category: String) {
    this.item.category = category;
    //this.item.type = "expense";
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

      // var JsonData={
      //   'entry_time': (new Date().getTime()).toString(),
      //   'category': this.item.category,
      //   'note': this.item.note,
      //   'amount': this.item.amount,
      //   'type': this.item.type,
      //   'created_by': this.item.created_by,
      //
      // }

      // let formData = new FormData();
      // if (this.item.amount) {
      //   formData.append("amount", this.item.amount);
      // }
      // if (this.item.note) {
      //   formData.append("note", this.item.note);
      // }
      // if (this.item.category) {
      //   formData.append("category", this.item.category);
      // }
      // if (this.item.entry_time) {
      //   formData.append("date", this.item.entry_time);
      // }
      // if (this.item.type){
      //   formData.append("type", this.item.type);
      // }

      // let myheaders = new HttpHeaders({});
      // this.http.post("http://localhost:3000/record", JsonData, {headers: myheaders, responseType: 'text'});
      // this.navCtrl.push(CategoryPage);


      var jsonData = {
        type: this.item.type,  //type can be cost or income
        category: this.item.category,  //category is any subcategory under type
        date:this.item.entry_time,
        money:this.item.amount,
        comment:this.item.note
      };


      let myheaders = new HttpHeaders({ });
      this.navCtrl.push('CategoryPage');
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


    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading Please Wait...'
    });

    loading.present();

    setTimeout(() => {
      this.navCtrl.push(HomePage);
      this.navCtrl.push(CategoryPage);
    }, 1000);

    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }



}
