import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ReservaIntegrado } from 'src/app/model/ReservaIntegrado';
import { EndPoint } from '../../enum/EndPoint.enum';
import { ReservaUsuario } from '../../model/ReservaUsuario';
import { ApiService } from '../../services/api.service';
import { SwaService } from '../../services/swa.service';
import { PedidoIntegrado } from '../../model/PedidoIntegrado';
import { NgxQrcodeElementTypes } from '@techiediaries/ngx-qrcode';
import { Localidad } from '../../model/Localidad';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedir',
  templateUrl: './pedir.component.html',
  styleUrls: ['./pedir.component.scss'],
})
export class PedirComponent implements OnInit, AfterViewChecked {
  private endPoint: EndPoint = EndPoint.RESERVA;
  valorQr: string;

  // Variables para la tabla
  reservas: ReservaUsuario[] = [];
  localidades: Localidad[] = [];
  ofertasAPedir: ReservaIntegrado[] = [];
  pedidosActuales: PedidoIntegrado[] = [];
  totalDePedidos: number = 0;

  localidad: Localidad = Localidad.instance('');
  elementType = NgxQrcodeElementTypes.URL;
  cargando: boolean = true;

  formularioLocalidad: FormGroup = new FormGroup({
    idlocalidad: new FormControl(this.localidades)
  });

  categories: { id: number, name: string, isOpen: boolean }[] = [];

  constructor(public api: ApiService, private sa: SwaService, public router: Router) { }

  ngOnInit(): void {
    console.log('Pedido recargado');
    this.api.detenerIntervalTurno();
    this.cargarLocalidad();
    this.valorQr = `${this.api.personasesion.idpersona}|${this.api.personasesion.nombre}`;

    this.formularioLocalidad.valueChanges.subscribe(datos => {
      this.localidad = datos;
      this.cargar();
      this.cargarPedidoActual();
    });

    this.api.recargar = 0;
  }

  ngAfterViewChecked() {
    if (this.api.recargar > 0) {
      this.ngOnInit();
    }
  }

  cargarLocalidad() {
    this.cargando = true;
    this.api.cargar('localidad', undefined).subscribe(resp => {
      if (resp.ok) {
        this.localidades = JSON.parse(JSON.stringify(resp.data));
        let data = {
          idlocalidad: this.localidades[0].idlocalidad
        };
        this.formularioLocalidad.reset(data);
      } else {
        this.sa.error('Error', this.api.mensajeError(resp.error));
      }
    }, (error) => {
      this.sa.error('Error', error);
    });

    this.cargando = false;
  }

  cargarPedidoActual() {
    let data = {
      idpersona: this.api.personasesion.idpersona,
      estado: "P",
      idlocalidad: this.localidad.idlocalidad
    };
    this.api.buscarFiltro('pedido', data, 'N').subscribe(resp => {
      if (resp.ok) {
        this.pedidosActuales = JSON.parse(JSON.stringify(resp.data));
        this.totalDePedidos = 0;
        this.pedidosActuales.forEach(e => this.totalDePedidos += e.subtotal);
      } else {
        this.sa.error('Error', this.api.mensajeError(resp.error));
      }
    }, (error) => {
      this.sa.error('Error', error);
    });
  }

  cargar() {
    this.cargando = true;

    let filtroreservas = {
      idpersona: this.api.personasesion.idpersona,
      idlocalidad: this.localidad.idlocalidad
    };
    this.api.buscarFiltro('reserva', filtroreservas, 'N').subscribe(resp => {
      if (resp.ok) {
        this.reservas = JSON.parse(JSON.stringify(resp.data));
      } else {
        this.sa.error('Error', this.api.mensajeError(resp.error));
      }
    }, (error) => {
      this.sa.error('Error', error);
    });

    this.reservas.forEach(element => {
      element.cantidad_pedir = element.cantidad;
    });

    let filtropedidos = {
      idpersona: this.api.personasesion.idpersona,
      sinreserva: 'S',
      tipo: 'F',
      idlocalidad: this.localidad.idlocalidad,
      activas: 'N'
    };

    this.api.buscarFiltro('ofertaventa', filtropedidos, 'N').subscribe(resp => {
      if (resp.ok) {
        this.ofertasAPedir = JSON.parse(JSON.stringify(resp.data));
        this.createCategories();
      } else {
        this.sa.error('Error', this.api.mensajeError(resp.error));
      }
    }, (error) => {
      this.sa.error('Error', error);
    });

    this.cargando = false;
  }

  createCategories() {
    const categoriasMap = new Map<number, string>();
    this.ofertasAPedir.forEach(oferta => {
      if (!categoriasMap.has(oferta.idarticulo)) {
        categoriasMap.set(oferta.idarticulo, oferta.articulo);
      }
    });

    this.categories = Array.from(categoriasMap.entries()).map(([id, name]) => ({
      id,
      name,
      isOpen: false
    }));
  }

  toggleCategory(category) {
    category.isOpen = !category.isOpen;
  }

  procesarPedidos() {
    let error = '';
    let reservasAPedir: ReservaUsuario[] = [];
    let ofertasAPedir: ReservaIntegrado[] = [];

    for (let i = 0; i < this.reservas.length; i++) {
      let registro = this.reservas[i];
      if (registro.cantidad_pedir < 0 || registro.cantidad_pedir > registro.cantidad) {
        error += `Revisar cantidad de "${registro.descripcion}"\n`;
      } else if (registro.cantidad_pedir > 0) {
        reservasAPedir.push(registro);
      }
    }

    if (error.length > 0) {
      this.sa.error('Error', 'Reservas \n' + error);
      return;
    }

    error = '';

    for (let i = 0; i < this.ofertasAPedir.length; i++) {
      let registro = this.ofertasAPedir[i];
      if (registro.cantidad_pedir < 0 || registro.cantidad_pedir > registro.cantidad_disponible) {
        error += `Revisar cantidad de "${registro.descripcion}"\n`;
      } else if (registro.cantidad_pedir > 0) {
        ofertasAPedir.push(registro);
      }
    }

    if (error.length > 0) {
      this.sa.error('Error', 'Disponibles \n' + error);
      return;
    }

    let urlInsert = 'pedido/sql';
    let idpersona = this.api.personasesion.idpersona;
    let sql = '';

    for (let i = 0; i < reservasAPedir.length; i++) {
      const registro = reservasAPedir[i];
      sql += `'R',  ${registro.idreserva}, ${registro.cantidad_pedir}, ${idpersona}|`;
    }

    for (let i = 0; i < ofertasAPedir.length; i++) {
      const registro = ofertasAPedir[i];
      sql += ` 'O', ${registro.idoferta_venta}, ${registro.cantidad_pedir}, ${idpersona}|`;
    }

    sql = sql.substring(0, sql.length - 1);

    let data = {
      sql: sql,
      idpersona: idpersona
    };

    this.api.post(urlInsert, data).subscribe(resp => {
      if (resp.ok) {
        this.cargarPedidoActual();
        this.cargar();
        this.sa.realizado('Pedido realizado');
      } else {
        this.sa.error('Error', this.api.mensajeError(resp.error));
      }
    });
  }
}
