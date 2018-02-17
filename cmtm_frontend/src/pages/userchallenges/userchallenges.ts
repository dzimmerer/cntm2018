import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import {AlertController} from "ionic-angular/components/alert/alert-controller";
import { Platform } from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {ChallengedetailPage} from "../challengedetail/challengedetail";

/**
 * Generated class for the UserchallengesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userchallenges',
  templateUrl: 'userchallenges.html',
})
export class UserchallengesPage {


  challenges: any;

  username: any;
  token: any;
  admin: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private usp: UserServiceProvider,
              public alertCtrl: AlertController, public platform: Platform, public appCtrl: App) {

    this.username = window.localStorage.getItem('username');
    this.token = window.localStorage.getItem('token');
    this.admin = window.localStorage.getItem('admin');


    this.usp.get_user_challenges(this.username, this.token).then((result) => {
      this.challenges = result["challenges"];
    }, (err) => {
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserchallengesPage');
  }

  onChallenge(cid: string) {
    this.appCtrl.getRootNav().push(ChallengedetailPage, {
      cid: cid
    });
  }

}
