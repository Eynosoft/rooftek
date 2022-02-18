import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError} from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../token-storage/token-storage.service';

const RESTAPI = environment.apiUrl;
const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private httpClient: HttpClient, private router: Router,private tokenStorageService: TokenStorageService) { }
  /**
   * Check for logged in
   * 
   * @param ()
   * @returns (object)
   */
  get isLoggedIn() {
    if(!!this.tokenStorageService.getToken()) {
      this.loggedIn.next(true);
    } 
    return this.loggedIn.asObservable();
  }
  /**********************************************************************************/
  /**********************************************************************************/
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
  login(email: string, password: string): Observable<any> {
    return this.httpClient.post(RESTAPI + '/auth/login', {
      email,
      password
    }, httpOptions).pipe(
      tap(data => {
        this.loggedIn.next(true);
        console.log(data);
      }),
      catchError(this.handleError)
    );
  }
  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['user-pages/login']);
  }
}
