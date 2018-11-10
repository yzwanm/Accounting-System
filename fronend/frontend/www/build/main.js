webpackJsonp([4],{

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_chart_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChartPage = (function () {
    function ChartPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.apps = 'week';
    }
    ChartPage.prototype.ionViewDidLoad = function () {
        this.lineChart = new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: ["10/1", "10/2", "10/3", "10/4", "10/5", "10/6", "10/7"],
                datasets: [
                    {
                        label: "Weekly Expenditure",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40],
                        spanGaps: false,
                    }
                ]
            }
        });
        this.doughnutChart = new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](this.doughnutCanvas.nativeElement, {
            type: 'doughnut',
            data: {
                labels: ["food", "shopping", "book", "movie"],
                datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",
                            "#FF6384",
                        ]
                    }]
            }
        });
        console.log('ionViewDidLoad ChartPage');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Slides"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Slides"])
    ], ChartPage.prototype, "slides", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('lineCanvas'),
        __metadata("design:type", Object)
    ], ChartPage.prototype, "lineCanvas", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('doughnutCanvas'),
        __metadata("design:type", Object)
    ], ChartPage.prototype, "doughnutCanvas", void 0);
    ChartPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-chart',template:/*ion-inline-start:"/Users/nablec/WebstormProjects/AccountingAPP/fronend/frontend/src/pages/chart/chart.html"*/'<!--\n  Generated template for the ChartPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Chart\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-toolbar no-border-top *ngIf="demo != \'Title\'">\n    <ion-segment [(ngModel)]="apps">\n      <ion-segment-button value="week">\n        Week\n      </ion-segment-button>\n      <ion-segment-button value="month">\n        Month\n      </ion-segment-button>\n      <ion-segment-button value="year">\n        Year\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n\n  <ion-item>\n    <ion-label>Total</ion-label>\n    <ion-input [(ngModel)]="total" type="text" class=""></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label>Average</ion-label>\n    <ion-input [(ngModel)]="average" type="text" ></ion-input>\n  </ion-item>\n\n  <ion-card>\n    <ion-card-header>\n      Weekly Chart\n    </ion-card-header>\n    <ion-card-content>\n      <canvas #lineCanvas></canvas>\n    </ion-card-content>\n  </ion-card>\n\n  <ion-card>\n    <ion-card-header>\n      Categoires\n    </ion-card-header>\n    <ion-card-content>\n      <canvas #doughnutCanvas></canvas>\n    </ion-card-content>\n  </ion-card>\n\n</ion-content>\n\n\n\n\n'/*ion-inline-end:"/Users/nablec/WebstormProjects/AccountingAPP/fronend/frontend/src/pages/chart/chart.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], ChartPage);
    return ChartPage;
}());

//# sourceMappingURL=chart.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { TabsPage } from "../tabs/tabs";


/*  picture uploading
import { LoadingController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
*/
var SignupPage = (function () {
    function SignupPage(navCtrl, navParams, toastCtrl, alerCtrl, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.alerCtrl = alerCtrl;
        this.http = http;
    }
    /* picture uploading
      getImage() {
        const options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.FILE_URI,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        }
      
        this.camera.getPicture(options).then((imageData) => {
          this.imageURI = imageData;
        }, (err) => {
          console.log(err);
          this.presentToast(err);
        });
      }
    
      uploadFile() {
        let loader = this.loadingCtrl.create({
          content: "Uploading..."
        });
        loader.present();
        const fileTransfer: FileTransferObject = this.transfer.create();
      
        let options: FileUploadOptions = {
          fileKey: 'ionicfile',
          fileName: 'ionicfile',
          chunkedMode: false,
          mimeType: "image/jpeg",
          headers: {}
        }
      
        fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
          .then((data) => {
          console.log(data+" Uploaded Successfully");
          this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
          loader.dismiss();
          this.presentToast("Image uploaded successfully");
        }, (err) => {
          console.log(err);
          loader.dismiss();
          this.presentToast(err);
        });
      }
     */
    SignupPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
        return toast;
    };
    SignupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupPage');
    };
    SignupPage.prototype.signUp = function () {
        var _this = this;
        console.log(this.birthdate);
        if (this.username == null) {
            this.presentToast("Please input a User Name");
        }
        else if (this.username.length > 20) {
            this.presentToast("Length of username should be less than 20");
        }
        else if (this.password == null) {
            this.presentToast("Length of password should be between 6 and 20");
        }
        else if (this.password != this.cnfrpwd) {
            this.presentToast("Two passwords should be equivalent");
        }
        else if (this.password.length < 6 || this.password.length > 20) {
            this.presentToast("Length of password should be between 6 and 20");
        }
        else if (this.firstname == null) {
            this.presentToast("Please input the Firstname");
        }
        else if (this.birthdate && !(this.birthdate.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/))) {
            this.presentToast("Please put date in the form YYYY-MM-DD");
        }
        else if (this.income && !(this.income.match(/^[0-9]*\.?[0-9]+$/))) {
            this.presentToast("Income field requires a number");
        }
        else {
            //loading form data
            var formData = new FormData();
            if (this.username) {
                formData.append("user", this.username);
            }
            if (this.password) {
                formData.append("password", this.password);
            }
            if (this.firstname) {
                formData.append("first_name", this.firstname);
            }
            if (this.lastname) {
                formData.append("last_name", this.lastname);
            }
            if (this.birthdate) {
                formData.append("dob", this.birthdate);
            }
            if (this.gender) {
                formData.append("sex", this.gender); //was changed to gender but still called sex in the database
            }
            if (this.income) {
                formData.append("income", this.income);
            }
            //sending data to backend
            var myheaders = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]({});
            this.http.post("http://localhost:3000/createAccount", formData, { headers: myheaders, responseType: 'text' })
                .subscribe(function (data) {
                console.log(data);
                if (data == "SUCCESS") {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                }
                else if (data == "ERR_USER_EXISTS") {
                    _this.presentToast("UserName already exists");
                }
                else if (data == "ERR_NO_USER") {
                    _this.presentToast("Please input a UserName");
                }
                else if (data == "ERR_NO_PASS") {
                    _this.presentToast("Please input a password");
                }
                else if (data == "ERR_NO_FNAME") {
                    _this.presentToast("Please input a First Name");
                }
                else {
                    _this.presentToast(data);
                }
            }, function (error) {
                _this.presentToast("Error connecting to backend server.");
                console.log(error);
            });
        }
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-signup',template:/*ion-inline-start:"/Users/nablec/WebstormProjects/AccountingAPP/fronend/frontend/src/pages/signup/signup.html"*/'<!--\n  Generated template for the SignupPage page.\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="whatsapp">\n    <ion-title>signup</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item>\n      <div align="center">\n        <img src="./assets/imgs/logo 2.png" srcset="./assets/imgs/logo@2x.png 2x, ./assets/imgs/logo@3x.png 3x" class="logo">\n      </div>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Username</ion-label>\n      <ion-input [(ngModel)]="username" type="text" placeholder="Username" class=""></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Password</ion-label>\n      <ion-input [(ngModel)]="password" type="password" placeholder="Password"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Confirm Password</ion-label>\n      <ion-input [(ngModel)]="cnfrpwd" type="password" placeholder="Confirm Password"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>First Name</ion-label>\n      <ion-input [(ngModel)]="firstname" type="text" placeholder="First Name"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Last Name</ion-label>\n      <ion-input [(ngModel)]="lastname" type="text" placeholder="Last Name"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Birth Date</ion-label>\n      <ion-datetime [(ngModel)]="birthdate" required name="birthdate" displayFormat="DD MMM YYYY" pickerFormat="DD MMM YYYY" [ngModelOptions]="{standalone:true}"></ion-datetime>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Gender</ion-label>\n      <ion-select [(ngModel)]="gender">\n        <ion-option value="female">Female</ion-option>\n        <ion-option value="male">Male</ion-option>\n      </ion-select>\n    </ion-item>  \n    \n    <button ion-button block color="default" outline (click)="signUp()">Signup</button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/nablec/WebstormProjects/AccountingAPP/fronend/frontend/src/pages/signup/signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 176:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 176;

