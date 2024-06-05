export class OfertaVenta{
    static instance(obj:any){
        return new this(
          obj['idoferta_venta'],
          obj['idlocalidad'],
          obj['idarticulo'],
          obj['fecha_inicio'],
          obj['fecha_fin'],
          obj['fecha_entrega'],
          obj['cantidad'],
          obj['precio'],
          obj['descripcion']
        );
    }

    private constructor(
        public idoferta_venta: number,
        public idlocalidad: number,
        public idarticulo: number,
        public fecha_inicio: string,
        public fecha_fin: string,
        public fecha_entrega: string,
        public cantidad: number,
        public precio: number,
        public descripcion: string
    ){}
  }