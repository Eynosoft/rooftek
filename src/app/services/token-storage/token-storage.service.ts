/**
 * Token Storage services
 * 
 * Set and fetch token for logged inuser
 */
import { Injectable } from '@angular/core';

const ACCESS_TOKEN = 'accessToken';
const TOKEN_TYPE = 'tokenType';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Calls on signout
   * 
   * @param ()
   * @returns ()
   */
  signOut(): void {
    window.sessionStorage.clear();
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Save token in session
   * 
   * @param (token)
   * @returns ()
   */
  public saveToken(token: string,tokenType: string): void {
    window.sessionStorage.removeItem(ACCESS_TOKEN);
    window.sessionStorage.removeItem(TOKEN_TYPE);
    window.sessionStorage.setItem(ACCESS_TOKEN,token);
    window.sessionStorage.setItem(TOKEN_TYPE,tokenType);
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Get token
   * 
   * @param ()
   * @returns (string)
   */
  public getToken(): string | null {
    return window.sessionStorage.getItem(ACCESS_TOKEN);
  }
  /**********************************************************************************/
  /**********************************************************************************/
  /**
   * Get token type
   * 
   * @param ()
   * @returns (string)
   */
   public getTokenType(): string | null {
    return window.sessionStorage.getItem(TOKEN_TYPE);
  }
  /**********************************************************************************/
  /**********************************************************************************/
}
