import { Injectable } from '@angular/core';
import { Observable,throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EventCategories } from 'src/app/interface/event-categories';

const RESTAPI = environment.apiUrl;
const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class EventCategoryService {

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
   * Fetch all events categories records
   * 
   * @param (null)
   * @returns (object)
   */
  fetchEventCategory(): Observable<any> {
    return this.httpClient.get<any>(RESTAPI+'/advantages/categories').pipe(catchError(this.errorHandler)) 
  }
  /**********************************************************************************/
  /**********************************************************************************/

}
