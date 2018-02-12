import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import {ChallengeServiceProvider} from "../../providers/challenge-service/challenge-service";
import {ChallengedetailPage} from "../challengedetail/challengedetail";
import {AlertController} from "ionic-angular/components/alert/alert-controller";
import { Platform } from 'ionic-angular';

/**
 * Generated class for the ChallengesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-challenges',
  templateUrl: 'challenges.html',
})
export class ChallengesPage {

  isAndroid: boolean = false;

  challenges: any;
  c_stng: any;

  username: any;
  token: any;
  admin: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private csp: ChallengeServiceProvider,
              public alertCtrl: AlertController, public platform: Platform, public appCtrl: App) {

    this.isAndroid = platform.is('android');
    this.c_stng = this.navParams.data;

    this.username = window.localStorage.getItem('username');
    this.token = window.localStorage.getItem('token');
    this.admin = window.localStorage.getItem('admin');


    this.csp.get_challenge_list(this.username, this.token).then((result) => {

      this.challenges = result[this.c_stng];

    }, (err) => {
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChallengesPage');
  }

  onChallenge(cid: string) {
    this.appCtrl.getRootNav().push(ChallengedetailPage, {
      cid: cid
    });
    // this.navCtrl.push(ChallengedetailPage, {
    //   cid: cid
    // });

  }

  addChallenge() {
    let prompt = this.alertCtrl.create({
      title: "Add new Challenge:",
      inputs: [
        {name: 'inpt',
          value: "" },
      ],
      buttons: [
        { text: 'Cancel', },
        { text: 'Add',
          handler: data => {
            if(data.inpt != "") {
              this.csp.add_challenge_data(this.username, this.token, data.inpt).then((result) => {
                if (result["success"] == 1) {
                  this.appCtrl.getRootNav().push(ChallengedetailPage, {
                    cid: result["cid"]
                  });
                }
              });
            }
            console.log('Add clicked');
          }
        }
      ]
    });
    prompt.present();
  }

}


@Component({
  selector: 'page-challengesstart',
  templateUrl: 'challengesTabs.html',})
export class ChallengesTabs {
  rootPage = ChallengesPage;
  community = "community";
  special = "special";
  closed = "closed"
}
