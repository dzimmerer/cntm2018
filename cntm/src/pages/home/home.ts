import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ChallengeServiceProvider} from "../../providers/challenge-service/challenge-service";
import {NavParams} from "ionic-angular/navigation/nav-params";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  news: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private csp: ChallengeServiceProvider) {

    let username = window.localStorage.getItem('username');
    let token = window.localStorage.getItem('token');

    this.csp.get_news_data(username, token).then((result) => {

      this.news = result["news"]

    }, (err) => {
    });

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

  }

}
