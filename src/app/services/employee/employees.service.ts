import { Injectable } from '@angular/core';
import { Observable,throwError,BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders,HttpResponse,HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Employee } from 'src/app/interface/employee';

const RESTAPI = environment.apiUrl;
const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  
  constructor(private httpClient: HttpClient, private router: Router) { }
  /**
   * Error Handler function
   * 
   * @param (any)
   * @returns (object)
   */
   errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Error Handler
   * 
   * @param (any)
   * @returns (object)
   */
  private handleError(error: any) {
    return throwError(error);
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Fetch employee records
   * 
   * @param (any)
   * @returns (json)
   */
  fetchEmployee(params: any): Observable<any> {
    return this.httpClient.get<any>(RESTAPI+'/employees',{ params }).pipe(catchError(this.errorHandler)) 
  }
  /**********************************************************************************/
  /**********************************************************************************/

}
