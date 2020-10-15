import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import * as firebase from 'firebase/app';
import 'firebase/auth';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CapitalizePipe } from './capitalize.pipe';


let config = {
  apiKey: "AIzaSyAUJChLVrkhQMTVfHSmH0DcOVC63IDwgHQ",
  authDomain: "scribe-66e3b.firebaseapp.com",
  databaseURL: "https://scribe-66e3b.firebaseio.com",
  projectId: "scribe-66e3b",
  storageBucket: "scribe-66e3b.appspot.com",
  messagingSenderId: "62334267197",
  appId: "1:62334267197:web:125a9dd9a45786343edf54",
  measurementId: "G-EEXX114S4M"
};
// Initialize Firebase
firebase.initializeApp(config);


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