/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/category/category.module": [
		348
	],
	"../pages/chart/chart.module": [
		886,
		3
	],
	"../pages/item/item.module": [
		889,
		0
	],
	"../pages/login/login.module": [
		887,
		2
	],
	"../pages/signup/signup.module": [
		888,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 222;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryPageModule", function() { return CategoryPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__category__ = __webpack_require__(349);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CategoryPageModule = (function () {
    function CategoryPageModule() {
    }
    CategoryPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__category__["a" /* CategoryPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__category__["a" /* CategoryPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__category__["a" /* CategoryPage */],
            ]
        })
    ], CategoryPageModule);
    return CategoryPageModule;
}());

//# sourceMappingURL=category.module.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic2_date_picker__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic2_date_picker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ionic2_date_picker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(449);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CategoryPage = (function () {
    function CategoryPage(navCtrl, navParams, datePickerProvider, 
        //public cate: CategoryProvider,
        //private trans: TransactionProvider,
        modalCtrl, keyboard, toastCtrl, afAuth, http, loadingCtrl) {
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
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.datePickerProvider = datePickerProvider;
        this.modalCtrl = modalCtrl;
        this.keyboard = keyboard;
        this.toastCtrl = toastCtrl;
        this.afAuth = afAuth;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.item = {
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
        this.isNewCategory = false;
        //
        //   for (let i = 0; i < 9; i += 1) {
        //     this.items.push({
        //       icon: this.icons[i],
        //       tip: this.tips[i]
        //     });
        //   }
    }
    CategoryPage_1 = CategoryPage;
    CategoryPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
        return toast;
    };
    /**
     * new category
     *
     * @memberof CategoryPage
     */
    CategoryPage.prototype.showCalendar = function () {
        var _this = this;
        var dateSelected = this.datePickerProvider.showCalendar(this.modalCtrl);
        dateSelected.subscribe(function (date) {
            return _this.item.entry_time = (date.toLocaleDateString()).toString();
        });
    };
    CategoryPage.prototype.presentNewIncome = function () {
        this.navCtrl.push('ItemPage');
    };
    CategoryPage.prototype.click = function (category) {
        this.item.category = category;
        //this.item.type = "expense";
    };
    CategoryPage.prototype.handleEnter = function () {
        this.keyboard.close();
    };
    CategoryPage.prototype.Save = function (type) {
        var _this = this;
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
                type: this.item.type,
                category: this.item.category,
                date: this.item.entry_time,
                money: this.item.amount,
                comment: this.item.note
            };
            var myheaders = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["c" /* HttpHeaders */]({});
            this.navCtrl.push('CategoryPage');
            this.http.post("http://localhost:3000/addRecord", jsonData, { headers: myheaders, withCredentials: true, responseType: 'text' })
                .subscribe(function (data) {
                if (data == "SUCCESS") {
                    console.log("data was added");
                    //stuff
                }
                else if (data == "NOT_LOGGED_IN") {
                    console.log("user not logged in");
                    //stuff
                }
                else if (data == "NO_CATEGORY") {
                    console.log("no category was entered");
                    //stuff
                }
                else if (data == "NO_TYPE") {
                    console.log("no type (income or cost) was entered");
                    //stuff
                }
                else if (data == "NO_DATE") {
                    console.log("no date present");
                    //stuff
                }
                else {
                    console.log(data);
                    //stuff
                }
            }, function (error) {
                console.log("Error connecting to backend server");
            });
        }
        var loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: 'Loading Please Wait...'
        });
        loading.present();
        setTimeout(function () {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
            _this.navCtrl.push(CategoryPage_1);
        }, 1000);
        setTimeout(function () {
            loading.dismiss();
        }, 1000);
    };
    CategoryPage = CategoryPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-category',template:/*ion-inline-start:"/Users/nablec/WebstormProjects/AccountingAPP/fronend/frontend/src/pages/category/category.html"*/'<!--\n  Generated template for the CategoryPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar >\n    <ion-title>\n      <!--<span *ngIf="item.key && item.type===\'expense\'">Edit Expense</span>-->\n      <!--<span *ngIf="!item.key && item.type===\'expense\'">New Expense</span>-->\n      <!--<span *ngIf="item.key && item.type===\'income\'">Edit Income</span>-->\n      <!--<span *ngIf="!item.key && item.type===\'income\'">New Income</span>-->\n      Add a New Expense\n      <!--<ion-buttons side="left">-->\n        <!--<button (click)="Back()">-->\n          <!--<ion-icon name="arrow-back"></ion-icon>-->\n\n        <!--</button>-->\n      <!--</ion-buttons>-->\n    </ion-title>\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-toolbar>\n    <ion-grid>\n      <ion-row text-center>\n        <ion-col>\n          <button ion-button outline color="danger" class="add-button" >Expense\n            <!--<ion-icon  name="ios-remove-outline" color="danger"></ion-icon>-->\n          </button>\n        </ion-col>\n        <ion-col>\n          <button ion-button outline color="secondary" class="add-button" (click)="presentNewIncome()">Income\n            <!--<ion-icon  name="ios-add-outline" color="secondary"></ion-icon>-->\n          </button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n  <p text-center (click)="showCalendar()"><ion-icon name="ios-calendar-outline"></ion-icon> {{ item.entry_time | date: \'EEEE, dd MM yyyy\' }}</p>\n\n  <ion-grid>\n    <ion-row >\n      <ion-col  no-padding no-margin>\n        <ion-item no-padding no-margin>\n          <ion-label><ion-icon name="ios-create-outline"></ion-icon></ion-label>\n          <ion-input [(ngModel)]="item.amount" placeholder="$0.00" ng-pattern="/^[0-9]{1,7}(\.[0-9]+)?$/" clearInput (keyup.enter)="handleEnter()"></ion-input>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col  no-padding no-margin>\n        <ion-item no-padding no-margin>\n          <ion-label><ion-icon name="ios-create-outline"></ion-icon></ion-label>\n          <ion-input [(ngModel)]="item.note" placeholder="Add note" clearInput (keyup.enter)="handleEnter()"></ion-input>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col  no-padding no-margin>\n        <ion-item no-padding no-margin>\n          <ion-label><ion-icon name="ios-create-outline"></ion-icon></ion-label>\n          <ion-input [(ngModel)]="item.category" placeholder="category" clearInput (keyup.enter)="this.item.category" readonly></ion-input>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <!--<ion-grid>\n\n    <div class="row row-wrap" >\n      <div class="col col-25 iconBox" *ngFor="let item of items; let i = index">\n        <button (click)="onChoiceCategory(category)">\n          <div class="imgBox">\n            <ion-icon [name]="item.icon"  class="iconImg"></ion-icon>\n          </div>\n          <a class="iconTip">{{item.tip}}</a>\n\n        </button>\n\n      </div>\n    </div>\n  </ion-grid>\n    -->\n  <ion-grid no-margin  no-padding>\n    <ion-row no-margin no-padding >\n      <ion-col text-center no-padding no-margin >\n        <div class="col col-25 iconBox">\n          <button (click)="click(\'food\')" >\n            <div class="imgBox">\n              <ion-icon name="pizza"  class="iconImg"></ion-icon>\n            </div>\n            <a class="iconTip">Food</a>\n          </button>\n        </div>\n\n      </ion-col>\n      <ion-col text-center no-padding no-margin >\n        <div class="col col-25 iconBox">\n          <button (click)="click(\'drink\')">\n            <div class="imgBox">\n              <ion-icon name="beer"  class="iconImg"></ion-icon>\n            </div>\n            <a class="iconTip">Drink</a>\n          </button>\n        </div>\n\n\n      </ion-col>\n      <ion-col text-center no-padding no-margin >\n        <div class="col col-25 iconBox">\n          <button (click)="click(\'entertainment\')">\n            <div class="imgBox">\n              <ion-icon name="game-controller-a"  class="iconImg"></ion-icon>\n            </div>\n            <a class="iconTip">Entertainment</a>\n          </button>\n        </div>\n\n\n      </ion-col>\n    </ion-row>\n    <ion-row no-margin no-padding>\n      <ion-col text-center no-padding no-margin >\n        <div class="col col-25 iconBox">\n          <button (click)="click(\'shopping\')">\n            <div class="imgBox">\n              <ion-icon name="pricetag"  class="iconImg"></ion-icon>\n            </div>\n            <a class="iconTip">Shopping</a>\n          </button>\n        </div>\n      </ion-col>\n\n      <ion-col text-center no-padding no-margin >\n        <div class="col col-25 iconBox">\n          <button (click)="click(\'traffic\')">\n            <div class="imgBox">\n              <ion-icon name="bus"  class="iconImg"></ion-icon>\n            </div>\n            <a class="iconTip">Traffic</a>\n          </button>\n        </div>\n\n\n      </ion-col>\n      <ion-col text-center no-padding no-margin >\n        <div class="col col-25 iconBox">\n          <button (click)="click(\'home\')">\n            <div class="imgBox">\n              <ion-icon name="home"  class="iconImg"></ion-icon>\n            </div>\n            <a class="iconTip">Home</a>\n          </button>\n        </div>\n\n\n      </ion-col>\n    </ion-row>\n    <ion-row no-margin no-padding>\n      <ion-col text-center no-padding no-margin >\n        <div class="col col-25 iconBox">\n          <button (click)="click(\'electronics\')">\n            <div class="imgBox">\n              <ion-icon name="phone-portrait"  class="iconImg"></ion-icon>\n            </div>\n            <a class="iconTip">Electronics</a>\n          </button>\n        </div>\n\n\n      </ion-col>\n      <ion-col text-center no-padding no-margin >\n        <div class="col col-25 iconBox">\n          <button (click)="click(\'medical\')">\n            <div class="imgBox">\n              <ion-icon name="medical"  class="iconImg"></ion-icon>\n            </div>\n            <a class="iconTip">Medical</a>\n          </button>\n        </div>\n\n\n      </ion-col>\n      <ion-col text-center no-padding no-margin  >\n        <div class="col col-25 iconBox">\n          <button (click)="click(\'other\')">\n            <div class="imgBox">\n              <ion-icon name="globe"  class="iconImg"></ion-icon>\n            </div>\n            <a class="iconTip">Other</a>\n          </button>\n        </div>\n\n\n      </ion-col>\n    </ion-row>\n\n  </ion-grid>\n\n  <button ion-button block color="default" outline (click)="Save(\'cost\')">Save</button>\n\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/nablec/WebstormProjects/AccountingAPP/fronend/frontend/src/pages/category/category.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ionic2_date_picker__["DatePickerProvider"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic2_date_picker__["DatePickerProvider"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Keyboard"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Keyboard"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"]) === "function" && _j || Object])
    ], CategoryPage);
    return CategoryPage;
    var CategoryPage_1, _a, _b, _c, _d, _e, _f, _g, _h, _j;
}());

