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
    data: { Rol: ['admin','Gerente'] }  // Solo el admin puede acceder
  },
  {
    path: 'control-despacho',
    loadChildren: () => import('./pages/Inventario/control-despacho.module').then(m => m.ControlDespachoPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { Rol: ['admin', 'Gerente','Resp_S_Generales','Auxiliar_Bodega'] }  
  },
  {
    path: 'asig-rutas',
    loadChildren: () => import('./pages/Bodega/asig-rutas.module').then(m => m.AsigRutasPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { Rol: ['admin', 'Gerente','Resp_S_Generales','Auxiliar_Bodega'] }  
  },
  {
    path: 'insumos',
    loadChildren: () => import('./pages/Solicitudes/insumos.module').then(m => m.InsumosPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { Rol: ['admin', 'Gerente','Resp_S_Generales'] }  
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}