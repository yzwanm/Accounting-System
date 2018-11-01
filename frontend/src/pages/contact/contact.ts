import { Component } from '@angular/core';
import {AlertController, NavController, ToastController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

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


  profilelist = [];
  firstname: string;
  lastname: string;
  passwordlist: string;
  genderlist: string;
  ionViewDidLoad() {
    this.profilelist = this.getProfile();
  }
  private getProfile() {
    return [
        {
          username: "Bob",
          password: '102345',
          fname:'Smith'
        }];
  }


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
                      this.http.post("http://localhost:3000/viewprofile", jsondata,{headers: myheaders, responseType:'text'})
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
                      this.http.post("http://localhost:3000/viewprofile", jsondata,{headers: myheaders, responseType:'text'})
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
              console.log('Radio data:', gender);
              this.genderlist = gender;
          }
      });
      edit.present();
  }
  dob_edit(){
      let edit = this.editCtrl.create({
          title: 'Date of birth',
          message: 'Chooser your birthday',

          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: dob => {
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
}

