import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LoadingService } from 'src/app/services/loading.service';
import { User } from 'src/app/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),

  })

  constructor(
    public firebasesvc: FirebaseService,
    public service: LoadingService,
    private router: Router
  ) { }

  // firebasesvc = inject(FirebaseService);

  ngOnInit() {
    this.firebasesvc.initAuthListener();
  }

  async submit() {
    if (this.form.valid) {
      const loading = await this.service.loading('Cargando ...', 'crescent');
      this.firebasesvc.signIn(this.form.value as User).then(res => {

        this.getUsersinfo(res.user.uid);

      }).catch(err => {
        console.log(err);
        let message = "correo o contraseña incorrecta";
        this.service.toast(message, 3000, 'top', 'danger', 'close-circle-outline');
      }).finally(() => {
        this.service.hide(loading);
      })
    }
  }

  showToast() {
    this.service.toast('Este es un mensaje de Toast', 3000, 'top');
  }

  async getUsersinfo(uid: string) {
    if (this.form.valid) {

      let path = `users/${uid}`;
      this.firebasesvc.getDocument(path).then((user: User) => {

        this.service.saveInLocalStorage('user', user);
        this.form.reset();
        let message = `te damos la bienvenida ${user.name || 'usuario'}`;
        this.service.toast(message, 3000, 'middle', 'success', 'checkmark-done-outline');
        this.router.navigate(['/admin']);
      })
    }
  }

}
