import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.firebaseService.getUserAuth().pipe(
      map(user => {
        if (user) {
          return true; // Usuario autenticado, permitir acceso
        } else {
          this.router.navigate(['/auth']); // No autenticado, redirigir a login
          return false;
        }
      })
    );
  }
}
