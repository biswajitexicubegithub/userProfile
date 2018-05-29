import { Component, ViewChild, NgZone } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';

import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  public email: any;
  public userName: any;
  public password: any;
  rootPage;//: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, 
    public splashScreen: SplashScreen, public zone: NgZone) {
    
      this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.zone.run(()=>{
          this.rootPage = HomePage;
        })
      }else{
        this.zone.run(()=>{
          this.rootPage = LoginPage;
        })
      }
    })  

  }

  ngDoCheck(){
    if(localStorage.getItem('userName')){
      this.userName = localStorage.getItem('userName')
    }
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
