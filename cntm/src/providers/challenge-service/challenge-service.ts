import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



let apiUrl = 'http://cntm.cfapps.eu10.hana.ondemand.com/';


@Injectable()
export class ChallengeServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ChallengeServiceProvider Provider');
  }


  get_challenge_list(username, token){
    return new Promise((resolve, reject) => {

      let get_params = "?username="+username+"&token="+token;

      this.http.get(apiUrl+'challenge_list' + get_params)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  get_challenge_data(username, token, cid){
    return new Promise((resolve, reject) => {

      let get_params = "?username="+username+"&token="+token+"&id="+cid;

      this.http.get(apiUrl+'challenge_data' + get_params)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  get_challenge_answers(username, token, cid){
    return new Promise((resolve, reject) => {

      let get_params = "?username="+username+"&token="+token+"&id="+cid;

      this.http.get(apiUrl+'challenge_answer' + get_params)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  give_challenge_answer(username, token, cid, text){
    return new Promise((resolve, reject) => {

      let get_params = "?username="+username+"&token="+token+"&id="+cid + "&text="+text;

      this.http.get(apiUrl+'give_answer' + get_params)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }



}
