import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ChallengeServiceProvider} from "../../providers/challenge-service/challenge-service";
import {NavParams} from "ionic-angular/navigation/nav-params";
import {AlertController} from "ionic-angular/components/alert/alert-controller";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  news: any;

  username: any;
  token: any;
  admin: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private csp: ChallengeServiceProvider,
              public alertCtrl: AlertController) {

    this.username = window.localStorage.getItem('username');
    this.token = window.localStorage.getItem('token');
    this.admin = window.localStorage.getItem('admin');

    console.log("Admin: "+ this.admin);

    this.csp.get_news_data(this.username, this.token).then((result) => {
      this.news = result["news"]
    }, (err) => {
    });

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

  }

  addNews() {
    console.log('Add News');
    let prompt = this.alertCtrl.create({
      title: "Add new News",
      inputs: [
        {name: 'inpt',
          value: "" },
      ],
      buttons: [
        { text: 'Cancel', },
        { text: 'Add',
          handler: data => {
            this.csp.add_news_data(this.username, this.token, data.inpt).then((result) => {
              this.navCtrl.setRoot(this.navCtrl.getActive().component);
            });
            console.log('Add clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  deleteNews(id){
    let prompt = this.alertCtrl.create({
      title: "Delete ?",
      buttons: [
        { text: 'Cancel', },
        { text: 'OK',
          handler: () => {
            this.csp.delete_news_data(this.username, this.token, id).then((result) => {
              this.navCtrl.setRoot(this.navCtrl.getActive().component);
            });
          }
        }
      ]
    });
    prompt.present();
  }

  chVal(id, name: string, title:string, i:number) {
    console.log(this.news[i]);
    let prompt = this.alertCtrl.create({
      title: title,
      inputs: [
        {name: 'inpt',
          value: this.news[i][name] },
      ],
      buttons: [
        { text: 'Cancel', },
        { text: 'Save',
          handler: data => {
            this.news[i][name] = data.inpt;
            this.csp.update_news_data(this.username, this.token, id, name, data.inpt);
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }


}