//# sourceMappingURL=category.js.map

/***/ }),

/***/ 447:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chart_chart__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contact_contact__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__category_category__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TabsPage = (function () {
    function TabsPage(navlCtrl) {
        this.navlCtrl = navlCtrl;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__chart_chart__["a" /* ChartPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_4__category_category__["a" /* CategoryPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_2__contact_contact__["a" /* ContactPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/nablec/WebstormProjects/AccountingAPP/fronend/frontend/src/pages/tabs/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Chart" tabIcon="list"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Add" tabIcon="add"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="Profile" tabIcon="contact"></ion-tab>\n\n</ion-tabs>\n'/*ion-inline-end:"/Users/nablec/WebstormProjects/AccountingAPP/fronend/frontend/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["NavController"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["NavController"]) === "function" && _a || Object])
    ], TabsPage);
    return TabsPage;
    var _a;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ContactPage = (function () {
    function ContactPage(navCtrl, editCtrl, toastCtrl, http) {
        this.navCtrl = navCtrl;
        this.editCtrl = editCtrl;
        this.toastCtrl = toastCtrl;
        this.http = http;
    }
    ContactPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
        return toast;
    };
    // ionViewDidLoad() {
    //   this.profilelist = this.getProfile();
    // }
    ContactPage.prototype.username_edit = function () {
        var view = this.editCtrl.create({
            title: 'Username',
            message: 'Alert: username cannot be changed by user!',
            buttons: [
                {
                    text: 'Ok',
                }
            ]
        });
        view.present();
    };
    ContactPage.prototype.fname_edit = function () {
        var _this = this;
        document.getElementById("fname").removeAttribute("readonly");
        var edit = this.editCtrl.create({
            title: 'First name',
            message: 'Enter your new first name',
            inputs: [
                {
                    type: 'text',
                    id: 'first_name',
                    name: 'first_name',
                    placeholder: 'First name',
                    value: ""
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        console.log('Saved clicked');
                        var jsondata = JSON.parse(JSON.stringify(data));
                        // let htmldata = eval('('+jsondata+')');
                        _this.firstname = jsondata['first_name'];
                        var myheaders = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({});
                        _this.http.post("http://localhost:3000/viewprofile", { key: 'FIRST_NAME', value: _this.firstname }, { headers: myheaders, responseType: 'text' })
                            .subscribe(function (data) {
                            if (data == "SAVED") {
                                _this.editCtrl.create({
                                    message: "First name has been changed!"
                                });
                            }
                            else {
                                _this.editCtrl.create({
                                    message: "Change failed!"
                                });
                            }
                        });
                    }
                }
            ]
        });
        edit.present();
    };
    ContactPage.prototype.lname_edit = function () {
        var _this = this;
        var edit = this.editCtrl.create({
            title: 'Last name',
            message: 'Enter your new last name',
            inputs: [
                {
                    id: 'last_name',
                    name: 'last_name',
                    placeholder: 'Last name'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        var jsondata = JSON.parse(JSON.stringify(data));
                        _this.lastname = jsondata['last_name'];
                        var myheaders = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({});
                        _this.http.post("http://localhost:3000/viewprofile", { key: 'LAST_NAME', value: _this.lastname }, { headers: myheaders, responseType: 'text' })
                            .subscribe(function (data) {
                            if (data == "SAVED") {
                                _this.editCtrl.create({
                                    message: "Last name has been changed!"
                                });
                            }
                            else {
                                _this.editCtrl.create({
                                    message: "Change failed!"
                                });
                            }
                        });
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        edit.present();
    };
    ContactPage.prototype.gender_edit = function () {
        var _this = this;
        var edit = this.editCtrl.create();
        edit.setTitle('Gender');
        edit.addInput({
            type: 'radio',
            label: 'Female',
            value: 'Female'
        });
        edit.addInput({
            type: 'radio',
            label: 'Male',
            value: 'Male'
        });
        edit.addInput({
            type: 'radio',
            label: 'Non-Binary',
            value: 'Non-Binary'
        });
        edit.addInput({
            type: 'radio',
            label: 'Agender',
            value: 'Agender'
        });
        edit.addInput({
            type: 'radio',
            label: 'Bigender',
            value: 'Bigender'
        });
        edit.addInput({
            type: 'radio',
            label: 'Prefer not to say',
            value: 'NA'
        });
        edit.addButton('Cancel');
        edit.addButton({
            text: 'Save',
            handler: function (gender) {
                _this.genderlist = gender;
                var myheaders = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({});
                _this.http.post("http://localhost:3000/viewprofile", { key: 'SEX', value: _this.genderlist }, { headers: myheaders, responseType: 'text' })
                    .subscribe(function (data) {
                    if (data == "SAVED") {
                        _this.editCtrl.create({
                            message: "Last name has been changed!"
                        });
                    }
                    else {
                        _this.editCtrl.create({
                            message: "Change failed!"
                        });
                    }
                });
                console.log('Saved clicked');
            }
        });
        edit.present();
    };
    ContactPage.prototype.dob_edit = function () {
        var _this = this;
        var myheaders = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({});
        this.http.post("http://localhost:3000/viewprofile", { key: 'BIRTH_DAY', value: this.dob }, { headers: myheaders, responseType: 'text' })
            .subscribe(function (data) {
            if (data == "SAVED") {
                _this.editCtrl.create({
                    message: "Birthday has been changed!"
                });
            }
            else {
                _this.editCtrl.create({
                    message: "Change failed!"
                });
            }
        });
        console.log('Saved clicked');
    };
    ContactPage.prototype.income_edit = function () {
        var _this = this;
        var edit = this.editCtrl.create({
            title: 'Income',
            message: 'Enter your new Income',
            inputs: [
                {
                    id: 'income',
                    name: 'income',
                    placeholder: 'Income'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        var jsondata = JSON.parse(JSON.stringify(data));
                        _this.income = jsondata['income'];
                        var myheaders = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({});
                        _this.http.post("http://localhost:3000/viewprofile", { key: 'INCOME', value: _this.lastname }, { headers: myheaders, responseType: 'text' })
                            .subscribe(function (data) {
                            if (data == "SAVED") {
                                _this.editCtrl.create({
                                    message: "Income has been changed!"
                                });
                            }
                            else {
                                _this.editCtrl.create({
                                    message: "Change failed!"
                                });
                            }
                        });
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        edit.present();
    };
    ContactPage.prototype.password_edit = function () {
        // document.getElementById("password").removeAttribute("readonly");
        var edit = this.editCtrl.create({
            title: 'Password',
            message: 'Enter your old password and new password',
            inputs: [
                {
                    id: 'opassword',
                    name: 'opassword',
                    placeholder: 'Old password'
                },
                {
                    id: 'npassword',
                    name: 'npassword',
                    placeholder: 'New password'
                },
                {
                    id: 'npassword',
                    name: 'npassword',
                    placeholder: 'Confirm password'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        edit.present();
    };
    ContactPage.prototype.logout = function () {
        this.navCtrl.parent.parent.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
        var myheader = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]();
        this.http.get("http://localhost:3000/logout", { headers: myheader, withCredentials: true });
    };
    ContactPage.prototype.ngOnInit = function () {
        var _this = this;
        var myheader = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]();
        this.http.get("http://localhost:3000/viewprofile", { headers: myheader, withCredentials: true }).subscribe(function (data) {
            var jsond = data[0];
            _this.username = jsond['USER_NAME'].toString();
            _this.password = jsond['PASSWORD'].toString();
            _this.firstname = jsond['FIRST_NAME'].toString();
            if (jsond['LAST_NAME']) {
                _this.lastname = jsond['LAST_NAME'].toString();
            }
            else {
                _this.lastname = "-";
            }
            if (jsond["BIRTH_DAY"]) {
                _this.dob = jsond["BD"].toString();
            }
            else {
                _this.dob = "-";
            }
            // this.age=jsond["AGE"].toString();
            if (jsond["SEX"]) {
                _this.genderlist = jsond["SEX"].toString();
            }
            else {
                _this.genderlist = "-";
            }
            if (jsond['INCOME']) {
                _this.income = jsond['INCOME'].toString();
            }
            else {
                _this.income = "-";
            }
        });
    };
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-contact',template:/*ion-inline-start:"/Users/nablec/WebstormProjects/AccountingAPP/fronend/frontend/src/pages/contact/contact.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>My Profile</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-list-header>\n    <ion-item>\n      <div align="center">\n        <img src="https://b-ssl.duitang.com/uploads/item/201708/26/20170826051009_dFuQc.jpeg"  width="150" height="150">\n      </div>\n    </ion-item>\n    </ion-list-header>\n    <ion-list>\n\n      <!--username-->\n      <ion-item>\n        <ion-label>Username: </ion-label>\n        <ion-input type="text" id="username" value="{{username}}" readonly></ion-input>\n        <button ion-button small color="dark" clear round (click)="username_edit()" item-end>\n          <ion-icon name="ios-arrow-forward"> </ion-icon>\n        </button>\n      </ion-item>\n      <!--password-->\n      <ion-item>\n        <ion-label>Password: </ion-label>\n        <ion-input type="password" id="password" value="{{password}}" readonly></ion-input>\n        <button ion-button small color="dark" clear round (click)="password_edit()" item-end>\n          <ion-icon name="ios-arrow-forward"> </ion-icon>\n        </button>\n      </ion-item>\n      <!--firstname-->\n      <ion-item>\n        <ion-label>First name: </ion-label>\n        <ion-input type="text" id="fname" value="{{firstname}}" readonly></ion-input>\n        <button ion-button small color="dark" clear round (click)="fname_edit()" item-end>\n          <ion-icon name="ios-arrow-forward"> </ion-icon>\n        </button>\n      </ion-item>\n      <!--lastname-->\n      <ion-item>\n        <ion-label>Last name: </ion-label>\n        <ion-input type="text" id="lname" value="{{lastname}}" readonly></ion-input>\n        <button ion-button small color="dark" clear round (click)="lname_edit()" item-end>\n          <ion-icon name="ios-arrow-forward"> </ion-icon>\n        </button>\n      </ion-item>\n      <!--gender-->\n      <ion-item>\n        <ion-label>Gender: </ion-label>\n        <ion-input type="text" id="gender" value="{{genderlist}}" readonly></ion-input>\n        <button ion-button small color="dark" clear round (click)="gender_edit()" item-end>\n          <ion-icon name="ios-arrow-forward"> </ion-icon>\n        </button>\n      </ion-item>\n      <!--Income-->\n      <ion-item>\n        <ion-label>Income: </ion-label>\n        <ion-input type="text" id="income" value="{{income}}" readonly></ion-input>\n        <button ion-button small color="dark" clear round (click)="income_edit()" item-end>\n          <ion-icon name="ios-arrow-forward"> </ion-icon>\n        </button>\n      </ion-item>\n      <!--dob-->\n      <ion-item>\n        <ion-label>Birthday: </ion-label>\n        <ion-input type="text" id="dob" value="{{dob}}" readonly></ion-input>\n        <button ion-button small color="dark" clear round item-end>\n          <ion-datetime [(ngModel)]="dob" required name="birthdate" displayFormat="none" pickerFormat="YYYY-MM-DD" (ngModelChange)="dob_edit()"[ngModelOptions]="{standalone:true}">\n          </ion-datetime>\n          <ion-icon name="md-calendar"> </ion-icon>\n        </button>\n      </ion-item>\n    </ion-list>\n    <button ion-button block color="danger" round (click)="logout()">Logout </button>\n  </ion-list>\n</ion-content>\n\n\n'/*ion-inline-end:"/Users/nablec/WebstormProjects/AccountingAPP/fronend/frontend/src/pages/contact/contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 449:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(41);
// import { CalendarComponentOptions } from 'ion2-calendar';
// -> install 'npm i ion2-calendar'
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = (function () {
    function HomePage(navCtrl, http, toastCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
    }
    HomePage.prototype.ionViewWillEnter = function () {
    };
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
    HomePage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
        return toast;
    };
    HomePage.prototype.getdata = function () {
        var myheaders = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]({});
        this.http.get("http://localhost:3000/home", { headers: myheaders, withCredentials: true }).subscribe(function (data) {
            var col = [];
            col.push("FDATE");
            col.push("CATEGORY");
            col.push("EXPENSES");
            //1. create dynamic table
            var table = document.createElement("table");
            //2. create html table header row using the extracted headers above
            var tr = table.insertRow(-1); //-> table row
            //for(var j=0;j<col.length; j++) //-> table header
            //{
            var th = document.createElement("th");
            th.innerHTML = "DATE";
            th.setAttribute("width", "100");
            th.setAttribute("align", "left");
            tr.appendChild(th);
            var th1 = document.createElement("th");
            th1.setAttribute("width", "100");
            th1.setAttribute("align", "left");
            th1.innerHTML = "CATEGORY";
            tr.appendChild(th1);
            th1.setAttribute("width", "100");
            th1.setAttribute("align", "left");
            var th2 = document.createElement("th");
            th2.innerHTML = "EXPENSES";
            tr.appendChild(th2);
            //}
            //3. add JSON data to the table as rows
            for (var k = 0; k < data.length; k++) {
                tr = table.insertRow(-1);
                for (var h = 0; h < col.length; h++) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = data[k][col[h]];
                }
            }
            //4. finally add the newly created table with json data to a container
            var divContainer = document.getElementById("showData");
            divContainer.innerHTML = "";
            divContainer.appendChild(table);
        });
    };
    HomePage.prototype.ngOnInit = function () {
        this.getdata();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/nablec/WebstormProjects/AccountingAPP/fronend/frontend/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>MUA</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n    \n  <p id="showData"></p>\n  \n\n  <!--\n<ion-toolbar no-border-top *ngIf="demo != \'Title\'">\n    <ion-segment [(ngModel)]="apps">\n      <ion-segment-button value="date" (click)="">\n        Date\n        <ion-datetime [(ngModel)]="date" required name="date" displayFormat="DD MMM YYYY" pickerFormat="YYYY-MM-DD" [ngModelOptions]="{standalone:true}"></ion-datetime>  \n      </ion-segment-button>\n      <ion-segment-button value="note"> \n        Note\n      </ion-segment-button>\n      <ion-segment-button value="details">\n        Details\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n\n\n<ion-row>\n  <ion-col width-5 style="text-align: center">\n    <button ion-button small round outline (click)="openCalendar()">Date</button>\n  </ion-col>  \n</ion-row>\n-->\n\n \n</ion-content>\n  \n'/*ion-inline-end:"/Users/nablec/WebstormProjects/AccountingAPP/fronend/frontend/src/pages/home/home.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"]) === "function" && _d || Object])
    ], HomePage);
    return HomePage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 499:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(504);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 504:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(872);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_chart_chart__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_contact_contact__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_category_category_module__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_home_home__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_signup_signup__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_http_http__ = __webpack_require__(876);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angularfire2__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angularfire2_auth__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angularfire2_database__ = __webpack_require__(877);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ionic2_date_picker__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ionic2_date_picker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_ionic2_date_picker__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








//import { ItemPage } from '../pages/item/item';
//import {ItemPageModule} from "../pages/item/item.module";











var firebaseConfig = {
    firebase: {
        apiKey: "AIzaSyCile1Arb1ipCD0WM8cDkmYL-dhgR6XBK8",
        authDomain: "gps-tracker-3c2a1.firebaseapp.com",
        databaseURL: "https://gps-tracker-3c2a1.firebaseio.com",
        projectId: "gps-tracker-3c2a1",
        storageBucket: "gps-tracker-3c2a1.appspot.com",
        messagingSenderId: "893074004983"
    }
};
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_chart_chart__["a" /* ChartPage */],
                //ItemPage,
                __WEBPACK_IMPORTED_MODULE_7__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_signup_signup__["a" /* SignupPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_15_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig.firebase),
                __WEBPACK_IMPORTED_MODULE_16_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_17_angularfire2_database__["a" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["IonicModule"].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/chart/chart.module#ChartPageModule', name: 'ChartPage', segment: 'chart', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/category/category.module#CategoryPageModule', name: 'CategoryPage', segment: 'category', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/item/item.module#ItemPageModule', name: 'ItemPage', segment: 'item', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_18_ionic2_date_picker__["DatePickerModule"],
                //ItemPageModule,
                __WEBPACK_IMPORTED_MODULE_8__pages_category_category_module__["CategoryPageModule"],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["IonicApp"]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_chart_chart__["a" /* ChartPage */],
                //ItemPage,
                __WEBPACK_IMPORTED_MODULE_7__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_signup_signup__["a" /* SignupPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["IonicErrorHandler"] },
                __WEBPACK_IMPORTED_MODULE_14__providers_http_http__["a" /* HttpProvider */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 554:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 225,
	"./af.js": 225,
	"./ar": 226,
	"./ar-dz": 227,
	"./ar-dz.js": 227,
	"./ar-kw": 228,
	"./ar-kw.js": 228,
	"./ar-ly": 229,
	"./ar-ly.js": 229,
	"./ar-ma": 230,
	"./ar-ma.js": 230,
	"./ar-sa": 231,
	"./ar-sa.js": 231,
	"./ar-tn": 232,
	"./ar-tn.js": 232,
	"./ar.js": 226,
	"./az": 233,
	"./az.js": 233,
	"./be": 234,
	"./be.js": 234,
	"./bg": 235,
	"./bg.js": 235,
	"./bm": 236,
	"./bm.js": 236,
	"./bn": 237,
	"./bn.js": 237,
	"./bo": 238,
	"./bo.js": 238,
	"./br": 239,
	"./br.js": 239,
	"./bs": 240,
	"./bs.js": 240,
	"./ca": 241,
	"./ca.js": 241,
	"./cs": 242,
	"./cs.js": 242,
	"./cv": 243,
	"./cv.js": 243,
	"./cy": 244,
	"./cy.js": 244,
	"./da": 245,
	"./da.js": 245,
	"./de": 246,
	"./de-at": 247,
	"./de-at.js": 247,
	"./de-ch": 248,
	"./de-ch.js": 248,
	"./de.js": 246,
	"./dv": 249,
	"./dv.js": 249,
	"./el": 250,
	"./el.js": 250,
	"./en-au": 251,
	"./en-au.js": 251,
	"./en-ca": 252,
	"./en-ca.js": 252,
	"./en-gb": 253,
	"./en-gb.js": 253,
	"./en-ie": 254,
	"./en-ie.js": 254,
	"./en-il": 255,
	"./en-il.js": 255,
	"./en-nz": 256,
	"./en-nz.js": 256,
	"./eo": 257,
	"./eo.js": 257,
	"./es": 258,
	"./es-do": 259,
	"./es-do.js": 259,
	"./es-us": 260,
	"./es-us.js": 260,
	"./es.js": 258,
	"./et": 261,
	"./et.js": 261,
	"./eu": 262,
	"./eu.js": 262,
	"./fa": 263,
	"./fa.js": 263,
	"./fi": 264,
	"./fi.js": 264,
	"./fo": 265,
	"./fo.js": 265,
	"./fr": 266,
	"./fr-ca": 267,
	"./fr-ca.js": 267,
	"./fr-ch": 268,
	"./fr-ch.js": 268,
	"./fr.js": 266,
	"./fy": 269,
	"./fy.js": 269,
	"./gd": 270,
	"./gd.js": 270,
	"./gl": 271,
	"./gl.js": 271,
	"./gom-latn": 272,
	"./gom-latn.js": 272,
	"./gu": 273,
	"./gu.js": 273,
	"./he": 274,
	"./he.js": 274,
	"./hi": 275,
	"./hi.js": 275,
	"./hr": 276,
	"./hr.js": 276,
	"./hu": 277,
	"./hu.js": 277,
	"./hy-am": 278,
	"./hy-am.js": 278,
	"./id": 279,
	"./id.js": 279,
	"./is": 280,
	"./is.js": 280,
	"./it": 281,
	"./it.js": 281,
	"./ja": 282,
	"./ja.js": 282,
	"./jv": 283,
	"./jv.js": 283,
	"./ka": 284,
	"./ka.js": 284,
	"./kk": 285,
	"./kk.js": 285,
	"./km": 286,
	"./km.js": 286,
	"./kn": 287,
	"./kn.js": 287,
	"./ko": 288,
	"./ko.js": 288,
	"./ky": 289,
	"./ky.js": 289,
	"./lb": 290,
	"./lb.js": 290,
	"./lo": 291,
	"./lo.js": 291,
	"./lt": 292,
	"./lt.js": 292,
	"./lv": 293,
	"./lv.js": 293,
	"./me": 294,
	"./me.js": 294,
	"./mi": 295,
	"./mi.js": 295,
	"./mk": 296,
	"./mk.js": 296,
	"./ml": 297,
	"./ml.js": 297,
	"./mn": 298,
	"./mn.js": 298,
	"./mr": 299,
	"./mr.js": 299,
	"./ms": 300,
	"./ms-my": 301,
	"./ms-my.js": 301,
	"./ms.js": 300,
	"./mt": 302,
	"./mt.js": 302,
	"./my": 303,
	"./my.js": 303,
	"./nb": 304,
	"./nb.js": 304,
	"./ne": 305,
	"./ne.js": 305,
	"./nl": 306,
	"./nl-be": 307,
	"./nl-be.js": 307,
	"./nl.js": 306,
	"./nn": 308,
	"./nn.js": 308,
	"./pa-in": 309,
	"./pa-in.js": 309,
	"./pl": 310,
	"./pl.js": 310,
	"./pt": 311,
	"./pt-br": 312,
	"./pt-br.js": 312,
	"./pt.js": 311,
	"./ro": 313,
	"./ro.js": 313,
	"./ru": 314,
	"./ru.js": 314,
	"./sd": 315,
	"./sd.js": 315,
	"./se": 316,
	"./se.js": 316,
	"./si": 317,
	"./si.js": 317,
	"./sk": 318,
	"./sk.js": 318,
	"./sl": 319,
	"./sl.js": 319,
	"./sq": 320,
	"./sq.js": 320,
	"./sr": 321,
	"./sr-cyrl": 322,
	"./sr-cyrl.js": 322,
	"./sr.js": 321,
	"./ss": 323,
	"./ss.js": 323,
	"./sv": 324,
	"./sv.js": 324,
	"./sw": 325,
	"./sw.js": 325,
	"./ta": 326,
	"./ta.js": 326,
	"./te": 327,
	"./te.js": 327,
	"./tet": 328,
	"./tet.js": 328,
	"./tg": 329,
	"./tg.js": 329,
	"./th": 330,
	"./th.js": 330,
	"./tl-ph": 331,
	"./tl-ph.js": 331,
	"./tlh": 332,
	"./tlh.js": 332,
	"./tr": 333,
	"./tr.js": 333,
	"./tzl": 334,
	"./tzl.js": 334,
	"./tzm": 335,
	"./tzm-latn": 336,
	"./tzm-latn.js": 336,
	"./tzm.js": 335,
	"./ug-cn": 337,
	"./ug-cn.js": 337,
	"./uk": 338,
	"./uk.js": 338,
	"./ur": 339,
	"./ur.js": 339,
	"./uz": 340,
	"./uz-latn": 341,
	"./uz-latn.js": 341,
	"./uz.js": 340,
	"./vi": 342,
	"./vi.js": 342,
	"./x-pseudo": 343,
	"./x-pseudo.js": 343,
	"./yo": 344,
	"./yo.js": 344,
	"./zh-cn": 345,
	"./zh-cn.js": 345,
	"./zh-hk": 346,
	"./zh-hk.js": 346,
	"./zh-tw": 347,
	"./zh-tw.js": 347
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 554;

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_tabs_tabs__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_signup_signup__ = __webpack_require__(163);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, toastCtrl, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.http = http;
    }
    LoginPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
        return toast;
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        var jsonData = {
            'username': this.username,
            'password': this.password
        };
        if (this.username == null || this.password == null) {
            this.presentToast("Please enter User Name and Password");
        }
        else if (this.username.length == 0 || this.password.length == 0) {
            this.presentToast("Please enter User Name and Password");
        }
        else {
            var myheaders = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({});
            this.http.post("http://localhost:3000/login", jsonData, { headers: myheaders, withCredentials: true, responseType: 'text' })
                .subscribe(function (data) {
                if (data == "SUCCESS") {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_tabs_tabs__["a" /* TabsPage */]);
                }
                else if (data == "FAILED") {
                    _this.presentToast("Wrong User Name or Password");
                }
                else {
                    _this.presentToast(data);
                }
            }, function (error) {
                console.log(error);
                _this.presentToast("Error connecting to backend server");
            });
        }
    };
    LoginPage.prototype.signup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_signup_signup__["a" /* SignupPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/nablec/WebstormProjects/AccountingAPP/fronend/frontend/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-header>\n\n  <ion-navbar>\n    <ion-navbar color="whatsapp">\n      <ion-title>login</ion-title>\n    </ion-navbar>  </ion-navbar>\n  <style type="text/css">\n    h1{\n      position: relative;\n      width: 100%;\n      height: 4rem;\n      margin: 5rem 0 2.2rem;\n      color: rgba(255, 255, 255, 0.8);\n      background: #98bce7;\n      font-size: 1.5rem;\n      border-radius: 3rem;\n      cursor: pointer;\n      overflow: hidden;\n      transition: width 0.3s 0.15s, font-size 0.1s 0.15s;\n    }\n  </style>\n</ion-header>\n\n<ion-content class="welcome" padding>\n\n  <ion-list>\n\n    <ion-item>\n      <div align="center">\n        <img src="./assets/imgs/logo 2.png" srcset="./assets/imgs/logo@2x.png 2x, ./assets/imgs/logo@3x.png 3x" class="logo">\n      </div>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Username</ion-label>\n      <ion-input [(ngModel)]="username" type="text" placeholder="Username"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Password</ion-label>\n      <ion-input [(ngModel)]="password" type="password" placeholder="Password"></ion-input>\n    </ion-item>\n    <button ion-button block color="default" outline (click)="login()">Login </button>\n    <button ion-button block color="default"  outline (click)="signup()">Signup </button>\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/nablec/WebstormProjects/AccountingAPP/fronend/frontend/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 872:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/nablec/WebstormProjects/AccountingAPP/fronend/frontend/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/nablec/WebstormProjects/AccountingAPP/fronend/frontend/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 876:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var HttpProvider = (function () {
    function HttpProvider(http) {
        this.http = http;
        console.log('Hello HttpProvider Provider');
    }
    HttpProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], HttpProvider);
    return HttpProvider;
}());

//# sourceMappingURL=http.js.map

/***/ })

},[499]);
//# sourceMappingURL=main.js.map