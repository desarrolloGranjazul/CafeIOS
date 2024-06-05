import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { EndPoint } from '../../enum/EndPoint.enum';
import { ReservaIntegrado } from '../../model/ReservaIntegrado';
import { ApiService } from '../../services/api.service';
import { SwaService } from '../../services/swa.service';
import { FormsService } from '../../services/forms.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Localidad } from '../../model/Localidad';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.scss'],
})
export class ReservarComponent implements OnInit, AfterViewChecked {

  private endPoint: EndPoint = EndPoint.RESERVA;

  //Variables para la tabla
  reservas: ReservaIntegrado[] = [];
  localidades: Localidad[] = [];
  cargando: boolean = true;

  localidad: Localidad = Localidad.instance('');


  //Objeto seleccionado actual ho nuevo
  movimientocaja: ReservaIntegrado = ReservaIntegrado.instance('');
 
  formularioLocalidad: FormGroup = new FormGroup({
    idlocalidad: new FormControl(this.localidades)
  });

  constructor(private api: ApiService, private sa: SwaService, public router:Router) { }
  
  ngOnInit(): void { 
    console.log('Reserva recargado');
    
    this.api.detenerIntervalTurno();
  
    this.cargarLocalidad();  

    //Me subscribo al formulario para que el objeto siempre este actualizado
    this.formularioLocalidad.valueChanges.subscribe(datos => {
        this.localidad = datos
        this.cargar();
    });

    //No comentar ni borrar porque el ngAfterViewChecked dejaria inutilizable al interfaz
    this.api.recargar = 0;    
  }

  ngAfterViewChecked(){
    if(this.api.recargar>0){
      this.ngOnInit();
    }
  }
    
  cargarLocalidad() {
    this.cargando = true;
    this.api.cargar('localidad', undefined).subscribe(resp => {
      if (resp.ok) {
        this.localidades = JSON.parse(JSON.stringify(resp.data));
         //Inicializo el formulario
         let data = {
          idlocalidad: this.localidades[0].idlocalidad
        }              
        this.formularioLocalidad.reset(data);        
      } else {
        this.sa.error('Error', this.api.mensajeError(resp.error))
      }
    }, (error) => {
      this.sa.error('Error', error)
    });

    this.cargando = false;
  }

  cargar() {
    this.cargando = true;
    
    let data = {
      idpersona:this.api.personasesion.idpersona,
      sinreserva: 'N',
      tipo:'F',
      idlocalidad:this.localidad.idlocalidad,
      activas: 'S'
    }
    this.api.buscarFiltro('ofertaventa', data, 'N').subscribe(resp => {
      if (resp.ok) {
        this.reservas = JSON.parse(JSON.stringify(resp.data));
      } else {
        this.sa.error('Error',  this.api.mensajeError(resp.error))
      }
    }, (error) => {
      this.sa.error('Error', error)
    });

    this.cargando = false;
  }

  reservar(reserva: ReservaIntegrado){    
    if(reserva.cantidad_usuario_reserva === null || reserva.cantidad_usuario_reserva <= 0){
      this.sa.error('Debe especificar una cantidad')
    }else {

      let url;
      let data;

      if(reserva.idreserva !== undefined && reserva.idreserva !== null){
        url = `reserva/actualizar`;
        data = {
          idreserva: reserva.idreserva,
          cantidad: reserva.cantidad_usuario_reserva
        }
      } else {
        url = `reserva/insertar`;
        data = {
          idpersona: this.api.personasesion.idpersona,
          idarticulo: reserva.idarticulo,
          idoferta_venta: reserva.idoferta_venta,
          cantidad: reserva.cantidad_usuario_reserva
        }
      }

      this.api.post(url, data).subscribe(resp => {
        if (resp.ok) {
          this.sa.realizado('Datos guardados', '');
          this.cargar();
        } else {
          this.sa.error('Error',  this.api.mensajeError(resp.error))
        }
      });


    }

  }

  eliminar(reserva:ReservaIntegrado){
    let url = `reserva/eliminar`;
    let data = {
      idreserva: reserva.idreserva
    }
      this.api.post(url, data).subscribe(resp => {
      if (resp.ok) {
        this.sa.realizado('Reserva eliminada', '');
        this.cargar();
      } else {
        this.sa.error('Error',  this.api.mensajeError(resp.error))
      }
    });
  }
  



}
