import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {ChallengeServiceProvider} from "../../providers/challenge-service/challenge-service";

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

  username: any;
  token: any;
  admin: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private usp: UserServiceProvider,
              private csp: ChallengeServiceProvider) {

    this.username = window.localStorage.getItem('username');
    this.token = window.localStorage.getItem('token');
    this.admin = window.localStorage.getItem('admin');

    this.usp.get_gntm_models(this.username, this.token).then((result) => {

      this.models = result["models"];

      this.csp.get_label_answer_count(this.username, this.token, "Honey").then((result) => {
        if("elem_count" in result){
          const res = result["elem_count"];
          this.models.forEach(function(m) {
            if(m["name"] in res){
              m["honey"] = res[m["name"]];
            }
            else{
              m["honey"] = 0;
            }
          });
        }
      }, (err) => {
      });

      this.csp.get_label_answer_count(this.username, this.token, "Trump").then((result) => {
        if("elem_count" in result){
          const res = result["elem_count"];
          this.models.forEach(function(m) {
            if(m["name"] in res){
              m["trump"] = res[m["name"]];
            }
            else{
              m["trump"] = 0;
            }
          });
        }
      }, (err) => {
      });

    }, (err) => {
    });



  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ModelwallPage');
  }

  openLink(param: string) {
    window.open(param, '_system', 'location=yes');
  }

  toggleActive(id, i) {
    const curVal = this.models[i]["out"];
    let newVal = 0;
    if(curVal == 0){
      newVal = 1;
    }
    this.csp.update_topmodel_data(this.username, this.token, this.models[i]["id"], "out", newVal);
    this.models[i]["out"] = newVal;
    // console.log(i, id)

  }
}
