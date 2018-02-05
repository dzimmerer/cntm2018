import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ChallengeServiceProvider} from "../../providers/challenge-service/challenge-service";
import {ChallengedetailPage} from "../challengedetail/challengedetail";
import {AlertController} from "ionic-angular/components/alert/alert-controller";

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

  openC: any;
  closedC: any;

  username: any;
  token: any;
  admin: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private csp: ChallengeServiceProvider,
              public alertCtrl: AlertController) {

    this.username = window.localStorage.getItem('username');
    this.token = window.localStorage.getItem('token');
    this.admin = window.localStorage.getItem('admin');


    this.csp.get_challenge_list(this.username, this.token).then((result) => {

      this.openC = result["open"];
      this.closedC = result["closed"];

    }, (err) => {
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChallengesPage');
  }

  onChallenge(cid: string) {
    console.log(cid);

    this.navCtrl.push(ChallengedetailPage, {
      cid: cid
    });

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
            this.csp.add_challenge_data(this.username, this.token, data.inpt).then((result) => {
              this.navCtrl.setRoot(this.navCtrl.getActive().component);
            });
            console.log('Add clicked');
          }
        }
      ]
    });
    prompt.present();
  }
}
