import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { TabsPage } from "../tabs/tabs";
import { LoginPage } from "../login/login";
import { AlertController } from 'ionic-angular';

/*  picture uploading
import { LoadingController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
*/


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

 
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,public alerCtrl: AlertController, public http: HttpClient) {

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
  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();

    return toast;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  username: string;
  password: string;
  cnfrpwd: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  gender:  string;
  income: string;

  signUp() {
    console.log(this.birthdate);
    if(this.username == null) {
      this.presentToast("Please input a User Name");
    }
    else if(this.username.length > 20) {
      this.presentToast("Length of username should be less than 20");
    } 
    else if(this.password == null) {
      this.presentToast("Length of password should be between 6 and 20");
    }
    else if(this.password != this.cnfrpwd) {
      this.presentToast("Two passwords should be equivalent");
    }
    else if(this.password.length < 6 || this.password.length >20) {
      this.presentToast("Length of password should be between 6 and 20");
    }
    else if(this.firstname == null) {
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
      let formData = new FormData();	
      if (this.username) {
      	 formData.append("user",this.username);
      }
      if (this.password) {
      	 formData.append("password",this.password);
      }
      if (this.firstname) {
      	 formData.append("first_name",this.firstname);
      }
      if (this.lastname) {
       	 formData.append("last_name",this.lastname);
      }
      if (this.birthdate) {
      	 formData.append("dob",this.birthdate);
      }
      if (this.gender) {
       	 formData.append("sex",this.gender);  //was changed to gender but still called sex in the database
      }
      if (this.income) {
      	 formData.append("income",this.income);
      }
      //sending data to backend
      let myheaders = new HttpHeaders({ });
      this.http.post("http://localhost:3000/createAccount", formData, {headers: myheaders, responseType:'text'})
      .subscribe((data) => {
      	  console.log(data);
      	  if (data == "SUCCESS") {
	     this.navCtrl.push(LoginPage);
          } else if (data == "ERR_USER_EXISTS") {
	     this.presentToast("UserName already exists");
          } else if (data == "ERR_NO_USER") {
	     this.presentToast("Please input a UserName");
	  } else if (data == "ERR_NO_PASS") {
	     this.presentToast("Please input a password");
	  } else if (data == "ERR_NO_FNAME") {
	     this.presentToast("Please input a First Name");
	  } else {
	     this.presentToast(data);
	  }
      }, error => {
      	  this.presentToast("Error connecting to backend server.");
          console.log(error);
      });
    }
  }
}