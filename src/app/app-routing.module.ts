import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/auth-role.guard';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { Rol: ['admin'] }  // Solo el admin puede acceder
  },
  {
    path: 'control-despacho',
    loadChildren: () => import('./pages/control-despacho/control-despacho.module').then(m => m.ControlDespachoPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { Rol: ['admin', 'Jefe_Bodega', 'Jefe_Logística'] }  // Admin, jefe de bodega y logística pueden acceder
  },
  {
    path: 'asig-rutas',
    loadChildren: () => import('./pages/asig-rutas/asig-rutas.module').then(m => m.AsigRutasPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { Rol: ['admin', 'Jefe_Bodega', 'Jefe_Logística', 'conductor'] }  // Admin, jefe de bodega, logística y conductor
  },
  {
    path: 'insumos',
    loadChildren: () => import('./pages/insumos/insumos.module').then(m => m.InsumosPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { Rol: ['admin', 'Jefe_Bodega', 'Jefe_Logística', 'RRHH'] }  // Admin, jefe de bodega, logística y rrhh
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}