import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,  Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  myform: FormGroup;
  constructor(public fb: FormBuilder) {
    this.myform = this.fb.group({
      firstName : ['', [Validators.required]],
      lastName : ['', [Validators.required]],
      email : ['', [Validators.required]],
      password : ['', [Validators.required]],
      confirmPassword : ['' , [Validators.required]]
    })
   }

  onSubmit(signupform){
    console.log(signupform);
  }

  ngOnInit(): void {
  }

}
