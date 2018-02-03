import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";

/**
 * Generated class for the ModelwallPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modelwall',
  templateUrl: 'modelwall.html',
})
export class ModelwallPage {

  models: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private usp: UserServiceProvider) {

    let username = window.localStorage.getItem('username');
    let token = window.localStorage.getItem('token');

    this.usp.get_gntm_models(username, token).then((result) => {

      this.models = result["models"]

    }, (err) => {
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModelwallPage');
  }

  openLink(param: string) {
    window.open(param, '_system', 'location=yes');
  }
}
