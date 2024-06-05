import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ValidarcorreoComponent } from './validarcorreo/validarcorreo.component';
import { TerminosComponent } from './terminos/terminos.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'password', component: ResetpasswordComponent },
  { path: 'validarcorreo', component: ValidarcorreoComponent },
  { path: 'terminos', component: TerminosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
