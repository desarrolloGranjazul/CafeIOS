import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pagina404Component } from './pagina404/pagina404.component';
import { CargandoComponent } from './cargando/cargando.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegresarComponent } from './regresar/regresar.component';
import { ImgPipe } from './imagenpipe/img.pipe';
import { TarjetareservaComponent } from './tarjetareserva/tarjetareserva.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    Pagina404Component,
    CargandoComponent,
    NavbarComponent, 
    RegresarComponent,
    ImgPipe,
    TarjetareservaComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ], 
  exports:[
    Pagina404Component,
    CargandoComponent,
    NavbarComponent, 
    RegresarComponent,
    ImgPipe,
    TarjetareservaComponent
  ]
})
export class GeneralModule { }
