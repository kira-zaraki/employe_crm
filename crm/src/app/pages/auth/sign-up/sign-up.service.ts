import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) { }

  /**
   * Resolver
   *
   *  * @param {ActivatedRouteSnapshot} route
   *  * @param {RouterStateSnapshot} state
   *  * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<object> {
    return this.getInvitation(route.paramMap.get('invitation'));
  }

  signUp(employe: object, invitation: number): Observable<any>{
    return this.http.post('auth/sign-up/'+invitation, employe);
  }
  getInvitation(invitation: any):Observable<any>{
    return this.http.get('invitation/'+invitation);
  }
}
