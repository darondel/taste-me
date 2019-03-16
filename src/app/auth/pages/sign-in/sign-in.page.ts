import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoadingController } from '@ionic/angular';

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
    private loadingController: LoadingController) {
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
        finalize(() => loading.dismiss())
      ).subscribe();
    });
  }

}
