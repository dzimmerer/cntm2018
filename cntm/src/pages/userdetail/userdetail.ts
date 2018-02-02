import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";

/**
 * Generated class for the UserdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userdetail',
  templateUrl: 'userdetail.html',
})
export class UserdetailPage {

  other: any;
  username: any;
  token: any;

  img_url: any;
  descr: any;
  age: any;
  hair: any;
  eye: any;
  hobbies: any;
  score: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private usp: UserServiceProvider) {

    this.other = navParams.get('other');

    console.log(this.other);


    this.username = window.localStorage.getItem('username');
    this.token = window.localStorage.getItem('token');

    this.usp.get_other_user_detail(this.username, this.token, this.other).then((result) => {

      if("username" in result) {

        console.log(result["username"]);

        this.img_url = result["img_url"];

        if(!(this.img_url.startsWith("http") || this.img_url.startsWith("www"))){
          this.img_url = this.usp.get_api_url() + this.img_url;
        }

        this.descr = result["descr"];
        this.age = result["age"];
        this.hair = result["hair"];
        this.eye = result["eye"];
        this.hobbies = result["hobbies"];
        this.score = result["score"];
      }

    }, (err) => {
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserdetailPage');
  }

}
