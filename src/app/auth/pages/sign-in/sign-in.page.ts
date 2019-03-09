import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoadingController, ToastController } from '@ionic/angular';

import { finalize } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * Handles form submission by trying to log the user in and blocking any user interaction during the operation.
   * Redirects to root page if successful.
   * Provides error feedback otherwise.
   */
  async onSubmit() {
    const loading = await this.loadingController.create({message: 'Logging in...'});

    loading.present().then(() => {
      const formValue = this.form.value;

      this.authService.login(formValue.email, formValue.password).pipe(
        finalize(() => {
          loading.dismiss();
          this.toastController.dismiss();
        })
      ).subscribe(
        () => this.router.navigate(['/']),
        error => this.toastError(error.error.error.message)
      );
    });
  }

  /**
   * Provides error feedback as a notification.
   * Dismisses any notifications already present.
   *
   * @param errorCode the error code
   */
  private async toastError(errorCode: string) {
    this.toastController.dismiss();

    const toast = await this.toastController.create({
      message: this.getErrorMessage(errorCode),
      color: 'danger',
      showCloseButton: true,
      closeButtonText: 'X'
    });

    toast.present();
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
