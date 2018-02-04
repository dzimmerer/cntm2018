import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ChallengeServiceProvider} from "../../providers/challenge-service/challenge-service";
import {AlertController} from "ionic-angular/components/alert/alert-controller";

/**
 * Generated class for the ChallengedetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-challengedetail',
  templateUrl: 'challengedetail.html',
})
export class ChallengedetailPage {

  isShownArray: number[];

  username: any;
  token: any;

  cid: any;
  name: any;
  descr: any;
  choice: any;
  has_choice: any;
  open:any;
  img_url: any;
  c_text:any;

  c_anwser = "";
  ca_own = {};
  ca_other: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private csp: ChallengeServiceProvider,
              public alertCtrl: AlertController) {

    this.isShownArray = [];

    this.cid = navParams.get('cid');
    this.username = window.localStorage.getItem('username');
    this.token = window.localStorage.getItem('token');

    this.csp.get_challenge_data(this.username, this.token, this.cid).then((result) => {

      if("id" in result) {

        this.name = result["name"];
        this.descr = result["descr"];
        this.choice = result["choice"];
        this.has_choice = result["has_choice"];
        this.open = result["open"];
        this.img_url = result["img_url"];

        if(this.open == 1){
          this.c_text = 'open'
        }
        else{
          this.c_text = "closed."
        }

      }

    }, (err) => {
    });

    this.csp.get_challenge_answers(this.username, this.token, this.cid).then((result) => {

      if("other" in result) {
        this.ca_other = result["other"];
      }
      if("own" in result) {
        this.ca_own = result["own"];
        this.c_anwser = this.ca_own["text"];
      }

    }, (err) => {
    });




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChallengedetailPage');
  }

  doAnswer() {

    let alert = this.alertCtrl.create();
    alert.setTitle('Answer');

    if(this.has_choice == 1) {

      this.choice.forEach(function(element) {

        alert.addInput({
          type: 'radio',
          label: element,
          value: element,
          checked: false,
        });

      });

    }
    else if(this.has_choice == 2) {

      this.choice.forEach(function(element) {

        alert.addInput({
          type: 'checkbox',
          label: element,
          value: element,
          checked: false,
        });

      });

    }
    else{
      alert.addInput({
        type: 'text',
        name: 'inpt',
        value: this.c_anwser,
      })
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if(this.has_choice == 0) {
          data = data["inpt"]
        }
        // Update
        this.csp.give_challenge_answer(this.username, this.token, this.cid, data).then((result) => {
        }, (err) => {
        });

        let aimg_url = "";
        if("img_url" in this.ca_own){
          aimg_url = this.ca_own["img_url"]
        }
        this.ca_own = {"username": this.username,
                        "cid": this.cid,
                        "text": data,
                        "img_url": aimg_url};
        this.c_anwser = data;


      }
    });
    alert.present();

    console.log("Answer....")
  }


  isVisible(n: number){
    return this.isShownArray.includes(n);
  }

  toggleVisible(n: number){

    console.log("Set Visible");

    if(this.isShownArray.includes(n)) {
      const ind = this.isShownArray.indexOf(n);
      if (ind > -1) {
        this.isShownArray.splice(ind, 1);
      }
    }
    else{
      this.isShownArray.push(n)
    }
    console.log(this.isShownArray);
  }


}
