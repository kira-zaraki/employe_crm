import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  /**
   * Resolver
   *
   *  * @param {ActivatedRouteSnapshot} route
   *  * @param {RouterStateSnapshot} state
   *  * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<object> {
    return this.mainData();
  }
  
  mainData():Observable<any>{
    return this.http.get('user/admin/data');
  } 
}
