export class MovimientoCajaIntegrado{
    static instance(obj:any){
        return new this(
          obj['idcaja_detalle'],
          obj['tipo_usuario'],
          obj['tipo_turno'],
          obj['idcaja'],
          obj['fecha_apertura'],
          obj['fecha_registro'],
          obj['idpersona'],
          obj['nombre'],
          obj['departamento'],
          obj['monto'],
          obj['observacion'],
          obj['idlocalidad'],
          obj['localidad'],
          obj['monto_usuario'],
          obj['saldo_anterior_usuario'],
          obj['saldo_final_usuario'],
          obj['origen']
        );
    }
    private constructor(
        public idcaja_detalle: number,
        public tipo_usuario: string,
        public tipo_turno: string,
        public idcaja: number,
        public fecha_apertura: Date,
        public fecha_registro: Date,
        public idpersona: number,
        public nombre: string,
        public departamento: string,
        public monto: number,
        public observacion: string,
        public idlocalidad: number,
        public localidad: string,
        public monto_usuario: number,
        public saldo_anterior_usuario: number,
        public saldo_final_usuario: number,
        public origen: string
    ){}
  }