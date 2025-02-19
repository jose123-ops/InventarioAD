import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { CustomInputComponent } from './component/custom-input/custom-input.component';
import { LogoComponent } from './component/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    CustomInputComponent,
    LogoComponent
  ],
  exports: [
    HeaderComponent,
    CustomInputComponent,
    ReactiveFormsModule,
    LogoComponent 
  ],

  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class SharedModule { }
