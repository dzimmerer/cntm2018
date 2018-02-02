import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import { UserServiceProvider } from '../providers/user-service/user-service';
import {ToastController} from "ionic-angular/components/toast/toast-controller";
import {LoadingController} from "ionic-angular/components/loading/loading-controller";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {FileChooser} from "@ionic-native/file-chooser";
import {RankingPage} from "../pages/ranking/ranking";



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    RankingPage,
    LoginPage,
    RegisterPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    RankingPage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    LoadingController,
    ToastController,
    FileChooser,
  ]
})
export class AppModule {}
