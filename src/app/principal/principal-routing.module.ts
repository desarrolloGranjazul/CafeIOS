import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal.component';
import { PedirComponent } from './pedir/pedir.component';
import { MidetalleComponent } from './midetalle/midetalle.component';
import { MiturnoComponent } from './miturno/miturno.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ReservarComponent } from './reservar/reservar.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  {
    path: '', 
    component: PrincipalComponent, 
    children: [
      { path: 'midetalle', component: MidetalleComponent },
      { path: 'miturno', component: MiturnoComponent },
      { path: 'reservar', component: ReservarComponent },
      { path: 'pedir', component: PedirComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'inicio', component: InicioComponent }
    ] 
  },
  {path: '**', component: PrincipalComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes )],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
