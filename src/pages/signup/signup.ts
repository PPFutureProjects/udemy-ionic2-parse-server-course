import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../user-model';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  user: User = {
    name: "",
    username: "",     // required
    email: "",
    password: ""      // required
  };

  confirmPassword: string;
  url: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  goToLogin(){
    this.navCtrl.pop();
  }

}
