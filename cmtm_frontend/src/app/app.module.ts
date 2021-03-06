import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ProfilePage } from '../pages/profile/profile';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import { UserServiceProvider } from '../providers/user-service/user-service';
import {ToastController} from "ionic-angular/components/toast/toast-controller";
import {LoadingController} from "ionic-angular/components/loading/loading-controller";
import { HttpClientModule } from '@angular/common/http';
import {FileChooser} from "@ionic-native/file-chooser";
import {RankingPage} from "../pages/ranking/ranking";
import {UserdetailPage} from "../pages/userdetail/userdetail";
import {ChallengesPage, ChallengesTabs} from "../pages/challenges/challenges";
import { ChallengeServiceProvider } from '../providers/challenge-service/challenge-service';
import {ChallengedetailPage} from "../pages/challengedetail/challengedetail";
import {HomePage} from "../pages/home/home";
import {ModelwallPage} from "../pages/modelwall/modelwall";
import { IonicImageViewerModule } from 'ionic-img-viewer';
import {UsertabsPage} from "../pages/usertabs/usertabs";
import {UserchallengesPage} from "../pages/userchallenges/userchallenges";
import {UseranswersPage} from "../pages/useranswers/useranswers";
import {UserlogsPage} from "../pages/userlogs/userlogs";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    RankingPage,
    LoginPage,
    RegisterPage,
    UserdetailPage,
    ChallengesPage,
    ChallengedetailPage,
    ModelwallPage,
    ChallengesTabs,
    UsertabsPage,
    UserchallengesPage,
    UseranswersPage,
    UserlogsPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicImageViewerModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    RankingPage,
    LoginPage,
    RegisterPage,
    UserdetailPage,
    ChallengesPage,
    ChallengedetailPage,
    ModelwallPage,
    ChallengesTabs,
    UsertabsPage,
    UserchallengesPage,
    UseranswersPage,
    UserlogsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    ChallengeServiceProvider,
    LoadingController,
    ToastController,
    FileChooser,
    ChallengeServiceProvider,
  ]
})
export class AppModule {}
