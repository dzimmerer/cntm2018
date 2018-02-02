import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {ProfilePage} from '../pages/profile/profile';
import {LoginPage} from "../pages/login/login";
import {RankingPage} from "../pages/ranking/ranking";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Profile', component: ProfilePage },
      { title: 'Ranking', component: RankingPage }
    ];

  }

  checkPreviousAuthorization(): void {
    if((window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username') === null) &&
      (window.localStorage.getItem('token') === "undefined" || window.localStorage.getItem('token') === null)) {
      this.rootPage = LoginPage;
    } else {
      this.rootPage = HomePage;
    }
  }


  logout(): void {
    window.localStorage.setItem('token', "undefined");
    window.localStorage.setItem('username', "undefined");
    this.nav.setRoot(LoginPage)
  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkPreviousAuthorization();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
