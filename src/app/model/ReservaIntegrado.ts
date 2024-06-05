export class ReservaIntegrado{
    static instance(obj:any){
        return new this(
          obj['linea'],
          obj['idoferta_venta'],
          obj['idlocalidad'],
          obj['localidad'],
          obj['idarticulo'],
          obj['articulo'],
          obj['fecha_inicio'],
          obj['fecha_fin'],
          obj['fecha_entrega'],
          obj['cantidad'],
          obj['precio'],
          obj['cantidad_reservada'],
          obj['cantidad_disponible'],
          obj['descripcion'],
          obj['idreserva'],
          obj['idpersona'],
          obj['cantidad_usuario_reserva'],
          obj['cantidad_pedir'],
        );
    }

    private constructor(
        public linea: number,
        public idoferta_venta: number,
        public idlocalidad: number,
        public localidad: string,
        public idarticulo: number,
        public articulo: string,
        public fecha_inicio: string,
        public fecha_fin: string,
        public fecha_entrega: string,
        public cantidad: number,
        public precio: number,
        public cantidad_reservada: number,
        public cantidad_disponible: number,
        public descripcion: string,
        public idreserva: number,
        public idpersona: number,
        public cantidad_usuario_reserva: number,
        public cantidad_pedir: number
    ){}
  }