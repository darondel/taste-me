import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthResponse } from '../models/auth-response';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static readonly EMAIL_STORAGE_KEY = 'email';
  private static readonly ID_TOKEN_STORAGE_KEY = 'id_token';
  private static readonly EXPIRES_AT_STORAGE_KEY = 'expires_at';

  constructor(private http: HttpClient, private storage: Storage) {
  }

  /**
   * Performs a sign-in operation by giving credentials to the authentication server.
   * Reminder: must subscribe to initiate the operation.
   *
   * @param email the associated email
   * @param password the associated password
   */
  public login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.authUrl, {email, password, returnSecureToken: true}).pipe(
      tap(authResponse => this.localLogin(authResponse))
    );
  }

  /**
   * Performs a sign-out operation by clearing Ionic Storage relevant keys.
   */
  public logout() {
    this.storage.remove(AuthService.EMAIL_STORAGE_KEY);
    this.storage.remove(AuthService.ID_TOKEN_STORAGE_KEY);
    this.storage.remove(AuthService.EXPIRES_AT_STORAGE_KEY);
  }

  /**
   * Checks if the user is logged in by determining if the associated token is expired.
   */
  public async isLoggedIn(): Promise<boolean> {
    return Date.now() < await this.storage.get(AuthService.EXPIRES_AT_STORAGE_KEY);
  }

  /**
   * Performs a sign-in operation in Ionic Storage to reuse it subsequently.
   *
   * @param authResponse the authentication response to store
   */
  private localLogin(authResponse: AuthResponse) {
    if (authResponse) {
      this.storage.set(AuthService.EMAIL_STORAGE_KEY, authResponse.email);
      this.storage.set(AuthService.ID_TOKEN_STORAGE_KEY, authResponse.idToken);
      this.storage.set(AuthService.EXPIRES_AT_STORAGE_KEY, authResponse.expiresIn * 1000 + Date.now());
    }
  }

}
