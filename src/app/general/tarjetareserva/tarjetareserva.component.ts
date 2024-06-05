import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReservaIntegrado } from '../../model/ReservaIntegrado';

@Component({
  selector: 'app-tarjetareserva',
  templateUrl: './tarjetareserva.component.html',
  styleUrls: ['./tarjetareserva.component.scss'],
})
export class TarjetareservaComponent implements OnInit {

  @Output() reservar: EventEmitter<ReservaIntegrado> = new EventEmitter();
  @Output() eliminar: EventEmitter<ReservaIntegrado> = new EventEmitter();

  @Input() reserva:ReservaIntegrado = ReservaIntegrado.instance('');

  constructor() { }

  ngOnInit() {}

  procesarRserva(){
      this.reservar.emit(this.reserva);
  }

  procesarEliminar(){
      this.eliminar.emit(this.reserva);
  }



}
