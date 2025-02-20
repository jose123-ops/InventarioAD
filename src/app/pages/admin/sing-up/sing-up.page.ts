import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LoadingService } from 'src/app/services/loading.service';
import { User } from 'src/app/user.model';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.page.html',
  styleUrls: ['./sing-up.page.scss'],
})
export class SingUpPage implements OnInit {

 public  image = false

  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Rol: new FormControl('', [Validators.required, Validators.minLength(4)]),
  })

  constructor(
    public firebasesvc: FirebaseService,
    public service: LoadingService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async Registrar() {
    if (this.form.valid) {
      const loading = await this.service.loading('Cargando ...', 'crescent');
      this.firebasesvc.signup(this.form.value as {name: string, email: string, password: string, Rol: string })
        .subscribe({
          next: (res) => {
            console.log('Respuesta completa del backend:', res);
            if (res && res.uid) {
              let uid = res.uid;
              console.log('UID recibido:', uid); 
              this.form.controls.uid?.setValue(uid);
              this.Register()
              //this.setUser(uid);
              this.showToast();
              this.router.navigate(['/admin']);
            } else {
              console.error('UID no recibido correctamente');
            }
          },
          error: (err) => {
            console.error('Error en el signup:', err);  
            this.service.toast(err.message, 3000, 'middle');
          },
          complete: () => {
            this.service.hide(loading);
          }
        });
    }
  }
  
  showToast() {
    this.service.toast('Usuario registrado con éxito', 3000, 'bottom');  // Mostrar mensaje de éxito
  }
  
  async setUser(uid: string) {
    if (!this.form.valid) {
      console.error("Formulario inválido:", this.form.value);
      return;
    }
  
    const loading = await this.service.loading('Guardando usuario...', 'crescent');
  
    let path = `users/${uid}`;
    console.log("Guardando en Firestore en:", path); // 🔍 Depuración
  
    return this.firebasesvc.setDocument(path, this.form.value)
      .then(() => {
        this.service.getFromLocalStorage('user', this.form.value)
        console.log("Usuario guardado en Firestore con éxito");
      })
      .catch(err => {
        console.error("Error al guardar usuario en Firestore:", err);
        this.service.toast(err.message, 3000, 'middle');
      })
      .finally(() => {
        this.service.hide(loading);
      });
  }
  

  async takePicture(){
    const dataUrl = (await this.service.takePicture('foto')).dataUrl;
    this.form.controls.email.setValue(dataUrl)
  }


  Register() {
    if (this.form.valid) {
      this.firebasesvc.registrarUsuario(this.form.value).subscribe({
        next: (res) => {
          console.log('Usuario registrado:', res);
        },
        error: (err) => {
          console.error('Error en el registro:', err);
        }
      });
    }
  }
}

 
  



