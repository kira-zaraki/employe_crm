import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CompanieService {

  constructor(private http: HttpClient) { }

  /**
   * Resolver
   *
   *  * @param {ActivatedRouteSnapshot} route
   *  * @param {RouterStateSnapshot} state
   *  * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<object> {
    return this.getCompanies();
  }

  createCompanie(companie: object):Observable<any>{
    return this.http.post('companie/create', companie);
  }

  deleteCompanie(companie: any):Observable<any>{
    return this.http.delete('companie/delete/'+companie.id);
  }
  getCompanies():Observable<any>{
    return this.http.get('companie/get');
  }
}
