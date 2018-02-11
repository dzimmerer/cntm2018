webpackJsonp([7],{

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChallengedetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_challenge_service_challenge_service__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_alert_alert_controller__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__challenges_challenges__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__userdetail_userdetail__ = __webpack_require__(73);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ChallengedetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChallengedetailPage = (function () {
    function ChallengedetailPage(navCtrl, navParams, csp, alertCtrl, appCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.csp = csp;
        this.alertCtrl = alertCtrl;
        this.appCtrl = appCtrl;
        this.etime = {
            "time": "",
            "date": ""
        };
        this.c_anwser = "";
        this.ca_own = {};
        this.isShownArray = [];
        this.cid = navParams.get('cid');
        this.username = window.localStorage.getItem('username');
        this.token = window.localStorage.getItem('token');
        this.admin = window.localStorage.getItem('admin');
        this.cadmin = this.admin;
        this.csp.get_challenge_data(this.username, this.token, this.cid).then(function (result) {
            if ("id" in result) {
                _this.name = result["name"];
                _this.descr = result["descr"];
                _this.choice = result["choice"];
                _this.choice_list = result["choice_list"];
                _this.has_choice = result["has_choice"];
                _this.open = result["open"];
                _this.img_url = result["img_url"];
                _this.type = result["type"];
                _this.answer = result["answer"];
                _this.creator = result["creator"];
                _this.points = result["points"];
                if (_this.creator == _this.username) {
                    _this.cadmin = '1';
                }
                if (result["etime"] != "") {
                    console.log(result["etime"]);
                    var split_time = result["etime"].split(" ");
                    _this.etime.time = split_time[0];
                    _this.etime.date = split_time[1];
                }
            }
        }, function (err) {
        });
        this.set_ch_answers();
    }
    ChallengedetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChallengedetailPage');
    };
    ChallengedetailPage.prototype.set_ch_answers = function () {
        var _this = this;
        this.csp.get_challenge_answers(this.username, this.token, this.cid).then(function (result) {
            if ("other" in result) {
                _this.ca_other = result["other"];
            }
            if ("own" in result) {
                _this.ca_own = result["own"];
                _this.c_anwser = _this.ca_own["text"];
            }
        }, function (err) {
        });
    };
    ChallengedetailPage.prototype.doAnswer = function () {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Answer');
        if (this.has_choice == 1) {
            this.choice_list.forEach(function (element) {
                alert.addInput({
                    type: 'radio',
                    label: element,
                    value: element,
                    checked: false,
                });
            });
        }
        else if (this.has_choice == 2) {
            this.choice_list.forEach(function (element) {
                alert.addInput({
                    type: 'checkbox',
                    label: element,
                    value: element,
                    checked: false,
                });
            });
        }
        else {
            alert.addInput({
                type: 'text',
                name: 'inpt',
                value: this.c_anwser,
            });
        }
        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: function (data) {
                if (_this.has_choice == 0) {
                    data = data["inpt"];
                }
                // Update
                _this.csp.give_challenge_answer(_this.username, _this.token, _this.cid, data).then(function (result) {
                    _this.set_ch_answers();
                }, function (err) {
                });
            }
        });
        alert.present();
        console.log("Answer....");
    };
    ChallengedetailPage.prototype.spentPoints = function (param) {
        var _this = this;
        if (param == -1 && this.ca_own["points"] == 0) {
            return;
        }
        // Update
        this.csp.give_challenge_answer_points(this.username, this.token, this.cid, param).then(function (result) {
            if (result["success"] == 1) {
                _this.ca_own["points"] += param;
                _this.points += param;
            }
        }, function (err) {
        });
    };
    ChallengedetailPage.prototype.isVisible = function (n) {
        return this.isShownArray.includes(n);
    };
    ChallengedetailPage.prototype.toggleVisible = function (n) {
        if (this.isShownArray.includes(n)) {
            var ind = this.isShownArray.indexOf(n);
            if (ind > -1) {
                this.isShownArray.splice(ind, 1);
            }
        }
        else {
            this.isShownArray.push(n);
        }
    };
    ChallengedetailPage.prototype.chVal = function (name, title) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: title,
            inputs: [
                { name: 'inpt',
                    value: this[name] },
            ],
            buttons: [
                { text: 'Cancel', },
                { text: 'Save',
                    handler: function (data) {
                        _this[name] = data.inpt;
                        _this.csp.update_challenge_data(_this.username, _this.token, _this.cid, name, data.inpt);
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    };
    ChallengedetailPage.prototype.deleteChallenge = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: "Delete ?",
            buttons: [
                { text: 'Cancel', },
                { text: 'OK',
                    handler: function () {
                        _this.csp.delete_challenge_data(_this.username, _this.token, _this.cid).then(function (result) {
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__challenges_challenges__["b" /* ChallengesTabs */]);
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    ChallengedetailPage.prototype.frwdToUser = function (uname) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__userdetail_userdetail__["a" /* UserdetailPage */], {
            other: uname
        });
    };
    ChallengedetailPage.prototype.evalChallenge = function () {
        var _this = this;
        if (this.answer == "") {
            var alert_1 = this.alertCtrl.create({
                title: 'Please insert solution first!',
                buttons: ['OK']
            });
            alert_1.present();
        }
        else {
            var alert_2 = this.alertCtrl.create({
                title: 'Are you sure?',
                message: 'If you distribute points the challenge is over and you can not change it anymore.',
                buttons: [
                    { text: 'Cancel', },
                    {
                        text: 'Yes',
                        handler: function () {
                            _this.csp.eval_challenge(_this.username, _this.token, _this.cid).then(function (result) {
                                if (result["success"] == 1) {
                                    _this.open = 2;
                                    _this.csp.update_challenge_data(_this.username, _this.token, _this.cid, "open", 2);
                                    console.log("Distributed Points.....");
                                }
                            });
                        }
                    }
                ]
            });
            alert_2.present();
        }
    };
    ChallengedetailPage.prototype.toggleOpen = function () {
        var _this = this;
        if (this.open < 2) {
            var alert_3 = this.alertCtrl.create();
            alert_3.setTitle('Open');
            alert_3.addInput({
                type: 'radio',
                label: 'Open',
                value: '0',
                checked: this.open == 0,
            });
            alert_3.addInput({
                type: 'radio',
                label: 'Closed',
                value: '1',
                checked: this.open == 1,
            });
            alert_3.addButton('Cancel');
            alert_3.addButton({
                text: 'OK',
                handler: function (data) {
                    // Update
                    _this.open = data;
                    _this.csp.update_challenge_data(_this.username, _this.token, _this.cid, "open", data);
                }
            });
            alert_3.present();
        }
    };
    ChallengedetailPage.prototype.setEndTime = function () {
        if (this.etime.time != "" && this.etime.date != "") {
            var time_str = this.etime.time + " " + this.etime.date;
            this.csp.update_challenge_data(this.username, this.token, this.cid, "etime", time_str);
        }
        else {
            var alert_4 = this.alertCtrl.create({
                title: 'Please give a end time and date first!',
                buttons: ['OK']
            });
            alert_4.present();
        }
    };
    ChallengedetailPage.prototype.deleteEndTime = function () {
        this.etime.time = "";
        this.etime.date = "";
        this.csp.update_challenge_data(this.username, this.token, this.cid, "etime", "");
    };
    ChallengedetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-challengedetail',template:/*ion-inline-start:"/files/Documents/ws/ws/cntm2018/cntm/src/pages/challengedetail/challengedetail.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Challenge</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <ion-card>\n\n    <ion-item>\n      <h2>{{name}}</h2>\n      <p *ngIf="type == 1">by {{creator}}</p>\n\n      <ion-badge item-end>\n        {{points}}\n      </ion-badge>\n    </ion-item>\n\n    <ion-card-content>\n      <div [innerHTML]="descr"></div>\n    </ion-card-content>\n    <ion-card-content *ngIf="open==0 && etime.time != \'\' && etime.date != \'\' ">\n      <p><i>Ends: {{etime.date}} {{etime.time}}</i></p>\n    </ion-card-content>\n    <ion-card-content *ngIf="cadmin == \'1\' || open==2">\n      <b>Solution:</b> {{answer}}\n    </ion-card-content>\n\n\n\n    <ion-row>\n      <ion-col *ngIf="open == 0">\n        <button ion-button icon-left clear small (click)="doAnswer()" *ngIf="cadmin == \'0\'">\n          <ion-icon name="text"></ion-icon>\n          <div>Answer</div>\n        </button>\n      </ion-col>\n      <ion-col text-end>\n        <button ion-button icon-left clear small>\n          <div *ngIf="open == 0">open</div>\n          <div *ngIf="open >= 1">closed.</div>\n        </button>\n        <button ion-button icon-left clear small *ngIf="cadmin == \'1\' && admin == \'0\' && open < 2" (click)="toggleOpen()">\n          <div>Open/Close</div>\n        </button>\n        <button ion-button icon-left clear small *ngIf="admin == \'1\'" (click)="chVal(\'open\', \'Open\')">\n          <div>Open/Close</div>\n        </button>\n      </ion-col>\n    </ion-row>\n\n  </ion-card>\n\n\n  <ion-card *ngIf="cadmin == \'1\' && (admin == 1 || open < 2)">\n\n    <ion-row>\n      <ion-col *ngIf="open == 0">\n        <button ion-button icon-left clear small (click)="chVal(\'name\', \'Headline\')">\n          <div>Edit Name</div>\n        </button>\n      </ion-col>\n      <ion-col *ngIf="open == 0">\n        <button ion-button icon-left clear small (click)="chVal(\'descr\', \'Text\')">\n          <div>Edit Text</div>\n        </button>\n      </ion-col>\n      <ion-col *ngIf="open == 0">\n        <button ion-button icon-left clear small (click)="chVal(\'choice\', \'Choice\')">\n          <div>Edit Choice</div>\n        </button>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <button ion-button icon-left clear small (click)="chVal(\'answer\', \'Right Solution\')" >\n          <div>Edit Solution</div>\n        </button>\n      </ion-col>\n      <ion-col>\n        <button ion-button icon-left clear small (click)="evalChallenge()" float-right>\n          <div>End & Give Points</div>\n        </button>\n      </ion-col>\n      <ion-col *ngIf="type==0 ">\n        <button ion-button icon-left clear small (click)="chVal(\'points\', \'Points\')">\n          <div>Edit Points</div>\n        </button>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n      <button ion-button icon-left clear small (click)="deleteChallenge()">\n        <div>Delete</div>\n      </button>\n      </ion-col>\n    </ion-row>\n\n  </ion-card>\n\n\n  <ion-card *ngIf="cadmin == \'1\' && (admin == 1 || open == 0)">\n    <ion-item>\n      <ion-label>End Time</ion-label>\n      <ion-datetime displayFormat="HH:mm" pickerFormat="HH mm" placeholder="hh:mm" [(ngModel)]="etime.time"></ion-datetime>\n    </ion-item>\n    <ion-item>\n      <ion-label>End Date</ion-label>\n      <ion-datetime displayFormat="DD.MMMM YYYY" pickerFormat="DD MMM YYYY" placeholder="dd.mm.yyyy" [(ngModel)]="etime.date"></ion-datetime>\n    </ion-item>\n    <ion-row>\n      <ion-col>\n        <button ion-button icon-left clear small (click)="setEndTime()">\n          <div>Set Time</div>\n        </button>\n      </ion-col>\n      <ion-col>\n      <button ion-button icon-left clear small (click)="deleteEndTime()" float-right>\n        <div>Delete Time</div>\n      </button>\n    </ion-col>\n    </ion-row>\n  </ion-card>\n\n  <ion-card *ngIf="c_anwser != \'\'">\n\n      <ion-item>\n        <ion-avatar item-start (click)="toggleVisible(-1)">\n          <img src="{{ca_own.img_url}}">\n        </ion-avatar>\n        <h2>{{ca_own.username}}</h2>\n        <p>{{ca_own.text}}</p>\n        <button ion-button clear small (click)="spentPoints(-1)" item-end *ngIf="open == 0 && type==1">-</button>\n        <ion-badge item-end *ngIf="type==1">{{ca_own.points}}</ion-badge>\n        <button ion-button clear small (click)="spentPoints(1)" item-end *ngIf="open == 0 && type==1">+</button>\n\n      </ion-item>\n    <ion-card-content *ngIf="isVisible(-1)">\n      <p>{{ca_own.text}}</p>\n    </ion-card-content>\n    <ion-row>\n      <ion-col>\n        <button ion-button icon-left clear small (click)="doAnswer()" item-end *ngIf="open == 0">\n          <ion-icon name="text"></ion-icon>\n          <div>Edit</div>\n        </button>\n\n\n      </ion-col>\n    </ion-row>\n\n  </ion-card>\n\n  <ion-card *ngFor="let ca of ca_other; let i = index">\n\n    <ion-item (click)="toggleVisible(i)">\n      <ion-avatar item-start (click)="frwdToUser(ca.username)">\n        <img src="{{ca.img_url}}">\n      </ion-avatar>\n      <h2>{{ca.username}}</h2>\n      <p>{{ca.text}}</p>\n      <ion-badge item-end *ngIf="type==1">{{ca.points}}</ion-badge>\n    </ion-item>\n    <ion-card-content *ngIf="isVisible(i)">\n      <p>{{ca.text}}</p>\n    </ion-card-content>\n\n  </ion-card>\n\n\n</ion-content>\n'/*ion-inline-end:"/files/Documents/ws/ws/cntm2018/cntm/src/pages/challengedetail/challengedetail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_challenge_service_challenge_service__["a" /* ChallengeServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_alert_alert_controller__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], ChallengedetailPage);
    return ChallengedetailPage;
}());

//# sourceMappingURL=challengedetail.js.map

/***/ }),

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__register_register__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_loading_loading_controller__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_toast_toast_controller__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_user_service_user_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular_components_app_menu_controller__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(nav, navParams, formBuilder, loadingCtrl, toastCtrl, menu, usp) {
        this.nav = nav;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.menu = menu;
        this.usp = usp;
        this.nav = nav;
        this.authForm = formBuilder.group({
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[a-zA-Z0-9]*'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(30)])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(8)])]
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        this.menu.swipeEnable(false);
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.onLogin = function (value) {
        var _this = this;
        if (this.authForm.valid) {
            this.showLoader();
            this.usp.login(value.username, value.password).then(function (result) {
                _this.loading.dismiss();
                _this.data = result;
                console.log(result);
                if ("success" in result && result["success"] == 1) {
                    console.log("Welcome!!!");
                    window.localStorage.setItem('token', result["token"]);
                    window.localStorage.setItem('username', result["username"]);
                    window.localStorage.setItem('admin', result["admin"] + "");
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                }
                else {
                    _this.presentToast("Could not Login!");
                    console.log("WTf????");
                }
                // localStorage.setItem('token', this.data.access_token);
            }, function (err) {
                _this.loading.dismiss();
                _this.presentToast("Error");
            });
        }
    };
    LoginPage.prototype.goRegister = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_4__register_register__["a" /* RegisterPage */]);
    };
    LoginPage.prototype.showLoader = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Logging in...'
        });
        this.loading.present();
    };
    LoginPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom',
            dismissOnPageChange: true
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/files/Documents/ws/ws/cntm2018/cntm/src/pages/login/login.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <form [formGroup]="authForm" (ngSubmit)="onLogin(authForm.value)">\n    <ion-item>\n      <ion-label floating>Username</ion-label>\n      <ion-input formControlName="username" type="text"></ion-input>\n    </ion-item>\n\n    <ion-item *ngIf="authForm.controls.username.hasError(\'required\') && authForm.controls.username.touched">\n      <p>Sorry, field username is required!</p>\n    </ion-item>\n    <ion-item *ngIf="authForm.controls.username.hasError(\'pattern\') && authForm.controls.username.touched">\n      <p>Sorry, only small and capital letters and numbers are allowed!</p>\n    </ion-item>\n    <ion-item *ngIf="authForm.controls.username.hasError(\'minlength\') && authForm.controls.username.touched">\n      <p>Sorry, minimum username length is 6!</p>\n    </ion-item>\n    <ion-item *ngIf="authForm.controls.username.hasError(\'maxlength\') && authForm.controls.username.touched">\n      <p>Sorry, maximum username length is 30!</p>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Password</ion-label>\n      <ion-input formControlName="password" type="password"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="authForm.controls.password.hasError(\'required\') && authForm.controls.password.touched">\n      <p>Sorry, field password is required!</p>\n    </ion-item>\n    <ion-item *ngIf="authForm.controls.password.hasError(\'minlength\') && authForm.controls.password.touched">\n      <p>Sorry, minimum password length is 8!</p>\n    </ion-item>\n\n    <button ion-button full color="primary" [disabled]="!authForm.valid" style="margin-top: 20px;" type="submit">Authorize</button>\n  </form>\n\n  <button ion-button block clear (click)="goRegister()">\n    No have an account? Register Now\n  </button>\n\n\n</ion-content>\n'/*ion-inline-end:"/files/Documents/ws/ws/cntm2018/cntm/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_toast_toast_controller__["a" /* ToastController */], __WEBPACK_IMPORTED_MODULE_8_ionic_angular_components_app_menu_controller__["a" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_7__providers_user_service_user_service__["a" /* UserServiceProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_loading_loading_controller__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_toast_toast_controller__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_user_service_user_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_app_menu_controller__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegisterPage = (function () {
    function RegisterPage(nav, navParams, formBuilder, loadingCtrl, toastCtrl, usp, menu) {
        this.nav = nav;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.usp = usp;
        this.menu = menu;
        this.nav = nav;
        this.authForm = formBuilder.group({
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[a-zA-Z0-9]*'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(30)])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(8)])],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[a-zA-Z0-9._-]*@[a-zA-Z0-9._-]*.[a-z]*'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6)])]
        });
    }
    RegisterPage.prototype.onRegister = function (value) {
        var _this = this;
        if (this.authForm.valid) {
            this.showLoader();
            this.usp.register(value.username, value.password, value.email).then(function (result) {
                _this.loading.dismiss();
                if ("success" in result && result["success"] == 1) {
                    console.log("Welcome!!!");
                    window.localStorage.setItem('token', result["token"]);
                    window.localStorage.setItem('username', result["username"]);
                    window.localStorage.setItem('admin', 0 + "");
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                }
                else {
                    _this.presentToast("Could not Register!");
                    console.log("WTf????");
                }
            }, function (err) {
                _this.loading.dismiss();
                _this.presentToast("Error");
            });
        }
    };
    RegisterPage.prototype.showLoader = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Creating Account...'
        });
        this.loading.present();
    };
    RegisterPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom',
            dismissOnPageChange: true
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    RegisterPage.prototype.ionViewDidLoad = function () {
        this.menu.swipeEnable(false);
        console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"/files/Documents/ws/ws/cntm2018/cntm/src/pages/register/register.html"*/'<!--\n  Generated template for the RegisterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Register</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <form [formGroup]="authForm" (ngSubmit)="onRegister(authForm.value)">\n\n    <ion-item>\n      <ion-label floating>E-M@il</ion-label>\n      <ion-input formControlName="email" type="text"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="authForm.controls.email.hasError(\'minlength\') && authForm.controls.username.touched">\n      <p>Sorry, minimum username length is 8!</p>\n    </ion-item>\n    <ion-item *ngIf="authForm.controls.email.hasError(\'pattern\') && authForm.controls.username.touched">\n      <p>Please enter a vaild email address!</p>\n    </ion-item>\n\n\n    <ion-item>\n      <ion-label floating>Username</ion-label>\n      <ion-input formControlName="username" type="text"></ion-input>\n    </ion-item>\n\n    <ion-item *ngIf="authForm.controls.username.hasError(\'required\') && authForm.controls.username.touched">\n      <p>Sorry, field username is required!</p>\n    </ion-item>\n    <ion-item *ngIf="authForm.controls.username.hasError(\'pattern\') && authForm.controls.username.touched">\n      <p>Sorry, only small and capital letters and numbers are allowed!</p>\n    </ion-item>\n    <ion-item *ngIf="authForm.controls.username.hasError(\'minlength\') && authForm.controls.username.touched">\n      <p>Sorry, minimum username length is 6!</p>\n    </ion-item>\n    <ion-item *ngIf="authForm.controls.username.hasError(\'maxlength\') && authForm.controls.username.touched">\n      <p>Sorry, maximum username length is 30!</p>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Password</ion-label>\n      <ion-input formControlName="password" type="password"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="authForm.controls.password.hasError(\'required\') && authForm.controls.password.touched">\n      <p>Sorry, field password is required!</p>\n    </ion-item>\n    <ion-item *ngIf="authForm.controls.password.hasError(\'minlength\') && authForm.controls.password.touched">\n      <p>Sorry, minimum password length is 8!</p>\n    </ion-item>\n\n    <button ion-button full color="primary" [disabled]="!authForm.valid" style="margin-top: 20px;" type="submit">Authorize</button>\n  </form>\n\n\n</ion-content>\n'/*ion-inline-end:"/files/Documents/ws/ws/cntm2018/cntm/src/pages/register/register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_user_service_user_service__["a" /* UserServiceProvider */], __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_app_menu_controller__["a" /* MenuController */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModelwallPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_service_user_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_challenge_service_challenge_service__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ModelwallPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ModelwallPage = (function () {
    function ModelwallPage(navCtrl, navParams, usp, csp) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.usp = usp;
        this.csp = csp;
        this.username = window.localStorage.getItem('username');
        this.token = window.localStorage.getItem('token');
        this.admin = window.localStorage.getItem('admin');
        this.usp.get_gntm_models(this.username, this.token).then(function (result) {
            _this.models = result["models"];
        }, function (err) {
        });
    }
    ModelwallPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ModelwallPage');
    };
    ModelwallPage.prototype.openLink = function (param) {
        window.open(param, '_system', 'location=yes');
    };
    ModelwallPage.prototype.toggleActive = function (id, i) {
        var curVal = this.models[i]["out"];
        var newVal = 0;
        if (curVal == 0) {
            newVal = 1;
        }
        this.csp.update_topmodel_data(this.username, this.token, this.models[i]["id"], "out", newVal);
        this.models[i]["out"] = newVal;
        console.log(i, id);
    };
    ModelwallPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-modelwall',template:/*ion-inline-start:"/files/Documents/ws/ws/cntm2018/cntm/src/pages/modelwall/modelwall.html"*/'\n<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Model Wall</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content  class="card-background-page">\n\n\n  <ion-content>\n\n    <ion-card *ngFor="let m of models; let i = index">\n      <img src="{{m.img_url}}" *ngIf="m.out == 0" imageViewer>\n      <img src="{{m.img_url}}" ngClass="gray_img" *ngIf="m.out == 1" imageViewer>\n    <div class="card-title">{{m.name}}, {{m.age}}</div>\n    <div class="card-subtitle">&quot;{{m.descr}}&quot;</div>\n      <button ion-button clear item-end (click)="openLink(m.link)">More</button>\n      <button ion-button clear item-end (click)="toggleActive(m.id, i)" *ngIf="admin == \'1\'">Toggle</button>\n  </ion-card>\n<!--<ion-list>-->\n    <!--<ion-item>-->\n      <!--<ion-thumbnail item-start>-->\n        <!--<img src="{{m.img_url}}" *ngIf="m.out == 0" imageViewer>-->\n        <!--<img src="{{m.img_url}}" ngClass="gray_img" *ngIf="m.out == 1" imageViewer>-->\n      <!--</ion-thumbnail>-->\n      <!--<h2>{{m.name}}, {{m.age}}</h2>-->\n      <!--<p>{{m.descr}}</p>-->\n      <!--<button ion-button clear item-end (click)="openLink(m.link)">More</button>-->\n    <!--</ion-item>-->\n  <!--</ion-list>-->\n\n\n</ion-content>\n'/*ion-inline-end:"/files/Documents/ws/ws/cntm2018/cntm/src/pages/modelwall/modelwall.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_user_service_user_service__["a" /* UserServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_challenge_service_challenge_service__["a" /* ChallengeServiceProvider */]])
    ], ModelwallPage);
    return ModelwallPage;
}());

