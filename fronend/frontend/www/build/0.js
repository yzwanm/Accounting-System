webpackJsonp([0],{

/***/ 889:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemPageModule", function() { return ItemPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__item__ = __webpack_require__(890);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ItemPageModule = (function () {
    function ItemPageModule() {
    }
    ItemPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__item__["a" /* ItemPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__item__["a" /* ItemPage */]),
            ],
        })
    ], ItemPageModule);
    return ItemPageModule;
}());

//# sourceMappingURL=item.module.js.map

/***/ }),

/***/ 890:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic2_date_picker__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic2_date_picker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ionic2_date_picker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(41);
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
 * Generated class for the ItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ItemPage = (function () {
    function ItemPage(navCtrl, navParams, datePickerProvider, 
        //public cate: CategoryProvider,
        //private trans: TransactionProvider,
        modalCtrl, keyboard, toastCtrl, afAuth, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.datePickerProvider = datePickerProvider;
        this.modalCtrl = modalCtrl;
        this.keyboard = keyboard;
        this.toastCtrl = toastCtrl;
        this.afAuth = afAuth;
        this.http = http;
        this.item = {
            entry_time: (new Date().toLocaleDateString()).toString(),
            category: '',
            note: '',
            amount: '',
            type: '',
            created_by: '',
        };
    }
    // ionViewDidLoad() {
    //   console.log('ionViewDidLoad ItemPage');
    // }
    // chooseCategory() {
    //     this.navCtrl.push('CategoryPage', {item : this.item})
    //
    // }
    ItemPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
        return toast;
    };
    ItemPage.prototype.click = function (category) {
        this.item.category = category;
        //this.item.type = "expense";
    };
    ItemPage.prototype.showCalendar = function () {
        var _this = this;
        var dateSelected = this.datePickerProvider.showCalendar(this.modalCtrl);
        dateSelected.subscribe(function (date) {
            return _this.item.entry_time = (date.toLocaleDateString()).toString();
        });
    };
    ItemPage.prototype.handleEnter = function () {
        this.keyboard.close();
    };
    ItemPage.prototype.Save = function (type) {
        if (this.item.amount.length <= 0) {
            this.presentToast("Please input your expense");
        }
        else if (this.item.category.length <= 0) {
            this.presentToast("Please choose one category");
        }
        else {
            this.item.type = type;
            var jsonData = {
                'type': this.item.type,
                'category': this.item.category,
                'date': this.item.entry_time,
                'money': this.item.amount,
                'comment': this.item.note
            };
            var myheaders = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["c" /* HttpHeaders */]({});
            this.navCtrl.push('ItemPage');
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
        console.log(jsonData);
    };
    ItemPage.prototype.presentNewExpense = function () {
        // let profileModal = this.modalCtrl.create('ItemPage', { type: type });
        // profileModal.present();
        this.navCtrl.push('CategoryPage');
    };
    ItemPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-item',template:/*ion-inline-start:"/Users/nablec/WebstormProjects/AccountingAPP/fronend/frontend/src/pages/item/item.html"*/'<!--\n  Generated template for the ItemPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Add a New Income</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <!--<ion-toolbar>-->\n    <!--<button ion-button block  outline (click)="chooseCategory()" >Choose Category</button>-->\n  <!--</ion-toolbar>-->\n  <ion-toolbar>\n    <ion-grid>\n      <ion-row text-center>\n        <ion-col>\n          <button ion-button outline color="danger" class="add-button" (click)="presentNewExpense()">Expense\n            <!--<ion-icon class="icon-plus-minus" name="ios-remove-outline" color="danger"></ion-icon>-->\n          </button>\n        </ion-col>\n        <ion-col>\n          <button ion-button outline color="secondary" class="add-button">Income\n            <!--<ion-icon class="icon-plus-minus" name="ios-add-outline" color="secondary"></ion-icon>-->\n          </button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n  <p text-center (click)="showCalendar()"><ion-icon name="ios-calendar-outline"></ion-icon> {{ item.entry_time | date: \'EEEE, dd MMM yyyy\' }}</p>\n\n  <ion-grid>\n    <ion-row >\n      <ion-col  no-padding no-margin>\n        <ion-item no-padding no-margin>\n          <ion-label><ion-icon name="ios-create-outline"></ion-icon></ion-label>\n          <ion-input [(ngModel)]="item.amount" placeholder="$0.00" ng-pattern="/^[0-9]{1,7}(\.[0-9]+)?$/" clearInput (keyup.enter)="handleEnter()"></ion-input>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col  no-padding no-margin>\n        <ion-item no-padding no-margin>\n          <ion-label><ion-icon name="ios-create-outline"></ion-icon></ion-label>\n          <ion-input [(ngModel)]="item.note" placeholder="Add note" clearInput (keyup.enter)="handleEnter()"></ion-input>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col  no-padding no-margin>\n        <ion-item no-padding no-margin>\n          <ion-label><ion-icon name="ios-create-outline"></ion-icon></ion-label>\n          <ion-input [(ngModel)]="item.category" placeholder="category" clearInput (keyup.enter)="this.item.category" readonly></ion-input>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-grid no-margin  no-padding>\n    <ion-row no-margin no-padding >\n      <ion-col text-center no-padding no-margin >\n        <div class="col col-25 iconBox">\n          <button (click)="click(\'Salary \')">\n            <div class="imgBox">\n              <ion-icon name="card"  class="iconImg"></ion-icon>\n            </div>\n            <a class="iconTip">Salary</a>\n          </button>\n        </div>\n\n      </ion-col>\n      <ion-col text-center no-padding no-margin >\n        <div class="col col-25 iconBox">\n          <button (click)="click(\'Part-time\')">\n            <div class="imgBox">\n              <ion-icon name="logo-usd"  class="iconImg"></ion-icon>\n            </div>\n            <a class="iconTip">Part-time</a>\n          </button>\n        </div>\n\n\n      </ion-col>\n      <ion-col text-center no-padding no-margin >\n        <div class="col col-25 iconBox">\n          <button (click)="click(\'Financial \')">\n            <div class="imgBox">\n              <ion-icon name="logo-bitcoin"  class="iconImg"></ion-icon>\n            </div>\n            <a class="iconTip">financial</a>\n          </button>\n        </div>\n\n\n      </ion-col>\n      <ion-col text-center no-padding no-margin  >\n        <div class="col col-25 iconBox">\n          <button (click)="click(\'Other\')">\n            <div class="imgBox">\n              <ion-icon name="globe"  class="iconImg"></ion-icon>\n            </div>\n            <a class="iconTip">Other</a>\n          </button>\n        </div>\n\n\n      </ion-col>\n    </ion-row>\n\n  </ion-grid>\n<p>\n\n</p>\n  <p>\n\n  </p>\n  <p>\n\n  </p>\n  <p>\n\n  </p>\n  <button ion-button block color="default" outline (click)="Save(\'Income\')">Save</button>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/nablec/WebstormProjects/AccountingAPP/fronend/frontend/src/pages/item/item.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ionic2_date_picker__["DatePickerProvider"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic2_date_picker__["DatePickerProvider"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Keyboard"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Keyboard"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */]) === "function" && _h || Object])
    ], ItemPage);
    return ItemPage;
    var _a, _b, _c, _d, _e, _f, _g, _h;
}());

//# sourceMappingURL=item.js.map

/***/ })

});
//# sourceMappingURL=0.js.map