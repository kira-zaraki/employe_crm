import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  constructor(private http: HttpClient) { }

  /**
   * Resolver
   *
   *  * @param {ActivatedRouteSnapshot} route
   *  * @param {RouterStateSnapshot} state
   *  * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<object> {
    return this.getInvitations();
  }

  createInvitation(invitation: object):Observable<any>{
    return this.http.post('invitation/create', invitation);
  }

  deleteInvitation(invitation: any):Observable<any>{
    return this.http.delete('invitation/delete/'+invitation.id);
  }
  getInvitations():Observable<any>{
    return this.http.get('invitation/get');
  }
}
