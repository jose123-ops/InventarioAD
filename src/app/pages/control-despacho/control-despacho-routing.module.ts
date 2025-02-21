import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ControlDespachoPage } from './control-despacho.page';

const routes: Routes = [
  {
    path: '',
    component: ControlDespachoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlDespachoPageRoutingModule {}
