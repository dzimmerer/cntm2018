webpackJsonp([11],{

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__register_register__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_loading_loading_controller__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular_components_toast_toast_controller__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_user_service_user_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular_components_app_menu_controller__ = __webpack_require__(31);
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
        // console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.onLogin = function (value) {
        var _this = this;
        if (this.authForm.valid) {
            this.showLoader();
            this.usp.login(value.username, value.password).then(function (result) {
                _this.loading.dismiss();
                _this.data = result;
                // console.log(result);
                if ("success" in result && result["success"] == 1) {
                    // console.log("Welcome!!!");
                    window.localStorage.setItem('token', result["token"]);
                    window.localStorage.setItem('username', result["username"]);
                    window.localStorage.setItem('admin', result["admin"] + "");
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                }
                else {
                    _this.presentToast("Could not Login!");
                    // console.log("WTf????");
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
            // console.log('Dismissed toast');
        });
        toast.present();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/login/login.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <form [formGroup]="authForm" (ngSubmit)="onLogin(authForm.value)">\n    <ion-item>\n      <ion-label floating>Username</ion-label>\n      <ion-input formControlName="username" type="text"></ion-input>\n    </ion-item>\n\n    <ion-item *ngIf="authForm.controls.username.hasError(\'required\') && authForm.controls.username.touched">\n      <p>Sorry, field username is required!</p>\n    </ion-item>\n    <ion-item *ngIf="authForm.controls.username.hasError(\'pattern\') && authForm.controls.username.touched">\n      <p>Sorry, only small and capital letters and numbers are allowed!</p>\n    </ion-item>\n    <ion-item *ngIf="authForm.controls.username.hasError(\'minlength\') && authForm.controls.username.touched">\n      <p>Sorry, minimum username length is 6!</p>\n    </ion-item>\n    <ion-item *ngIf="authForm.controls.username.hasError(\'maxlength\') && authForm.controls.username.touched">\n      <p>Sorry, maximum username length is 30!</p>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Password</ion-label>\n      <ion-input formControlName="password" type="password"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="authForm.controls.password.hasError(\'required\') && authForm.controls.password.touched">\n      <p>Sorry, field password is required!</p>\n    </ion-item>\n    <ion-item *ngIf="authForm.controls.password.hasError(\'minlength\') && authForm.controls.password.touched">\n      <p>Sorry, minimum password length is 8!</p>\n    </ion-item>\n\n    <button ion-button full color="primary" [disabled]="!authForm.valid" style="margin-top: 20px;" type="submit">Authorize</button>\n  </form>\n\n  <button ion-button block clear (click)="goRegister()">\n    No have an account? Register Now\n  </button>\n\n\n</ion-content>\n'/*ion-inline-end:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/login/login.html"*/,
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_loading_loading_controller__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_toast_toast_controller__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_user_service_user_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_app_menu_controller__ = __webpack_require__(31);
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
                    // console.log("Welcome!!!");
                    window.localStorage.setItem('token', result["token"]);
                    window.localStorage.setItem('username', result["username"]);
                    window.localStorage.setItem('admin', 0 + "");
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                }
                else {
                    _this.presentToast("Could not Register!");
                    // console.log("WTf????");
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
            // console.log('Dismissed toast');
        });
        toast.present();
    };
    RegisterPage.prototype.ionViewDidLoad = function () {
        this.menu.swipeEnable(false);
        // console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/register/register.html"*/'<!--\n  Generated template for the RegisterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Register</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <form [formGroup]="authForm" (ngSubmit)="onRegister(authForm.value)">\n\n    <ion-item>\n      <ion-label floating>E-M@il</ion-label>\n      <ion-input formControlName="email" type="text"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="authForm.controls.email.hasError(\'minlength\') && authForm.controls.username.touched">\n      <p>Sorry, minimum username length is 8!</p>\n    </ion-item>\n    <ion-item *ngIf="authForm.controls.email.hasError(\'pattern\') && authForm.controls.username.touched">\n      <p>Please enter a vaild email address!</p>\n    </ion-item>\n\n\n    <ion-item>\n      <ion-label floating>Username</ion-label>\n      <ion-input formControlName="username" type="text"></ion-input>\n    </ion-item>\n\n    <ion-item *ngIf="authForm.controls.username.hasError(\'required\') && authForm.controls.username.touched">\n      <p>Sorry, field username is required!</p>\n    </ion-item>\n    <ion-item *ngIf="authForm.controls.username.hasError(\'pattern\') && authForm.controls.username.touched">\n      <p>Sorry, only small and capital letters and numbers are allowed!</p>\n    </ion-item>\n    <ion-item *ngIf="authForm.controls.username.hasError(\'minlength\') && authForm.controls.username.touched">\n      <p>Sorry, minimum username length is 6!</p>\n    </ion-item>\n    <ion-item *ngIf="authForm.controls.username.hasError(\'maxlength\') && authForm.controls.username.touched">\n      <p>Sorry, maximum username length is 30!</p>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Password</ion-label>\n      <ion-input formControlName="password" type="password"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="authForm.controls.password.hasError(\'required\') && authForm.controls.password.touched">\n      <p>Sorry, field password is required!</p>\n    </ion-item>\n    <ion-item *ngIf="authForm.controls.password.hasError(\'minlength\') && authForm.controls.password.touched">\n      <p>Sorry, minimum password length is 8!</p>\n    </ion-item>\n\n    <button ion-button full color="primary" [disabled]="!authForm.valid" style="margin-top: 20px;" type="submit">Authorize</button>\n  </form>\n\n\n</ion-content>\n'/*ion-inline-end:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/register/register.html"*/,
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_service_user_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_challenge_service_challenge_service__ = __webpack_require__(55);
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
            _this.csp.get_label_answer_count(_this.username, _this.token, "Honey").then(function (result) {
                if ("elem_count" in result) {
                    var res_1 = result["elem_count"];
                    _this.models.forEach(function (m) {
                        if (m["name"] in res_1) {
                            m["honey"] = res_1[m["name"]];
                        }
                        else {
                            m["honey"] = 0;
                        }
                    });
                }
            }, function (err) {
            });
            _this.csp.get_label_answer_count(_this.username, _this.token, "Trump").then(function (result) {
                if ("elem_count" in result) {
                    var res_2 = result["elem_count"];
                    _this.models.forEach(function (m) {
                        if (m["name"] in res_2) {
                            m["trump"] = res_2[m["name"]];
                        }
                        else {
                            m["trump"] = 0;
                        }
                    });
                }
            }, function (err) {
            });
        }, function (err) {
        });
    }
    ModelwallPage.prototype.ionViewDidLoad = function () {
        // console.log('ionViewDidLoad ModelwallPage');
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
        // console.log(i, id)
    };
    ModelwallPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-modelwall',template:/*ion-inline-start:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/modelwall/modelwall.html"*/'\n<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Model Wall</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content  class="card-background-page">\n\n\n  <ion-content>\n\n    <ion-card *ngFor="let m of models; let i = index">\n      <img src="{{m.img_url}}" *ngIf="m.out == 0" imageViewer>\n      <img src="{{m.img_url}}" ngClass="gray_img" *ngIf="m.out == 1" imageViewer>\n    <div class="card-title">{{m.name}}, {{m.age}}</div>\n    <div class="card-subtitle">&quot;{{m.descr}}&quot;</div>\n      <button ion-button clear item-end (click)="openLink(m.link)">More</button>\n      <button ion-button clear item-end (click)="toggleActive(m.id, i)" *ngIf="admin == \'1\'">Toggle</button>\n      <div class="honey mid" *ngIf="m.honey > 0">\n        <p>{{m.honey}}</p>\n      </div>\n      <div class="trump mid" *ngIf="m.trump > 0">\n      <p>{{m.trump}}</p>\n    </div>\n  </ion-card>\n<!--<ion-list>-->\n    <!--<ion-item>-->\n      <!--<ion-thumbnail item-start>-->\n        <!--<img src="{{m.img_url}}" *ngIf="m.out == 0" imageViewer>-->\n        <!--<img src="{{m.img_url}}" ngClass="gray_img" *ngIf="m.out == 1" imageViewer>-->\n      <!--</ion-thumbnail>-->\n      <!--<h2>{{m.name}}, {{m.age}}</h2>-->\n      <!--<p>{{m.descr}}</p>-->\n      <!--<button ion-button clear item-end (click)="openLink(m.link)">More</button>-->\n    <!--</ion-item>-->\n  <!--</ion-list>-->\n\n\n</ion-content>\n'/*ion-inline-end:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/modelwall/modelwall.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_user_service_user_service__["a" /* UserServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_challenge_service_challenge_service__["a" /* ChallengeServiceProvider */]])
    ], ModelwallPage);
    return ModelwallPage;
}());

//# sourceMappingURL=modelwall.js.map

/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UseranswersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_alert_alert_controller__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__challengedetail_challengedetail__ = __webpack_require__(46);
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
 * Generated class for the UseranswersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UseranswersPage = (function () {
    function UseranswersPage(navCtrl, navParams, usp, alertCtrl, platform, appCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.usp = usp;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.appCtrl = appCtrl;
        this.username = window.localStorage.getItem('username');
        this.token = window.localStorage.getItem('token');
        this.admin = window.localStorage.getItem('admin');
        this.usp.get_user_answers(this.username, this.token).then(function (result) {
            _this.answers = result["answers"];
            // console.log(this.answers)
        }, function (err) {
        });
    }
    UseranswersPage.prototype.ionViewDidLoad = function () {
        // console.log('ionViewDidLoad UseranswersPage');
    };
    UseranswersPage.prototype.onChallenge = function (cid) {
        this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_4__challengedetail_challengedetail__["a" /* ChallengedetailPage */], {
            cid: cid
        });
    };
    UseranswersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-useranswers',template:/*ion-inline-start:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/useranswers/useranswers.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Anwsers</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-card *ngFor="let ca of answers; let i = index">\n\n    <ion-item (click)="onChallenge(ca.cid)">\n      <ion-icon name="help-circle" item-end style="color: #c3af80" *ngIf="ca.ctype == 0" item-start ></ion-icon>\n      <ion-icon name="people" item-end style="color: #c3af80" *ngIf="ca.ctype == 1" item-start></ion-icon>\n      <ion-icon name="swap" item-end style="color: #c3af80" *ngIf="ca.ctype == 2" item-start></ion-icon>\n\n      <h2>{{ca.cname}}</h2>\n      <p *ngIf="ca.active == 0 && ca.copen == 0">Open</p>\n      <p *ngIf="ca.active == 0 && ca.copen == 1">Closed</p>\n      <p *ngIf="ca.active == 0 && ca.copen == 2">Closed & Ended.</p>\n      <p *ngIf="ca.active == 1">Closed & Ended</p>\n      <ion-badge item-end *ngIf="ca.ctype>=1  ">{{ca.points}}</ion-badge>\n    </ion-item>\n    <ion-card-content>\n      <p *ngIf="ca.ctype != 2">{{ca.text}}</p>\n      <p *ngIf="ca.ctype == 2">I dare you!</p>\n    </ion-card-content>\n\n  </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/useranswers/useranswers.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__["a" /* UserServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_alert_alert_controller__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], UseranswersPage);
    return UseranswersPage;
}());

//# sourceMappingURL=useranswers.js.map

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserchallengesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_alert_alert_controller__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__challengedetail_challengedetail__ = __webpack_require__(46);
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
 * Generated class for the UserchallengesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UserchallengesPage = (function () {
    function UserchallengesPage(navCtrl, navParams, usp, alertCtrl, platform, appCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.usp = usp;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.appCtrl = appCtrl;
        this.username = window.localStorage.getItem('username');
        this.token = window.localStorage.getItem('token');
        this.admin = window.localStorage.getItem('admin');
        this.usp.get_user_challenges(this.username, this.token).then(function (result) {
            _this.challenges = result["challenges"];
        }, function (err) {
        });
    }
    UserchallengesPage.prototype.ionViewDidLoad = function () {
        // console.log('ionViewDidLoad UserchallengesPage');
    };
    UserchallengesPage.prototype.onChallenge = function (cid) {
        this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_4__challengedetail_challengedetail__["a" /* ChallengedetailPage */], {
            cid: cid
        });
    };
    UserchallengesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-userchallenges',template:/*ion-inline-start:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/userchallenges/userchallenges.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Challenges</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-card *ngFor="let c of challenges" (click)="onChallenge(c.id)">\n    <ion-item>\n\n      <ion-icon name="people" item-end style="color: #c3af80" *ngIf="c.type == 1" item-start></ion-icon>\n\n      <ion-icon name="swap" item-end style="color: #c3af80" *ngIf="c.type == 2" item-start></ion-icon>\n\n      <h2>{{c.name}}</h2>\n      <p *ngIf="c.open == 0">Open</p>\n      <p *ngIf="c.open == 1">Please End & Give Points !</p>\n      <p *ngIf="c.open == 2">Closed</p>\n      <div item-end>\n        <ion-icon name="alert" style="color: #a61000" *ngIf="c.open == 1"></ion-icon>\n        <ion-badge float-right *ngIf="c.open != 1">{{c.points}}</ion-badge>\n      </div>\n    </ion-item>\n  </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/userchallenges/userchallenges.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__["a" /* UserServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_alert_alert_controller__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], UserchallengesPage);
    return UserchallengesPage;
}());

//# sourceMappingURL=userchallenges.js.map

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserlogsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_alert_alert_controller__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__challengedetail_challengedetail__ = __webpack_require__(46);
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
 * Generated class for the UserlogsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UserlogsPage = (function () {
    function UserlogsPage(navCtrl, navParams, usp, alertCtrl, platform, appCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.usp = usp;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.appCtrl = appCtrl;
        this.username = window.localStorage.getItem('username');
        this.token = window.localStorage.getItem('token');
        this.admin = window.localStorage.getItem('admin');
        this.usp.get_user_log(this.username, this.token).then(function (result) {
            _this.logs = result["logs"];
            // console.log(this.logs)
        }, function (err) {
        });
    }
    UserlogsPage.prototype.ionViewDidLoad = function () {
        // console.log('ionViewDidLoad UserlogsPage');
    };
    UserlogsPage.prototype.onChallenge = function (cid) {
        this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_4__challengedetail_challengedetail__["a" /* ChallengedetailPage */], {
            cid: cid
        });
    };
    UserlogsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-userlogs',template:/*ion-inline-start:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/userlogs/userlogs.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Logs</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n\n\n<ion-content>\n\n  <ion-card *ngFor="let l of logs">\n    <ion-item>\n\n      <ion-icon name="person" item-end style="color: #c3af80" *ngIf="l.type == -1" item-start (click)="onChallenge(l.cid)"></ion-icon>\n      <ion-icon name="help-circle" item-end style="color: #c3af80" *ngIf="l.type == 0" item-start (click)="onChallenge(l.cid)"></ion-icon>\n      <ion-icon name="people" item-end style="color: #c3af80" *ngIf="l.type == 1" item-start (click)="onChallenge(l.cid)"></ion-icon>\n      <ion-icon name="swap" item-end style="color: #c3af80" *ngIf="l.type == 2" item-start (click)="onChallenge(l.cid)"></ion-icon>\n\n      <p>{{l.time}}</p>\n      <h2>{{l.cname}}</h2>\n      <p *ngIf="l.ctype != 0">by {{l.ccreator}}</p>\n      <p *ngIf="l.ctype == 0">Special</p>\n      <ion-badge item-end *ngIf="l.points > 0"> +{{l.points}}</ion-badge>\n      <ion-badge item-end *ngIf="l.points <= 0">{{l.points}}</ion-badge>\n    </ion-item>\n    <ion-card-content *ngIf="l.type == -1">\n      <p>{{l.cdesc}}</p>\n      <br>\n      <p *ngIf="l.ctype == 2 && l.csolution == 1">You lost the bet.</p>\n      <p *ngIf="l.ctype == 2 && l.csolution == 0">You won the bet</p>\n      <p *ngIf="l.ctype == 1">You hosted the bet</p>\n    </ion-card-content>\n    <ion-card-content *ngIf="l.type == 0">\n      <p>{{l.cdesc}}</p>\n      <br>\n      <p>Correct Solution: {{l.csolution}}</p>\n      <p>Your Answer: {{l.canswer}}</p>\n    </ion-card-content>\n    <ion-card-content *ngIf="l.type == 1">\n      <p>{{l.cdesc}}</p>\n      <br>\n      <p>Correct Solution: {{l.csolution}}</p>\n      <p>Your Answer: {{l.canswer}}</p>\n    </ion-card-content>\n    <ion-card-content *ngIf="l.type == 2">\n      <p>{{l.cdesc}}</p>\n      <br>\n      <p *ngIf="l.csolution == 0">You lost the bet.</p>\n      <p *ngIf="l.csolution == 1">You won the bet</p>\n    </ion-card-content>\n\n  </ion-card>\n\n\n</ion-content>\n'/*ion-inline-end:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/userlogs/userlogs.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__["a" /* UserServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_alert_alert_controller__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], UserlogsPage);
    return UserlogsPage;
}());

//# sourceMappingURL=userlogs.js.map

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsertabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__profile_profile__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__useranswers_useranswers__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__userchallenges_userchallenges__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__userlogs_userlogs__ = __webpack_require__(143);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





/**
 * Generated class for the UsertabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UsertabsPage = (function () {
    function UsertabsPage() {
        this.profilePage = __WEBPACK_IMPORTED_MODULE_1__profile_profile__["a" /* ProfilePage */];
        this.uchallengePage = __WEBPACK_IMPORTED_MODULE_3__userchallenges_userchallenges__["a" /* UserchallengesPage */];
        this.uanswerPage = __WEBPACK_IMPORTED_MODULE_2__useranswers_useranswers__["a" /* UseranswersPage */];
        this.ulogPage = __WEBPACK_IMPORTED_MODULE_4__userlogs_userlogs__["a" /* UserlogsPage */];
    }
    UsertabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-usertabs',template:/*ion-inline-start:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/usertabs/usertabs.html"*/'<ion-tabs class="tabs-basic">\n  <ion-tab tabTitle="Profile" [root]="profilePage"></ion-tab>\n  <ion-tab tabTitle="Challenges" [root]="uchallengePage"></ion-tab>\n  <ion-tab tabTitle="Answers" [root]="uanswerPage"></ion-tab>\n  <ion-tab tabTitle="Log" [root]="ulogPage"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/usertabs/usertabs.html"*/,
        })
    ], UsertabsPage);
    return UsertabsPage;
}());

//# sourceMappingURL=usertabs.js.map

/***/ }),

/***/ 155:
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
webpackEmptyAsyncContext.id = 155;

/***/ }),

/***/ 196:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/challengedetail/challengedetail.module": [
		424,
		10
	],
	"../pages/challenges/challenges.module": [
		425,
		9
	],
	"../pages/login/login.module": [
		426,
		8
	],
	"../pages/modelwall/modelwall.module": [
		427,
		7
	],
	"../pages/ranking/ranking.module": [
		428,
		6
	],
	"../pages/register/register.module": [
		429,
		5
	],
	"../pages/useranswers/useranswers.module": [
		430,
		4
	],
	"../pages/userchallenges/userchallenges.module": [
		431,
		3
	],
	"../pages/userdetail/userdetail.module": [
		432,
		2
	],
	"../pages/userlogs/userlogs.module": [
		433,
		1
	],
	"../pages/usertabs/usertabs.module": [
		434,
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
webpackAsyncContext.id = 196;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_service_user_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_alert_alert_controller__ = __webpack_require__(26);
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
                // console.log(result["username"]);
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
                        // console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    };
    ProfilePage.prototype.chPassword = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: "Change password:",
            inputs: [
                { name: 'inpt',
                    type: "password" },
            ],
            buttons: [
                { text: 'Cancel', },
                { text: 'Save',
                    handler: function (data) {
                        _this.usp.update_user_password(_this.username, _this.token, data.inpt);
                        // console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/profile/profile.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Profile</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-card>\n\n    <ion-item>\n      <ion-avatar item-start>\n        <img src="{{img_url}}">\n      </ion-avatar>\n      <h2>{{username}}</h2>\n      <p>&quot;{{descr}}&quot;</p>\n      <ion-badge item-end>{{score}}</ion-badge>\n    </ion-item>\n\n\n    <ion-item>\n      <ion-icon name=\'md-person\' item-start style="color: #f95c71"></ion-icon>\n      <p>{{real_name}}</p>\n      <button ion-button clear small item-end (click)="chVal(\'real_name\', \'Real Name\')" >\n        <ion-icon name=\'md-create\'></ion-icon>\n      </button>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="calendar" item-start style="color: #f95c71"></ion-icon>\n      <p>{{age}}</p>\n      <button ion-button clear small item-end (click)="chVal(\'age\', \'Age\')" >\n        <ion-icon name=\'md-create\'></ion-icon>\n      </button>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="cut" item-start style="color: #f95c71"></ion-icon>\n      <p>{{hair}}</p>\n      <button ion-button clear small item-end (click)="chVal(\'hair\', \'Hair Style\')" >\n        <ion-icon name=\'md-create\'></ion-icon>\n      </button>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="eye" item-start style="color: #f95c71"></ion-icon>\n      <p>{{eye}}</p>\n      <button ion-button clear small item-end (click)="chVal(\'eye\', \'Eye color\')" >\n        <ion-icon name=\'md-create\'></ion-icon>\n      </button>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="football" item-start style="color: #f95c71"></ion-icon>\n      <p>{{hobbies}}</p>\n      <button ion-button clear small item-end (click)="chVal(\'hobbies\', \'Hobbies\')" >\n        <ion-icon name=\'md-create\'></ion-icon>\n      </button>\n    </ion-item>\n\n\n    <ion-card-content center text-center>\n      <p>\n        <br>\n      {{descr}}\n      </p>\n\n    </ion-card-content>\n\n    <ion-row>\n      <ion-col>\n        <button ion-button icon-left clear small (click)="chVal(\'img_url\', \'Enter a new Image URL\')">\n          <div>Edit Pic</div>\n        </button>\n      </ion-col>\n      <ion-col text-right>\n        <button ion-button icon-left clear small  (click)="chPassword()" >\n          <div>Edit Password</div>\n        </button>\n      </ion-col>\n      <ion-col text-right>\n        <button ion-button icon-left clear small  (click)="chVal(\'descr\', \'Description\')" >\n          <div>Edit Text</div>\n        </button>\n      </ion-col>\n\n    </ion-row>\n\n  </ion-card>\n\n\n</ion-content>\n'/*ion-inline-end:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/profile/profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_user_service_user_service__["a" /* UserServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_alert_alert_controller__["a" /* AlertController */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(270);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_profile_profile__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_register_register__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_user_service_user_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_angular_components_toast_toast_controller__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ionic_angular_components_loading_loading_controller__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_common_http__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_file_chooser__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_ranking_ranking__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_userdetail_userdetail__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_challenges_challenges__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_challenge_service_challenge_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_challengedetail_challengedetail__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_home_home__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_modelwall_modelwall__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_ionic_img_viewer__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_usertabs_usertabs__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_userchallenges_userchallenges__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_useranswers_useranswers__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_userlogs_userlogs__ = __webpack_require__(143);
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
                __WEBPACK_IMPORTED_MODULE_22__pages_usertabs_usertabs__["a" /* UsertabsPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_userchallenges_userchallenges__["a" /* UserchallengesPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_useranswers_useranswers__["a" /* UseranswersPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_userlogs_userlogs__["a" /* UserlogsPage */],
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
                        { loadChildren: '../pages/useranswers/useranswers.module#UseranswersPageModule', name: 'UseranswersPage', segment: 'useranswers', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/userchallenges/userchallenges.module#UserchallengesPageModule', name: 'UserchallengesPage', segment: 'userchallenges', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/userdetail/userdetail.module#UserdetailPageModule', name: 'UserdetailPage', segment: 'userdetail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/userlogs/userlogs.module#UserlogsPageModule', name: 'UserlogsPage', segment: 'userlogs', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/usertabs/usertabs.module#UsertabsPageModule', name: 'UsertabsPage', segment: 'usertabs', priority: 'low', defaultHistory: [] }
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
                __WEBPACK_IMPORTED_MODULE_22__pages_usertabs_usertabs__["a" /* UsertabsPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_userchallenges_userchallenges__["a" /* UserchallengesPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_useranswers_useranswers__["a" /* UseranswersPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_userlogs_userlogs__["a" /* UserlogsPage */],
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

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(107);
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
    UserServiceProvider.prototype.get_user_score_details = function (username, token, other) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token + "&other=" + other;
            _this.http.get(apiUrl + 'get_user_score_details/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserServiceProvider.prototype.get_user_challenges = function (username, token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token;
            _this.http.get(apiUrl + 'get_user_challenges/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserServiceProvider.prototype.get_user_answers = function (username, token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token;
            _this.http.get(apiUrl + 'get_user_answers/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserServiceProvider.prototype.get_user_log = function (username, token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token;
            _this.http.get(apiUrl + 'get_user_log/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserServiceProvider.prototype.get_other_user_log = function (username, token, other) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token + "&other=" + other;
            _this.http.get(apiUrl + 'get_user_log/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserServiceProvider.prototype.update_user_password = function (username, token, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token + "&password=" + password;
            _this.http.get(apiUrl + 'update_user_password/' + get_params)
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

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_ranking_ranking__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_challenges_challenges__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_modelwall_modelwall__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_usertabs_usertabs__ = __webpack_require__(144);
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
    function MyApp(platform, statusBar, splashScreen, app) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.app = app;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.lastBack = 0;
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'User', component: __WEBPACK_IMPORTED_MODULE_9__pages_usertabs_usertabs__["a" /* UsertabsPage */] },
            { title: 'Ranking', component: __WEBPACK_IMPORTED_MODULE_6__pages_ranking_ranking__["a" /* RankingPage */] },
            { title: 'Challenges', component: __WEBPACK_IMPORTED_MODULE_7__pages_challenges_challenges__["b" /* ChallengesTabs */] },
            { title: 'Model Wall', component: __WEBPACK_IMPORTED_MODULE_8__pages_modelwall_modelwall__["a" /* ModelwallPage */] },
        ];
        platform.registerBackButtonAction(function () {
            var overlay = _this.app._appRoot._overlayPortal.getActive();
            var nav = _this.app.getActiveNav();
            if (overlay && overlay.dismiss) {
                overlay.dismiss();
            }
            else if (nav.canGoBack()) {
                nav.pop();
            }
            else if (Date.now() - _this.lastBack < 500) {
                _this.platform.exitApp();
            }
            _this.lastBack = Date.now();
        });
    }
    MyApp.prototype.checkPreviousAuthorization = function () {
        if ((window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username') === null) &&
            (window.localStorage.getItem('token') === "undefined" || window.localStorage.getItem('token') === null)) {
            this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */];
        }
        else {
            this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        }
    };
    MyApp.prototype.logout = function () {
        window.localStorage.setItem('token', "undefined");
        window.localStorage.setItem('username', "undefined");
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */]);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar color="primary">\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n      <button menuClose ion-button clear (click)="logout()">\n        <ion-icon name="log-out"></ion-icon>\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChallengedetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_challenge_service_challenge_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_alert_alert_controller__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__challenges_challenges__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__userdetail_userdetail__ = __webpack_require__(74);
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
    function ChallengedetailPage(navCtrl, navParams, csp, alertCtrl, appCtrl, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.csp = csp;
        this.alertCtrl = alertCtrl;
        this.appCtrl = appCtrl;
        this.platform = platform;
        this.choice_list = [];
        this.etime = {
            "time": "",
            "date": ""
        };
        this.c_anwser = "";
        this.ca_own = {};
        this.ca_other = [];
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
                _this.embet = _this.type == 2;
                if (_this.creator == _this.username) {
                    _this.cadmin = '1';
                }
                if (result["etime"] != "") {
                    // console.log(result["etime"]);
                    var split_time = result["etime"].split(" ");
                    _this.etime.time = split_time[0];
                    _this.etime.date = split_time[1];
                }
            }
        }, function (err) {
        });
        this.set_ch_answers();
        this.platform.registerBackButtonAction(function () { return _this.willLeave(); }, 2);
    }
    ChallengedetailPage.prototype.ionViewDidLoad = function () {
        // console.log('ionViewDidLoad ChallengedetailPage');
    };
    ChallengedetailPage.prototype.set_ch_answers = function () {
        var _this = this;
        this.csp.get_challenge_answers(this.username, this.token, this.cid).then(function (result) {
            if ("other" in result && (_this.type != 1 || _this.open >= 2)) {
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
                if (data) {
                    // Update
                    _this.csp.give_challenge_answer(_this.username, _this.token, _this.cid, data).then(function (result) {
                        _this.set_ch_answers();
                    }, function (err) {
                    });
                }
            }
        });
        alert.present();
        // console.log("Answer....")
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
                        // console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    };
    ChallengedetailPage.prototype.chPoints = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: "New Points",
            inputs: [
                { name: 'inpt',
                    value: this.points },
            ],
            buttons: [
                { text: 'Cancel', },
                { text: 'Save',
                    handler: function (data) {
                        _this.csp.has_challenge_answer_points(_this.username, _this.token, _this.cid, data.inpt - _this.points).then(function (result) {
                            if (result["success"] == 1) {
                                _this.csp.update_challenge_data(_this.username, _this.token, _this.cid, "points", data.inpt);
                                _this.points = data.inpt;
                            }
                            else {
                                var alert_1 = _this.alertCtrl.create({
                                    title: 'Not enough points',
                                    buttons: ['OK']
                                });
                                alert_1.present();
                            }
                        });
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
            var alert_2 = this.alertCtrl.create({
                title: 'Please insert solution first!',
                buttons: ['OK']
            });
            alert_2.present();
        }
        else {
            var alert_3 = this.alertCtrl.create({
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
                                    // console.log("Distributed Points.....");
                                }
                            });
                        }
                    }
                ]
            });
            alert_3.present();
        }
    };
    ChallengedetailPage.prototype.toggleOpen = function () {
        var _this = this;
        if (this.open < 2) {
            var alert_4 = this.alertCtrl.create();
            alert_4.setTitle('Open');
            alert_4.addInput({
                type: 'radio',
                label: 'Open',
                value: '0',
                checked: this.open == 0,
            });
            alert_4.addInput({
                type: 'radio',
                label: 'Closed',
                value: '1',
                checked: this.open == 1,
            });
            alert_4.addButton('Cancel');
            alert_4.addButton({
                text: 'OK',
                handler: function (data) {
                    // Update
                    _this.open = data;
                    _this.csp.update_challenge_data(_this.username, _this.token, _this.cid, "open", data);
                }
            });
            alert_4.present();
        }
    };
    ChallengedetailPage.prototype.makePublic = function () {
        var _this = this;
        if (this.cadmin == 1 && this.open == -1 && this.type == 2 && this.points == 0) {
            var alert_5 = this.alertCtrl.create({
                title: 'Are you sure you want to Bet 0 Points ?',
                buttons: [
                    { text: 'Cancel', },
                    {
                        text: 'Yes',
                        handler: function () {
                            _this.open = 0;
                            _this.csp.update_challenge_data(_this.username, _this.token, _this.cid, "open", 0);
                        }
                    }
                ]
            });
            alert_5.present();
        }
        else if (this.cadmin == 1 && this.open == -1) {
            this.open = 0;
            this.csp.update_challenge_data(this.username, this.token, this.cid, "open", 0);
        }
    };
    ChallengedetailPage.prototype.setEndTime = function (param) {
        if (this.etime.time != "" && this.etime.date != "") {
            var time_str = this.etime.time + " " + this.etime.date;
            this.csp.update_challenge_data(this.username, this.token, this.cid, "etime", time_str);
        }
        else {
            if (param == 1) {
                var alert_6 = this.alertCtrl.create({
                    title: 'Please give a end time and date first!',
                    buttons: ['OK']
                });
                alert_6.present();
            }
        }
    };
    ChallengedetailPage.prototype.deleteEndTime = function () {
        this.etime.time = "";
        this.etime.date = "";
        this.csp.update_challenge_data(this.username, this.token, this.cid, "etime", "");
    };
    ChallengedetailPage.prototype.changeEmBet = function () {
        if (this.embet) {
            this.type = 2;
            this.csp.update_challenge_data(this.username, this.token, this.cid, "type", 2);
        }
        else {
            this.type = 1;
            this.csp.update_challenge_data(this.username, this.token, this.cid, "type", 1);
        }
        // console.log(this.type);
    };
    ChallengedetailPage.prototype.setSolution = function () {
        var _this = this;
        if (this.type == 2) {
            var alert_7 = this.alertCtrl.create();
            alert_7.setTitle('You');
            alert_7.addInput({
                type: 'radio',
                label: 'Won',
                value: '0',
            });
            alert_7.addInput({
                type: 'radio',
                label: 'Lost',
                value: '1',
            });
            alert_7.addButton('Cancel');
            alert_7.addButton({
                text: 'OK',
                handler: function (data) {
                    // Update
                    _this.answer = data;
                    _this.csp.update_challenge_data(_this.username, _this.token, _this.cid, "answer", data);
                }
            });
            alert_7.present();
        }
        else {
            var alert_8 = this.alertCtrl.create();
            alert_8.setTitle('Solution');
            if (this.has_choice == 1 && this.admin == '0') {
                this.choice_list.forEach(function (element) {
                    alert_8.addInput({
                        type: 'radio',
                        label: element,
                        value: element,
                        checked: false,
                    });
                });
            }
            else if (this.has_choice == 2 && this.admin == '0') {
                this.choice_list.forEach(function (element) {
                    alert_8.addInput({
                        type: 'checkbox',
                        label: element,
                        value: element,
                        checked: false,
                    });
                });
            }
            else {
                alert_8.addInput({
                    type: 'text',
                    name: 'inpt',
                    value: this.answer,
                });
            }
            alert_8.addButton('Cancel');
            alert_8.addButton({
                text: 'OK',
                handler: function (data) {
                    if (_this.has_choice == 0 || _this.admin == '1') {
                        data = data["inpt"];
                    }
                    if (data) {
                        // Update
                        _this.answer = data;
                        _this.csp.update_challenge_data(_this.username, _this.token, _this.cid, "answer", data);
                    }
                }
            });
            alert_8.present();
        }
    };
    ChallengedetailPage.prototype.doBetAgainst = function () {
        var _this = this;
        if (this.type == 2 && this.c_anwser == "") {
            var alert_9 = this.alertCtrl.create();
            alert_9.setTitle('Make your Bet');
            alert_9.setSubTitle('Are you sure you want to bet ' + this.points + ' Points ?');
            alert_9.addButton('Cancel');
            alert_9.addButton({
                text: 'OK',
                handler: function () {
                    // Update
                    _this.csp.has_challenge_answer_points(_this.username, _this.token, _this.cid, _this.points).then(function (result) {
                        if (result["success"] == 1) {
                            _this.csp.give_challenge_answer(_this.username, _this.token, _this.cid, '1').then(function (result) {
                                _this.csp.give_challenge_answer_points(_this.username, _this.token, _this.cid, _this.points);
                                _this.set_ch_answers();
                            }, function (err) {
                            });
                        }
                        else {
                            var alert_10 = _this.alertCtrl.create({
                                title: 'Not enough points',
                                buttons: ['OK']
                            });
                            alert_10.present();
                        }
                    });
                }
            });
            alert_9.present();
        }
    };
    ChallengedetailPage.prototype.doBetCounter = function () {
        var _this = this;
        if (this.type == 2) {
            var user_points_1 = 0;
            if ("points" in this.ca_own) {
                user_points_1 = this.ca_own["points"];
            }
            var challenge_points = 0;
            if ("is_best" in this.ca_own && this.ca_own["is_best"]) {
                challenge_points = this.ca_own["points"];
            }
            else if (this.ca_other.length > 0 && this.ca_other[0]["is_best"]) {
                challenge_points = this.ca_other[0]["points"];
            }
            console.log(user_points_1);
            console.log(challenge_points);
            var counter_points_1 = challenge_points + 1 - user_points_1;
            console.log(counter_points_1);
            var alert_11 = this.alertCtrl.create();
            alert_11.setTitle('Make your Bet');
            alert_11.setSubTitle('Are you sure you want to bet ' + (user_points_1 + counter_points_1) + ' Points ?');
            alert_11.addButton('Cancel');
            alert_11.addButton({
                text: 'OK',
                handler: function () {
                    // Update
                    _this.csp.has_challenge_answer_points(_this.username, _this.token, _this.cid, counter_points_1).then(function (result) {
                        if (result["success"] == 1) {
                            _this.csp.give_challenge_answer(_this.username, _this.token, _this.cid, '1').then(function (result) {
                                _this.csp.give_challenge_answer_points(_this.username, _this.token, _this.cid, counter_points_1);
                                _this.ca_own["points"] = user_points_1 + counter_points_1;
                                _this.ca_own["is_best"] = true;
                                _this.ca_other = [];
                                //this.set_ch_answers();
                            }, function (err) {
                            });
                        }
                        else {
                            var alert_12 = _this.alertCtrl.create({
                                title: 'Not enough points',
                                buttons: ['OK']
                            });
                            alert_12.present();
                        }
                    });
                }
            });
            alert_11.present();
        }
    };
    ChallengedetailPage.prototype.doBetPoints = function () {
        var _this = this;
        if (this.type == 2) {
            var user_points_2 = 0;
            if ("points" in this.ca_own) {
                user_points_2 = this.ca_own["points"];
            }
            console.log(user_points_2);
            var prompt_1 = this.alertCtrl.create({
                title: "Points:",
                inputs: [
                    { name: 'inpt',
                        value: user_points_2 + "" },
                ],
                buttons: [
                    { text: 'Cancel', },
                    { text: 'Bet',
                        handler: function (data) {
                            // Update
                            var counter_points = data.inpt - user_points_2;
                            _this.csp.has_challenge_answer_points(_this.username, _this.token, _this.cid, counter_points).then(function (result) {
                                if (result["success"] == 1) {
                                    _this.csp.give_challenge_answer(_this.username, _this.token, _this.cid, '1').then(function (result) {
                                        _this.csp.give_challenge_answer_points(_this.username, _this.token, _this.cid, counter_points);
                                        _this.set_ch_answers();
                                    }, function (err) {
                                    });
                                }
                                else {
                                    var alert_13 = _this.alertCtrl.create({
                                        title: 'Could not bet points',
                                        buttons: ['OK']
                                    });
                                    alert_13.present();
                                }
                            });
                        }
                    }
                ]
            });
            prompt_1.present();
        }
    };
    ChallengedetailPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.navBar.backButtonClick = function () {
            _this.willLeave();
        };
    };
    ChallengedetailPage.prototype.willLeave = function () {
        var _this = this;
        if (this.cadmin == 1 && this.open == -1) {
            // console.log('Looks like I’m about to leave :(');
            var alert_14 = this.alertCtrl.create({
                title: 'Are you sure you want to leave ?',
                message: 'If you leave now without publishing, the challenge will be lost.',
                buttons: [
                    { text: 'Cancel', },
                    {
                        text: 'Yes',
                        handler: function () {
                            _this.appCtrl.getRootNav().pop();
                        }
                    }
                ]
            });
            alert_14.present();
        }
        else if (this.cadmin == 1 && (this.open == 0 || this.open == 1)) {
            this.appCtrl.getRootNav().pop();
        }
        else {
            this.appCtrl.getRootNav().pop();
        }
    };
    ChallengedetailPage.prototype.chChoices = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: "Choices",
            subTitle: "'  ' -> Textfield <br>'a|b' -> either a or b <br>'a&b' -> a and/or b",
            inputs: [
                { name: 'inpt',
                    value: this.choice },
            ],
            buttons: [
                { text: 'All',
                    handler: function (data) {
                        _this.csp.get_gntm_model_names(_this.username, _this.token).then(function (result) {
                            var models = result["models"].join("|");
                            _this.csp.update_challenge_data(_this.username, _this.token, _this.cid, "choice", models);
                            _this.choice = models;
                            _this.has_choice = 1;
                            _this.choice_list = models.split("|");
                        }, function (err) {
                        });
                    }
                },
                { text: 'Cancel', },
                { text: 'Save',
                    handler: function (data) {
                        if (data.inpt.includes("&") && data.inpt.includes("|")) {
                            var alert_15 = _this.alertCtrl.create({
                                title: "You can't combine '&' and '|' in your answer, choose either one !",
                                buttons: ['OK']
                            });
                            alert_15.present();
                        }
                        else {
                            _this.choice = data.inpt;
                            _this.csp.update_challenge_data(_this.username, _this.token, _this.cid, "choice", data.inpt);
                            if (data.inpt.includes("&")) {
                                _this.has_choice = 2;
                                _this.choice_list = data.inpt.split("&");
                            }
                            else if (data.inpt.includes("|")) {
                                _this.has_choice = 1;
                                _this.choice_list = data.inpt.split("|");
                            }
                            else {
                                _this.has_choice = 0;
                            }
                        }
                    }
                }
            ]
        });
        prompt.present();
    };
    ChallengedetailPage.prototype.deleteOwnAnswer = function () {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Delete your answer ?');
        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: function () {
                // Update
                _this.csp.delete_answer(_this.username, _this.token, _this.cid).then(function (result) {
                    if (result["success"] == 1) {
                        _this.c_anwser = "";
                        _this.ca_own = {};
                    }
                    else {
                    }
                });
            }
        });
        alert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('navbar'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Navbar */])
    ], ChallengedetailPage.prototype, "navBar", void 0);
    ChallengedetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-challengedetail',template:/*ion-inline-start:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/challengedetail/challengedetail.html"*/'<ion-header>\n\n  <ion-navbar #navbar color="primary">\n    <ion-title>Challenge</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <ion-card>\n\n    <ion-item>\n      <h2>{{name}}</h2>\n      <p *ngIf="open >= 1">by {{creator}}</p>\n      <p *ngIf="open == 0 && type==1">Hosted Bet</p>\n      <p *ngIf="open == 0 && type==2">Direct Bet</p>\n      <ion-badge item-end>\n        {{points}}\n      </ion-badge>\n      <ion-icon name="checkmark" style="color: #c3af80" item-end *ngIf="open == 2"></ion-icon>\n    </ion-item>\n\n    <ion-card-content>\n      <div [innerHTML]="descr"></div>\n    </ion-card-content>\n    <ion-card-content *ngIf="type < 2">\n      <i>Possible Answers:</i>\n      <ul style="list-style-type:square" *ngIf="has_choice == 2">\n        <li *ngFor="let ch of choice_list | slice:0:4; let i = index">\n          <p *ngIf="i < 3">{{ch}}</p>\n          <p *ngIf="i == 3">...</p>\n        </li>\n      </ul>\n      <ul style="list-style-type:circle" *ngIf="has_choice == 1">\n        <li *ngFor="let ch of choice_list | slice:0:4; let i = index">\n          <p *ngIf="i < 3">{{ch}}</p>\n          <p *ngIf="i == 3">...</p>\n        </li>\n      </ul>\n      <p *ngIf="has_choice == 0">Everything ;-D</p>\n\n    </ion-card-content>\n    <ion-card-content *ngIf="open<=0 && etime.time != \'\' && etime.date != \'\' ">\n      <i>Open until: {{etime.date}} {{etime.time}}</i>\n    </ion-card-content>\n    <ion-card-content *ngIf="cadmin == \'1\' || open==2">\n      <p *ngIf="type != 2 && answer != \'\'"><b>Solution:</b> {{answer}}</p>\n      <p *ngIf="type == 2 && answer == \'0\'"><b>Solution:</b> Won Bet</p>\n      <p *ngIf="type == 2 && answer == \'1\'"><b>Solution:</b> Lost Bet</p>\n    </ion-card-content>\n\n\n\n    <ion-row>\n      <ion-col *ngIf="open == 0 && type != 2">\n        <button ion-button icon-left clear small (click)="doAnswer()" *ngIf="cadmin == \'0\'">\n          <ion-icon name="text"></ion-icon>\n          <div>Answer</div>\n        </button>\n      </ion-col>\n      <ion-col *ngIf="open == 0 && type == 2 && ca_other?.length == 0">\n        <button ion-button icon-left clear small (click)="doBetAgainst()" *ngIf="cadmin == \'0\'">\n          <ion-icon name="swap"></ion-icon>\n          <div>Bet against</div>\n        </button>\n      </ion-col>\n      <ion-col *ngIf="open == 0 && type == 2 && ca_other?.length > 0">\n        <button ion-button icon-left clear small (click)="doBetCounter()" *ngIf="cadmin == \'0\'">\n          <ion-icon name="swap"></ion-icon>\n          <div>Counter</div>\n        </button>\n      </ion-col>\n      <ion-col text-end>\n        <button ion-button icon-left clear small>\n          <div *ngIf="open == 0">open</div>\n          <div *ngIf="open >= 1">closed.</div>\n        </button>\n        <button ion-button icon-left clear small *ngIf="cadmin == \'1\' && admin == \'0\' && open >= 0 && open < 2 && !(etime.time != \'\' && etime.date != \'\' ) " (click)="toggleOpen()">\n          <div>Open/Close</div>\n        </button>\n        <button ion-button icon-left clear  *ngIf="cadmin == \'1\' && admin == \'0\' && open < 0" (click)="makePublic()">\n          <ion-icon name="arrow-round-forward"></ion-icon>\n          <div>Make Public </div>\n          <ion-icon name="arrow-round-back"></ion-icon>\n        </button>\n        <button ion-button icon-left clear small *ngIf="admin == \'1\'" (click)="chVal(\'open\', \'Open\')">\n          <div>Open/Close</div>\n        </button>\n      </ion-col>\n    </ion-row>\n\n  </ion-card>\n\n\n  <ion-card *ngIf="cadmin == \'1\' && open < 0">\n    <ion-item>\n      <ion-icon name="swap" item-start style="color: #c3af80"></ion-icon>\n      <ion-label><p>Direct Bet</p></ion-label>\n      <ion-toggle [(ngModel)]="embet" (ngModelChange)="changeEmBet()"></ion-toggle>\n    </ion-item>\n  </ion-card>\n\n  <ion-card *ngIf="cadmin == \'1\' && (admin == 1 || open < 2)">\n\n    <ion-row>\n      <ion-col *ngIf="open < 0 || (open == 0 && type != 2) ">\n        <button ion-button icon-left clear small (click)="chVal(\'name\', \'Title\')">\n          <div>Edit Title</div>\n        </button>\n      </ion-col>\n      <ion-col *ngIf="open < 0 || (open == 0 && type != 2)">\n        <button ion-button icon-left clear small (click)="chVal(\'descr\', \'Description\')">\n          <div>Edit Description</div>\n        </button>\n      </ion-col>\n      <ion-col *ngIf="open <= 0 && type != 2">\n        <button ion-button icon-left clear small (click)="chChoices()">\n          <div>Edit Choices</div>\n        </button>\n      </ion-col>\n      <ion-col *ngIf="admin == 1">\n        <button ion-button icon-left clear small (click)="chVal(\'label\', \'Label\')">\n          <div>Edit Label</div>\n        </button>\n      </ion-col>\n      <ion-col *ngIf="type==0  || (type == 2 && open < 0)">\n        <button ion-button icon-left clear small (click)="chPoints()">\n          <div>Set Points</div>\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-card>\n\n  <ion-card *ngIf="cadmin == \'1\' && (admin == 1 || open <= 0)">\n    <ion-item>\n      <ion-label>End Time</ion-label>\n      <ion-datetime displayFormat="HH:mm" pickerFormat="HH mm" placeholder="hh:mm" [(ngModel)]="etime.time" (ngModelChange)="setEndTime()"></ion-datetime>\n    </ion-item>\n    <ion-item>\n      <ion-label>End Date</ion-label>\n      <ion-datetime displayFormat="DD.MMMM YYYY" pickerFormat="DD MMM YYYY" placeholder="dd.mm.yyyy" [(ngModel)]="etime.date" (ngModelChange)="setEndTime()"></ion-datetime>\n    </ion-item>\n    <ion-row>\n      <ion-col>\n        <button ion-button icon-left clear small (click)="setEndTime(1)">\n          <div>Set Time</div>\n        </button>\n      </ion-col>\n      <ion-col>\n      <button ion-button icon-left clear small (click)="deleteEndTime()" float-right>\n        <div>Delete Time</div>\n      </button>\n    </ion-col>\n    </ion-row>\n  </ion-card>\n\n  <ion-card *ngIf="cadmin == \'1\' && (admin == 1 || open < 2) && open >= 0">\n    <ion-row>\n      <ion-col *ngIf="type != 2">\n        <button ion-button icon-left clear small (click)="setSolution()" >\n          <div>Edit Solution</div>\n        </button>\n      </ion-col>\n      <ion-col *ngIf="type == 2">\n        <button ion-button icon-left clear small (click)="setSolution()" >\n          <div>Edit Solution</div>\n        </button>\n      </ion-col>\n      <ion-col>\n        <button ion-button icon-left clear small (click)="evalChallenge()" float-right>\n          <div>End & Give Points</div>\n        </button>\n      </ion-col>\n    </ion-row>\n    <ion-row *ngIf="type != 2">\n      <ion-col>\n        <button ion-button icon-left clear small (click)="deleteChallenge()">\n          <div>Delete</div>\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-card>\n\n  <ion-card *ngIf="c_anwser != \'\'">\n\n    <ion-item>\n      <ion-avatar item-start (click)="toggleVisible(-1)">\n        <img src="{{ca_own.img_url}}">\n      </ion-avatar>\n      <h2>{{ca_own.username}}</h2>\n      <p *ngIf="type != 2">{{ca_own.text}}</p>\n      <p *ngIf="type == 2">I dare you!</p>\n      <button ion-button clear small (click)="spentPoints(-1)" item-end *ngIf="open == 0 && type==1">-</button>\n      <ion-badge item-end *ngIf="type>=1 ">{{ca_own.points}}</ion-badge>\n      <button ion-button clear small (click)="spentPoints(1)" item-end *ngIf="open == 0 && type==1">+</button>\n      <button ion-button clear small (click)="deleteOwnAnswer()" item-end *ngIf="open == 0 && type==2 && !ca_own.is_best">\n        <ion-icon name="close"></ion-icon>\n      </button>\n\n    </ion-item>\n\n    <ion-card-content *ngIf="isVisible(-1)">\n      <p *ngIf="type != 2">{{ca_own.text}}</p>\n      <p *ngIf="type == 2 && ca_own.is_best">I dare you!</p>\n      <p *ngIf="type == 2 && !ca_own.is_best">Invalid</p>\n    </ion-card-content>\n    <ion-row>\n      <ion-col *ngIf="type != 2">\n        <button ion-button icon-left clear small (click)="doAnswer()" item-end *ngIf="open == 0">\n          <ion-icon name="text"></ion-icon>\n          <div>Edit</div>\n        </button>\n        <button ion-button icon-left clear small (click)="deleteOwnAnswer()" *ngIf="open == 0" float-right>\n          <ion-icon name="close"></ion-icon>\n          <div>Delete</div>\n        </button>\n      </ion-col>\n      <ion-col *ngIf="type == 2">\n        <button ion-button icon-left clear small (click)="doBetPoints()" item-end *ngIf="open == 0">\n          <ion-icon name="text"></ion-icon>\n          <div>Bet Points</div>\n        </button>\n        <button ion-button icon-left clear small (click)="doBetCounter()" *ngIf="open == 0 && ! ca_own.is_best" float-right>\n          <ion-icon name="swap"></ion-icon>\n          <div>Counter</div>\n        </button>\n      </ion-col>\n    </ion-row>\n\n  </ion-card>\n\n  <div *ngIf="open == 2 || type != 1">\n    <ion-card *ngFor="let ca of ca_other; let i = index">\n\n      <ion-item (click)="toggleVisible(i)">\n        <ion-avatar item-start (click)="frwdToUser(ca.username)">\n          <img src="{{ca.img_url}}">\n        </ion-avatar>\n        <h2>{{ca.username}}</h2>\n        <p *ngIf="type != 2">{{ca.text}}</p>\n        <p *ngIf="type == 2">I dare you!</p>\n        <ion-badge item-end *ngIf="type>=1">{{ca.points}}</ion-badge>\n      </ion-item>\n      <ion-card-content *ngIf="isVisible(i)">\n        <p *ngIf="type != 2">{{ca.text}}</p>\n        <p *ngIf="type == 2">I dare you!</p>\n      </ion-card-content>\n\n    </ion-card>\n  </div>\n\n\n</ion-content>\n'/*ion-inline-end:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/challengedetail/challengedetail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_challenge_service_challenge_service__["a" /* ChallengeServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_alert_alert_controller__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* Platform */]])
    ], ChallengedetailPage);
    return ChallengedetailPage;
}());

//# sourceMappingURL=challengedetail.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChallengeServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(107);
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
    ChallengeServiceProvider.prototype.has_challenge_answer_points = function (username, token, cid, points) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token + "&cid=" + cid + "&points=" + points;
            _this.http.get(apiUrl + 'get_avail_answer_points/' + get_params)
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
    ChallengeServiceProvider.prototype.get_label_answer_count = function (username, token, label) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token + "&label=" + label;
            _this.http.get(apiUrl + 'get_label_answer_count/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ChallengeServiceProvider.prototype.delete_answer = function (username, token, cid) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token + "&cid=" + cid;
            _this.http.get(apiUrl + 'delete_answer/' + get_params)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ChallengeServiceProvider.prototype.get_gntm_model_names = function (username, token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var get_params = "?username=" + username + "&token=" + token + "&names=True";
            _this.http.get(apiUrl + 'get_models/' + get_params)
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

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_challenge_service_challenge_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_nav_params__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_alert_alert_controller__ = __webpack_require__(26);
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
        // console.log("Admin: "+ this.admin);
        this.csp.get_news_data(this.username, this.token).then(function (result) {
            _this.news = result["news"];
        }, function (err) {
        });
    }
    HomePage.prototype.ionViewDidLoad = function () {
        // console.log('ionViewDidLoad HomePage');
    };
    HomePage.prototype.addNews = function () {
        var _this = this;
        // console.log('Add News');
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
                        // console.log('Add clicked');
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
        // console.log(this.news[i]);
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
                        // console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n    <ion-buttons end *ngIf="admin == \'1\'">\n      <button ion-button icon-only (click)="addNews()">\n        <ion-icon name="add-circle"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n\n  <ion-slides pager>\n\n    <ion-slide *ngFor="let n of news; let i = index">\n      <ion-card-header>\n        {{n.name}}\n      </ion-card-header>\n      <ion-card-content text-left>\n        <div [innerHTML]="n.descr"></div>\n      </ion-card-content>\n      <ion-card-content *ngIf="admin == \'1\'">\n        <button ion-button item-left clear small (click)="chVal(n.id, \'name\', \'Headline\', i)">\n          <div>Edit Name</div>\n        </button>\n        <button ion-button item-end clear small (click)="chVal(n.id, \'descr\', \'Text\', i)">\n          <div>Edit Text</div>\n        </button>\n        <button ion-button item-right clear small (click)="deleteNews(n.id)">\n          <div>Delete</div>\n        </button>\n      </ion-card-content>\n    </ion-slide>\n\n\n\n  </ion-slides>\n\n</ion-content>\n'/*ion-inline-end:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_nav_params__["a" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_challenge_service_challenge_service__["a" /* ChallengeServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_alert_alert_controller__["a" /* AlertController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChallengesPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ChallengesTabs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_challenge_service_challenge_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__challengedetail_challengedetail__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_alert_alert_controller__ = __webpack_require__(26);
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
        // console.log('ionViewDidLoad ChallengesPage');
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
            title: "Challenge Title:",
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
                        // console.log('Add clicked');
                    }
                }
            ]
        });
        prompt.present();
    };
    ChallengesPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.csp.get_challenge_list(this.username, this.token).then(function (result) {
            _this.challenges = result[_this.c_stng];
            refresher.complete();
        }, function (err) {
            refresher.complete();
        });
    };
    ChallengesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-challenges',template:/*ion-inline-start:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/challenges/challenges.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Challenges</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="addChallenge()">\n        <ion-icon name="add-circle"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-card *ngFor="let c of challenges" (click)="onChallenge(c.id)">\n    <ion-item>\n\n      <ion-icon name="help-circle" item-end style="color: #c3af80" *ngIf="c.open == 0 && c.type == 0" item-start></ion-icon>\n      <ion-icon name="close-circle" item-end style="color: #c3af80" *ngIf="c.open != 0 && c.type == 0" item-start></ion-icon>\n\n\n      <ion-icon name="people" item-end style="color: #c3af80" *ngIf="c.type == 1" item-start></ion-icon>\n\n      <ion-icon name="swap" item-end style="color: #c3af80" *ngIf="c.type == 2" item-start></ion-icon>\n\n      <h2>{{c.name}}</h2>\n      <p *ngIf="c_stng == \'special\' || (c_stng == \'closed\' && c.type == 0)">Special</p>\n      <p *ngIf="c_stng == \'community\' && c.type == 1">Hosted Bet</p>\n      <p *ngIf="c_stng == \'community\' && c.type == 2">Direct Bet</p>\n      <p *ngIf="c_stng == \'closed\' && c.type >= 1">by {{c.creator}}</p>\n      <div item-end>\n        <p *ngIf="c.urgendstr != \'\' && c.open<2" float-right><b style="color: darkred">{{c.urgendstr}}</b></p>\n        <br *ngIf="c.urgendstr != \'\' && c.open<2">\n        <ion-icon name="alert" style="color: #a61000" *ngIf="c_stng == \'closed\' && c.open == 1 && username == c.creator"></ion-icon>\n        <ion-badge float-right *ngIf="!(c_stng == \'closed\' && c.open == 1 && username == c.creator)">{{c.points}}</ion-badge>\n\n        <!--<p *ngIf="c.urgentstr != \'\' && c.open==2" float-right>Ended: {{c.etime}}</p>-->\n      </div>\n    </ion-item>\n  </ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/challenges/challenges.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_challenge_service_challenge_service__["a" /* ChallengeServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_alert_alert_controller__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
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
            selector: 'page-challengesstart',template:/*ion-inline-start:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/challenges/challengesTabs.html"*/'<ion-tabs class="tabs-basic">\n  <ion-tab tabTitle="Bets" [root]="rootPage" [rootParams]="community"></ion-tab>\n  <ion-tab tabTitle="Honey/Trump" [root]="rootPage" [rootParams]="special"></ion-tab>\n  <ion-tab tabTitle="Closed" [root]="rootPage" [rootParams]="closed"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/challenges/challengesTabs.html"*/,
        })
    ], ChallengesTabs);
    return ChallengesTabs;
}());

