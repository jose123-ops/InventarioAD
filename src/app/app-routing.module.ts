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
  data: {
  Rol: ['admin', 'Gerente', 'Jefe_Bodega', 'Auxiliar_Bodega', 'Resp_Informatica', 'Resp_Trasporte', 'Resp_Economia_Creativa', 
    'Resp_UMGIR', 'Resp_Asesoria_Legal', 'Resp_Mercado', 'Vice_Alcalde', 'Alcalde', 'Resp_catastro', 'Resp_Urbanismo', 'Resp_UMAS', 
    'Resp_Medio_Ambiente', 'Secretaria_Consejo', 'Resp_Finanza', 'Resp_Presupuesto', 'Resp_Contabilidad', 'Resp_Tesoreria', 'Resp_RRHH',
     'Resp_Servicios_Municipales', 'Resp_Registro_Civil', 'Resp_Adquisiciones', 'Resp_Recaudacion', 'Resp_Proyecto', 'Resp_Planificacion']
}
},
  {
    path: 'asig-rutas',
    loadChildren: () => import('./pages/Bodega/asig-rutas.module').then(m => m.AsigRutasPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { Rol: ['admin', 'Gerente','Jefe_Bodega','Auxiliar_Bodega'] }  
  },
  {
    path: 'insumos',
    loadChildren: () => import('./pages/Solicitudes/insumos.module').then(m => m.InsumosPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { Rol: ['admin', 'Gerente','Jefe_Bodega'] }  
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}