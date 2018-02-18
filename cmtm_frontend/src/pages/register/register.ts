import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators} from '@angular/forms';
import {HomePage} from "../home/home";
import {LoadingController} from "ionic-angular/components/loading/loading-controller";
import {ToastController} from "ionic-angular/components/toast/toast-controller";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {MenuController} from "ionic-angular/components/app/menu-controller";
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  authForm: any;
  loading: any;


  constructor(public nav: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
              private loadingCtrl: LoadingController, private toastCtrl: ToastController,
              private usp: UserServiceProvider, private menu: MenuController) {


    this.nav = nav;

    this.authForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9]*'), Validators.minLength(6), Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9._-]*@[a-zA-Z0-9._-]*.[a-z]*'), Validators.minLength(6)])]
    });

  }
  onRegister(value: any): void {

    if(this.authForm.valid) {

      this.showLoader();
      this.usp.register(value.username, value.password, value.email).then((result) => {
        this.loading.dismiss();

        if("success" in result && result["success"] == 1){
          // console.log("Welcome!!!");
          window.localStorage.setItem('token', result["token"]);
          window.localStorage.setItem('username', result["username"]);
          window.localStorage.setItem('admin', 0 + "");
          this.nav.setRoot(HomePage);
        }
        else{
          this.presentToast("Could not Register!");
          // console.log("WTf????");
        }

      }, (err) => {
        this.loading.dismiss();
        this.presentToast("Error");
      });

    }

  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Creating Account...'
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

  ionViewDidLoad() {

    this.menu.swipeEnable(false);

    // console.log('ionViewDidLoad RegisterPage');
  }

}
