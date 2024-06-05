import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PrincipalComponent } from './principal.component';
import { ApiService } from '../services/api.service';
import { GeneralModule } from '../general/general.module';
import { PerfilComponent } from './perfil/perfil.component';
import { MidetalleComponent } from './midetalle/midetalle.component';
import { MiturnoComponent } from './miturno/miturno.component';
import { PedirComponent } from './pedir/pedir.component';
import { ReservarComponent } from './reservar/reservar.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { InicioComponent } from './inicio/inicio.component';

@NgModule({
  declarations: [
    PrincipalComponent,
    PerfilComponent,
    MidetalleComponent,
    MiturnoComponent,
    ReservarComponent, 
    PedirComponent,
    InicioComponent
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    IonicModule,
    GeneralModule,
    FormsModule,
    ReactiveFormsModule,
    NgxQRCodeModule
  ]
})
export class PrincipalModule {

  constructor(private api: ApiService) { }
  
}
