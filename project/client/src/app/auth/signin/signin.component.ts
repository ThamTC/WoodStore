import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { signinStart } from 'src/app/store/auth/auth.action';
import { setSpinnerLoading } from 'src/app/store/shared/shared.action';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  constructor(private store: Store<AppState>) {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  showEmailError() {
    const email = this.signinForm.get("email")
    if (email?.touched && !email.valid) {
      if (email?.errors?.["required"]) {
        return "Email is require"
      }
      if (email?.errors?.["email"]) {
        return "Email is not format"
      }
    }
    return null
  }

  showPasswordError() {
    const password = this.signinForm.get("password")
    if (password?.touched && !password?.valid) {
      if (password?.errors?.["required"]) {
        return "Password is require"
      }
      if (password?.errors?.["minlength"]) {
        return "Password is too sort"
      }
    }
    return null
  }

  ngOnInit(): void {
  }

  onSignin() {
    if (!this.signinForm.valid) {
      return;
    }
    const email = this.signinForm.value.email
    const password = this.signinForm.value.password
    this.store.dispatch(setSpinnerLoading({ status: true }))
    this.store.dispatch(signinStart({ email, password }))
  }
}
