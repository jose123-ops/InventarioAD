import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsigRutasPage } from './asig-rutas.page';

const routes: Routes = [
  {
    path: '',
    component: AsigRutasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsigRutasPageRoutingModule {}
