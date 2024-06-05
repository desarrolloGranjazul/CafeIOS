import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  logoutImagen:string = "logout.png";


  constructor(public api: ApiService, public router: Router) { }

  ngOnInit(): void {
    
  }

  logout(){
    this.api.cerrarSesion();
    this.router.navigateByUrl('login');
  }

}
