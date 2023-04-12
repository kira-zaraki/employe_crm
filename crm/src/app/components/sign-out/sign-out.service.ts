import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignOutService {

  constructor(private http: HttpClient) { }

  signOut():Observable<any>{
    return this.http.get('auth/sign-out');
  }
}
