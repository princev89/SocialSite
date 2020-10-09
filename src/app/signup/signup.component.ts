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
    console.log(signupform);
  }

  ngOnInit(): void {
  }

}
