export class PedidoIntegrado{
    static instance(obj:any){
        return new this(
          obj['idpedido'],
          obj['idlocalidad'],
          obj['localidad'],
          obj['idpersona'],
          obj['persona'],
          obj['idarticulo'],
          obj['articulo'],
          obj['idoferta_venta'],
          obj['oferta_venta'],
          obj['idreserva'],
          obj['cantidad'],
          obj['precio'],
          obj['subtotal'],
          obj['fecha_scaner'],
          obj['estado'],
          obj['fecha_creacion']
        );
    }

    private constructor(
        public idpedido: number,
        public idlocalidad: number,
        public localidad: string,
        public idpersona: number,
        public persona: string,
        public idarticulo: number,
        public articulo: string,
        public idoferta_venta: number,
        public oferta_venta: string,
        public idreserva: number,
        public cantidad: number,
        public precio: number,
        public subtotal: number,
        public fecha_scaner: string,
        public estado: string,
        public fecha_creacion: string
    ){}
  }