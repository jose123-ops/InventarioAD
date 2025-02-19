import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

  template: `
    <ion-list>
      <ion-item button (click)="cerrarSesion()">Cerrar sesión</ion-item>
    </ion-list>
  `
})
export class HeaderComponent implements OnInit {
  isSelectOpen: boolean = false;
  selectedOption: string;
  isPopoverOpen: boolean = false; 
  popoverEvent: any; 
  @Input() title!: string;
  @Input() BackButton: string;

  

  constructor(public firebaseService: FirebaseService,
    public router: Router,
    public popoverController: PopoverController
    ) { }

  ngOnInit() { }

  // Alternar la visibilidad del ion-select
  toggleSelect() {
    this.isSelectOpen = !this.isSelectOpen; // Cambiar estado (abierto/cerrado)
  }

  // Manejar el cambio de selección
  onSelectChange(event: any) {
    if (this.selectedOption === 'cerrarSesion') {
      this.cerrarSesion();
      this.isSelectOpen = false; // Cierra el ion-select después de seleccionar
    }
  }

  presentPopover(event: any) {
    this.popoverEvent = event; 
    this.isPopoverOpen = true; 
  }

  async closePopover() {
    this.isPopoverOpen = false;
    await this.popoverController.dismiss();
  }

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this. cerrarSesion()
      },
    },
  ];

  setResult(event: CustomEvent<OverlayEventDetail>) {
    console.log(`Dismissed with role: ${event.detail.role}`);
  }
 // quitar cerrar sesion
  isAuthPage(): boolean {
    const authRoutes = ['/auth'];  
    return authRoutes.includes(this.router.url);
  }
  
  // Función para cerrar sesión
  cerrarSesion() {
    this.firebaseService.logout().then(async () => {
      await this.closePopover(); // Cierra el popover antes de redirigir
      this.router.navigate(['/auth']); // Redirige a la página de login
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}

