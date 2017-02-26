import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  headers: Headers;
  url: string;
  friends: any[];
  userId: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
    public navParams: NavParams, public http: Http, public localStorage: Storage) {
    // Initialize the headers object
    this.headers = new Headers();
    this.headers.append("X-Parse-Application-Id", "AppId1");
    this.headers.append("X-Parse-Master-Key", "masterKey");

    this.localStorage.get('user').then((value) => {
      this.userId = value;
      this.getFriends();
      })
    }

  showAddDialog() {
    this.alertCtrl.create({
      title: "Add Friend",
      message: "Enter the information of your friend",
      inputs: [{
        name: 'name',
        placeholder: 'Enter the name'
      },{
        name: 'email',
        placeholder: 'Enter the email'
      },
      {
        name: "number",
        placeholder: "Enter the number"
      }
      ],
      buttons:[
        {
          text: "Cancel"
        },{
          text: "Save",
          handler: data => {
            // post the information to parse server
            this.url ="https://parse-with-ionic-bdegroot.c9users.io/app1/classes/friendslist";
            
            this.http.post(this.url, {
              owner: this.userId, 
              name: data.name, 
              email: data.email, 
              number: data.number, 
              image: "http://lorempixel.com/32/32" }, {headers: this.headers}).map(res => res.json())
              .subscribe(res => {
              console.log(res);
              this.alertCtrl.create({
                title: "Success",
                message: "Friend information saved successfully.",
                buttons: [{
                  text: "OK",
                  handler: () => {
                    this.getFriends();
                  }
                }]
              }).present();
            },
            err =>{
              console.log(err);
              this.alertCtrl.create({
                title: "Error",
                message: err.text(),
                buttons: [{
                  text: "OK"
                }]
              }).present();
            })
          }
        }
      ]
    }).present();
  }

  getFriends() {
      // Url with single quotes as we need to specify a condition
     this.url ='https://parse-with-ionic-bdegroot.c9users.io/app1/classes/friendslist?where={"owner":"'+this.userId+'"}';

     this.http.get(this.url, {headers: this.headers}).map(res => res.json()).subscribe(res => {
      console.log(res);
      this.friends = res.results;
     },
     err => {
      console.log(err);
      this.alertCtrl.create({
        title: "Error", message: err.text(), buttons: [{
          text: "OK",
        }]}).present();
     })
  }

}
