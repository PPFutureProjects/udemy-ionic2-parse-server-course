import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { User } from '../../user-model';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  user: User = {
    name: "",         // optional
    email: "",        // optional
    username: "",     // required
    password: ""      // required
  };

  confirmPassword: string;
  url: string;
  headers: Headers;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
      public http: Http, public navParams: NavParams) {
    // Initialize the headers object
    this.headers = new Headers();
    this.headers.append("X-Parse-Application-Id", "AppId1");
    this.headers.append("X-Parse-Master-Key", "masterKey");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  goToLogin(){
    this.navCtrl.pop();
  }

/**
 * This method is responsible for handeling the sing up process.
 */
  signup() {
    // Check if both passwords match
    if (this.user.password != this.confirmPassword) {
      this.alertCtrl.create({
        title: "Error",
        message: "Passwords do not match, please try again.",
        buttons: ['OK']
      }).present();
      return;
    }

    this.url = "https://parse-with-ionic-bdegroot.c9users.io/app1/users"

    // Make Http post request to create a new user
    this.http.post(this.url, this.user, {headers: this.headers})
      .map(res => res.json())
      .subscribe(res => { // Login was successfull
        console.log(res);
        this.alertCtrl
          .create({
            title: "Success",
            message: "Congratulations. Your account has been created. Please login.", buttons: [{
            text: 'Login',
            handler: () => {
              this.navCtrl.pop(); // Take the user back to the login page
            }
          }]})
          .present();
      },
      err => { // Login was unsuccessfull
        console.log(err);
        this.alertCtrl
        .create({ title: "Error", message: err.text(), buttons: [{ 
          text: 'OK',
        }]})
        .present();
      })
  }
}