//# sourceMappingURL=challenges.js.map

/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserdetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_service_user_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_alert_alert_controller__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ranking_ranking__ = __webpack_require__(75);
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
        this.score_details = { "bet": 0, "honey": 0, "trump": 0 };
        this.other = navParams.get('other');
        // console.log(this.other);
        this.username = window.localStorage.getItem('username');
        this.token = window.localStorage.getItem('token');
        this.admin = window.localStorage.getItem('admin');
        this.usp.get_other_user_detail(this.username, this.token, this.other).then(function (result) {
            if ("username" in result) {
                // console.log(result["username"]);
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
                _this.logs = [];
                if (_this.admin == '1') {
                    _this.real_name = result["real_name"];
                    _this.usp.get_other_user_log(_this.username, _this.token, _this.other).then(function (result) {
                        _this.logs = result["logs"];
                        // console.log(this.logs)
                    }, function (err) {
                    });
                }
            }
        }, function (err) {
        });
        this.usp.get_user_score_details(this.username, this.token, this.other).then(function (result) {
            if ("scores" in result) {
                // console.log(result["scores"]);
                _this.score_details = result["scores"];
            }
        });
    }
    UserdetailPage.prototype.ionViewDidLoad = function () {
        // console.log('ionViewDidLoad UserdetailPage');
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
                        // console.log('Saved clicked');
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
            selector: 'page-userdetail',template:/*ion-inline-start:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/userdetail/userdetail.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>User</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <ion-card>\n\n    <img src="{{img_url}}">\n\n    <ion-item>\n      <h2>{{other}}</h2>\n      <p>&quot;{{descr}}&quot;</p>\n      <ion-badge item-end>{{score}}</ion-badge>\n    </ion-item>\n\n    <ion-item *ngIf="admin == \'1\'">\n      <ion-icon name=\'md-person\' item-start style="color: #f95c71"></ion-icon>\n      <p>{{real_name}}</p>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="calendar" item-start style="color: #f95c71"></ion-icon>\n      <p>{{age}}</p>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="cut" item-start style="color: #f95c71"></ion-icon>\n      <p>{{hair}}</p>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="eye" item-start style="color: #f95c71"></ion-icon>\n      <p>{{eye}}</p>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="football" item-start style="color: #f95c71"></ion-icon>\n      <p>{{hobbies}}</p>\n    </ion-item>\n\n\n    <ion-card-content center text-center>\n      <p>\n        <br>\n        {{descr}}\n      </p>\n    </ion-card-content>\n\n    <ion-card-content center text-center>\n      <ion-grid>\n        <ion-row>\n          <ion-col>\n            <ion-icon name=\'people\' class="xd" item-start style="color: black"></ion-icon>\n          </ion-col>\n          <ion-col>\n            <div class="honey mid"></div>\n          </ion-col>\n          <ion-col>\n            <div class="trump mid"></div>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n            <div>{{score_details.bet}}</div>\n          </ion-col>\n          <ion-col>\n            <div>{{score_details.honey}}</div>\n          </ion-col>\n          <ion-col>\n            <div>{{score_details.trump}}</div>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-card-content>\n\n\n  </ion-card>\n  <ion-card *ngIf="admin == \'1\'">\n    <ion-row>\n      <ion-col>\n        <button ion-button icon-left clear small (click)="changePoints()">\n          <div>Change points</div>\n        </button>\n      </ion-col>\n      <ion-col text-right>\n        <button ion-button icon-left clear small  (click)="deleteUser()" >\n          <div>Delete</div>\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-card>\n\n  <div *ngIf="admin == \'1\'">\n    <ion-card *ngFor="let l of logs">\n      <ion-item>\n\n        <ion-icon name="person" item-end style="color: #c3af80" *ngIf="l.type == -1" item-start (click)="onChallenge(l.cid)"></ion-icon>\n        <ion-icon name="help-circle" item-end style="color: #c3af80" *ngIf="l.type == 0" item-start (click)="onChallenge(l.cid)"></ion-icon>\n        <ion-icon name="people" item-end style="color: #c3af80" *ngIf="l.type == 1" item-start (click)="onChallenge(l.cid)"></ion-icon>\n        <ion-icon name="swap" item-end style="color: #c3af80" *ngIf="l.type == 2" item-start (click)="onChallenge(l.cid)"></ion-icon>\n\n        <p>{{l.time}}</p>\n        <h2>{{l.cname}}</h2>\n        <p *ngIf="l.ctype != 0">by {{l.ccreator}}</p>\n        <p *ngIf="l.ctype == 0">Special</p>\n        <ion-badge item-end *ngIf="l.points > 0"> +{{l.points}}</ion-badge>\n        <ion-badge item-end *ngIf="l.points <= 0">{{l.points}}</ion-badge>\n      </ion-item>\n      <ion-card-content *ngIf="l.type == -1">\n        <p>{{l.cdesc}}</p>\n        <br>\n        <p *ngIf="l.ctype == 2 && l.csolution == 1">You lost the bet.</p>\n        <p *ngIf="l.ctype == 2 && l.csolution == 0">You won the bet</p>\n        <p *ngIf="l.ctype == 1">You hosted the bet</p>\n      </ion-card-content>\n      <ion-card-content *ngIf="l.type == 0">\n        <p>{{l.cdesc}}</p>\n        <br>\n        <p>Correct Solution: {{l.csolution}}</p>\n        <p>Your Answer: {{l.canswer}}</p>\n      </ion-card-content>\n      <ion-card-content *ngIf="l.type == 1">\n        <p>{{l.cdesc}}</p>\n        <br>\n        <p>Correct Solution: {{l.csolution}}</p>\n        <p>Your Answer: {{l.canswer}}</p>\n      </ion-card-content>\n      <ion-card-content *ngIf="l.type == 2">\n        <p>{{l.cdesc}}</p>\n        <br>\n        <p *ngIf="l.csolution == 0">You lost the bet.</p>\n        <p *ngIf="l.csolution == 1">You won the bet</p>\n      </ion-card-content>\n    </ion-card>\n  </div>\n\n\n</ion-content>\n\n'/*ion-inline-end:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/userdetail/userdetail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_user_service_user_service__["a" /* UserServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_alert_alert_controller__["a" /* AlertController */]])
    ], UserdetailPage);
    return UserdetailPage;
}());

