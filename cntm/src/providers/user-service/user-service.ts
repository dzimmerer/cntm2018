import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



// let apiUrl = 'https://cntm.cfapps.eu10.hana.ondemand.com/';
let apiUrl = 'http://localhost:8000/';



@Injectable()
export class UserServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UserServiceProvider Provider');
  }



  login(username, passwd) {
    return new Promise((resolve, reject) => {

      const headers = new HttpHeaders();

      let body = new FormData();
      body.append('username', username);
      body.append('password', passwd);

      this.http.post(apiUrl + 'login/', body, {headers: headers})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
          console.log(err);
        });
    });
  }


  register(username, passwd, email) {
    return new Promise((resolve, reject) => {

      const headers = new HttpHeaders();

      let body = new FormData();
      body.append('email', email);
      body.append('username', username);
      body.append('password', passwd);

      this.http.post(apiUrl + 'register/', body, {headers: headers})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  get_user_data(username, token){
    return new Promise((resolve, reject) => {

      let get_params = "?username="+username+"&token="+token;

      this.http.get(apiUrl+'user_data/' + get_params)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  update_user_data(username, token, name, value){
    return new Promise((resolve, reject) => {

      let get_params = "?username="+username+"&token="+token + "&" + name + "=" + value;

      this.http.get(apiUrl+'update_user/' + get_params)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  get_user_ranking(username, token){
    return new Promise((resolve, reject) => {

      let get_params = "?username="+username+"&token="+token;

      this.http.get(apiUrl+'user_ranking/' + get_params)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  get_other_user_detail(username, token, other){
    return new Promise((resolve, reject) => {

      let get_params = "?username="+username+"&token="+token+ "&other=" + other;

      this.http.get(apiUrl+'user_detail/' + get_params)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  get_gntm_models(username, token){
    return new Promise((resolve, reject) => {

      let get_params = "?username="+username+"&token="+token;

      this.http.get(apiUrl+'get_models/' + get_params)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  get_api_url(){
    return apiUrl;
  }

  delete_user_data(username: any, token: any, other: any) {
    return new Promise((resolve, reject) => {

      let get_params = "?username="+username+"&token="+token + "&other=" + other;

      this.http.get(apiUrl+'delete_user/' + get_params)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  update_other_user_data(username, token, other, name, value){
    return new Promise((resolve, reject) => {

      let get_params = "?username="+username+"&token="+token + "&other=" + other + "&" + name + "=" + value;

      this.http.get(apiUrl+'update_other_user/' + get_params)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
