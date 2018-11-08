import {Component, OnInit} from '@angular/core';
import {AlertController, NavController, ToastController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage implements OnInit{

  constructor(public navCtrl: NavController, public editCtrl: AlertController, public toastCtrl: ToastController, public http: HttpClient) {

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

  username:string;
  password:string;
  dob:string;
  firstname: string;
  lastname: string;
  genderlist: string;
  income:string;
  age:string;

  // ionViewDidLoad() {
  //   this.profilelist = this.getProfile();
  // }
  // private getProfile() {
  //   return [
  //       {
  //         username: "Bob",
  //         password: '102345',
  //         fname:'Smith'
  //       }];
  // }


  username_edit(){
    let view = this.editCtrl.create({
        title:'Username',
        message:'Alert: username cannot be changed by user!',
        buttons:[
            {
              text:'Ok',
            }
        ]
    });
    view.present();
  }
  fname_edit() {
      document.getElementById("fname").removeAttribute("readonly");

      let edit = this.editCtrl.create({
          title: 'First name',
          message: 'Enter your new first name',
          inputs:[
              {
                  type:'text',
                  id:'first_name',
                  name:'first_name',
                  placeholder:'First name',
                  value:""
              }
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      console.log('Saved clicked');
                      let jsondata = JSON.parse(JSON.stringify(data));
                      // let htmldata = eval('('+jsondata+')');
                      this.firstname = jsondata['first_name'];
                      let myheaders = new HttpHeaders({ });
                      this.http.post("http://localhost:3000/viewprofile", {key: 'FIRST_NAME',value:this.firstname},{headers: myheaders, responseType:'text'})
                          .subscribe((data)=>{
                            if (data == "SAVED") {
                              this.editCtrl.create({
                                  message:"First name has been changed!"
                              });
                            }
                            else{
                              this.editCtrl.create({
                                  message:"Change failed!"
                              });
                            }
                          })
                  }
              }
          ]
      });
      edit.present();
  }
  lname_edit(){
      let edit = this.editCtrl.create({
          title: 'Last name',
          message: 'Enter your new last name',
          inputs:[
              {
                  id:'last_name',
                  name:'last_name',
                  placeholder:'Last name'
              }
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      let jsondata = JSON.parse(JSON.stringify(data));
                      this.lastname = jsondata['last_name'];
                      let myheaders = new HttpHeaders({ });
                      this.http.post("http://localhost:3000/viewprofile", {key: 'LAST_NAME',value:this.lastname},{headers: myheaders, responseType:'text'})
                          .subscribe((data)=>{
                              if (data == "SAVED") {
                                  this.editCtrl.create({
                                      message:"Last name has been changed!"
                                  });
                              }
                              else{
                                  this.editCtrl.create({
                                      message:"Change failed!"
                                  });
                              }
                          })
                      console.log('Saved clicked');
                  }
              }
          ]
      });
      edit.present();
  }
  gender_edit(){
      let edit = this.editCtrl.create()
      edit.setTitle('Gender');
      edit.addInput({
          type:'radio',
          label:'Female',
          value:'Female'
      });
      edit.addInput({
          type:'radio',
          label:'Male',
          value:'Male'
      });
      edit.addInput({
          type:'radio',
          label:'Non-Binary',
          value:'Non-Binary'
      });
      edit.addInput({
          type:'radio',
          label:'Agender',
          value:'Agender'
      });
      edit.addInput({
          type:'radio',
          label:'Bigender',
          value:'Bigender'
      });
      edit.addInput({
          type:'radio',
          label:'Prefer not to say',
          value:'NA'
      });
      edit.addButton('Cancel');
      edit.addButton({
          text: 'Save',
          handler: gender => {
              this.genderlist = gender;
              let myheaders = new HttpHeaders({ });
              this.http.post("http://localhost:3000/viewprofile", {key: 'SEX',value:this.genderlist},{headers: myheaders, responseType:'text'})
                  .subscribe((data)=>{
                      if (data == "SAVED") {
                          this.editCtrl.create({
                              message:"Last name has been changed!"
                          });
                      }
                      else{
                          this.editCtrl.create({
                              message:"Change failed!"
                          });
                      }
                  })
              console.log('Saved clicked');

          }
      });
      edit.present();
  }

  dob_edit(){
      let myheaders =new HttpHeaders({});
      this.http.post("http://localhost:3000/viewprofile",{key:'BIRTH_DAY',value:this.dob},{headers: myheaders, responseType:'text'})
          .subscribe((data)=>{
              if (data == "SAVED") {
                  this.editCtrl.create({
                      message:"Birthday has been changed!"
                  });
              }
              else{
                  this.editCtrl.create({
                      message:"Change failed!"
                  });
              }
          })
      console.log('Saved clicked');
  }
  income_edit() {
      let edit = this.editCtrl.create({
          title: 'Income',
          message: 'Enter your new Income',
          inputs:[
              {
                  id:'income',
                  name:'income',
                  placeholder:'Income'
              }
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      let jsondata = JSON.parse(JSON.stringify(data));
                      this.income = jsondata['income'];
                      let myheaders = new HttpHeaders({ });
                      this.http.post("http://localhost:3000/viewprofile", {key: 'INCOME',value:this.lastname},{headers: myheaders, responseType:'text'})
                          .subscribe((data)=>{
                              if (data == "SAVED") {
                                  this.editCtrl.create({
                                      message:"Income has been changed!"
                                  });
                              }
                              else{
                                  this.editCtrl.create({
                                      message:"Change failed!"
                                  });
                              }
                          })
                      console.log('Saved clicked');
                  }
              }
          ]
      });
      edit.present();
  }
  password_edit() {
      // document.getElementById("password").removeAttribute("readonly");
      let edit = this.editCtrl.create({
          title: 'Password',
          message: 'Enter your old password and new password',
          inputs:[
              {
                  id:'opassword',
                  name:'opassword',
                  placeholder:'Old password'
              },
              {
                  id:'npassword',
                  name:'npassword',
                  placeholder:'New password'
              },
              {
                  id:'npassword',
                  name:'npassword',
                  placeholder:'Confirm password'
              }
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      console.log('Saved clicked');
                  }
              }
          ]
      });
      edit.present();
  }
  logout(){
    this.navCtrl.parent.parent.push(LoginPage);
  }
  ngOnInit(){
      this.http.get("http://localhost:3000/viewprofile").subscribe(data=>{
          let jsond = data[0];
          this.password=JSON.stringify(jsond['PASSWORD']);
          this.firstname=JSON.stringify(jsond['FIRST_NAME']);
          this.lastname=JSON.stringify(jsond['LAST_NAME']);
          this.dob=JSON.stringify(jsond["BIRTH_DAY"]);
          this.age=JSON.stringify(jsond["AGE"]);
          this.genderlist=JSON.stringify(jsond["SEX"]);
          this.income=JSON.stringify(jsond["INCOME"]);




      });
  }
}

