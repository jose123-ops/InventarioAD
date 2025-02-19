  import { Injectable } from '@angular/core';
  import { LoadingController, PopoverController, ToastController } from '@ionic/angular';
import { HeaderComponent } from '../shared/component/header/header.component';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

  @Injectable({
    providedIn: 'root'
  })
  export class LoadingService {

    constructor(public loadingController: LoadingController,
      public toastController: ToastController,
      public popoverController: PopoverController
    ) { }

    async loading(message: string = 'Please wait...', spinnerType: 'bubbles' | 'circles' | 'circular' | 'crescent' | 'dots' | 'lines' | 'lines-small' | 'lines-sharp' | 'lines-sharp-small' = 'crescent') {
      const loading = await this.loadingController.create({
        message: message,
        spinner: spinnerType
      });

      await loading.present();

      return loading;
    }

    async hide(loading: any) {
      await loading.dismiss();
    }

    async toast(message: string, duration: number = 2000, position: 'top' | 'bottom' | 'middle' = 'top', color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark' = 'primary', icon: string = '') {
      const toast = await this.toastController.create({
        message: message,
        duration: duration,
        position: position,
        color: color,
        icon: icon,
        cssClass: 'toast-class',
      });

      await toast.present();
    }

    

    saveInLocalStorage(key: string, value: any) {
      return localStorage.setItem(key, JSON.stringify(value));

    }

    getFromLocalStorage(key: string, value: Partial<{ uid: string; email: string; password: string; name: string; Rol: string; image: string; }>) {
      return JSON.parse(localStorage.getItem(key));
    }


   async takePicture (promptLabelHeader:string){
      return await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt,
        promptLabelHeader,
        promptLabelPhoto:"selecciona una imagen",
        promptLabelPicture:"tomar una foto"
      });
  }


}
