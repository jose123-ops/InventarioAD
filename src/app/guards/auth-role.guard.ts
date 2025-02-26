import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { delay, filter, map, Observable, of, switchMap, take } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: FirebaseService, private router: Router) { }


  // Mapeo de roles a rutas por defecto
  private roleDefaultRoute: { [key: string]: string } = {
    'admin': '/admin',
    'Jefe_Bodega': '/control-despacho',
    'Jefe_Logística': '/control-despacho',
    'Auxiliar_Bodega': '/muestras',
    'conductor': '/asig-rutas',
    'RRHH': '/insumos'
  };

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const requiredRoles = route.data['Rol'] as string[];

    return this.authService.userRole$.pipe(
      filter(role => role !== null && role !== ''),  // Filtrar roles válidos
      take(1), 
      map(role => {
        if (!requiredRoles || requiredRoles.length === 0) {
          return true;
        }

        if (requiredRoles.includes(role as string)) {
          return true;
        } else {
          const redirectRoute = this.roleDefaultRoute[role as string] || '/auth';
          this.router.navigate([redirectRoute]);
          return false;
        }
      })
    );
  }
}