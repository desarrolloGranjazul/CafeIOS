import { Component, OnInit } from '@angular/core';
import { SwaService } from 'src/app/services/swa.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-miturno',
  templateUrl: './miturno.component.html',
  styleUrls: ['./miturno.component.scss'],
})
export class MiturnoComponent implements OnInit{

  idpersona: string = '0';
  personasActuales: number = 0;
  contador:number = 0;
  vibrar:number = 0;


  constructor(public api: ApiService, private sa: SwaService, public router:Router, private v:Vibration) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.recargarComponente();
  }
  
  ngOnInit() {
    this.recargarComponente();
    console.log('Oninit mi turno');
    
    this.idpersona = this.api.personasesion.idpersona;
    this.iniciarActualizacion();
  }

  iniciarVibracion(){
    this.v.vibrate(3000);

    //Despues de vibrar cambio la variable para evitar vibracion continua
    this.vibrar = 0;

  }

  recargarComponente() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
  }

  
  iniciarActualizacion(){

    console.log(this.api.intervalTurno$);
    
    this.api.intervalTurno$ = setInterval(()=>{
      this.obtenerData();
    },1000*7);
    this.obtenerData();
  }
  
  obtenerData(){
    console.log('Hola ', this.contador++);    
    let data = {
      idpersona: this.idpersona
    }

    this.api.post('persona/turno', data).subscribe(resp => {
      if (resp.ok) {
        this.personasActuales = resp.data[0]['personas'];  
        
        //Cuando el turno actual es diferente al nuevo cambio la variable vibrar a 1
        //Luego el metodo validarVibracion controla si debe vibrar ho no
        if(this.vibrar !== this.personasActuales){          
          this.vibrar = 1;
        }   
        this.validarVibracion();
      } else {
        this.sa.error('Error', JSON.stringify(resp.error))
      }
    });
  }
  
  validarVibracion(){
    //Si la bandera de vibrar esta en 1 entonces validamos si hay qye vibrar
    if(this.vibrar > 0){

      //Solo vibra cuando el turno actual es 0
      if(this.personasActuales === 0){
        this.iniciarVibracion();
      }

    }
  }


}
