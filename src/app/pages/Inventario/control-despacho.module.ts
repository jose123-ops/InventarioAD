import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ControlDespachoPageRoutingModule } from './control-despacho-routing.module';

import { ControlDespachoPage } from './control-despacho.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ControlDespachoPageRoutingModule,
    SharedModule
  ],
  declarations: [ControlDespachoPage]
})
export class ControlDespachoPageModule {}
