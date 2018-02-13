import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Navbar, Platform } from 'ionic-angular';
import {ChallengeServiceProvider} from "../../providers/challenge-service/challenge-service";
import {AlertController} from "ionic-angular/components/alert/alert-controller";
import {ChallengesTabs} from "../challenges/challenges";
import {UserdetailPage} from "../userdetail/userdetail";

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


  @ViewChild('navbar') navBar: Navbar;

  isShownArray: number[];

  username: any;
  token: any;
  admin: any;

  cid: any;
  name: any;
  descr: any;
  choice: any;
  choice_list: any;
  has_choice: any;
  open:any;
  img_url: any;
  type: any;
  answer: any;
  creator: any;
  points: any;
  cadmin: any;

  etime = {
    "time": "",
    "date": ""
  };
  embet: any;


  c_anwser = "";
  ca_own = {};
  ca_other: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private csp: ChallengeServiceProvider,
              public alertCtrl: AlertController, public appCtrl: App, private platform: Platform) {

    this.isShownArray = [];

    this.cid = navParams.get('cid');
    this.username = window.localStorage.getItem('username');
    this.token = window.localStorage.getItem('token');
    this.admin = window.localStorage.getItem('admin');

    this.cadmin = this.admin;

    this.csp.get_challenge_data(this.username, this.token, this.cid).then((result) => {

      if("id" in result) {

        this.name = result["name"];
        this.descr = result["descr"];
        this.choice = result["choice"];
        this.choice_list = result["choice_list"];
        this.has_choice = result["has_choice"];
        this.open = result["open"];
        this.img_url = result["img_url"];
        this.type = result["type"];
        this.answer = result["answer"];
        this.creator = result["creator"];
        this.points = result["points"];

        this.embet = this.type == 2;

        if(this.creator == this.username){
          this.cadmin = '1';
        }
        if(result["etime"] != ""){
          console.log(result["etime"]);
          const split_time = result["etime"].split(" ");
          this.etime.time = split_time[0];
          this.etime.date = split_time[1];
        }

      }

    }, (err) => {
    });

    this.set_ch_answers();

    this.platform.registerBackButtonAction(() => this.willLeave(), 2)



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChallengedetailPage');
  }

  set_ch_answers() {

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


  doAnswer() {

    let alert = this.alertCtrl.create();
    alert.setTitle('Answer');

    if(this.has_choice == 1) {

      this.choice_list.forEach(function(element) {

        alert.addInput({
          type: 'radio',
          label: element,
          value: element,
          checked: false,
        });

      });

    }
    else if(this.has_choice == 2) {

      this.choice_list.forEach(function(element) {

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
        if(data) {
          // Update
          this.csp.give_challenge_answer(this.username, this.token, this.cid, data).then((result) => {
            this.set_ch_answers();
          }, (err) => {
          });
        }

      }
    });
    alert.present();

    console.log("Answer....")
  }


  spentPoints(param) {

      if(param == -1 && this.ca_own["points"] == 0){
        return;
      }

      // Update
      this.csp.give_challenge_answer_points(this.username, this.token, this.cid, param).then((result) => {

        if(result["success"] == 1){
          this.ca_own["points"] += param;
          this.points += param;
        }

      }, (err) => {
      });

  }


  isVisible(n: number){
    return this.isShownArray.includes(n);
  }

  toggleVisible(n: number){

    if(this.isShownArray.includes(n)) {
      const ind = this.isShownArray.indexOf(n);
      if (ind > -1) {
        this.isShownArray.splice(ind, 1);
      }
    }
    else{
      this.isShownArray.push(n)
    }
  }

  chVal(name: string, title:string) {
    let prompt = this.alertCtrl.create({
      title: title,
      inputs: [
        {name: 'inpt',
          value: this[name] },
      ],
      buttons: [
        { text: 'Cancel', },
        { text: 'Save',
          handler: data => {
            this[name] = data.inpt;
            this.csp.update_challenge_data(this.username, this.token, this.cid, name, data.inpt);
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  chPoints() {

    let prompt = this.alertCtrl.create({
      title: "New Points",
      inputs: [
        {name: 'inpt',
          value: this.points },
      ],
      buttons: [
        { text: 'Cancel', },
        { text: 'Save',
          handler: data => {

            this.csp.has_challenge_answer_points(this.username, this.token, this.cid, data.inpt-this.points).then((result) => {
              if (result["success"] == 1) {
                this.csp.update_challenge_data(this.username, this.token, this.cid, "points", data.inpt);
                this.points = data.inpt;
              }
              else{
                let alert = this.alertCtrl.create({
                  title: 'Not enough points',
                  buttons: ['OK']
                });
                alert.present();
              }
            });
          }
        }
      ]
    });
    prompt.present();
  }


  deleteChallenge() {
    let prompt = this.alertCtrl.create({
      title: "Delete ?",
      buttons: [
        { text: 'Cancel', },
        { text: 'OK',
          handler: () => {
            this.csp.delete_challenge_data(this.username, this.token, this.cid).then((result) => {
              this.navCtrl.setRoot(ChallengesTabs);
            });
          }
        }
      ]
    });
    prompt.present();
  }

  frwdToUser(uname: string) {
    this.navCtrl.push(UserdetailPage, {
      other: uname
    });
  }

  evalChallenge() {

    if(this.answer == ""){
        let alert = this.alertCtrl.create({
          title: 'Please insert solution first!',
          buttons: ['OK']
        });
        alert.present();
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Are you sure?',
        message: 'If you distribute points the challenge is over and you can not change it anymore.',
        buttons: [
          { text: 'Cancel', },
          {
            text: 'Yes',
            handler: () => {
              this.csp.eval_challenge(this.username, this.token, this.cid).then((result) => {
                if(result["success"] == 1) {
                  this.open = 2;
                  this.csp.update_challenge_data(this.username, this.token, this.cid, "open", 2);
                  console.log("Distributed Points.....");
                }
              });
            }
          }
        ]
      });
      alert.present();
    }

  }

  toggleOpen() {

    if(this.open < 2) {

      let alert = this.alertCtrl.create();
      alert.setTitle('Open');
      alert.addInput({
        type: 'radio',
        label: 'Open',
        value: '0',
        checked: this.open == 0,
      });

      alert.addInput({
        type: 'radio',
        label: 'Closed',
        value: '1',
        checked: this.open == 1,
      });


      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: data => {

          // Update
          this.open = data;
          this.csp.update_challenge_data(this.username, this.token, this.cid, "open", data);

        }
      });
      alert.present();

    }

  }


  makePublic() {

    if(this.open == -1) {
      this.open = 0;
      this.csp.update_challenge_data(this.username, this.token, this.cid, "open", 0);
    }

  }


  setEndTime(param) {

    if(this.etime.time != "" && this.etime.date != ""){

      const time_str = this.etime.time + " " + this.etime.date;
      this.csp.update_challenge_data(this.username, this.token, this.cid, "etime", time_str);

    }
    else{
      if(param == 1) {
        let alert = this.alertCtrl.create({
          title: 'Please give a end time and date first!',
          buttons: ['OK']
        });
        alert.present();
      }
    }

  }

  deleteEndTime() {
    this.etime.time = "";
    this.etime.date = "";
    this.csp.update_challenge_data(this.username, this.token, this.cid, "etime", "");

  }

  changeEmBet() {
    if(this.embet){
      this.type = 2;
      this.csp.update_challenge_data(this.username, this.token, this.cid, "type", 2);
    }
    else{
      this.type = 1;
      this.csp.update_challenge_data(this.username, this.token, this.cid, "type", 1);
    }
    console.log(this.type);
  }

  setSolution() {
    if(this.type == 2){
      let alert = this.alertCtrl.create();
      alert.setTitle('Open');
      alert.addInput({
        type: 'radio',
        label: 'Won',
        value: '0',
      });

      alert.addInput({
        type: 'radio',
        label: 'Lost',
        value: '1',
      });


      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: data => {

          // Update
          this.answer = data;
          this.csp.update_challenge_data(this.username, this.token, this.cid, "answer", data);

        }
      });
      alert.present();
    }
  }

  doBetAgainst() {
    if(this.type == 2 && this.c_anwser == "") {
      let alert = this.alertCtrl.create();
      alert.setTitle('Make your Bet');
      alert.setSubTitle('Are you sure you want to bet '+ this.points + ' Points ?');
      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: () => {
          // Update
          this.csp.has_challenge_answer_points(this.username, this.token, this.cid, this.points).then((result) => {
            if (result["success"] == 1) {
              this.csp.give_challenge_answer(this.username, this.token, this.cid, '1').then((result) => {
                this.csp.give_challenge_answer_points(this.username, this.token, this.cid, this.points);
                this.set_ch_answers();
              }, (err) => {
              });
            }
            else{
              let alert = this.alertCtrl.create({
                title: 'Not enough points',
                buttons: ['OK']
              });
              alert.present();
            }
          });

        }
      });
      alert.present();
    }
  }

  ionViewDidEnter() {
    this.navBar.backButtonClick = () => {
      this.willLeave();
    };

  }

  willLeave() {

    if(this.cadmin == 1 && this.open == -1) {

      console.log('Looks like I’m about to leave :(');
      let alert = this.alertCtrl.create({
        title: 'Are you sure you want to leave ?',
        message: 'If you leave now without publishing, the challenge will be lost.',
        buttons: [
          {text: 'Cancel',},
          {
            text: 'Yes',
            handler: () => {
              this.appCtrl.getRootNav().pop();
            }
          }
        ]
      });
      alert.present();

    }
    else if(this.cadmin == 1 && (this.open == 0 || this.open == 1)){
      this.appCtrl.getRootNav().pop();
      this.navCtrl.setRoot(ChallengesTabs);
    }
    else{
      this.appCtrl.getRootNav().pop();
    }
  }


}
