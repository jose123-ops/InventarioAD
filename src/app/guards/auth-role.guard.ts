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
    'Gerente': '/admin',
    'Jefe_Bodega': '/control-despacho',
    'Auxiliar_Bodega': '/control-despacho',
    'Resp_Informatica': '/control-despacho',
    'Resp_Economia_Creativa': '/control-despacho',
    'Resp_Trasporte': '/control-despacho',
    'Resp_UMGIR': '/control-despacho',
    'Resp_Asesoria_Legal': '/control-despacho',
    'Resp_Mercado': '/control-despacho',
    'Vice_Alcalde': '/control-despacho',
    'Alcalde': '/control-despacho',
    'catastro': '/control-despacho',
    'Resp_Urbanismo': '/control-despacho',
    'Resp_UMAS': '/control-despacho',
    'Resp_Medio_Ambiente': '/control-despacho',
    'Secretaria_Consejo': '/control-despacho',
    'Resp_Finanza': '/control-despacho',
    'Resp_Presupuesto': '/control-despacho',
    'Resp_Contabilidad': '/control-despacho',
    'Resp_Tesoreria': '/control-despacho',
    'Resp_RRHH': '/control-despacho',
    'Resp_Servicios_Municipales': '/control-despacho',
    'Resp_Registro_Civil': '/control-despacho',
    'Resp_Adquisiciones': '/control-despacho',
    'Resp_Recaudacion': '/control-despacho',
    'Resp_Proyecto': '/control-despacho',
    'Resp_Planificacion': '/control-despacho',
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