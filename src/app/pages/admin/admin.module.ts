import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { SharedModule } from "../../shared/shared.module";
import { ModalEditComponent } from 'src/app/shared/component/modal-edit/modal-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
],
  declarations: [AdminPage]
})
export class AdminPageModule {}
