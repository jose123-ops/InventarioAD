import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsigRutasPageRoutingModule } from './asig-rutas-routing.module';

import { AsigRutasPage } from './asig-rutas.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsigRutasPageRoutingModule,
    SharedModule
],

 
  declarations: [AsigRutasPage]
})
export class AsigRutasPageModule {}
