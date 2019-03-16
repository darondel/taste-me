import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AuthResponse } from '../models/auth-response';
import { NotificationService } from '../../shared/services/notification.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static readonly EMAIL_STORAGE_KEY = 'email';
  private static readonly ID_TOKEN_STORAGE_KEY = 'id_token';
  private static readonly EXPIRES_AT_STORAGE_KEY = 'expires_at';

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router,
    private notificationService: NotificationService) {
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
      tap(authResponse => this.localLogin(authResponse)),
      catchError(this.handleError<AuthResponse>())
    );
  }

  /**
   * Performs a sign-out operation by clearing Ionic Storage relevant keys.
   */
  public logout() {
    this.storage.ready()
      .then(() => Promise.all([
        this.storage.remove(AuthService.EMAIL_STORAGE_KEY),
        this.storage.remove(AuthService.ID_TOKEN_STORAGE_KEY),
        this.storage.remove(AuthService.EXPIRES_AT_STORAGE_KEY)
      ]))
      .then(() => this.router.navigate(['/login']));
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
      this.storage.ready()
        .then(() => Promise.all([
          this.storage.set(AuthService.EMAIL_STORAGE_KEY, authResponse.email),
          this.storage.set(AuthService.ID_TOKEN_STORAGE_KEY, authResponse.idToken),
          this.storage.set(AuthService.EXPIRES_AT_STORAGE_KEY, authResponse.expiresIn * 1000 + Date.now())
        ]))
        .then(() => this.router.navigate(['/']));
    }
  }

  /**
   * Provides error feedback as a notification.
   * Rethrows any error.
   */
  private handleError<T>() {
    return (error: HttpErrorResponse): Observable<T> => {
      let errorMessage = error.message;

      if (error.error && error.error.error && error.error.error.message) {
        errorMessage = this.getErrorMessage(error.error.error.message);
      }

      this.notificationService.present(errorMessage, 'danger');

      return throwError(error);
    };
  }

  /**
   * Builds the message corresponding to the given error code.
   * Displays the error code directly if unknown.
   *
   * @param errorCode the error code
   */
  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        return 'You entered an invalid email / password combination.';
      case 'USER_DISABLED':
        return 'Your account has been disabled.';
      default:
        return errorCode;
    }
  }

}
