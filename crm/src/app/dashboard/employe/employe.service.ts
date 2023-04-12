import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private http: HttpClient) { }

  /**
   * Resolver
   *
   *  * @param {ActivatedRouteSnapshot} route
   *  * @param {RouterStateSnapshot} state
   *  * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<object> {
    return this.getUser();
  }

  getUser():Observable<any>{
    return this.http.get('user');
  }

  updateEmploye(employe: Object):Observable<any>{
    return this.http.put('user/update', employe);
  }
}
