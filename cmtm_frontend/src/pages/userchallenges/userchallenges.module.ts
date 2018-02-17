import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserchallengesPage } from './userchallenges';

@NgModule({
  declarations: [
    UserchallengesPage,
  ],
  imports: [
    IonicPageModule.forChild(UserchallengesPage),
  ],
})
export class UserchallengesPageModule {}
