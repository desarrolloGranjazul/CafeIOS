import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent {
  logoutImagen:string = "logout.png";

  urlInicio:string = "/principal/inicio";
  urlPedir:string = "/principal/pedir";
  urlReservar:string = "/principal/reservar";
  urlMiTurno:string = "/principal/miturno";
  urlMiDetalle:string = "/principal/midetalle";
  urlPerfil:string = "/principal/perfil";

  constructor(public api: ApiService, public router: Router) { }

  ngOnInit(): void {
    
  }

  logout(){
    this.api.cerrarSesion();
    this.router.navigateByUrl('login');
  }

  navegar(url:string){
    this.api.recargar = 1;   
    this.router.navigateByUrl(url);
  }

}
