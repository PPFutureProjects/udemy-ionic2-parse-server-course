import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  headers: Headers;
  url: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
    public navParams: NavParams, public http: Http) {
    // Initialize the headers object
    this.headers = new Headers();
    this.headers.append("X-Parse-Application-Id", "AppId1");
    this.headers.append("X-Parse-Master-Key", "masterKey");
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
              name: data.name, 
              email: data.email, 
              number: data.number, 
              image: "http://lorempixel.com/32/32" }, {headers: this.headers}).map(res => res.json())
              .subscribe(res => {
              console.log(res);
            },
            err =>{
              console.log(err);
            })
          }
        }
      ]
    }).present();
  }

}
