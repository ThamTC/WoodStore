import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponseData } from '../models/authResponseData.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signin(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>('http://192.168.1.51:3000/api/v1/auth/signin', { email: email, password: password })
  }

  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + + data.expiresIn * 1000)
    const user = new User(data.email, data.refreshToken, expirationDate)
    return user
  }
}
