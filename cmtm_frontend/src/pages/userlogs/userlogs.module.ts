import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserlogsPage } from './userlogs';

@NgModule({
  declarations: [
    UserlogsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserlogsPage),
  ],
})
export class UserlogsPageModule {}
