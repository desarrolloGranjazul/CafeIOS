import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SwaService } from '../../services/swa.service';
import { Persona } from '../../model/Persona';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit, AfterViewChecked {

  persona:Persona = Persona.instance('');
  logo:string = 'Granjazul.png';

  constructor(private api: ApiService, private sa: SwaService, public router: Router) {
    this.obtenerPersona();
   }

   async openManualUsuario(){
    await Browser.open({url: 'https://docs.google.com/presentation/d/1peKOOgdAAwswlxyJj-iJ7Hyu9rx_cx3zN5_fzAhPLwI/edit?usp=share_link' });
   }
  
  ngOnInit() {
    console.log('Inicio recargado');
    this.obtenerPersona();

    //No comentar ni borrar porque el ngAfterViewChecked dejaria inutilizable al interfaz
    this.api.recargar = 0;
  }

  ngAfterViewChecked(){
    console.log('ngAfterViewChecked');
    
    if(this.api.recargar>0){
      this.ngOnInit();
    }
  }

  obtenerPersona(){   
    let data = {
      idpersona: this.api.personasesion.idpersona
    }
    this.api.post('persona/filtroestricto', data).subscribe(resp => {
      if (resp.ok) {
        this.persona = resp.data[0]; 
               
      } else {
        this.sa.error('Error', JSON.stringify(resp.error))
      }
    });
  }


}
