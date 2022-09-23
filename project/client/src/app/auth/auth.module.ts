import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

const routes: Routes = [
  {
    path: "signin",
    component: SigninComponent
  },
  {
    path: "signup",
    component: SignupComponent
  }
]

@NgModule({
  declarations: [SigninComponent, SignupComponent],
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
