import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';



let apiUrl = 'http://localhost:8000/';


@Injectable()
export class UserServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UserServiceProvider Provider');
  }



  login(username, passwd) {
    return new Promise((resolve, reject) => {

      let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      });

      let body = new FormData();
      body.append('username', username);
      body.append('password', passwd);

      this.http.post(apiUrl + 'login/', body, {headers: headers})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  register(username, passwd, email) {
    return new Promise((resolve, reject) => {

      let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      });

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

      this.http.get(apiUrl+'user_data' + get_params)
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

      this.http.get(apiUrl+'update_user' + get_params)
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

      this.http.get(apiUrl+'user_ranking' + get_params)
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

}
