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
   * @returns (object)
   */
  fetchEmployee(params: any): Observable<any> {
    return this.httpClient.get<any>(RESTAPI+'/employees',{ params }).pipe(catchError(this.errorHandler)) 
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Fetch employee records by id
   * 
   * @param (any)
   * @returns (object)
   */
   fetchEmployeeById(id: any): Observable<any> {
    return this.httpClient.get<any>(RESTAPI+'/employees/'+id).pipe(catchError(this.errorHandler)) 
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Delete employee by id
   * 
   * @param (id)
   * @returns (object)
   */
   deleteEmployeeById(id: any): Observable<any> {
    console.log(RESTAPI+'/employees/'+id);
    //return this.httpClient.delete<any>(RESTAPI+'/employees/'+id).pipe(catchError(this.errorHandler)) 
    return null; 
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Add new employee record
   * 
   * @param (formdata)
   * @returns (json)
   */
   addEmployee(callToolsAgentId: string,
    jobNimbusContactId: string,
    referralId: string,
    managerId: string,
    firstName: string,
    lastName: string,
    primaryNumber: any,
    secondaryNumber: any,
    tertiaryNumber: any,
    workEmail: string,
    personalEmail: any,
    hireDate:any,      

    companyName: string,
    franchiseId: string,
    roleId: string,
    priorityStatusId: string,
    address: string,
    city: string,
    state: string,
    zip: any): Observable<any> {
    const formData: FormData = new FormData();
    
    if(typeof hireDate == 'undefined') {
      hireDate = '';
    }  
    formData.append('callToolsAgentId', callToolsAgentId);
    formData.append('jobNimbusContactId', jobNimbusContactId);
    formData.append('referralId', referralId);
    formData.append('managerId', managerId);  
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('primaryNumber', primaryNumber);
    formData.append('secondaryNumber', secondaryNumber);
    formData.append('tertiaryNumber', tertiaryNumber);
    formData.append('workEmail', workEmail);
    formData.append('personalEmail', personalEmail);
    formData.append('hireDate', hireDate);
    formData.append('companyName', companyName);
    formData.append('franchiseId', franchiseId);
    formData.append('roleId', roleId);
    formData.append('priorityStatusId', priorityStatusId);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('zip', zip);
    return this.httpClient.post(RESTAPI + '/employees',{
      callToolsAgentId,
      jobNimbusContactId,
      referralId,
      managerId,
      firstName,
      lastName,
      primaryNumber,
      secondaryNumber,
      tertiaryNumber,
      workEmail,
      personalEmail,
      hireDate,      
      companyName,
      franchiseId,
      roleId,
      priorityStatusId,
      address,
      city,
      state,
      zip},httpOptions);
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Edit employee record
   * 
   * @param (formdata)
   * @returns (json)
   */
   editEmployee(id:any,
    callToolsAgentId: string,
    jobNimbusContactId: string,
    referralId: string,
    managerId: string,
    firstName: string,
    lastName: string,
    primaryNumber: any,
    secondaryNumber: any,
    tertiaryNumber: any,
    workEmail: string,
    personalEmail: any,
    hireDate:any,      

    companyName: string,
    franchiseId: string,
    roleId: string,
    priorityStatusId: string,
    address: string,
    city: string,
    state: string,
    zip: any): Observable<any> {
    
    if(typeof hireDate == 'undefined') {
      hireDate = '';
    }  
    
    return this.httpClient.put(RESTAPI + '/employees/'+id,{
      callToolsAgentId,
      jobNimbusContactId,
      referralId,
      managerId,
      firstName,
      lastName,
      primaryNumber,
      secondaryNumber,
      tertiaryNumber,
      workEmail,
      personalEmail,
      hireDate,      
      companyName,
      franchiseId,
      roleId,
      priorityStatusId,
      address,
      city,
      state,
      zip},httpOptions);
  }
  /**********************************************************************************/
  /**********************************************************************************/
}
