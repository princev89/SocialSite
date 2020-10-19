import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd } from "@angular/router";
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  posts: any[] = [];
  constructor(public activateRoute: ActivatedRoute) {
    let id = this.activateRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.getProfile(id);
    this.getUsersPosts(id);
   }

  ngOnInit(): void {
  }

  getProfile(id: string){
    firebase.firestore().collection("users").doc(id).get().then((documentSnapshot) => {
      this.user = documentSnapshot.data();
      this.user.id = documentSnapshot.id;
      this.user.hobbies = this.user.hobbies.split(",");
      this.user.displayName  = this.user.firstName + ' ' + this.user.lastName; 
      console.log(this.user);
    }).catch((error) => {
      console.log(error);
    })
  }

  getUsersPosts(id: string){
    firebase.firestore().collection("posts").where("owner", "==", id).get()
    .then((data) => {
      this.posts = data.docs;
    })
  }

}
