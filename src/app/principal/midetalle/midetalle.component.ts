import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { EndPoint } from '../../enum/EndPoint.enum';
import { MovimientoCajaIntegrado } from '../../model/MovimientoCajaIntegrado';
import { ApiService } from '../../services/api.service';
import { SwaService } from '../../services/swa.service';
import { FormsService } from '../../services/forms.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-midetalle',
  templateUrl: './midetalle.component.html',
  styleUrls: ['./midetalle.component.scss'],
})
export class MidetalleComponent implements OnInit, AfterViewChecked {
  
  primerInicio : number = 0;

  private endPoint: EndPoint = EndPoint.MOVIMIENTOCAJA;
  editar: boolean = false;

  //Variables para la tabla
  movimientocajas: MovimientoCajaIntegrado[] = [];
  cargando: boolean = true;

  fechaInicio: string = '';
  fechaFin: string = '';

  //Objeto seleccionado actual ho nuevo
  movimientocaja: MovimientoCajaIntegrado = MovimientoCajaIntegrado.instance('');
 
  formularioAuxiliar: FormGroup = new FormGroup({
    fechaInicio:  new FormControl(this.fechaInicio),
    fechaFin:  new FormControl(this.fechaFin)
  });


  constructor(private api: ApiService, private sa: SwaService, public fs: FormsService, public router:Router) {}
  
  ngOnInit(): void {    
    console.log('Mi Detalle recargado');
    
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  
    this.api.detenerIntervalTurno();
    
    //Me subscribo al formulario para que el objeto siempre este actualizado
    this.formularioAuxiliar.valueChanges.subscribe(datos => {
      this.fechaInicio = datos.fechaInicio;
      this.fechaFin = datos.fechaFin;
      this.buscar('');
    });
    
    //Inicializo el formulario
    let data = {
      fechaInicio: this.api.obtenerFechaActual(), 
      fechaFin: this.api.obtenerFechaActual()
    }      
    this.formularioAuxiliar.reset(data);
  
    this.buscar('');

     //No comentar ni borrar porque el ngAfterViewChecked dejaria inutilizable al interfaz
     this.api.recargar = 0;
  }

  ngAfterViewChecked(){
    if(this.api.recargar>0){
      this.ngOnInit();
    }
  }

  buscar(termino: string) {
    
    if( this.primerInicio > 0){ 
      let data = {
          fechainicio: this.fechaInicio,
          fechafin:this.fechaFin,
          idpersona: this.api.personasesion.idpersona 
        }
        this.api.buscarFiltro(this.endPoint, data, "N").subscribe(resp => {
          if (resp.ok) {
            this.movimientocajas = JSON.parse(JSON.stringify(resp.data));
          } else {
            this.sa.error('Error',  this.api.mensajeError(resp.error))
          }
        }, (error) => {
          this.sa.error('Error', error)
        });
      } 
      
      //Crack, idolo, maquina, pelo en el pecho,,, no quitar.... jajaj
      this.primerInicio += 1;
  }


}
