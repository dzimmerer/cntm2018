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

  c_anwser:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private csp: ChallengeServiceProvider,
              public alertCtrl: AlertController) {

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
    else{
      alert.addInput({
        type: 'text',
        name: 'inpt'
      })
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if(this.has_choice == 0) {
          data = data["inpt"]
        }
        this.c_anwser = data;

        // Update
        console.log(this.c_anwser)
      }
    });
    alert.present();

    console.log("Answer....")
  }
}
