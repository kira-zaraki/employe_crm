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
    return this.getEmployes();
  }

  createEmploye(employe: object):Observable<any>{
    return this.http.post('employe/create', employe);
  }

  deleteEmploye(employe: any):Observable<any>{
    return this.http.delete('employe/delete/'+employe.id);
  }
  getEmployes():Observable<any>{
    return this.http.get('employe/get');
  }
  changeRole(role:any, id:number):Observable<any>{
    return this.http.put('role/change/'+id, {role:role});
  }
}
