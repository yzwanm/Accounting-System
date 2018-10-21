import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  profilelist = [];
  ionViewDidLoad() {
    this.profilelist = this.getProfile();
  }
  private getProfile() {
    return [
      {
        username: "Bob",
        password: '102345',
      }
    ];
  }
  constructor(public navCtrl: NavController) {

  }
  logout(){
    this.navCtrl.parent.parent.push(LoginPage);
  }
}


