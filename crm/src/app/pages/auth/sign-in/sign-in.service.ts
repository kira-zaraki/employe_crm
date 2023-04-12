import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private http: HttpClient) { }

  signIn(user: object): Observable<any>{
    return this.http.post('auth/sign-in', user);
  }

  loggedIn(){
    return !!localStorage.getItem('user');
  }

  getUser(){
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  checkRole(role: string){
    return this.getUser()['role'] == role;
  }

}
