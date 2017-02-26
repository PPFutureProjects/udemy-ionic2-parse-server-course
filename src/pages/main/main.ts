import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams) {}

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
          }
        }
      ]
    }).present();
  }

}
