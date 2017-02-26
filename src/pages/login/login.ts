import { Component } from '@angular/core';

import { NavController, AlertController, NavParams } from 'ionic-angular';
import { User } from '../../user-model';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { SignupPage } from '../signup/signup';


@Component({
  templateUrl: 'login.html'
})
export class LoginPage {

  user: User = {
    username: "bdegroot",
    password: "abc"
  };

  url: string;
  headers: Headers;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http: Http) {
    // Initialize the headers object
    this.headers = new Headers();
    this.headers.append("X-Parse-Application-Id", "AppId1");
    this.headers.append("X-Parse-Master-Key", "masterKey");
  }

  goToSignUp() {
    this.navCtrl.push(SignupPage);
  }

  login() {
    // Check if username and password fields have valeus assigned to them
    if (!(this.user.username && this.user.password)) {
      this.alertCtrl
      .create({title: "Error", message: "Invalid username or password. Please retry", buttons: ['OK']})
      .present();
      return;
    }

    this.url = "https://parse-with-ionic-bdegroot.c9users.io/app1/login?username="
    +this.user.username+"&password="+this.user.password;

    this.http.get(this.url, {headers: this.headers}).subscribe(res => {
      console.log(res);
      // Navigate user to main app page.
    })          

  }

}
