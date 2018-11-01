webpackJsonp([2],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(41);
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
var SignupPage = /** @class */ (function () {
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"/Users/nablec/WebstormProjects/AccountingAPP/frontend/src/pages/signup/signup.html"*/'<!--\n  Generated template for the SignupPage page.\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="whatsapp">\n    <ion-title>signup</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item>\n      <div align="center">\n        <img src="./assets/imgs/logo 2.png" srcset="./assets/imgs/logo@2x.png 2x, ./assets/imgs/logo@3x.png 3x" class="logo">\n      </div>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Username</ion-label>\n      <ion-input [(ngModel)]="username" type="text" placeholder="Username" class=""></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Password</ion-label>\n      <ion-input [(ngModel)]="password" type="password" placeholder="Password"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Confirm Password</ion-label>\n      <ion-input [(ngModel)]="cnfrpwd" type="password" placeholder="Confirm Password"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>First Name</ion-label>\n      <ion-input [(ngModel)]="firstname" type="text" placeholder="First Name"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Last Name</ion-label>\n      <ion-input [(ngModel)]="lastname" type="text" placeholder="Last Name"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Birth Date</ion-label>\n<ion-datetime [(ngModel)]="birthdate" required name="birthdate" displayFormat="DD MMM YYYY" pickerFormat="YYYY-MM-DD" [ngModelOptions]="{standalone:true}"></ion-datetime>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Gender</ion-label>\n      <ion-select [(ngModel)]="gender">\n        <ion-option value="female">Female</ion-option>\n        <ion-option value="male">Male</ion-option>\n	<ion-option value="nonbinary">Non-Binary</ion-option>\n	<ion-option value="agender">Agender</ion-option>\n	<ion-option value="bigender">Bigender</ion-option>\n	<ion-option value="other">Other</ion-option>\n      </ion-select>\n    </ion-item>  \n    <ion-item>\n      <ion-label floating>Income</ion-label>\n      <ion-input [(ngModel)]="income" type="text" placeholder="Income"></ion-input>\n    </ion-item>\n\n    \n    <button ion-button block color="default" outline (click)="signUp()">Signup</button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/nablec/WebstormProjects/AccountingAPP/frontend/src/pages/signup/signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 113:
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
webpackEmptyAsyncContext.id = 113;

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/login/login.module": [
		279,
		1
	],
	"../pages/signup/signup.module": [
		280,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 155;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__about_about__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contact_contact__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(159);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__about_about__["a" /* AboutPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__contact_contact__["a" /* ContactPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/nablec/WebstormProjects/AccountingAPP/frontend/src/pages/tabs/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Chart" tabIcon="list"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Profile" tabIcon="contact"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/nablec/WebstormProjects/AccountingAPP/frontend/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutPage = /** @class */ (function () {
    function AboutPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"/Users/nablec/WebstormProjects/AccountingAPP/frontend/src/pages/about/about.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Chart\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/nablec/WebstormProjects/AccountingAPP/frontend/src/pages/about/about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ContactPage = /** @class */ (function () {
    function ContactPage(navCtrl, editCtrl, toastCtrl, http) {
        this.navCtrl = navCtrl;
        this.editCtrl = editCtrl;
        this.toastCtrl = toastCtrl;
        this.http = http;
        this.profilelist = [];
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
    ContactPage.prototype.ionViewDidLoad = function () {
        this.profilelist = this.getProfile();
    };
    ContactPage.prototype.getProfile = function () {
        return [
            {
                username: "Bob",
                password: '102345',
                fname: 'Smith'
            }
        ];
    };
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
                        _this.http.post("http://localhost:3000/viewprofile", jsondata, { headers: myheaders, responseType: 'text' })
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
                        _this.http.post("http://localhost:3000/viewprofile", jsondata, { headers: myheaders, responseType: 'text' })
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
                console.log('Radio data:', gender);
                _this.genderlist = gender;
            }
        });
        edit.present();
    };
    ContactPage.prototype.dob_edit = function () {
        var edit = this.editCtrl.create({
            title: 'Date of birth',
            message: 'Chooser your birthday',
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (dob) {
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
    };
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"/Users/nablec/WebstormProjects/AccountingAPP/frontend/src/pages/contact/contact.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n     My Profile\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-list-header>\n    <ion-item>\n      <div align="center">\n        <img src="https://b-ssl.duitang.com/uploads/item/201708/26/20170826051009_dFuQc.jpeg"  width="150" height="150">\n      </div>\n    </ion-item>\n    </ion-list-header>\n    <ion-list *ngFor="let profile of profilelist">\n      <ion-item>\n        <div align="right" class="item-avatar">\n\n        </div>\n      </ion-item>\n      <!--username-->\n      <ion-item>\n        <div align="center" class="item item-avatar">\n          <label class="item item-input">\n            <span class="input-label">Username：</span>\n            <input type="text" id="username" value="{{profile.username}}" readonly>\n          </label>\n          <!--<a class="button button-ios-primary" color="default" outline (click)="username_edit()">Edit</a>-->\n          <button ion-button color="light" outline round (click)="username_edit()">View</button>\n        </div>\n      </ion-item>\n      <!--password-->\n      <ion-item>\n        <div align="center" class="item item-avatar">\n          <label class="item item-input">\n            <span class="input-label">Password：</span>\n            <input disabled = true type="password" id="password" value="{{profile.password}}" readonly>\n          </label>\n          <button ion-button color="light" outline round (click)="password_edit()">Edit</button>\n        </div>\n      </ion-item>\n      <!--firstname-->\n      <ion-item>\n        <div align="center" class="item item-avatar">\n          <label class="item item-input">\n            <span class="input-label">First name：</span>\n            <input disabled = true type="text" id="fname" value="{{firstname}}" readonly>\n          </label>\n          <button ion-button color="light" outline round (click)="fname_edit()">Edit</button>\n        </div>\n      </ion-item>\n      <!--lastname-->\n      <ion-item>\n        <div align="center" class="item item-avatar">\n          <label class="item item-input">\n            <span class="input-label">Last name：</span>\n            <input disabled = true type="text" id="lname" value="{{lastname}}" readonly>\n          </label>\n          <button ion-button color="light" outline round (click)="lname_edit()">Edit</button>\n        </div>\n      </ion-item>\n      <!--gender-->\n      <ion-item>\n        <div align="center" class="item item-avatar">\n          <label class="item item-input">\n            <span class="input-label">Gender：</span>\n            <input disabled = true type="text" id="gender" value="{{genderlist}}" readonly>\n          </label>\n          <button ion-button color="light" outline round (click)="gender_edit()">Edit</button>\n        </div>\n      </ion-item>\n      <!--dob-->\n      <ion-item>\n        <div align="center" class="item item-avatar">\n          <label class="item item-input">\n            <span class="input-label">Date of birth：</span>\n            <input disabled = true type="text" id="dob" value="{{profile.dob}}" readonly>\n          </label>\n          <button ion-button color="light" outline round (click)="dob_edit()">Edit</button>\n        </div>\n      </ion-item>\n    </ion-list>\n    <button ion-button block color="default" outline (click)="logout()">Logout </button>\n  </ion-list>\n\n</ion-content>\n\n\n'/*ion-inline-end:"/Users/nablec/WebstormProjects/AccountingAPP/frontend/src/pages/contact/contact.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]) === "function" && _d || Object])
    ], ContactPage);
    return ContactPage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomePage = /** @class */ (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/nablec/WebstormProjects/AccountingAPP/frontend/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h2>Welcome to Ionic!</h2>\n  <p>\n    This starter project comes with simple tabs-based layout for apps\n    that are going to primarily use a Tabbed UI.\n  </p>\n  <p>\n    Take a look at the <code>src/pages/</code> directory to add or change tabs,\n    update any existing page or create new pages.\n  </p>\n</ion-content>\n'/*ion-inline-end:"/Users/nablec/WebstormProjects/AccountingAPP/frontend/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(224);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_about_about__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_contact_contact__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_signup_signup__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__ = __webpack_require__(202);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_signup_signup__["a" /* SignupPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_signup_signup__["a" /* SignupPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/nablec/WebstormProjects/AccountingAPP/frontend/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/nablec/WebstormProjects/AccountingAPP/frontend/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_tabs_tabs__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_signup_signup__ = __webpack_require__(101);
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
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, toastCtrl, http) {
        this.navCtrl = navCtrl;
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
            this.http.post("http://localhost:3000/login", jsonData, { headers: myheaders, responseType: 'text' })
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/nablec/WebstormProjects/AccountingAPP/frontend/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-header>\n\n  <ion-navbar>\n    <ion-navbar color="whatsapp">\n      <ion-title>login</ion-title>\n    </ion-navbar>  </ion-navbar>\n  <style type="text/css">\n    h1{\n      position: relative;\n      width: 100%;\n      height: 4rem;\n      margin: 5rem 0 2.2rem;\n      color: rgba(255, 255, 255, 0.8);\n      background: #98bce7;\n      font-size: 1.5rem;\n      border-radius: 3rem;\n      cursor: pointer;\n      overflow: hidden;\n      transition: width 0.3s 0.15s, font-size 0.1s 0.15s;\n    }\n  </style>\n</ion-header>\n\n<ion-content class="welcome" padding>\n\n  <ion-list>\n\n    <ion-item>\n      <div align="center">\n        <img src="./assets/imgs/logo 2.png" srcset="./assets/imgs/logo@2x.png 2x, ./assets/imgs/logo@3x.png 3x" class="logo">\n      </div>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Username</ion-label>\n      <ion-input [(ngModel)]="username" type="text" placeholder="Username"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Password</ion-label>\n      <ion-input [(ngModel)]="password" type="password" placeholder="Password"></ion-input>\n    </ion-item>\n    <button ion-button block color="default" outline (click)="login()">Login </button>\n    <button ion-button block color="default"  outline (click)="signup()">Signup </button>\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/nablec/WebstormProjects/AccountingAPP/frontend/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

},[203]);
//# sourceMappingURL=main.js.map