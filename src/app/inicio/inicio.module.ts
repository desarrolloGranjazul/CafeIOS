import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ValidarcorreoComponent } from './validarcorreo/validarcorreo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralModule } from '../general/general.module';
import { TerminosComponent } from './terminos/terminos.component';


@NgModule({
  declarations: [
    LoginComponent, 
    RegistroComponent, 
    ResetpasswordComponent, 
    ValidarcorreoComponent,
    TerminosComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    GeneralModule
  ]
})
export class InicioModule { }
