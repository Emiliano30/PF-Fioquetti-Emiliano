import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Alumnos2Component } from './alumnos2.component';

import { SharedModule } from '../../../../shared/shared.module';
import { FormularioComponent } from './formulario/formulario.component';
import { Alumnos2RouterModule } from './alumnos2-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    Alumnos2Component,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    Alumnos2RouterModule,
    FormsModule,
    ReactiveFormsModule
  
  ],
  exports:[Alumnos2Component]
})
export class Alumnos2Module { }
