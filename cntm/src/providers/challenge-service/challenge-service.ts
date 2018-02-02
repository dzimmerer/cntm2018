import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



let apiUrl = 'http://localhost:8000/';


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


}
