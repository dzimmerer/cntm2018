import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import {ProfilePage} from "../profile/profile";
import {UseranswersPage} from "../useranswers/useranswers";
import {UserchallengesPage} from "../userchallenges/userchallenges";
import {UserlogsPage} from "../userlogs/userlogs";

/**
 * Generated class for the UsertabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usertabs',
  templateUrl: 'usertabs.html',})
export class UsertabsPage {
  profilePage = ProfilePage;
  uchallengePage = UserchallengesPage;
  uanswerPage = UseranswersPage;
  ulogPage = UserlogsPage;
}

