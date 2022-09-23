import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthResponseData } from '../models/authResponseData.model';
import { User } from '../models/user.model';
import { AppState } from '../store/app.state';
import { autoSignout } from '../store/auth/auth.action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  timeoutInterval: any
  constructor(private http: HttpClient, private store: Store<AppState>) { }

  signin(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>('http://192.168.1.51:3000/api/v1/auth/signin', { email: email, password: password })
  }
  signup(email: string, password: string) { }

  signout() {
    localStorage.removeItem("userData")
    if (this.timeoutInterval) {
      clearInterval(this.timeoutInterval)
      this.timeoutInterval = null
    }
  }
  formatUser(data: AuthResponseData): User {
    const expirationDate = new Date(data.expiresIn)
    const user = new User(data.email, data.refreshToken, expirationDate)
    return user
  }
  runTimeoutInterval(user: User) {
    const todayDate = new Date(new Date()).getTime()
    const expirationDate = new Date(user.expiresDate).getTime()
    const timeInterval = expirationDate - todayDate
    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(autoSignout())
    }, timeInterval);
  }
  setUserLocalStorage(user: User) {
    localStorage.setItem("userData", JSON.stringify(user))
    this.runTimeoutInterval(user)
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData')
    if (userDataString) {
      const userData = JSON.parse(userDataString)
      const user = new User(userData.email, userData.refreshToken, userData.expirationDate)
      this.runTimeoutInterval(user)
      return user
    }
    return null
  }
}
