import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { passwordMatchingValidator } from 'src/app/directives/password-matching-validator.directive';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup
  constructor(private store: Store<AppState>) {
    this.signupForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormGroup(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      createPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    },
      { validators: passwordMatchingValidator }
    )

  }

  ngOnInit(): void {


  }

  onSignupSubmit() {
    console.log(this.signupForm.errors)
  }
}