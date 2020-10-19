import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {


  comment: string = "";
  comments: any = [];
  loggedIn: boolean = false;

  @Input("postId") postId: string;
  constructor() { 
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.loggedIn = true;
      } else{
        this.loggedIn = false;
      }
    })
  }

  ngOnInit(): void {
    this.getComments();
  }

  postComment(){
    if(this.comment.length < 5){
      return;
    }
    firebase.firestore().collection("comments").add({
      text: this.comment,
      post: this.postId,
      //change email to displayName
      owner: firebase.auth().currentUser.email,
      created: firebase.firestore.FieldValue.serverTimestamp()
    }).then((data) => {
      console.log("Comment is saved!");
      this.getComments();
    }).catch((error) => {
      console.log(error);
    })
  }

  getComments(){
//get all the comments
    this.comments = [];
    firebase.firestore().collection("comments").where("post", "==", this.postId).orderBy("created", "desc")
    .get().then((data) => {
      
      data.docs.forEach((commentRef) => {
        this.comments.push(commentRef.data())
      })

    })
  }

}
