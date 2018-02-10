import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



let apiUrl = 'http://ec2-34-253-80-80.eu-west-1.compute.amazonaws.com:8000/';
// let apiUrl = 'http://localhost:8000/';


@Injectable()
export class ChallengeServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ChallengeServiceProvider Provider');
  }


  get_challenge_list(username, token){
    return new Promise((resolve, reject) => {

      let get_params = "?username="+username+"&token="+token;

      this.http.get(apiUrl+'challenge_list/' + get_params)
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

      this.http.get(apiUrl+'challenge_data/' + get_params)
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

      this.http.get(apiUrl+'challenge_answer/' + get_params)
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

      this.http.get(apiUrl+'give_answer/' + get_params)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  give_challenge_answer_points(username, token, cid, points){
    return new Promise((resolve, reject) => {

      let get_params = "?username="+username+"&token="+token+"&cid="+cid + "&points="+points;

      this.http.get(apiUrl+'change_answer_points/' + get_params)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }



  get_news_data(username, token){
    console.log("get the f***** data");
    return new Promise((resolve, reject) => {

      let get_params = "?username="+username+"&token="+token;

      this.http.get(apiUrl+'news_list/' + get_params)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  update_news_data(username, token, cid, name, value){
    return new Promise((resolve, reject) => {

      let get_params = "?username="+username+"&token="+token + "&cid=" + cid +  "&" + name + "=" + value;

      this.http.get(apiUrl+'update_news/' + get_params)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  add_news_data(username, token, name){
    return new Promise((resolve, reject) => {

      let get_params = "?username="+username+"&token="+token + "&name=" + name;

      this.http.get(apiUrl+'add_news/' + get_params)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  delete_news_data(username, token, cid){
    return new Promise((resolve, reject) => {

      let get_params = "?username="+username+"&token="+token + "&cid=" + cid;

      this.http.get(apiUrl+'delete_news/' + get_params)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  update_challenge_data(username, token, cid, name, value){
    return new Promise((resolve, reject) => {

      let get_params = "?username="+username+"&token="+token + "&cid=" + cid +  "&" + name + "=" + value;

      this.http.get(apiUrl+'update_challenge/' + get_params)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  add_challenge_data(username, token, name){
    return new Promise((resolve, reject) => {

      let get_params = "?username="+username+"&token="+token + "&name=" + name;

      this.http.get(apiUrl+'add_challenge/' + get_params)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  delete_challenge_data(username, token, cid){
    return new Promise((resolve, reject) => {

      let get_params = "?username="+username+"&token="+token + "&cid=" + cid;

      this.http.get(apiUrl+'delete_challenge/' + get_params)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  update_topmodel_data(username, token, cid, name, value){
    return new Promise((resolve, reject) => {

      let get_params = "?username="+username+"&token="+token + "&cid=" + cid +  "&" + name + "=" + value;

      this.http.get(apiUrl+'update_topmodel/' + get_params)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  eval_challenge(username, token, cid){
    return new Promise((resolve, reject) => {

      let get_params = "?username="+username+"&token="+token + "&cid=" + cid;

      this.http.get(apiUrl+'eval_challenge/' + get_params)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }




}
