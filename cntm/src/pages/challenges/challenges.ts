import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ChallengeServiceProvider} from "../../providers/challenge-service/challenge-service";
import {ChallengedetailPage} from "../challengedetail/challengedetail";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private csp: ChallengeServiceProvider) {

    let username = window.localStorage.getItem('username');
    let token = window.localStorage.getItem('token');

    this.csp.get_challenge_list(username, token).then((result) => {

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
}
