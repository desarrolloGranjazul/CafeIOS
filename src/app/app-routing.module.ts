import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Pagina404Component } from './general/pagina404/pagina404.component';
import { AuthGuard } from './guardian/auth.guard';

const routes: Routes = [
  {path: '', loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule) },
  { path: `principal`, loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalModule),  canLoad: [AuthGuard] },
  {path: '**', component: Pagina404Component },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash:true})
    //RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules } )
    //RouterModule.forRoot(routes,  {onSameUrlNavigation: 'reload'} )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
