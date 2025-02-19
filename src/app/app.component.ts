import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { FirebaseService } from './services/firebase.service';
import { User } from './user.model';
import { LoadingService } from './services/loading.service';
import { OverlayEventDetail } from '@ionic/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isAuthPage: boolean = false;
  
  constructor(public menuController: MenuController,
              public router: Router,
              public firebaseService: FirebaseService,
              public loading: LoadingService
  ) { }


  ngOnInit() {
    // Detecta cambios en la ruta con NavigationEnd
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isAuthPage = this.checkAuthPage();
      });
  }
  

  User(): User {
    return this.loading.getFromLocalStorage('user', {});
  }


  closeMenu() {
    this.menuController.close();  // Esto cierra el menú manualmente
  }

   // Función para cerrar sesión
   cerrarSesion() {
    this.firebaseService.logout().then(async () => {
      this.router.navigate(['/auth']); // Redirige a la página de login
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });

    this.closeMenu(); // Cierra el menú al cerrar sesión
  }

  // quitar cerrar sesion
  checkAuthPage(): boolean {
    const authRoutes = ['/auth', '/login', '/register']; // Añade aquí todas tus rutas de autenticación
    return authRoutes.includes(this.router.url);
  }


  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        this.closeMenu();
       
      },
    },
    {
      text: 'Si',
      role: 'confirm',
      cssClass: 'alertDanger',
      handler: () => {
        this.cerrarSesion() // Cierra la sesión
      },
    },
  ];

  setResult(event: CustomEvent<OverlayEventDetail>) {
    console.log(`Dismissed with role: ${event.detail.role}`);
  }
}