//# sourceMappingURL=userdetail.js.map

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RankingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_service_user_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__userdetail_userdetail__ = __webpack_require__(74);
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
        // console.log('ionViewDidLoad RankingPage');
    };
    RankingPage.prototype.detailView = function (username) {
        // console.log(username)
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__userdetail_userdetail__["a" /* UserdetailPage */], {
            other: username
        });
    };
    RankingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-ranking',template:/*ion-inline-start:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/ranking/ranking.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Ranking</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n\n  <ion-card *ngFor="let user of ranking; let i = index" (click)="detailView(user.username)" >\n    <ion-item>\n        <p item-start style="width: 10%">#{{i+1}}</p>\n        <ion-avatar item-start>\n          <img src="{{user.img_url}}">\n        </ion-avatar>\n        <h2>{{user.username}}</h2>\n        <!--<p>&quot;{{user.descr}}&quot;</p>-->\n        <ion-badge item-end>{{user.score}}</ion-badge>\n    </ion-item>\n  </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"/files/Documents/ws/ws/cntm2018/cmtm_frontend/src/pages/ranking/ranking.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_user_service_user_service__["a" /* UserServiceProvider */]])
    ], RankingPage);
    return RankingPage;
}());

//# sourceMappingURL=ranking.js.map

/***/ })

},[260]);
//# sourceMappingURL=main.js.map