import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {AlertController} from "ionic-angular/components/alert/alert-controller";
import {RankingPage} from "../ranking/ranking";

/**
 * Generated class for the UserdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userdetail',
  templateUrl: 'userdetail.html',
})
export class UserdetailPage {

  other: any;
  username: any;
  token: any;
  admin: any;

  img_url: any;
  descr: any;
  age: any;
  hair: any;
  eye: any;
  hobbies: any;
  score: any;
  real_name: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private usp: UserServiceProvider,
              public alertCtrl: AlertController) {

    this.other = navParams.get('other');

    console.log(this.other);


    this.username = window.localStorage.getItem('username');
    this.token = window.localStorage.getItem('token');
    this.admin = window.localStorage.getItem('admin');


    this.usp.get_other_user_detail(this.username, this.token, this.other).then((result) => {

      if("username" in result) {

        console.log(result["username"]);

        this.img_url = result["img_url"];

        if(!(this.img_url.startsWith("http") || this.img_url.startsWith("www"))){
          this.img_url = this.usp.get_api_url() + this.img_url;
        }

        this.descr = result["descr"];
        this.age = result["age"];
        this.hair = result["hair"];
        this.eye = result["eye"];
        this.hobbies = result["hobbies"];
        this.score = parseInt(result["score"]);

        if(this.admin == '1'){
          this.real_name = result["real_name"];
        }

      }

    }, (err) => {
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserdetailPage');
  }

  changePoints() {
    let prompt = this.alertCtrl.create({
      title: "Add Points",
      inputs: [
        {name: 'inpt',
          type: 'number'
        },
      ],
      buttons: [
        { text: 'Cancel', },
        { text: 'Save',
          handler: data => {
            this.score += parseInt(data.inpt);
            this.usp.update_other_user_data(this.username, this.token, this.other, "score", this.score);
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  deleteUser() {
    let prompt = this.alertCtrl.create({
      title: "Delete ?",
      buttons: [
        { text: 'Cancel', },
        { text: 'OK',
          handler: () => {
            this.usp.delete_user_data(this.username, this.token, this.other).then((result) => {
              this.navCtrl.setRoot(RankingPage);
            });
          }
        }
      ]
    });
    prompt.present();
  }
}
