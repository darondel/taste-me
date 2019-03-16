import { Injectable } from '@angular/core';

import { ToastController } from '@ionic/angular';
import { Color } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastController: ToastController) {
  }

  /**
   * Dismisses the last message, if present.
   */
  public dismiss() {
    this.toastController.getTop().then(toast => {
      if (toast) {
        toast.dismiss();
      }
    });
  }

  /**
   * Provides message feedback as a notification.
   * Dismisses any notifications already present.
   *
   * @param message the message to present
   * @param color the color of the notification
   */
  public async present(message: string, color: Color) {
    this.dismiss();

    const toast = await this.toastController.create({
      message: message,
      color: color,
      showCloseButton: true,
      closeButtonText: 'X'
    });

    toast.present();
  }

}