//# sourceMappingURL=modelwall.js.map

/***/ }),

/***/ 151:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 151;

/***/ }),

/***/ 192:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/challengedetail/challengedetail.module": [
		420,
		6
	],
	"../pages/challenges/challenges.module": [
		421,
		5
	],
	"../pages/login/login.module": [
		422,
		4
	],
	"../pages/modelwall/modelwall.module": [
		423,
		3
	],
	"../pages/ranking/ranking.module": [
		424,
		2
	],
	"../pages/register/register.module": [
		425,
		1
	],
	"../pages/userdetail/userdetail.module": [
		426,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 192;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_service_user_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_alert_alert_controller__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProfilePage = (function () {
    function ProfilePage(navCtrl, navParams, usp, alertCtrl) {
        // If we navigated to this page, we will have an item available as a nav param
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.usp = usp;
        this.alertCtrl = alertCtrl;
        this.username = window.localStorage.getItem('username');
        this.token = window.localStorage.getItem('token');
        this.usp.get_user_data(this.username, this.token).then(function (result) {
            if ("username" in result) {
                console.log(result["username"]);
                _this.img_url = result["img_url"];
                if (!(_this.img_url.startsWith("http") || _this.img_url.startsWith("www"))) {
                    _this.img_url = _this.usp.get_api_url() + _this.img_url;
                }
                _this.descr = result["descr"];
                _this.real_name = result["real_name"];
                _this.age = result["age"];
                _this.hair = result["hair"];
                _this.eye = result["eye"];
                _this.hobbies = result["hobbies"];
                _this.score = result["score"];
            }
        }, function (err) {
        });
    }
    ProfilePage.prototype.chVal = function (name, title) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: title,
            inputs: [
                { name: 'inpt',
                    value: this[name] },
            ],
            buttons: [
                { text: 'Cancel', },
                { text: 'Save',
                    handler: function (data) {
                        _this[name] = data.inpt;
                        _this.usp.update_user_data(_this.username, _this.token, name, data.inpt);
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"/files/Documents/ws/ws/cntm2018/cntm/src/pages/profile/profile.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Profile</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-card>\n\n    <ion-item>\n      <ion-avatar item-start>\n        <img src="{{img_url}}">\n      </ion-avatar>\n      <h2>{{username}}</h2>\n      <p>&quot;{{descr}}&quot;</p>\n      <ion-badge item-end>{{score}}</ion-badge>\n    </ion-item>\n\n\n    <ion-item>\n      <ion-icon name=\'md-person\' item-start style="color: #f95c71"></ion-icon>\n      <p>{{real_name}}</p>\n      <button ion-button clear small item-end (click)="chVal(\'real_name\', \'Real Name\')" >\n        <ion-icon name=\'md-create\'></ion-icon>\n      </button>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="calendar" item-start style="color: #f95c71"></ion-icon>\n      <p>{{age}}</p>\n      <button ion-button clear small item-end (click)="chVal(\'age\', \'Age\')" >\n        <ion-icon name=\'md-create\'></ion-icon>\n      </button>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="cut" item-start style="color: #f95c71"></ion-icon>\n      <p>{{hair}}</p>\n      <button ion-button clear small item-end (click)="chVal(\'hair\', \'Hair Style\')" >\n        <ion-icon name=\'md-create\'></ion-icon>\n      </button>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="eye" item-start style="color: #f95c71"></ion-icon>\n      <p>{{eye}}</p>\n      <button ion-button clear small item-end (click)="chVal(\'eye\', \'Eye color\')" >\n        <ion-icon name=\'md-create\'></ion-icon>\n      </button>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="football" item-start style="color: #f95c71"></ion-icon>\n      <p>{{hobbies}}</p>\n      <button ion-button clear small item-end (click)="chVal(\'hobbies\', \'Hobbies\')" >\n        <ion-icon name=\'md-create\'></ion-icon>\n      </button>\n    </ion-item>\n\n\n    <ion-card-content center text-center>\n      <p>\n        <br>\n      {{descr}}\n      </p>\n\n    </ion-card-content>\n\n    <ion-row>\n      <ion-col>\n        <button ion-button icon-left clear small (click)="chVal(\'img_url\', \'Enter a new Image URL\')">\n          <div>Edit Pic</div>\n        </button>\n      </ion-col>\n      <ion-col text-right>\n        <button ion-button icon-left clear small  (click)="chVal(\'descr\', \'Description\')" >\n          <div>Edit Text</div>\n        </button>\n      </ion-col>\n\n    </ion-row>\n\n  </ion-card>\n\n\n</ion-content>\n'/*ion-inline-end:"/files/Documents/ws/ws/cntm2018/cntm/src/pages/profile/profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_user_service_user_service__["a" /* UserServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_alert_alert_controller__["a" /* AlertController */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(266);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_profile_profile__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_register_register__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_user_service_user_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_angular_components_toast_toast_controller__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ionic_angular_components_loading_loading_controller__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_common_http__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_file_chooser__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_ranking_ranking__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_userdetail_userdetail__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_challenges_challenges__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_challenge_service_challenge_service__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_challengedetail_challengedetail__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_home_home__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_modelwall_modelwall__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_ionic_img_viewer__ = __webpack_require__(316);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_19__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_ranking_ranking__["a" /* RankingPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_userdetail_userdetail__["a" /* UserdetailPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_challenges_challenges__["a" /* ChallengesPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_challengedetail_challengedetail__["a" /* ChallengedetailPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_modelwall_modelwall__["a" /* ModelwallPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_challenges_challenges__["b" /* ChallengesTabs */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_21_ionic_img_viewer__["a" /* IonicImageViewerModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/challengedetail/challengedetail.module#ChallengedetailPageModule', name: 'ChallengedetailPage', segment: 'challengedetail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/challenges/challenges.module#ChallengesPageModule', name: 'ChallengesPage', segment: 'challenges', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/modelwall/modelwall.module#ModelwallPageModule', name: 'ModelwallPage', segment: 'modelwall', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/ranking/ranking.module#RankingPageModule', name: 'RankingPage', segment: 'ranking', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/userdetail/userdetail.module#UserdetailPageModule', name: 'UserdetailPage', segment: 'userdetail', priority: 'low', defaultHistory: [] }
                    ]
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_19__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_ranking_ranking__["a" /* RankingPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_userdetail_userdetail__["a" /* UserdetailPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_challenges_challenges__["a" /* ChallengesPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_challengedetail_challengedetail__["a" /* ChallengedetailPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_modelwall_modelwall__["a" /* ModelwallPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_challenges_challenges__["b" /* ChallengesTabs */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_9__providers_user_service_user_service__["a" /* UserServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_17__providers_challenge_service_challenge_service__["a" /* ChallengeServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_11_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */],
                __WEBPACK_IMPORTED_MODULE_10_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_file_chooser__["a" /* FileChooser */],
                __WEBPACK_IMPORTED_MODULE_17__providers_challenge_service_challenge_service__["a" /* ChallengeServiceProvider */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_profile_profile__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_ranking_ranking__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_challenges_challenges__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_modelwall_modelwall__ = __webpack_require__(140);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Profile', component: __WEBPACK_IMPORTED_MODULE_5__pages_profile_profile__["a" /* ProfilePage */] },
            { title: 'Ranking', component: __WEBPACK_IMPORTED_MODULE_7__pages_ranking_ranking__["a" /* RankingPage */] },
            { title: 'Challenges', component: __WEBPACK_IMPORTED_MODULE_8__pages_challenges_challenges__["b" /* ChallengesTabs */] },
            { title: 'Model Wall', component: __WEBPACK_IMPORTED_MODULE_9__pages_modelwall_modelwall__["a" /* ModelwallPage */] },
        ];
    }
    MyApp.prototype.checkPreviousAuthorization = function () {
        if ((window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username') === null) &&
            (window.localStorage.getItem('token') === "undefined" || window.localStorage.getItem('token') === null)) {
            this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
        }
        else {
            this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        }
    };
    MyApp.prototype.logout = function () {
        window.localStorage.setItem('token', "undefined");
        window.localStorage.setItem('username', "undefined");
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */]);
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.checkPreviousAuthorization();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/files/Documents/ws/ws/cntm2018/cntm/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar color="primary">\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n      <button menuClose ion-button clear (click)="logout()">\n        <ion-icon name="log-out"></ion-icon>\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/files/Documents/ws/ws/cntm2018/cntm/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var apiUrl = 'http://ec2-34-253-80-80.eu-west-1.compute.amazonaws.com:8000/';
// let apiUrl = 'http://localhost:8000/';
var UserServiceProvider = (function () {
    function UserServiceProvider(http) {
        this.http = http;
        console.log('Hello UserServiceProvider Provider');
    }
    UserServiceProvider.prototype.login = function (username, passwd) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]();
            var body = new FormData();
            body.append('username', username);
            body.append('password', passwd);
            _this.http.post(apiUrl + 'login/', body, { headers: headers })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                console.log(err);
            });
        });
    };
    UserServiceProvider.prototype.register = function (username, passwd, email) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]();
            var body = new FormData();
            body.append('email', email);
            body.append('username', username);
            body.append('password', passwd);
            _this.http.post(apiUrl + 'register/', body, { headers: headers })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserServiceProvider.prototype.get_user_data = function (username, token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token;
            _this.http.get(apiUrl + 'user_data/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserServiceProvider.prototype.update_user_data = function (username, token, name, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token + "&" + name + "=" + value;
            _this.http.get(apiUrl + 'update_user/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserServiceProvider.prototype.get_user_ranking = function (username, token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token;
            _this.http.get(apiUrl + 'user_ranking/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserServiceProvider.prototype.get_other_user_detail = function (username, token, other) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token + "&other=" + other;
            _this.http.get(apiUrl + 'user_detail/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserServiceProvider.prototype.get_gntm_models = function (username, token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token;
            _this.http.get(apiUrl + 'get_models/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserServiceProvider.prototype.get_api_url = function () {
        return apiUrl;
    };
    UserServiceProvider.prototype.delete_user_data = function (username, token, other) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token + "&other=" + other;
            _this.http.get(apiUrl + 'delete_user/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserServiceProvider.prototype.update_other_user_data = function (username, token, other, name, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token + "&other=" + other + "&" + name + "=" + value;
            _this.http.get(apiUrl + 'update_other_user/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], UserServiceProvider);
    return UserServiceProvider;
}());

//# sourceMappingURL=user-service.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChallengeServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var apiUrl = 'http://ec2-34-253-80-80.eu-west-1.compute.amazonaws.com:8000/';
// let apiUrl = 'http://localhost:8000/';
var ChallengeServiceProvider = (function () {
    function ChallengeServiceProvider(http) {
        this.http = http;
        console.log('Hello ChallengeServiceProvider Provider');
    }
    ChallengeServiceProvider.prototype.get_challenge_list = function (username, token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token;
            _this.http.get(apiUrl + 'challenge_list/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ChallengeServiceProvider.prototype.get_challenge_data = function (username, token, cid) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token + "&id=" + cid;
            _this.http.get(apiUrl + 'challenge_data/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ChallengeServiceProvider.prototype.get_challenge_answers = function (username, token, cid) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token + "&id=" + cid;
            _this.http.get(apiUrl + 'challenge_answer/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ChallengeServiceProvider.prototype.give_challenge_answer = function (username, token, cid, text) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token + "&id=" + cid + "&text=" + text;
            _this.http.get(apiUrl + 'give_answer/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ChallengeServiceProvider.prototype.give_challenge_answer_points = function (username, token, cid, points) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token + "&cid=" + cid + "&points=" + points;
            _this.http.get(apiUrl + 'change_answer_points/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ChallengeServiceProvider.prototype.get_news_data = function (username, token) {
        var _this = this;
        console.log("get the f***** data");
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token;
            _this.http.get(apiUrl + 'news_list/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ChallengeServiceProvider.prototype.update_news_data = function (username, token, cid, name, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token + "&cid=" + cid + "&" + name + "=" + value;
            _this.http.get(apiUrl + 'update_news/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ChallengeServiceProvider.prototype.add_news_data = function (username, token, name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token + "&name=" + name;
            _this.http.get(apiUrl + 'add_news/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ChallengeServiceProvider.prototype.delete_news_data = function (username, token, cid) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token + "&cid=" + cid;
            _this.http.get(apiUrl + 'delete_news/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ChallengeServiceProvider.prototype.update_challenge_data = function (username, token, cid, name, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token + "&cid=" + cid + "&" + name + "=" + encodeURIComponent(value);
            _this.http.get(apiUrl + 'update_challenge/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ChallengeServiceProvider.prototype.add_challenge_data = function (username, token, name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token + "&name=" + name;
            _this.http.get(apiUrl + 'add_challenge/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ChallengeServiceProvider.prototype.delete_challenge_data = function (username, token, cid) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token + "&cid=" + cid;
            _this.http.get(apiUrl + 'delete_challenge/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ChallengeServiceProvider.prototype.update_topmodel_data = function (username, token, cid, name, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token + "&cid=" + cid + "&" + name + "=" + value;
            _this.http.get(apiUrl + 'update_topmodel/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ChallengeServiceProvider.prototype.eval_challenge = function (username, token, cid) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token + "&cid=" + cid;
            _this.http.get(apiUrl + 'eval_challenge/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ChallengeServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], ChallengeServiceProvider);
    return ChallengeServiceProvider;
}());

//# sourceMappingURL=challenge-service.js.map

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_challenge_service_challenge_service__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_nav_params__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_alert_alert_controller__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = (function () {
    function HomePage(navCtrl, navParams, csp, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.csp = csp;
        this.alertCtrl = alertCtrl;
        this.username = window.localStorage.getItem('username');
        this.token = window.localStorage.getItem('token');
        this.admin = window.localStorage.getItem('admin');
        console.log("Admin: " + this.admin);
        this.csp.get_news_data(this.username, this.token).then(function (result) {
            _this.news = result["news"];
        }, function (err) {
        });
    }
    HomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HomePage');
    };
    HomePage.prototype.addNews = function () {
        var _this = this;
        console.log('Add News');
        var prompt = this.alertCtrl.create({
            title: "Add new News",
            inputs: [
                { name: 'inpt',
                    value: "" },
            ],
            buttons: [
                { text: 'Cancel', },
                { text: 'Add',
                    handler: function (data) {
                        _this.csp.add_news_data(_this.username, _this.token, data.inpt).then(function (result) {
                            _this.navCtrl.setRoot(_this.navCtrl.getActive().component);
                        });
                        console.log('Add clicked');
                    }
                }
            ]
        });
        prompt.present();
    };
    HomePage.prototype.deleteNews = function (id) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: "Delete ?",
            buttons: [
                { text: 'Cancel', },
                { text: 'OK',
                    handler: function () {
                        _this.csp.delete_news_data(_this.username, _this.token, id).then(function (result) {
                            _this.navCtrl.setRoot(_this.navCtrl.getActive().component);
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    HomePage.prototype.chVal = function (id, name, title, i) {
        var _this = this;
        console.log(this.news[i]);
        var prompt = this.alertCtrl.create({
            title: title,
            inputs: [
                { name: 'inpt',
                    value: this.news[i][name] },
            ],
            buttons: [
                { text: 'Cancel', },
                { text: 'Save',
                    handler: function (data) {
                        _this.news[i][name] = data.inpt;
                        _this.csp.update_news_data(_this.username, _this.token, id, name, data.inpt);
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/files/Documents/ws/ws/cntm2018/cntm/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n    <ion-buttons end *ngIf="admin == \'1\'">\n      <button ion-button icon-only (click)="addNews()">\n        <ion-icon name="add-circle"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n\n  <ion-slides pager>\n\n    <ion-slide *ngFor="let n of news; let i = index">\n      <ion-card-header>\n        {{n.name}}\n      </ion-card-header>\n      <ion-card-content text-left>\n        <div [innerHTML]="n.descr"></div>\n      </ion-card-content>\n      <ion-card-content *ngIf="admin == \'1\'">\n        <button ion-button item-left clear small (click)="chVal(n.id, \'name\', \'Headline\', i)">\n          <div>Edit Name</div>\n        </button>\n        <button ion-button item-end clear small (click)="chVal(n.id, \'descr\', \'Text\', i)">\n          <div>Edit Text</div>\n        </button>\n        <button ion-button item-right clear small (click)="deleteNews(n.id)">\n          <div>Delete</div>\n        </button>\n      </ion-card-content>\n    </ion-slide>\n\n\n\n  </ion-slides>\n\n</ion-content>\n'/*ion-inline-end:"/files/Documents/ws/ws/cntm2018/cntm/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_nav_params__["a" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_challenge_service_challenge_service__["a" /* ChallengeServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_alert_alert_controller__["a" /* AlertController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChallengesPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ChallengesTabs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_challenge_service_challenge_service__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__challengedetail_challengedetail__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_alert_alert_controller__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ChallengesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChallengesPage = (function () {
    function ChallengesPage(navCtrl, navParams, csp, alertCtrl, platform, appCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.csp = csp;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.appCtrl = appCtrl;
        this.isAndroid = false;
        this.isAndroid = platform.is('android');
        this.c_stng = this.navParams.data;
        this.username = window.localStorage.getItem('username');
        this.token = window.localStorage.getItem('token');
        this.admin = window.localStorage.getItem('admin');
        this.csp.get_challenge_list(this.username, this.token).then(function (result) {
            _this.challenges = result[_this.c_stng];
        }, function (err) {
        });
    }
    ChallengesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChallengesPage');
    };
    ChallengesPage.prototype.onChallenge = function (cid) {
        this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_3__challengedetail_challengedetail__["a" /* ChallengedetailPage */], {
            cid: cid
        });
        // this.navCtrl.push(ChallengedetailPage, {
        //   cid: cid
        // });
    };
    ChallengesPage.prototype.addChallenge = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: "Add new Challenge:",
            inputs: [
                { name: 'inpt',
                    value: "" },
            ],
            buttons: [
                { text: 'Cancel', },
                { text: 'Add',
                    handler: function (data) {
                        if (data.inpt != "") {
                            _this.csp.add_challenge_data(_this.username, _this.token, data.inpt).then(function (result) {
                                if (result["success"] == 1) {
                                    _this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_3__challengedetail_challengedetail__["a" /* ChallengedetailPage */], {
                                        cid: result["cid"]
                                    });
                                }
                            });
                        }
                        console.log('Add clicked');
                    }
                }
            ]
        });
        prompt.present();
    };
    ChallengesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-challenges',template:/*ion-inline-start:"/files/Documents/ws/ws/cntm2018/cntm/src/pages/challenges/challenges.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Challenges</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="addChallenge()">\n        <ion-icon name="add-circle"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n\n<ion-content>\n\n  <br>\n  <ion-list>\n    <ion-item *ngFor="let c of challenges" (click)="onChallenge(c.id)">\n      <h2>{{c.name}}</h2>\n      <p *ngIf="c_stng == \'special\'">Special</p>\n      <p *ngIf="c_stng == \'community\'">by {{c.creator}}</p>\n      <ion-icon name="help-circle" item-end style="color: #c3af80" *ngIf="c_stng != \'closed\'"></ion-icon>\n      <ion-icon name="close-circle" item-end style="color: #c3af80" *ngIf="c_stng == \'closed\'"></ion-icon>\n    </ion-item>\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"/files/Documents/ws/ws/cntm2018/cntm/src/pages/challenges/challenges.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_challenge_service_challenge_service__["a" /* ChallengeServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_alert_alert_controller__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], ChallengesPage);
    return ChallengesPage;
}());

var ChallengesTabs = (function () {
    function ChallengesTabs() {
        this.rootPage = ChallengesPage;
        this.community = "community";
        this.special = "special";
        this.closed = "closed";
    }
    ChallengesTabs = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-challengesstart',template:/*ion-inline-start:"/files/Documents/ws/ws/cntm2018/cntm/src/pages/challenges/challengesTabs.html"*/'<ion-tabs class="tabs-basic">\n  <ion-tab tabTitle="Community" [root]="rootPage" [rootParams]="community"></ion-tab>\n  <ion-tab tabTitle="Specials" [root]="rootPage" [rootParams]="special"></ion-tab>\n  <ion-tab tabTitle="Closed" [root]="rootPage" [rootParams]="closed"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/files/Documents/ws/ws/cntm2018/cntm/src/pages/challenges/challengesTabs.html"*/,
        })
    ], ChallengesTabs);
    return ChallengesTabs;
}());

//# sourceMappingURL=challenges.js.map

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserdetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_service_user_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_alert_alert_controller__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ranking_ranking__ = __webpack_require__(74);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the UserdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UserdetailPage = (function () {
    function UserdetailPage(navCtrl, navParams, usp, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.usp = usp;
        this.alertCtrl = alertCtrl;
        this.other = navParams.get('other');
        console.log(this.other);
        this.username = window.localStorage.getItem('username');
        this.token = window.localStorage.getItem('token');
        this.admin = window.localStorage.getItem('admin');
        this.usp.get_other_user_detail(this.username, this.token, this.other).then(function (result) {
            if ("username" in result) {
                console.log(result["username"]);
                _this.img_url = result["img_url"];
                if (!(_this.img_url.startsWith("http") || _this.img_url.startsWith("www"))) {
                    _this.img_url = _this.usp.get_api_url() + _this.img_url;
                }
                _this.descr = result["descr"];
                _this.age = result["age"];
                _this.hair = result["hair"];
                _this.eye = result["eye"];
                _this.hobbies = result["hobbies"];
                _this.score = parseInt(result["score"]);
                if (_this.admin == '1') {
                    _this.real_name = result["real_name"];
                }
            }
        }, function (err) {
        });
    }
    UserdetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UserdetailPage');
    };
    UserdetailPage.prototype.changePoints = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: "Add Points",
            inputs: [
                { name: 'inpt',
                    type: 'number'
                },
            ],
            buttons: [
                { text: 'Cancel', },
                { text: 'Save',
                    handler: function (data) {
                        _this.score += parseInt(data.inpt);
                        _this.usp.update_other_user_data(_this.username, _this.token, _this.other, "score", _this.score);
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    };
    UserdetailPage.prototype.deleteUser = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: "Delete ?",
            buttons: [
                { text: 'Cancel', },
                { text: 'OK',
                    handler: function () {
                        _this.usp.delete_user_data(_this.username, _this.token, _this.other).then(function (result) {
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__ranking_ranking__["a" /* RankingPage */]);
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    UserdetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-userdetail',template:/*ion-inline-start:"/files/Documents/ws/ws/cntm2018/cntm/src/pages/userdetail/userdetail.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>User</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <ion-card>\n\n    <img src="{{img_url}}">\n\n    <ion-item>\n      <h2>{{other}}</h2>\n      <p>&quot;{{descr}}&quot;</p>\n      <ion-badge item-end>{{score}}</ion-badge>\n    </ion-item>\n\n    <ion-item *ngIf="admin == \'1\'">\n      <ion-icon name=\'md-person\' item-start style="color: #f95c71"></ion-icon>\n      <p>{{real_name}}</p>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="calendar" item-start style="color: #f95c71"></ion-icon>\n      <p>{{age}}</p>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="cut" item-start style="color: #f95c71"></ion-icon>\n      <p>{{hair}}</p>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="eye" item-start style="color: #f95c71"></ion-icon>\n      <p>{{eye}}</p>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="football" item-start style="color: #f95c71"></ion-icon>\n      <p>{{hobbies}}</p>\n    </ion-item>\n\n\n    <ion-card-content center text-center>\n      <p>\n        <br>\n        {{descr}}\n      </p>\n\n    </ion-card-content>\n\n\n  </ion-card>\n  <ion-card *ngIf="admin == \'1\'">\n    <ion-row>\n      <ion-col>\n        <button ion-button icon-left clear small (click)="changePoints()">\n          <div>Change points</div>\n        </button>\n      </ion-col>\n      <ion-col text-right>\n        <button ion-button icon-left clear small  (click)="deleteUser()" >\n          <div>Delete</div>\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-card>\n\n\n</ion-content>\n\n'/*ion-inline-end:"/files/Documents/ws/ws/cntm2018/cntm/src/pages/userdetail/userdetail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_user_service_user_service__["a" /* UserServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_alert_alert_controller__["a" /* AlertController */]])
    ], UserdetailPage);
    return UserdetailPage;
}());

//# sourceMappingURL=userdetail.js.map

/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RankingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_service_user_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__userdetail_userdetail__ = __webpack_require__(73);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the RankingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RankingPage = (function () {
    function RankingPage(navCtrl, navParams, usp) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.usp = usp;
        var username = window.localStorage.getItem('username');
        var token = window.localStorage.getItem('token');
        this.usp.get_user_ranking(username, token).then(function (result) {
            _this.ranking = result["ranking"];
        }, function (err) {
        });
    }
    RankingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RankingPage');
    };
    RankingPage.prototype.detailView = function (username) {
        console.log(username);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__userdetail_userdetail__["a" /* UserdetailPage */], {
            other: username
        });
    };
    RankingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-ranking',template:/*ion-inline-start:"/files/Documents/ws/ws/cntm2018/cntm/src/pages/ranking/ranking.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Ranking</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-list >\n    <ion-item *ngFor="let user of ranking" (click)="detailView(user.username)" >\n        <!--<ion-thumbnail item-start>-->\n          <!--<img src="{{user.img_url}}">-->\n        <!--</ion-thumbnail>-->\n        <ion-avatar item-start>\n          <img src="{{user.img_url}}">\n        </ion-avatar>\n        <h2>{{user.username}}</h2>\n        <!--<p>&quot;{{user.descr}}&quot;</p>-->\n        <ion-badge item-end>{{user.score}}</ion-badge>\n    </ion-item>\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/files/Documents/ws/ws/cntm2018/cntm/src/pages/ranking/ranking.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_user_service_user_service__["a" /* UserServiceProvider */]])
    ], RankingPage);
    return RankingPage;
}());

//# sourceMappingURL=ranking.js.map

/***/ })

},[256]);
//# sourceMappingURL=main.js.map