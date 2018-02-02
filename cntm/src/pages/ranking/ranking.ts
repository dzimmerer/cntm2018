import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";

/**
 * Generated class for the RankingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
})
export class RankingPage {


  ranking: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private usp: UserServiceProvider) {

    let username = window.localStorage.getItem('username');
    let token = window.localStorage.getItem('token');

    this.usp.get_user_ranking(username, token).then((result) => {

      this.ranking = result["ranking"]

    }, (err) => {
    });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RankingPage');
  }

}
