import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {RankingPage} from "../pages/ranking/ranking";
import {ChallengesTabs} from "../pages/challenges/challenges";
import {ModelwallPage} from "../pages/modelwall/modelwall";
import {UsertabsPage} from "../pages/usertabs/usertabs";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  lastBack: any = 0;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public app: App) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'User', component: UsertabsPage },
      { title: 'Ranking', component: RankingPage },
      { title: 'Challenges', component: ChallengesTabs },
      { title: 'Model Wall', component: ModelwallPage },
    ];

    platform.registerBackButtonAction(() => {
      const overlay = this.app._appRoot._overlayPortal.getActive();
      const nav = this.app.getActiveNav();

      if(overlay && overlay.dismiss) {
        overlay.dismiss();
      } else if(nav.canGoBack()){
        nav.pop();
      } else if(Date.now() - this.lastBack < 500) {
        this.platform.exitApp();
      }
      this.lastBack = Date.now();
    });

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
