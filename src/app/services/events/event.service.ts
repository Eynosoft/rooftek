import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Events } from 'src/app/interface/events';

const RESTAPI = environment.apiUrl;
const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class EventService {
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
   * Fetch all events records
   * 
   * @param (any)
   * @returns (object)
   */
  fetchEvents(params: any): Observable<any> {
    return this.httpClient.get<any>(RESTAPI+'/advantages/purchasables/events/',{ params }).pipe(catchError(this.errorHandler)) 
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Fetch event records by id
   * 
   * @param (any)
   * @returns (object)
   */
   fetchEventById(id: any): Observable<any> {
    return this.httpClient.get<any>(RESTAPI+'/advantages/purchasables/'+id).pipe(catchError(this.errorHandler)) 
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Add new event record
   * 
   * @param (formdata)
   * @returns (json)
   */
   addEvent(categoryId: string,
    name: string,
    passportRequired: boolean,
    startDate: string,
    endDate: string,
    summary: string,
    description: string,
    pointCost: number,
    quantity: number,
    createdBy: string): Observable<any> {
    if(typeof startDate == 'undefined') {
      startDate = '';
    }
    if(typeof endDate == 'undefined') {
      endDate = '';
    }  
    
    return this.httpClient.post(RESTAPI + '/advantages/purchasables/events',{
      categoryId,
      name,
      passportRequired,
      startDate,
      endDate,
      summary,
      description,
      pointCost,
      quantity,
      createdBy},httpOptions).pipe(catchError(this.errorHandler)) ;
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Edit event record
   * 
   * @param (formdata)
   * @returns (json)
   */
   editEvent(Id: string,
    categoryId: string,
    name: string,
    passportRequired: boolean,
    startDate: string,
    endDate: string,
    summary: string,
    description: string,
    pointCost: number,
    quantity: number,
    createdBy: string): Observable<any> {
    if(typeof startDate == 'undefined') {
      startDate = '';
    }
    if(typeof endDate == 'undefined') {
      endDate = '';
    }  
    
    return this.httpClient.put(RESTAPI + '/advantages/purchasables/events/'+Id,{
      categoryId,
      name,
      passportRequired,
      startDate,
      endDate,
      summary,
      description,
      pointCost,
      quantity,
      createdBy},httpOptions).pipe(catchError(this.errorHandler)) ;
  }
  /**********************************************************************************/
  /**********************************************************************************/

}
