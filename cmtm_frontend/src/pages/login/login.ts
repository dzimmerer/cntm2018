import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import {LoadingController} from "ionic-angular/components/loading/loading-controller";
import {ToastController} from "ionic-angular/components/toast/toast-controller";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {MenuController} from "ionic-angular/components/app/menu-controller";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  authForm: any;
  loading: any;
  data: any;


  constructor(public nav: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
              private loadingCtrl: LoadingController, private toastCtrl: ToastController, private menu: MenuController,
              private usp: UserServiceProvider) {


    this.nav = nav;

    this.authForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9]*'), Validators.minLength(6), Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });

  }

  ionViewDidLoad() {

    this.menu.swipeEnable(false);

    // console.log('ionViewDidLoad LoginPage');
  }

  onLogin(value: any): void {

    if(this.authForm.valid) {

      this.showLoader();
      this.usp.login(value.username, value.password).then((result) => {
        this.loading.dismiss();
        this.data = result;

        // console.log(result);

        if("success" in result && result["success"] == 1){
          // console.log("Welcome!!!");
          window.localStorage.setItem('token', result["token"]);
          window.localStorage.setItem('username', result["username"]);
          window.localStorage.setItem('admin', result["admin"] + "");
          this.nav.setRoot(HomePage);
        }
        else{
          this.presentToast("Could not Login!");
          // console.log("WTf????");
        }

        // localStorage.setItem('token', this.data.access_token);

      }, (err) => {
        this.loading.dismiss();
        this.presentToast("Error");
      });

    }

  }

  goRegister() {
    this.nav.push(RegisterPage);
  }


  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Logging in...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      // console.log('Dismissed toast');
    });

    toast.present();
  }


}
