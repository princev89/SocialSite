import { ASTWithName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,  Validator, Validators } from '@angular/forms';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  myform: FormGroup;
  message: string = "";
  userError: any;

  constructor(public fb: FormBuilder) {
    this.myform = this.fb.group({
      firstName : ['', [Validators.required]],
      lastName : ['', [Validators.required]],
      email : ['', [Validators.required]],
      password : ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword : ['' , [Validators.required]]
    },{
      validator: this.checkIfMatchingPasswords("password", "confirmPassword")
    })
   }

  checkIfMatchingPasswords(passwordKey: string, confirmPasswordKey: string){
    return (group: FormGroup) => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if(password.value == confirmPassword.value){
        return;
      }else{
        confirmPassword.setErrors({
          notEqualtoPassword : true
        })
      }
    }
  }

  onSubmit(signupform){
    let email: string = signupform.value.email;
    let password: string = signupform.value.password;
    let firstName: string = signupform.value.firstName;
    let lastName: string = signupform.value.lastName;


    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      this.message = "You have been signed up successfuly. Please login."
    }).catch((error) =>{
      console.log(error);
      this.userError = error;
    })
  }



  ngOnInit(): void {
  }

}
