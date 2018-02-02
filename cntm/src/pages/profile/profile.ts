import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {AlertController} from "ionic-angular/components/alert/alert-controller";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  username: any;
  token: any;
  img_url: any;
  descr: any;
  real_name: any;
  age: any;
  hair: any;
  eye: any;
  hobbies: any;
  score: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private usp: UserServiceProvider,
              public alertCtrl: AlertController) {

    // If we navigated to this page, we will have an item available as a nav param

    this.username = window.localStorage.getItem('username');
    this.token = window.localStorage.getItem('token');

    this.usp.get_user_data(this.username, this.token).then((result) => {


      if("username" in result) {

        console.log(result.username);

        this.img_url = result.img_url;

        if(!(this.img_url.startsWith("http") || this.img_url.startsWith("www"))){
          this.img_url = this.usp.get_api_url() + this.img_url;
        }

        this.descr = result.descr;
        this.real_name = result.real_name;
        this.age = result.age;
        this.hair = result.hair;
        this.eye = result.eye;
        this.hobbies = result.hobbies;
        this.score = result.score;
      }

    }, (err) => {
    });



  }

  chVal(name: string, title:string) {
    let prompt = this.alertCtrl.create({
      title: title,
      inputs: [
        {name: 'inpt',
          value: this[name] },
      ],
      buttons: [
        { text: 'Cancel', },
        { text: 'Save',
          handler: data => {
            this[name] = data.inpt;
            this.usp.update_user_data(this.username, this.token, name, data.inpt);
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }




}
