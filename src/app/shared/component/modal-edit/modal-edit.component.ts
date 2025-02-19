import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable, Subscribable } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LoadingService } from 'src/app/services/loading.service';
import { User } from 'src/app/user.model';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss'],
})
export class ModalEditComponent  implements OnInit {
  @Input() userData: User;
  form: FormGroup = new FormGroup({});

  user ={} as User;
  
  constructor(public modalController: ModalController,
              public firebaseService: FirebaseService,
             public  service: LoadingService
  ) { }

  ngOnInit() {
    if (this.userData) {
     this.userData.uid; 
      this.form.patchValue(this.userData); 
    }

    this.form = new FormGroup({
      email: new FormControl(this.userData?.email || '', [Validators.required, Validators.email]),
      password: new FormControl(this.userData?.password || '', [Validators.required, Validators.minLength(6)]),
      name: new FormControl(this.userData?.name || '', [Validators.required, Validators.minLength(3)]),
      Rol: new FormControl(this.userData?.Rol || '', [Validators.required, Validators.minLength(4)]),
   
    });
  }

  async updateUser() {
    let  userId = this.userData.uid; 
    let path = `users/${userId}`;
    this.firebaseService.updateDocument(path, this.form.value)
      .then(async () => {
        let message = `Actualizado con éxito`;
        this.service.toast(message, 3000, 'top', 'success', 'checkmark-done-outline');
        this.closeModal() 
      })
      .catch(error => {
        console.error("Error al actualizar usuario:", error);
      });
  }

  closeModal() {
    this.modalController.dismiss(); 
  }
}




