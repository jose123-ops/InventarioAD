import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EmailAuthProvider, getAuth, reauthenticateWithCredential } from 'firebase/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ModalEditComponent } from 'src/app/shared/component/modal-edit/modal-edit.component';
import { User } from 'src/app/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  form = new FormGroup({
    id: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    Rol: new FormControl('', [Validators.required, Validators.minLength(4)]),

  })

  users: any[] = [];
  
  constructor(private router: Router,
    private firebaseService: FirebaseService,
    public service: LoadingService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
 
 
    this.loadUsers();
  }

  loadUsers() {
    this.firebaseService.getUsers().subscribe(data => {
      this.users = data;
    });

  }
  singup() {
    this.router.navigate(['/sing-up']);
  }

  async openEditModal(user: any) {
 
    if (!user) {
      console.error("Error: Usuario es null o undefined");
      return;
    }
  
    if (!user.id && user.uid) {
      user.id = user.uid; // 📌 Si el usuario tiene `uid`, úsalo como `id`
    }
  
    if (!user.id) {
      console.error("Error: Usuario inválido o sin ID", user);
      return;
    }
  
    const modal = await this.modalController.create({
      component: ModalEditComponent,
      mode: "ios",
      componentProps: { userData: user }
    });
  
    await modal.present();
  
    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log("Usuario actualizado:", data.updatedUser);
    }
  }

  /*async deletedUser(user: any) {
    const currentUser = getAuth().currentUser;
  
    // Verifica si el correo del usuario autenticado contiene "admin"
    if (currentUser && currentUser.email?.includes('admin')) {
      const userId = user.uid;
      const path = `users/${userId}`;
  
      try {
        // Elimina el documento del usuario en Firestore
        await this.firebaseService.deletedDocument(path);
        console.log("Eliminado con éxito en Firestore");
  
        // Elimina el usuario de Firebase Authentication
        await getAuth().deleteUser(userId);
        console.log("Usuario eliminado de Authentication");
  
        this.service.toast("Cuenta de usuario eliminada con éxito", 3000, 'top', 'success', 'checkmark-done-outline');
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        this.service.toast(error.message, 3000, 'top', 'danger', 'close-circle-outline');
      }
    } else {
      console.log("El usuario no tiene privilegios de administrador");
      this.service.toast("No tienes privilegios suficientes para eliminar usuarios.", 3000, 'top', 'danger', 'close-circle-outline');
    }
     }*/

}




