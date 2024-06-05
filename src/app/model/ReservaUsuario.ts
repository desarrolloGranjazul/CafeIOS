export class ReservaUsuario{
    static instance(obj:any){
        return new this(
          obj['idreserva'],
          obj['fecha_entrega'],
          obj['idpersona'],
          obj['persona'],
          obj['idarticulo'],
          obj['articulo'],
          obj['categoria'],
          obj['cantidad'],
          obj['precio'],
          obj['subtotal'],
          obj['estado'],
          obj['idlocalidad'],
          obj['localidad'],
          obj['descripcion'],
          obj['cantidad_pedir'],
          obj['cantidad_pedida'],
          obj['cantidad_pendiente'],

        );
    }

    private constructor(
        public idreserva: number,
        public fecha_entrega: string,
        public idpersona: number,
        public persona: string,
        public idarticulo: number,
        public articulo: string,
        public categoria: string,
        public cantidad: number,
        public precio: number,
        public subtotal: number,
        public estado: string,
        public idlocalidad: number,
        public localidad: string,
        public descripcion: string,
        public cantidad_pedir: number,        
        public cantidad_pedida: number,
        public cantidad_pendiente: number
    ){}
  }